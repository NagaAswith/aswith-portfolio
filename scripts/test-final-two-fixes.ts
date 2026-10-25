import fs from 'fs';
import path from 'path';
import { verifyAdminKey, createAdminToken } from '../lib/adminAuth';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`  [✗ FAIL] ${msg}`);
    process.exit(1);
  }
  console.log(`  [✓ PASS] ${msg}`);
}

async function runTests() {
  console.log('====================================================');
  console.log('FINAL TWO FIXES VERIFICATION TEST SUITE');
  console.log('====================================================\n');

  // ─────────────────────────────────────────────────────────────
  // FIX 1: Remove Black Card Background on "Let's Build Something" Page
  // ─────────────────────────────────────────────────────────────
  console.log('--- FIX 1: Contact Section Background Blending ---');
  const contactFilePath = path.join(process.cwd(), 'components/contact/ContactSection.tsx');
  assert(fs.existsSync(contactFilePath), 'ContactSection.tsx exists');
  const contactCode = fs.readFileSync(contactFilePath, 'utf-8');

  // Verify solid/translucent black card background removed
  assert(!contactCode.includes('bg-black/60 backdrop-blur-xl'), 'Removed bg-black/60 backdrop-blur-xl from contact footer');
  assert(contactCode.includes('bg-transparent border-t border-white/10'), 'Contact section footer uses bg-transparent to blend with background video');

  // Verify all content, forms, buttons, text are preserved intact
  assert(contactCode.includes("LET&apos;S BUILD SOMETHING USEFUL."), 'Heading "LET\'S BUILD SOMETHING USEFUL." is preserved');
  assert(contactCode.includes('Open for software engineering opportunities'), 'Contact description text is preserved');
  assert(contactCode.includes('mailto:${personal.social.email}') || contactCode.includes('mailto:'), 'Email direct action button is preserved');
  assert(contactCode.includes('tel:${personal.social.phone}') || contactCode.includes('tel:'), 'Phone direct link is preserved');
  assert(contactCode.includes('VIEW RESUME'), 'Resume view button is preserved');
  assert(contactCode.includes('Send a Direct Message'), 'Direct message form header is preserved');
  assert(contactCode.includes('name="_hp"'), 'Form honeypot security field is preserved');
  assert(contactCode.includes('id="contact-name"') && contactCode.includes('id="contact-email"'), 'Form input fields are preserved');
  assert(contactCode.includes('id="contact-message"') && contactCode.includes('Send Message'), 'Message area and submit button are preserved');
  assert(contactCode.includes('Back to top'), 'Back to top button is preserved');

  // ─────────────────────────────────────────────────────────────
  // FIX 2: Require Existing Admin Key When Resetting Portfolio
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- FIX 2: Admin Key Verification on Portfolio Reset ---');

  // 1. verifyAdminKey unit verification
  console.log('  Testing verifyAdminKey function:');
  assert(verifyAdminKey('0406') === true, 'verifyAdminKey correctly authorizes key "0406"');
  assert(verifyAdminKey('0409') === true, 'verifyAdminKey correctly authorizes alternate fallback key "0409"');
  assert(verifyAdminKey('wrong') === false, 'verifyAdminKey rejects incorrect key "wrong"');
  assert(verifyAdminKey('0000') === false, 'verifyAdminKey rejects incorrect key "0000"');
  assert(verifyAdminKey('') === false, 'verifyAdminKey rejects empty input');
  assert(verifyAdminKey(null as unknown as string) === false, 'verifyAdminKey rejects null input');

  // 2. Server endpoint code verification
  const verifyKeyRoutePath = path.join(process.cwd(), 'app/api/admin/auth/verify-key/route.ts');
  assert(fs.existsSync(verifyKeyRoutePath), 'Dedicated server route app/api/admin/auth/verify-key/route.ts exists');
  const verifyRouteCode = fs.readFileSync(verifyKeyRoutePath, 'utf-8');

  assert(verifyRouteCode.includes('isAuthenticatedAdmin(req)'), 'Server route enforces admin session authentication');
  assert(verifyRouteCode.includes('validateCsrfOrigin(req)'), 'Server route enforces CSRF origin validation');
  assert(verifyRouteCode.includes('rateLimiter.check'), 'Server route enforces strict rate limiting against brute force');
  assert(verifyRouteCode.includes('verifyAdminKey(code)'), 'Server route securely validates key on the server side');
  assert(verifyRouteCode.includes('status: 401') && verifyRouteCode.includes('status: 429'), 'Server route returns 401 for bad keys and 429 for rate limit');

  // 3. Admin dashboard UI & workflow verification
  const adminDashPath = path.join(process.cwd(), 'components/admin/AdminDashboard.tsx');
  const adminDashCode = fs.readFileSync(adminDashPath, 'utf-8');

  assert(adminDashCode.includes('isResetModalOpen') && adminDashCode.includes('setIsResetModalOpen(true)'), 'Admin dashboard includes reset authorization modal state');
  assert(adminDashCode.includes('/api/admin/auth/verify-key'), 'Admin dashboard connects reset authorization to /api/admin/auth/verify-key');
  assert(adminDashCode.includes('Authorize Portfolio Reset'), 'Reset confirmation dialog has clear heading "Authorize Portfolio Reset"');
  assert(adminDashCode.includes('handleAuthorizeReset'), 'handleAuthorizeReset securely posts key to server before allowing reset');
  assert(adminDashCode.includes('setIsResetModalOpen(false)'), 'Cancellation cleanly dismisses modal without triggering reset');
  assert(
    !adminDashCode.includes("onClick={() => {\n                      if (window.confirm('Reset all portfolio content"),
    'Direct unauthenticated reset button click is prevented'
  );

  // 4. Test actual route handler via local simulation
  console.log('\n--- FIX 2: Simulated Server Request Handling ---');
  const { POST } = await import('../app/api/admin/auth/verify-key/route');

  // A. Unauthenticated request -> 401
  const reqUnauth = new Request('http://localhost:3000/api/admin/auth/verify-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', host: 'localhost:3000' },
    body: JSON.stringify({ code: '0406' }),
  });
  const resUnauth = await POST(reqUnauth);
  assert(resUnauth.status === 401, 'Unauthenticated request to verify-key is rejected with HTTP 401');

  // B. Authenticated request with invalid key -> 401
  const token = await createAdminToken();
  const reqWrongKey = new Request('http://localhost:3000/api/admin/auth/verify-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: 'localhost:3000',
      origin: 'http://localhost:3000',
      cookie: `admin_session=${token}`,
    },
    body: JSON.stringify({ code: 'wrong-key-9999' }),
  });
  const resWrongKey = await POST(reqWrongKey);
  const dataWrongKey = await resWrongKey.json();
  assert(resWrongKey.status === 401, 'Incorrect key request is rejected with HTTP 401');
  assert(dataWrongKey.success === false, 'Response indicates success: false');
  assert(dataWrongKey.error.includes('Incorrect admin key'), 'Error message clearly indicates "Incorrect admin key"');

  // C. Authenticated request with correct key (0406) -> 200
  const reqValidKey = new Request('http://localhost:3000/api/admin/auth/verify-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: 'localhost:3000',
      origin: 'http://localhost:3000',
      cookie: `admin_session=${token}`,
    },
    body: JSON.stringify({ code: '0406' }),
  });
  const resValidKey = await POST(reqValidKey);
  const dataValidKey = await resValidKey.json();
  assert(resValidKey.status === 200, 'Correct admin key "0406" is accepted with HTTP 200');
  assert(dataValidKey.success === true, 'Response indicates success: true');
  assert(dataValidKey.message.includes('verified'), 'Response includes confirmation message');

  console.log('\n====================================================');
  console.log('ALL FINAL TWO FIXES TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================');
}

runTests().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
