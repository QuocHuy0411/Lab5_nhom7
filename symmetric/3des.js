function encrypt3DES(plaintext, keyHex) {
  // 3DES key thường là 24 bytes (48 ký tự Hex)
  if (keyHex.length !== 48)
    throw new Error('3DES key must be exactly 24 bytes (48 hex characters).');

  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv  = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

  const encrypted = CryptoJS.TripleDES.encrypt(
    CryptoJS.enc.Utf8.parse(plaintext),
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function decrypt3DES(ciphertextHex, keyHex) {
  if (keyHex.length !== 48)
    throw new Error('3DES key must be exactly 24 bytes (48 hex characters).');

  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv  = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex)
  });

  const decrypted = CryptoJS.TripleDES.decrypt(
    cipherParams, key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  const result = decrypted.toString(CryptoJS.enc.Utf8);
  if (!result) throw new Error('Decryption failed — wrong key or corrupted data.');
  return result;
}