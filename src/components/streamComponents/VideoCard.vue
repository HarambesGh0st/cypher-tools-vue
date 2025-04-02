<script setup lang="ts">
import router from '@/router'
import PrimaryButton from '../buttons/PrimaryButton.vue'

const props = defineProps<{
  title: string
  guid: string
  views: number
}>()
const viewKey = `40627.${props.guid}`
// const previewImageUrl = `https://vz-8620ecdf-5be.b-cdn.net/${props.guid}/thumbnail.jpg`
</script>
<template>
  <div
    class="flex flex-col items-center w-75 h-70 border-2 border-zinc-400 m-2.5 rounded-sm overflow-hidden"
  >
    <div
      class="w-75 h-2/5 bg-gradient-to-r from-saphire-300 to-saphire-100 flex justify-center items-center text-paper"
    >
      <!-- <image v-bind:src="previewImageUrl" class="w-full h-full" /> -->
      <h3 class="text-xl py-2.5 bg-zinc-900/50 overflow-ellipsis w-75">{{ title }}</h3>
    </div>
    <div class="flex flex-col w-full p-2.5 text-lg overflow-hidden">
      <p>Views: {{ views }}</p>
      <p>View Key: {{ viewKey }}</p>
    </div>
    <div class="mt-auto w-full p-2.5 flex justify-end space-x-1.5">
      <PrimaryButton @click="router.push({ name: `/stream/collections`, params: { guid } })"
        >Manage</PrimaryButton
      >
      <!-- TODO: create delete button component -->
      <button
        class="bg-red-500 py-2 px-4 text-paper hover:cursor-pointer hover:bg-red-700 hover:text-white transition-colors ease-in-out duration-300"
      >
        Delete
      </button>
    </div>
  </div>
</template>
