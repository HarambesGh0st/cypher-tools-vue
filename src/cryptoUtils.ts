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
