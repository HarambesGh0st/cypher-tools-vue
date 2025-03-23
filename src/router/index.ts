import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EncryptView from '../views/EncryptView.vue'
import DecryptView from '@/views/DecryptView.vue'

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
    { path: '/keygen', name: 'keygen', component: () => import('../views/AboutView.vue') },
    { path: '/pricing', name: 'pricing', component: () => import('../views/AboutView.vue') },
    { path: '/book-demo', name: 'book-demo', component: () => import('../views/AboutView.vue') },
  ],
})

export default router
