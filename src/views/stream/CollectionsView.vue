<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import CollectionCard from '@/components/streamComponents/CollectionCard.vue'
import bunnyStream from '@/service/bunnyService'
import { ref, onMounted, type Ref } from 'vue'

type Collection = {
  videoLibraryId: number
  guid: string
  name: string
  videoCount: number
  totalSize: number
  previewVideoIds: null
  previewImageUrls: string[]
}

const collections: Ref<Collection[]> = ref([])

onMounted(async () => {
  await bunnyStream.listCollections('402767').then((res) => {
    collections.value.push(...res.items)

    console.log(collections)
  })
})
</script>
<template>
  <main class="w-full h-full flex justify-center items-center p-5">
    <div class="bg-white w-full h-full rounded-sm border border-zinc-300">
      <div class="w-full p-5 text-charcoal flex justify-between">
        <h2 class="text-2xl">Video Collections</h2>
        <!-- TODO: create add new button -->
        <PrimaryButton class="border border-zinc-300 py-2 px-4 hover:cursor-pointer">
          Add Collection +
        </PrimaryButton>
      </div>
      <hr class="mx-5 text-zinc-300" />
      <div class="flex flex-wrap p-5">
        <CollectionCard
          v-for="collection in collections"
          :name="collection.name"
          :guid="collection.guid"
          :videoCount="collection.videoCount"
        />
      </div>
    </div>
  </main>
  <!-- TODO: create modal component for add collection form -->
</template>
