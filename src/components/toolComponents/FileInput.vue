<script setup lang="ts">
import { ref, type Ref } from 'vue'

const props = defineProps<{
  title: string
  buttonText: string
  processFile: (file: File | undefined) => void
  decryptLink?: Ref<string | undefined>
}>()
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
  props.decryptLink!.value = undefined
}
</script>

<template>
  <div
    class="bg-linear-to-r from-purple-500 to-cyan-500 w-1/2 h-2/3 flex flex-col justify-center items-center rounded-lg p-1 shadow-zinc-900/30 shadow-xl"
  >
    <h2
      class="w-full h-12 text-2xl bg-linear-to-r from-purple-500 to-cyan-500 flex justify-center items-center pb-1 text-zinc-50"
    >
      {{ props.title }}
    </h2>
    <div
      class="flex flex-col justify-center items-center space-y-10 bg-white w-full h-full rounded-lg rounded-t-none pb-10"
    >
      <div v-if="decryptLink" class="w-5/6 flex flex-col justify-center items-center">
        <div class="flex justify-center space-x-1">
          <a
            class="w-5/6 h-8 border border-zinc-300 rounded-sm p-1 text-ellipsis overflow-hidden"
            >{{ decryptLink }}</a
          >
          <button
            class="border border-zinc-300 rounded-sm p-1"
            @click.prevent="copyToClipboard(decryptLink.value)"
          >
            Copy
          </button>
        </div>
        <button @click="resetTool">Encrypt another file</button>
      </div>
      <form v-else-if="!selectedFile">
        <input id="fileInput" type="file" @change="handleFileSelection" class="hidden" />
        <label
          for="fileInput"
          class="bg-linear-to-r from-purple-500 to-cyan-500 px-6 py-2 cursor-pointer rounded-sm text-white font-bold"
          >Select File</label
        >
      </form>
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
        <button
          class="p-1 bg-linear-to-r from-purple-600 to-cyan-600 rounded-sm hover:cursor-pointer flex justify-center items-center"
          @click.prevent="processFile(selectedFile)"
        >
          <div class="px-6 py-2 bg-white rounded-sm">
            {{ props.buttonText }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
