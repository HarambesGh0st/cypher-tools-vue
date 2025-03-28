<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'

const notificationsStore = useNotificationStore()
const props = defineProps<{
  message: string
  status: string
  autoClear: boolean
  index: number
}>()

if (props.autoClear) {
  setTimeout(() => notificationsStore.removeNotification(props.index), 6000)
}

const getNotificationClass = (status: string) => {
  return {
    success: 'bg-gradient-to-r from-saphire-200 to-saphire-100 border-saphire-200',
    error: 'bg-gradient-to-r from-red-500 to-red-400 border-red-500',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-400 border-amber-500',
  }[status]
}
</script>
<template>
  <div
    class="flex justify-between items-center px-6 py-1 w-full border-2 text-paper text-lg rounded-sm shadow-lg m-1"
    :class="getNotificationClass(status)"
  >
    <p class="flex justify-center items-center">
      {{ message }}
    </p>
    <button class="hover:cursor-pointer p-1" @click="notificationsStore.removeNotification(index)">
      X
    </button>
  </div>
</template>
