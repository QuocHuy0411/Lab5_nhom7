function showError(msg) {
  document.getElementById('errorMsg').innerText = msg;
}

function clearError() {
  document.getElementById('errorMsg').innerText = '';
}

async function generateKeysUI() {
  try {
    clearError();
    const keys = await generateKeys();

    document.getElementById('publicKey').value = keys.publicKey;
    document.getElementById('privateKey').value = keys.privateKey;
  } catch (e) {
    showError("Key generation failed: " + e.message);
  }
}

async function encryptUI() {
  try {
    clearError();

    const text = document.getElementById('inputData').value;
    const key = document.getElementById('publicKey').value;

    if (!text || !key) throw new Error("Missing input or public key");

    const result = await encryptRSA(text, key);
    document.getElementById('outputData').value = result;
  } catch (e) {
    showError("Encryption failed: " + e.message);
  }
}

async function decryptUI() {
  try {
    clearError();

    const text = document.getElementById('inputData').value;
    const key = document.getElementById('privateKey').value;

    if (!text || !key) throw new Error("Missing input or private key");

    const result = await decryptRSA(text, key);
    document.getElementById('outputData').value = result;
  } catch (e) {
    showError("Decryption failed: " + e.message);
  }
}