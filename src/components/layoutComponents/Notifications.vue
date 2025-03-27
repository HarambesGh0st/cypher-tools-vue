<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'
import Notification from './Notification.vue'
const notificationsStore = useNotificationStore()
</script>

<template>
  <div class="z-50 fixed right-0 bottom-0 min-w-1/4 h-2/3 flex flex-col-reverse p-2">
    <div v-for="(notification, index) in notificationsStore.notifications">
      <Notification
        :message="notification.message"
        :status="notification.status"
        :autoClear="notification.autoClear"
        :index="index"
      />
    </div>
  </div>
</template>
