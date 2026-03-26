const PUBLIC_KEY_JWK = {
  "kty": "RSA",
  "n": "ynytIwhcdcg43Zv8jnBP1WzH7jz_L-ZQctdrSJLCLGJjEG392yeP30MF8sJ4iDSW1NXhPyS3hk5IhZCrmJi_-Bn4OEjenTLo7emPozjAeu5suxDk5wTA9nt1v_4OLHpAR6q0CVePaFLZ_Xp7KMuZ0NJJx0NXa5kJ_tPrDbINUIRuHV58gUcLDs7tWNC1eCjh5wP2YJNGz6mz1NspnpcYlT-G2uDyYg1QQsR-nuxBr0mKx6KHe1_rSR5b_TMf096Ku0TEkngCIHszfwF_l-NX_P5J_XMMAzrBnpLwJatQ9zvxa4tjNhGNs9nwaBOn2-UyJmPa23WqNO78cPmh6K7Qxw",
  "e": "AQAB",
  "alg": "RSA-OAEP-256",
  "ext": true,
  "key_ops": [
    "encrypt"
  ]
};

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

async function importRsaPublicKeyFromJwk(jwk) {
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    false,
    ["encrypt"]
  );
}

async function generateAesKey() {
  return crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encryptPlaintextWithAesGcm(aesKey, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPlaintext = new TextEncoder().encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    aesKey,
    encodedPlaintext
  );

  return {
    iv,
    ciphertext
  };
}

async function wrapAesKeyWithRsa(publicKey, aesKey) {
  const rawAesKey = await crypto.subtle.exportKey("raw", aesKey);

  const wrappedKey = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    rawAesKey
  );

  return wrappedKey;
}

export async function encrypt(plaintext) {
  const publicKey = await importRsaPublicKeyFromJwk(PUBLIC_KEY_JWK);
  const aesKey = await generateAesKey();

  const { iv, ciphertext } = await encryptPlaintextWithAesGcm(aesKey, plaintext);
  const wrappedKey = await wrapAesKeyWithRsa(publicKey, aesKey);

  return {
    alg: "RSA-OAEP-256+A256GCM",
    wrappedKey: arrayBufferToBase64(wrappedKey),
    iv: arrayBufferToBase64(iv.buffer),
    ciphertext: arrayBufferToBase64(ciphertext)
  };
}
