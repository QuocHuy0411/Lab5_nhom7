function encryptDES(plaintext, keyHex) {
  if (keyHex.length !== 16)
    throw new Error('DES key must be exactly 8 bytes (16 hex characters).');

  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv  = CryptoJS.enc.Hex.parse('0000000000000000');

  const encrypted = CryptoJS.DES.encrypt(
    CryptoJS.enc.Utf8.parse(plaintext),
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function decryptDES(ciphertextHex, keyHex) {
  if (keyHex.length !== 16)
    throw new Error('DES key must be exactly 8 bytes (16 hex characters).');

  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv  = CryptoJS.enc.Hex.parse('0000000000000000');

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex)
  });

  const decrypted = CryptoJS.DES.decrypt(
    cipherParams, key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  const result = decrypted.toString(CryptoJS.enc.Utf8);
  if (!result) throw new Error('Decryption failed — wrong key or corrupted ciphertext.');
  return result;
}