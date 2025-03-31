<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import Modal from '@/components/layoutComponents/Modal.vue'
import CollectionCard from '@/components/streamComponents/CollectionCard.vue'
import VideoCard from '@/components/streamComponents/VideoCard.vue'
import FileInput from '@/components/toolComponents/FileInput.vue'
import bunnyStream from '@/service/bunnyService'
import { useNotificationStore } from '@/stores/notificationStore'
import { ref, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'

type Collection = {
  videoLibraryId: number
  guid: string
  name: string
  videoCount: number
  totalSize: number
  previewVideoIds: null
  previewImageUrls: string[]
}

type videoData = {
  title: string
  views: number
  guid: string
  dateUploaded: string
}
const route = useRoute()

const collectionData: Ref<Collection | undefined> = ref(undefined)
const videosData: Ref<videoData[]> = ref([])
const isPending: Ref<boolean> = ref(false)
const collectionId: string = route.params.collectionId as string
const isOpen: Ref<boolean> = ref(false)
const notifications = useNotificationStore()
onMounted(() => {
  bunnyStream.getCollection(collectionId).then((res) => {
    collectionData.value = res
  })
  bunnyStream.getCollectionVideos(collectionId).then((res) => {
    videosData.value.push(...res.items)
  })
  console.log(videosData)
})

const uploadFile = async (file: File | undefined) => {
  // TODO: add validation
  try {
    isPending.value = true
    await bunnyStream.uploadVideo(file!.name, file!, collectionId)
    notifications.addNotification({
      message: 'Upload Sucessful',
      status: 'success',
      autoClear: true,
    })
  } catch (error) {
    console.log(error)
    notifications.addNotification({
      message: 'Failed to upload file.',
      status: 'error',
      autoClear: true,
    })
    isPending.value = false
    toggleOpen()
  }
}
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <main class="w-full h-full flex justify-center items-center p-5">
    <div class="bg-white w-full h-full rounded-sm border border-zinc-300">
      <div class="w-full p-5 text-charcoal flex justify-between">
        <h2 class="text-2xl">{{ collectionData?.name || 'Video Collection' }}</h2>
        <!-- TODO: create add new button -->
        <PrimaryButton
          @click="toggleOpen"
          class="border border-zinc-300 py-2 px-4 hover:cursor-pointer"
        >
          Upload Video
        </PrimaryButton>
      </div>
      <hr class="mx-5 text-zinc-300" />
      <div class="flex flex-wrap p-5">
        <VideoCard
          v-for="video in videosData"
          :title="video.title"
          :guid="video.guid"
          :views="video.views"
        />
      </div>
    </div>
  </main>
  <Modal v-if="isOpen">
    <template #content>
      <FileInput
        title="Upload to Stream"
        :isPending="isPending"
        buttonText="Upload"
        :processFile="uploadFile"
        message="Select a file to Upload to our secure streaming service."
      /> </template
  ></Modal>
</template>
