export const generateKey = async () => {
  const generatedKey = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  )
  return generatedKey
}

export const encrypt = async (
  iv: Uint8Array<ArrayBuffer>,
  key: CryptoKey,
  fileBuffer: ArrayBuffer,
) => {
  const encryptedFileData = crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, fileBuffer)
  return encryptedFileData
}

export const decrypt = async (
  cryptoKey: CryptoKey,
  encryptedData: ArrayBuffer,
  iv: ArrayBuffer,
) => {
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encryptedData,
  )
  return decryptedData
}

export const importKey = async (encryptionKey: string) => {
  const cryptoKey = await window.crypto.subtle.importKey(
    'jwk',
    {
      alg: 'A256GCM',
      ext: true,
      k: encryptionKey,
      key_ops: ['encrypt', 'decrypt'],
      kty: 'oct',
    },
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['decrypt'],
  )
  return cryptoKey
}
