<script lang="ts" setup>
import { encrypt, generateKey } from '@/cryptoUtils'
import { ref } from 'vue'
import type { Ref } from 'vue'
import FileInput from './FileInput.vue'

const decryptLink: Ref<string | undefined> = ref(undefined)
const isPending: Ref<boolean> = ref(false)
const file: Ref<File | undefined> = ref(undefined)

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
      decryptLink.value = `${window.location.origin}/decrypt#${exportedKey.k}`
      isPending.value = false
    }, 1000)
  })
}
</script>
<template>
  <div class="h-full flex justify-center items-center overflow-hidden">
    <FileInput
      title="Encrypt a File"
      buttonText="Encrypt"
      :processFile="encryptFile"
      :decryptLink="decryptLink"
    />
    <DecryptionLinkModal />
  </div>
</template>
