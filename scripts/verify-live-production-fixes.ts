async function verifyLive() {
  console.log('--- Verifying Live Production Fixes on https://aswith-portfolio.vercel.app ---\n');

  // 1. Verify Fix 1: Contact Section on Live Site
  console.log('1. Checking Contact Section HTML on production...');
  const pageRes = await fetch('https://aswith-portfolio.vercel.app');
  const pageHtml = await pageRes.text();
  if (pageHtml.includes('bg-black/60 backdrop-blur-xl')) {
    console.error('FAIL: Production HTML still contains bg-black/60 backdrop-blur-xl');
    process.exit(1);
  } else {
    console.log('PASS: Contact Section has no solid/dark black card background (bg-black/60 backdrop-blur-xl removed).');
  }

  // 2. Verify Fix 2: Admin Key Verification on Production
  console.log('\n2. Testing Admin Key Verification on production...');
  
  // Login to get session cookie
  const loginRes = await fetch('https://aswith-portfolio.vercel.app/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passkey: 'aswithadmin4@' }),
  });
  const setCookie = loginRes.headers.get('set-cookie');
  if (!setCookie) {
    console.error('Could not authenticate with admin passkey on production.');
    process.exit(1);
  }
  const sessionCookie = setCookie.split(';')[0];
  console.log('PASS: Authenticated admin session obtained on production.');

  // Test 2A: Incorrect key
  const wrongKeyRes = await fetch('https://aswith-portfolio.vercel.app/api/admin/auth/verify-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: sessionCookie,
      origin: 'https://aswith-portfolio.vercel.app',
    },
    body: JSON.stringify({ code: 'wrong999' }),
  });
  const wrongKeyData = await wrongKeyRes.json();
  if (wrongKeyRes.status === 401 && wrongKeyData.success === false && wrongKeyData.error.includes('Incorrect admin key')) {
    console.log('PASS: Incorrect key rejected on production with HTTP 401 and error:', wrongKeyData.error);
  } else {
    console.error('FAIL: Incorrect key was not properly rejected:', wrongKeyRes.status, wrongKeyData);
    process.exit(1);
  }

  // Test 2B: Correct key (0406)
  const validKeyRes = await fetch('https://aswith-portfolio.vercel.app/api/admin/auth/verify-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: sessionCookie,
      origin: 'https://aswith-portfolio.vercel.app',
    },
    body: JSON.stringify({ code: '0406' }),
  });
  const validKeyData = await validKeyRes.json();
  if (validKeyRes.status === 200 && validKeyData.success === true) {
    console.log('PASS: Correct key "0406" successfully authorized on production with HTTP 200:', validKeyData.message);
  } else {
    console.error('FAIL: Correct key "0406" failed authorization on production:', validKeyRes.status, validKeyData);
    process.exit(1);
  }

  console.log('\n======================================================');
  console.log('ALL LIVE PRODUCTION VERIFICATIONS COMPLETED & PASSED!');
  console.log('======================================================');
}

verifyLive().catch((e) => {
  console.error('Live verification failed:', e);
  process.exit(1);
});
