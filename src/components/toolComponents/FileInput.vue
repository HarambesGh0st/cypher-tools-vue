<script setup lang="ts">
import { inject, ref, watch, type Ref } from 'vue'
import PadlockSpinner from './PadlockSpinner.vue'
import PrimaryButton from '../butons/PrimaryButton.vue'
import ToolContainer from './ToolContainer.vue'

const props = defineProps<{
  title: string
  message: string
  buttonText: string
  processFile: (file: File | undefined) => void
  isPending: boolean
}>()
const decryptLink = inject<Ref<string | undefined>>('decryptLink')
const selectedFile: Ref<File | undefined> = ref(undefined)
console.log(selectedFile)

const handleFileSelection = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFile.value = target.files[0]
  }
}

const clearSelectedFile = () => {
  selectedFile.value = undefined
}

const copyToClipboard = (decryptLink: string | undefined) => {
  decryptLink && navigator.clipboard.writeText(decryptLink)
}

const resetTool = () => {
  selectedFile.value = undefined
  decryptLink!.value = undefined // need to handle this wih provide / inject
}
watch(
  () => decryptLink?.value,
  (newVal) => {
    console.log('decryptLink updated:', newVal)
  },
)
</script>

<template>
  <ToolContainer>
    <template #header>{{ title }}</template>
    <template #tool>
      <div
        v-if="!selectedFile"
        class="h-full w-full flex flex-col justify-center items-center space-y-5"
      >
        <input id="fileInput" type="file" @change="handleFileSelection" class="hidden" />
        <p class="text-sm text-zinc-900">{{ message }}</p>
        <label
          for="fileInput"
          class="bg-gradient-to-r from-saphire-300 to-saphire-100 text-white px-4 py-2 hover:cursor-pointer hover:bg-gradient-to-r hover:from-saphire-500 hover:to-saphire-300 rounded-xs transition-colors ease-in-out duration-300"
          >Select File</label
        >
      </div>
      <div
        v-else-if="decryptLink"
        class="w-5/6 flex flex-col justify-center items-center space-y-5"
      >
        <p class="text-center text-sm text-zinc-900">
          Send the encrypted file along with the link below to your intended recipient. Using only
          the unique link allows the recipient to decrypt and download the file.
        </p>
        <div class="flex justify-center space-x-1">
          <a class="w-4/6 h-8 border border-zinc-300 p-1 text-ellipsis overflow-hidden">{{
            decryptLink
          }}</a>
          <button
            class="border border-[#054dff] h-8 p-1 bg-zinc-100 text-[#054dff] rounded-xs text-center flex justify-center items-center"
            @click.prevent="copyToClipboard(decryptLink)"
          >
            Copy
          </button>
        </div>
        <PrimaryButton @click="resetTool"> Encrypt another file </PrimaryButton>
      </div>
      <div v-else-if="selectedFile && isPending">
        <PadlockSpinner />
      </div>

      <div v-else-if="selectedFile" class="flex flex-col justify-center items-center space-y-5">
        <div class="flex space-x-2">
          <p class="border border-zinc-300 h-8 flex items-center p-2">{{ selectedFile.name }}</p>
          <button
            class="rounded-full border border-zinc-300 h-8 w-8 flex justify-center items-center"
            @click="clearSelectedFile"
          >
            X
          </button>
        </div>
        <PrimaryButton @click.prevent="processFile(selectedFile)">
          {{ props.buttonText }}
        </PrimaryButton>
      </div>
    </template>
  </ToolContainer>
</template>
