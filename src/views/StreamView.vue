<script setup lang="ts">
import { ref, type Ref } from 'vue'

// imprt stream here
const url: Ref<string | undefined> = ref(undefined)
const loadVideo = (event: Event) => {
  url.value = event.target!.value
}
const iframeSrc = `https://iframe.mediadelivery.net/embed/402767/01e24fcd-6c50-496b-a421-e8094167aaab?autoplay=true`
</script>
<template>
  <main class="w-full h-full flex justify-center items-center p-5">
    <div class="bg-white w-full h-full rounded-sm border border-zinc-300">
      <div class="w-full p-5 text-charcoal flex justify-between">
        <h2 class="text-2xl">{{ 'Video Viewer' }}</h2>
        <!-- TODO: create add new button -->
      </div>
      <hr class="mx-5 text-zinc-300" />
      <div class="w-full h-full flex justify-center items-center p-5">
        <input v-if="!url" type="text" @change="loadVideo" class="border w-1/2 h-8 p-2" />
        <iframe
          v-else
          :src="iframeSrc"
          frameborder="0"
          class="border w-200 h-106 border-saphire-200 opacity-100 bg-zinc-600/80"
        ></iframe>
      </div>
    </div>
  </main>
</template>
