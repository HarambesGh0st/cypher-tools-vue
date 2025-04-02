<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import Modal from '@/components/layoutComponents/Modal.vue'
import VideoCard from '@/components/streamComponents/VideoCard.vue'
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
const viewersKey: Ref<string | undefined> = ref(undefined)
const notifications = useNotificationStore()
onMounted(() => {
  bunnyStream.getCollection(collectionId).then((res) => {
    collectionData.value = res
  })
  bunnyStream.getCollectionVideos(collectionId).then((res) => {
    videosData.value.push(...res.items)
  })
})

const selectedFile: Ref<File | undefined> = ref(undefined)

const uploadFile = async () => {
  // TODO: add validation
  try {
    isPending.value = true
    const res = await bunnyStream.uploadVideo(
      selectedFile.value!.name,
      selectedFile.value!,
      collectionId,
    )
    viewersKey.value = `402767.${res.videoId}` // hard coded library id for now until a user data base is implemented
    isPending.value = false
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

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0].type === 'video/mp4') {
    selectedFile.value = target.files[0]
  } else {
    notifications.addNotification({
      message: 'Selected file is not a video.',
      status: 'warning',
      autoClear: false,
    })
  }
}
const clearSelectedFile = () => {
  selectedFile.value = undefined
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
      <!-- <FileInput
        title="Upload to Stream"
        :isPending="isPending"
        buttonText="Upload"
        :processFile="uploadFile"
        message="Select a file to Upload to our secure streaming service."
        /> 
        -->
      <div
        class="bg-white w-1/2 h-1/2 border border-zinc-400 flex flex-col justify-center items-center"
      >
        <div v-if="!selectedFile" class="flex flex-col justify-center items-center space-y-2">
          <p>Select a file to upload to our stream service.</p>
          <input id="file-upload" type="file" @change="handleFileChange" class="hidden" />
          <label
            for="file-upload"
            class="bg-gradient-to-r from-saphire-300 to-saphire-100 text-white px-4 py-2 hover:cursor-pointer hover:bg-gradient-to-r hover:from-saphire-500 hover:to-saphire-300 transition-colors ease-in-out duration-300"
            >Upload</label
          >
          <!-- add change file function above -->
        </div>
        <div v-else-if="viewersKey && !isPending">
          <p>Send the key below to your recipient which will allow access to the stream.</p>
          <p>
            {{ viewersKey }}
          </p>
        </div>
        <div v-else-if="selectedFile && !isPending" class="flex flex-col space-y-2">
          <div class="flex space-x-2 w-full">
            <p class="h-8 border">{{ selectedFile.name }}</p>
            <button
              class="w-8 h-8 rounded-4xl p-2 border flex justify-center items-center"
              @click="clearSelectedFile"
            >
              X
            </button>
          </div>
          <PrimaryButton @click="uploadFile">Upload</PrimaryButton>
        </div>
      </div>
    </template></Modal
  >
</template>
