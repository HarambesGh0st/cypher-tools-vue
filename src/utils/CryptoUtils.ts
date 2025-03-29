export const genIv = () => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  return iv
}

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
    ['encrypt', 'decrypt'],
  )
  return cryptoKey
}

export const encryptKeyString = async (rawKeyString: string) => {
  const cryptoKey = await importKey(import.meta.env.VITE_ENCRYPTION_KEY)
  const iv = genIv()
  const encodedString = new TextEncoder().encode(rawKeyString)

  const encryptedKeyString = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encodedString,
  )

  const toBase64Url = (buffer: ArrayBuffer | Uint8Array) =>
    btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

  return `${toBase64Url(encryptedKeyString)}.${toBase64Url(iv)}`
}
export const decryptKeyString = async (encryptedKeyString: string) => {
  const [encryptedData, iv] = encryptedKeyString.split('.').map((part) => {
    return Uint8Array.from(atob(part.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
  })

  const cryptoKey = await importKey(import.meta.env.VITE_ENCRYPTION_KEY)

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encryptedData,
  )

  return new TextDecoder().decode(decryptedBuffer)
}
