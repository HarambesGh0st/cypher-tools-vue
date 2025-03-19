<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const links = [
  { path: '/', text: 'Home' },
  { path: '/encrypt', text: 'Encrypt' },
  { path: '/decrypt', text: 'Decrypt' },
  { path: '/keygen', text: 'Key Generator' },
  { path: '/pricing', text: 'Pricing' },
  { path: '/book-demo', text: 'Book a Demo' },
]
</script>

<template>
  <main class="w-dvw h-dvh flex">
    <div
      class="h-full min-w-64 border-r-2 border-r-purple-500 text-purple-950 bg-zinc-50 shadow-zinc-800 shadow-md"
    >
      <div
        class="w-full bg-gradient-to-r from-purple-700 to-cyan-500 bg-clip-text flex justify-center"
      >
        <h1 class="text-3xl font-bold text-transparent">Cypher-Tools</h1>
      </div>
      <nav class="flex flex-col justify-around h-1/2 w-full pt-5">
        <RouterLink
          class="h-12 flex items-center hover:bg-purple-200 pl-2 uppercase"
          activeClass="bg-purple-400 text-white hover:bg-purple-500"
          v-for="link in links"
          :to="{ path: link.path }"
          :key="link.path"
        >
          {{ link.text }}
        </RouterLink>
      </nav>
    </div>
    <div class="p-10 w-3/4">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
