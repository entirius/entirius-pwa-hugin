import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(sessionStorage.getItem('access_token') || null)
  const refreshToken = ref(sessionStorage.getItem('refresh_token') || null)
  const error = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(username, password) {
    loading.value = true
    error.value = null
    try {
      const { data } = await axios.post('/api/token/', { username, password })
      accessToken.value = data.access
      refreshToken.value = data.refresh
      sessionStorage.setItem('access_token', data.access)
      sessionStorage.setItem('refresh_token', data.refresh)
      return true
    } catch (err) {
      error.value = err.response?.data?.detail || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
  }

  return { accessToken, refreshToken, error, loading, isAuthenticated, login, logout }
})
