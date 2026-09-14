import {
  validateRemoteUrl,
  extractGoogleDriveFileId,
  buildGoogleDriveDownloadUrl,
  detectFileTypeFromBuffer,
} from '../lib/storage/mediaImporter';

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

async function runMediaImportSuite() {
  console.log('====================================================');
  console.log('STARTING MEDIA IMPORT & SECURITY VALIDATION SUITE');
  console.log('====================================================\n');

  // --- Scenario 1: SSRF & URL Protocol Validation ---
  console.log('--- Scenario 1: SSRF & URL Protocol Validation ---');
  try {
    await validateRemoteUrl('http://localhost:3000/image.png');
    assert(false, 'Localhost URL was not rejected');
  } catch (err: any) {
    assert(err.message.includes('forbidden') || err.message.includes('private'), 'Localhost URL blocked cleanly');
  }

  try {
    await validateRemoteUrl('http://127.0.0.1:8080/image.png');
    assert(false, '127.0.0.1 was not rejected');
  } catch (err: any) {
    assert(err.message.includes('private or restricted') || err.message.includes('forbidden'), '127.0.0.1 blocked cleanly');
  }

  try {
    await validateRemoteUrl('http://169.254.169.254/latest/meta-data');
    assert(false, 'Metadata endpoint was not rejected');
  } catch (err: any) {
    assert(err.message.includes('private or restricted') || err.message.includes('forbidden'), 'Cloud metadata endpoint blocked cleanly');
  }

  try {
    await validateRemoteUrl('ftp://example.com/asset.png');
    assert(false, 'FTP protocol was not rejected');
  } catch (err: any) {
    assert(err.message.includes('Unsupported protocol'), 'FTP protocol blocked cleanly');
  }

  // --- Scenario 2: Google Drive URL Parsing ---
  console.log('\n--- Scenario 2: Google Drive URL Parsing ---');
  const driveUrl1 = 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OIvE2eZ/view?usp=sharing';
  const id1 = extractGoogleDriveFileId(driveUrl1);
  assert(id1 === '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OIvE2eZ', 'File ID extracted from /file/d/ URL');

  const driveUrl2 = 'https://drive.google.com/open?id=1AbCdEfGhIjKlMnOpQrStUvWxYz';
  const id2 = extractGoogleDriveFileId(driveUrl2);
  assert(id2 === '1AbCdEfGhIjKlMnOpQrStUvWxYz', 'File ID extracted from ?id= parameter');

  const downloadUrl = buildGoogleDriveDownloadUrl('1AbCdEfGhIjKlMnOpQrStUvWxYz');
  assert(
    downloadUrl === 'https://drive.google.com/uc?export=download&id=1AbCdEfGhIjKlMnOpQrStUvWxYz&confirm=t',
    'Download URL constructed properly with confirm parameter'
  );

  const nonDriveUrl = 'https://example.com/image.png';
  assert(extractGoogleDriveFileId(nonDriveUrl) === null, 'Non-Google Drive URL returns null ID');

  // --- Scenario 3: Magic Byte & File Type Detection ---
  console.log('\n--- Scenario 3: Magic Byte & File Type Detection ---');
  // JPEG: FF D8 FF
  const jpegBuf = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
  const jpegInfo = detectFileTypeFromBuffer(jpegBuf);
  assert(jpegInfo.mime === 'image/jpeg' && jpegInfo.extension === 'jpeg', 'JPEG magic bytes correctly identified');

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  const pngBuf = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
  const pngInfo = detectFileTypeFromBuffer(pngBuf);
  assert(pngInfo.mime === 'image/png' && pngInfo.extension === 'png', 'PNG magic bytes correctly identified');

  // WEBP: RIFF....WEBP
  const webpBuf = Buffer.from([
    0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
  ]);
  const webpInfo = detectFileTypeFromBuffer(webpBuf);
  assert(webpInfo.mime === 'image/webp' && webpInfo.extension === 'webp', 'WebP magic bytes correctly identified');

  // GIF: GIF89a
  const gifBuf = Buffer.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
  const gifInfo = detectFileTypeFromBuffer(gifBuf);
  assert(gifInfo.mime === 'image/gif' && gifInfo.extension === 'gif', 'GIF magic bytes correctly identified');

  // PDF: %PDF-
  const pdfBuf = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
  const pdfInfo = detectFileTypeFromBuffer(pdfBuf);
  assert(pdfInfo.mime === 'application/pdf' && pdfInfo.extension === 'pdf', 'PDF magic bytes correctly identified');

  // MP4: ....ftyp
  const mp4Buf = Buffer.from([
    0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d,
  ]);
  const mp4Info = detectFileTypeFromBuffer(mp4Buf);
  assert(mp4Info.mime === 'video/mp4' && mp4Info.extension === 'mp4', 'MP4 container magic bytes correctly identified');

  // Invalid executable / unknown
  const exeBuf = Buffer.from([0x4d, 0x5a, 0x90, 0x00]); // DOS MZ executable
  try {
    detectFileTypeFromBuffer(exeBuf);
    assert(false, 'Executable file was not rejected');
  } catch (err: any) {
    assert(err.message.includes('Unsupported file format'), 'Executable magic bytes rejected cleanly');
  }

  console.log('\n====================================================');
  console.log(`MEDIA IMPORT TEST RUN: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runMediaImportSuite().catch((err) => {
  console.error('[TEST SUITE ERROR]', err);
  process.exit(1);
});
