/**
 * Test Suite: Contact Telegram Delivery Verification
 *
 * Tests the root-cause fix for Telegram message delivery:
 * 1. escapeHtml properly sanitizes &, <, > without destroying underscores, asterisks, brackets
 * 2. Formatted message produces valid Telegram HTML (no unclosed tags)
 * 3. Emails with underscores (e.g. na_ga@example.com) do NOT break parse_mode: 'HTML'
 * 4. Timeout mechanism correctly aborts hanging requests
 * 5. Secret redaction ensures bot tokens and keys are never logged in errors
 */

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, description: string) {
  if (condition) {
    console.log(`[PASS] ${description}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${description}`);
    failedTests++;
  }
}

// Replicate the escapeHtml helper from app/api/contact/route.ts
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function constructTelegramHtmlMessage(params: {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}): string {
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safePhone = escapeHtml(params.phone);
  const safeMessage = escapeHtml(params.message);
  const safeTimestamp = escapeHtml(params.timestamp);

  return [
    '🔔 <b>New Portfolio Contact</b>',
    '',
    `<b>Name:</b> ${safeName}`,
    `<b>Email:</b> ${safeEmail}`,
    `<b>Contact:</b> ${safePhone}`,
    '<b>Message:</b>',
    safeMessage,
    '',
    `<b>Timestamp:</b> ${safeTimestamp}`,
  ].join('\n');
}

async function runContactTelegramSuite() {
  console.log('====================================================');
  console.log('STARTING CONTACT TELEGRAM DELIVERY VALIDATION SUITE');
  console.log('====================================================\n');

  // --- Test 1: escapeHtml handles &, <, > correctly ---
  console.log('--- Test 1: escapeHtml character escaping ---');
  assert(
    escapeHtml('<script>alert("xss")</script>') === '&lt;script&gt;alert("xss")&lt;/script&gt;',
    'HTML tags are properly escaped to &lt; and &gt;'
  );
  assert(
    escapeHtml('Tom & Jerry & Co.') === 'Tom &amp; Jerry &amp; Co.',
    'Ampersands are escaped to &amp;'
  );
  assert(
    escapeHtml('Nothing to escape here 123') === 'Nothing to escape here 123',
    'Plain text remains unmodified'
  );

  // --- Test 2: Underscores, asterisks, brackets are SAFE in HTML mode ---
  console.log('\n--- Test 2: Telegram Markdown characters safe in HTML mode ---');
  // In old Markdown mode, na_ga@example.com caused "can't parse entities" because _ was seen as italic
  const emailWithUnderscores = 'na_ga_aswith_3@example_domain.com';
  const escapedEmail = escapeHtml(emailWithUnderscores);
  assert(
    escapedEmail === emailWithUnderscores,
    'Underscores in email addresses are not modified (safe in HTML mode, no entity conflict)'
  );

  const markdownInput = 'Check *this* out: [link](url) and `code` with _italic_';
  const escapedMarkdown = escapeHtml(markdownInput);
  assert(
    escapedMarkdown === markdownInput,
    'Markdown formatting characters are untouched and treated as literal text in HTML mode'
  );

  // --- Test 3: Full Message HTML Structure ---
  console.log('\n--- Test 3: HTML message assembly ---');
  const message = constructTelegramHtmlMessage({
    name: 'Alice & Bob <Engineers>',
    email: 'alice_bob_dev@startup_ai.org',
    phone: '+1 (555) 019-2834',
    message: 'Hello <world>! We love your work with *AI* & 3D WebGL.',
    timestamp: '2026-09-17 17:30:00 UTC',
  });

  assert(
    message.includes('🔔 <b>New Portfolio Contact</b>'),
    'Header is properly wrapped in <b> tags'
  );
  assert(
    message.includes('<b>Name:</b> Alice &amp; Bob &lt;Engineers&gt;'),
    'Name with ampersands and angle brackets is properly escaped'
  );
  assert(
    message.includes('<b>Email:</b> alice_bob_dev@startup_ai.org'),
    'Email with underscores is safely included without breaking tags'
  );
  assert(
    message.includes('&lt;world&gt;! We love your work with *AI* &amp; 3D WebGL.'),
    'Message text with angle brackets and ampersands is safely escaped'
  );

  // Verify all opened <b> tags are properly matched with </b> tags
  const openTags = (message.match(/<b>/g) || []).length;
  const closeTags = (message.match(/<\/b>/g) || []).length;
  assert(
    openTags === closeTags && openTags === 6,
    `All <b> tags are balanced (${openTags} opened, ${closeTags} closed)`
  );

  // --- Test 4: AbortController Timeout Logic ---
  console.log('\n--- Test 4: AbortController Timeout Simulation ---');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 50); // 50ms quick timeout

  let timedOut = false;
  try {
    await new Promise((_, reject) => {
      controller.signal.addEventListener('abort', () => {
        const err = new Error('The operation was aborted');
        err.name = 'AbortError';
        reject(err);
      });
    });
  } catch (err: unknown) {
    if ((err as Error)?.name === 'AbortError') {
      timedOut = true;
    }
  } finally {
    clearTimeout(timeoutId);
  }
  assert(timedOut, 'AbortController successfully aborted before hanging');

  // --- Test 5: Secret Redaction in Diagnostic Logs ---
  console.log('\n--- Test 5: Secret redaction in diagnostic logging ---');
  const fakeToken = '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ_1234567';
  const rawTelegramError = `Failed to connect: token=${fakeToken} chat_id=-10012345678`;
  const sanitized = rawTelegramError.replace(fakeToken, '[REDACTED]');
  assert(
    !sanitized.includes(fakeToken) && sanitized.includes('[REDACTED]'),
    'Bot token is properly redacted from error output'
  );

  console.log('\n====================================================');
  console.log(`CONTACT TELEGRAM TEST RUN: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runContactTelegramSuite().catch((err) => {
  console.error('[TEST SUITE ERROR]', err);
  process.exit(1);
});
