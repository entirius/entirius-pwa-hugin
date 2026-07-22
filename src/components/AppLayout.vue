<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useMuninStore } from '../stores/munin'

const auth = useAuthStore()
const munin = useMuninStore()
const router = useRouter()
const route = useRoute()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-basic-100">
    <!-- Header -->
    <header class="flex h-14 shrink-0 items-center justify-between border-b border-basic-400 bg-basic-200 px-6">
      <div class="flex items-center gap-6">
        <router-link to="/" class="linear-text text-2xl font-extralight tracking-wide hover:opacity-80">
          Hugin
        </router-link>
        <span v-if="munin.platformVersion" class="text-xs text-basic-600">
          v{{ munin.platformVersion }}
        </span>
      </div>
      <div class="flex items-center gap-4">
        <router-link
          to="/config"
          class="text-sm transition-colors"
          :class="route.path === '/config' ? 'text-primary-100' : 'text-basic-700 hover:text-basic-900'"
        >
          Config
        </router-link>
        <span class="text-basic-500">|</span>
        <button
          class="text-sm text-basic-700 hover:text-basic-900"
          @click="handleLogout"
        >
          Sign out
        </button>
      </div>
    </header>
    <!-- Content -->
    <main class="flex-1 overflow-y-auto p-6 lg:px-10 lg:py-8">
      <slot />
    </main>
  </div>
</template>
