import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

type Notification = {
  message: string
  status: 'success' | 'error' | 'warning'
  autoClear: boolean
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications: Ref<Notification[]> = ref([
    // { message: 'success', status: 'success', autoClear: true },
    // { message: 'warning', status: 'warning', autoClear: false },
    // { message: 'error', status: 'error', autoClear: false },
  ])

  function addNotification(notification: Notification) {
    notifications.value.push(notification)
  }

  function removeNotification(index: number) {
    notifications.value = notifications.value.filter((_, i) => index !== i)
  }

  return { notifications, addNotification, removeNotification }
})
