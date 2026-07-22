<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import AppLayout from './components/AppLayout.vue'

const auth = useAuthStore()
const isAuthenticated = computed(() => auth.isAuthenticated)
</script>

<template>
  <AppLayout v-if="isAuthenticated">
    <router-view />
  </AppLayout>
  <router-view v-else />
</template>
