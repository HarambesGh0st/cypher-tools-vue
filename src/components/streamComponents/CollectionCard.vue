<script setup lang="ts">
import router from '@/router'
import PrimaryButton from '../buttons/PrimaryButton.vue'

defineProps<{
  name: string
  guid: string
  videoCount: number
}>()
const imageUrl = ''
</script>
<template>
  <div class="flex flex-col items-center w-75 h-50 border-2 border-zinc-400 m-2.5 rounded-sm">
    <div
      class="w-full h-2/5 bg-gradient-to-r from-saphire-300 to-saphire-100 flex justify-center items-center text-paper"
    >
      <h3 class="text-xl py-2.5">{{ name }}</h3>
    </div>
    <div class="flex flex-col w-full p-2.5 text-lg">
      <p>Video count: {{ videoCount }}</p>
    </div>
    <div class="mt-auto w-full p-2.5 flex justify-end space-x-1.5">
      <PrimaryButton @click="router.push({ path: `/stream/collections/${guid}` })"
        >Manage</PrimaryButton
      >
      <!-- TODO: create delete button component -->
      <button class="bg-red-400 border border-red-500 py-2 px-4 text-paper hover:cursor-pointer">
        Delete
      </button>
    </div>
  </div>
</template>
