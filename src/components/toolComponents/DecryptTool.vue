<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import FileInput from './FileInput.vue'
import { decrypt, importKey } from '../../cryptoUtils'

const isPending: Ref<Boolean> = ref(false)

const decryptFile = async (file: File) => {
  if (!file) {
    alert('Error: No file selected.')
  }
  isPending.value = true
  // get the jwk from the url
  const fragment = window.location.hash.slice(1)
  const encryptionKey = fragment
  console.log(encryptionKey)
  const cryptoKey = await importKey(encryptionKey)
  const fileBuffer = await file!.arrayBuffer()
  const iv = new Uint8Array(await fileBuffer.slice(0, 12)) // Extract IV
  const encryptedData = fileBuffer.slice(12) // Extract encrypted content
  const decryptedFileData = await decrypt(cryptoKey, encryptedData, iv)
  // Create a Blob for the decrypted file
  const blob = new Blob([decryptedFileData], { type: file?.type })
  setTimeout(() => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `dec${file?.name.slice(3)}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    isPending.value = false
  }, 1000)
}
</script>
<template>
  <div class="h-full flex justify-center items-center overflow-hidden">
    <FileInput title="Decrypt a File" buttonText="Decrypt" :processFile="decryptFile" />
  </div>
</template>
