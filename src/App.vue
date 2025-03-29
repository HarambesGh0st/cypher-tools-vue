<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Notifications from '@/components/layoutComponents/Notifications.vue'
const links = [
  { path: '/', text: 'Home' },
  { path: '/encrypt', text: 'Encrypt' },
  { path: '/decrypt', text: 'Decrypt' },
  { path: '/stream', text: 'Stream' },
  // { path: '/keygen', text: 'Key Generator' },
  { path: '/pricing', text: 'Pricing' },
  { path: '/book-demo', text: 'Book a Demo' },
]
</script>

<template>
  <main class="w-dvw h-dvh flex bg-paper">
    <div
      class="h-full min-w-64 border-r-2 border-r-saphire-100 text-saphire-400 bg-zinc-50 shadow-zinc-800 shadow-md"
    >
      <div
        class="w-full bg-gradient-to-r from-saphire-500 to-saphire-100 bg-clip-text flex justify-center"
      >
        <h1 class="text-3xl font-bold text-transparent">Cypher-Tools</h1>
      </div>
      <nav class="flex flex-col justify-around h-1/2 w-full pt-5">
        <RouterLink
          class="h-12 flex items-center hover:bg-gradient-to-r from-saphire-300/80 to-saphire-100/80 hover:text-white pl-6 uppercase transition-all ease-in duration-300"
          activeClass="bg-gradient-to-r from-saphire-500 to-saphire-300 text-white  pl-2 border-l-4 border-l-saphire-100"
          v-for="link in links"
          :to="{ path: link.path }"
          :key="link.path"
        >
          {{ link.text }}
        </RouterLink>
      </nav>
    </div>
    <div class="p-10 w-full">
      <RouterView />
    </div>
    <Notifications />
  </main>
</template>

<style scoped></style>
