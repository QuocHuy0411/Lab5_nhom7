async function generateKeys() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const pub = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const priv = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return {
    publicKey: btoa(String.fromCharCode(...new Uint8Array(pub))),
    privateKey: btoa(String.fromCharCode(...new Uint8Array(priv)))
  };
}

async function encryptRSA(text, pubKeyStr) {
  const binary = Uint8Array.from(atob(pubKeyStr), c => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "spki",
    binary,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  const encoded = new TextEncoder().encode(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    key,
    encoded
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

async function decryptRSA(cipher, privKeyStr) {
  const binary = Uint8Array.from(atob(privKeyStr), c => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binary,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );

  const encryptedData = Uint8Array.from(atob(cipher), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decrypted);
}