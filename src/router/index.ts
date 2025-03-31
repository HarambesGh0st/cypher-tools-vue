import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EncryptView from '../views/EncryptView.vue'
import DecryptView from '@/views/DecryptView.vue'
import StreamView from '@/views/StreamView.vue'
import StreamLibrariesView from '@/views/stream/CollectionsView.vue'
import StreamVideoView from '@/views/StreamVideoView.vue'
import StreamLibraryView from '@/views/stream/CollectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/encrypt',
      name: 'encrypt',
      component: EncryptView,
    },
    { path: '/decrypt', name: 'decrypt', component: DecryptView },
    {
      path: '/stream',
      name: 'stream',
      component: StreamLibrariesView,
    },
    {
      path: '/stream/collections/:collectionId',
      name: 'collection',
      component: StreamLibraryView,
    },
    {
      path: '/stream/collections/:collectionId/video/:videoId',
      name: 'video',
      component: StreamVideoView,
    },
    {
      path: '/stream/view',
      name: 'view',
      component: StreamView,
    },

    // { path: '/keygen', name: 'keygen', component: () => import('../views/AboutView.vue') },
    // { path: '/pricing', name: 'pricing', component: () => import('../views/AboutView.vue') },
    // { path: '/book-demo', name: 'book-demo', component: () => import('../views/AboutView.vue') },
  ],
})

export default router
