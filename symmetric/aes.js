function _aesGetModeObj(mode) {
  const map = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB, CFB: CryptoJS.mode.CFB };
  if (!map[mode]) throw new Error('Unsupported mode: ' + mode);
  return map[mode];
}

function _aesParseKey(raw, bytes) {
  if (/^[0-9a-fA-F]+$/.test(raw)) {
    if (raw.length !== bytes * 2)
      throw new Error(
        `Key length mismatch: AES-${bytes * 8} requires ${bytes * 2} hex chars, got ${raw.length}. Please regenerate the key.`
      );
    return CryptoJS.enc.Hex.parse(raw);
  }
  // UTF-8 key: explicit zero-pad or trim to required length
  const enc = CryptoJS.enc.Utf8.parse(raw);
  const words = new Array(Math.ceil(bytes / 4)).fill(0);
  enc.words.forEach((w, i) => { if (i < words.length) words[i] = w; });
  return CryptoJS.lib.WordArray.create(words, bytes);
}

function _aesRandHex(bytes) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateAESKey(keyBits) {
  return _aesRandHex(keyBits / 8);
}

function encryptAES(plaintext, keyRaw, mode, keyBits, ivHex) {
  const bytes = keyBits / 8;
  const key = _aesParseKey(keyRaw, bytes);
  const cfg = { mode: _aesGetModeObj(mode), padding: CryptoJS.pad.Pkcs7 };
  let usedIv = '';

  if (mode !== 'ECB') {
    usedIv = (ivHex && ivHex.length === 32) ? ivHex : _aesRandHex(16);
    cfg.iv = CryptoJS.enc.Hex.parse(usedIv);
  }

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, cfg);
  return { cipherHex: encrypted.ciphertext.toString(CryptoJS.enc.Hex), ivHex: usedIv };
}

function decryptAES(cipherHex, keyRaw, mode, keyBits, ivHex) {
  const bytes = keyBits / 8;
  const key = _aesParseKey(keyRaw, bytes);
  const cfg = { mode: _aesGetModeObj(mode), padding: CryptoJS.pad.Pkcs7 };

  if (mode !== 'ECB') {
    if (!ivHex) throw new Error('Mode ' + mode + ' requires an IV!');
    cfg.iv = CryptoJS.enc.Hex.parse(ivHex);
  }

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(cipherHex)
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, cfg);
  const result = decrypted.toString(CryptoJS.enc.Utf8);
  if (!result) throw new Error('Wrong key or IV — decryption failed!');
  return result;
}