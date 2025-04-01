<script setup lang="ts">
import { ref, type Ref } from 'vue'

const key: Ref<string | undefined> = ref(undefined)
const iframeSrcURL: Ref<string | undefined> = ref(undefined)
const loadVideo = (event: Event) => {
  const target = event.target as HTMLInputElement
  key.value = target.value
  getIframeSrc()
}
// const fallbackURL = `https://iframe.mediadelivery.net/embed/402767/01e24fcd-6c50-496b-a421-e8094167aaab?autoplay=true`

// electron based logic
const isElectron = window.electron ? true : false
const getIframeSrc = () => {
  iframeSrcURL.value = window.electron ? window.electron.generateStreamUrl(key.value) : undefined
}

console.log(isElectron)
</script>
<template>
  <main class="w-full h-full flex justify-center items-center p-5">
    <div v-if="isElectron" class="bg-white w-full h-full rounded-sm border border-zinc-300">
      <div class="w-full p-5 text-charcoal flex justify-between">
        <h2 class="text-2xl">{{ 'Video Viewer' }}</h2>
        <!-- TODO: create add new button -->
      </div>
      <hr class="mx-5 text-zinc-300" />
      <div class="w-full h-full flex justify-center items-center p-5">
        <input v-if="!key" type="text" @change="loadVideo" class="border w-1/2 h-8 p-2" />
        <iframe
          v-else
          :src="iframeSrcURL"
          frameborder="0"
          class="border-10 w-190 h-120 border-saphire-200/50 opacity-100 shadow-2xl shadow-zinc-800 bg-zinc-800/80 z-50"
        ></iframe>
      </div>
    </div>
    <div v-else>
      <p>Video streaming is only available in our native app.</p>
      <p>please download to view your secure stream.</p>
    </div>
  </main>
</template>
