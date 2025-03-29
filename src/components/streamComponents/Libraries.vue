<script setup lang="ts">
import bunnyStream from '@/service/bunnyService'
const getLibraries = async () => {
  await bunnyStream.getLibrary()
}
</script>
<template>
  <main class="w-full h-full felx justify-center items-center p-10">
    <!--  add stream tool here -->
  </main>
</template>
