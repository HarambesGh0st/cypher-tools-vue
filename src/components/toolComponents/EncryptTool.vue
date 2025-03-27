<script lang="ts" setup>
import { encrypt, encryptKeyString, generateKey } from '@/cryptoUtils'
import { provide, ref } from 'vue'
import type { Ref } from 'vue'
import FileInput from './FileInput.vue'

const decryptLink: Ref<string | undefined> = ref(undefined)
const isPending: Ref<boolean> = ref(false)
provide('decryptLink', decryptLink)

const encryptFile = async (file: File | undefined) => {
  console.log(file)
  if (!file) {
    alert('Error: No file selected.')
  }
  isPending.value = true

  const fileBuffer = await file!.arrayBuffer() // file to byte array
  const iv = window.crypto.getRandomValues(new Uint8Array(12)) // create initialization vector
  generateKey().then(async (key) => {
    // encrypt file
    const encryptedFileBuffer = await encrypt(iv, key, fileBuffer)
    // generate decrypt link
    const exportedKey = await window.crypto.subtle.exportKey('jwk', key)
    const encryptedKeyString = await encryptKeyString(exportedKey.k!)
    // construct file for download
    const blob = new Blob([iv, encryptedFileBuffer], {
      type: file!.type,
    })
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `enc-${file!.name}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      decryptLink.value = `${window.location.origin}/decrypt#${encryptedKeyString}`
      isPending.value = false
    }, 1000)
  })
}
</script>
<template>
  <div class="h-full flex justify-center items-center overflow-hidden">
    <FileInput
      title="Encrypt a File"
      message="Select a file to start encryption."
      buttonText="Encrypt"
      :processFile="encryptFile"
      :isPending="isPending"
    />
    <DecryptionLinkModal />
  </div>
</template>
