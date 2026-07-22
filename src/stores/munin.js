import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/client'

export const useMuninStore = defineStore('munin', () => {
  const modules = ref([])
  const configEntries = ref([])
  const platformVersion = ref('')
  const loading = ref(false)
  const error = ref(null)

  async function fetchModules() {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/api/munin/v2/')
      // Response is { platform: { version }, modules: { key: {...}, ... } }
      if (data.platform?.version) {
        platformVersion.value = data.platform.version
      }
      if (data.modules && typeof data.modules === 'object') {
        modules.value = Object.entries(data.modules).map(([key, mod]) => ({ key, ...mod }))
      } else {
        modules.value = data.results || []
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load modules'
    } finally {
      loading.value = false
    }
  }

  function getModule(key) {
    return modules.value.find((m) => m.key === key) || null
  }

  async function fetchConfigEntries() {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/api/munin/v2/admin/entries/')
      configEntries.value = data.results || data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load config'
    } finally {
      loading.value = false
    }
  }

  async function createConfigEntry(entry) {
    const { data } = await api.post('/api/munin/v2/admin/entries/', entry)
    configEntries.value.push(data)
    return data
  }

  async function updateConfigEntry(key, entry) {
    const { data } = await api.patch(`/api/munin/v2/admin/entries/${key}/`, entry)
    const idx = configEntries.value.findIndex((e) => e.key === key)
    if (idx !== -1) configEntries.value[idx] = data
    return data
  }

  async function deleteConfigEntry(key) {
    await api.delete(`/api/munin/v2/admin/entries/${key}/`)
    configEntries.value = configEntries.value.filter((e) => e.key !== key)
  }

  return {
    modules,
    configEntries,
    platformVersion,
    loading,
    error,
    fetchModules,
    getModule,
    fetchConfigEntries,
    createConfigEntry,
    updateConfigEntry,
    deleteConfigEntry,
  }
})
