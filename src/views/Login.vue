<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  const success = await auth.login(username.value, password.value)
  if (success) router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-basic-100 px-4">
    <form
      class="w-full max-w-sm rounded-lg border border-basic-400 bg-basic-200 p-8"
      @submit.prevent="handleLogin"
    >
      <h1 class="mb-2 text-center text-2xl font-light text-basic-950">Hugin</h1>
      <p class="mb-8 text-center text-sm text-basic-700">Superadmin Command Center</p>

      <div v-if="auth.error" class="mb-4 rounded border border-negative-200 bg-negative-200/30 px-4 py-2 text-sm text-negative-100">
        {{ auth.error }}
      </div>

      <label class="mb-1 block text-sm text-basic-800">Username</label>
      <input
        v-model="username"
        type="text"
        autocomplete="username"
        class="mb-4 h-[3.38rem] w-full rounded-lg border border-basic-700 bg-basic-300 px-4 text-sm font-light text-basic-900 placeholder:text-basic-600 focus:border-primary-100 focus:outline-none"
        placeholder="admin"
      />

      <label class="mb-1 block text-sm text-basic-800">Password</label>
      <input
        v-model="password"
        type="password"
        autocomplete="current-password"
        class="mb-6 h-[3.38rem] w-full rounded-lg border border-basic-700 bg-basic-300 px-4 text-sm font-light text-basic-900 placeholder:text-basic-600 focus:border-primary-100 focus:outline-none"
        placeholder="password"
      />

      <button
        type="submit"
        :disabled="auth.loading || !username || !password"
        class="w-full rounded-lg bg-primary-gradient px-6 py-3 text-sm font-light text-basic-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {{ auth.loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>
