<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMuninStore } from '../stores/munin'
import ConfigEntryRow from '../components/ConfigEntryRow.vue'

const munin = useMuninStore()
const search = ref('')
const showCreate = ref(false)
const newEntry = ref({ key: '', value: '', is_public: false, description: '' })
const createError = ref(null)

onMounted(() => {
  munin.fetchConfigEntries()
})

const filtered = computed(() => {
  if (!search.value) return munin.configEntries
  const q = search.value.toLowerCase()
  return munin.configEntries.filter(
    (e) => e.key.toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q),
  )
})

async function handleCreate() {
  createError.value = null
  try {
    await munin.createConfigEntry(newEntry.value)
    newEntry.value = { key: '', value: '', is_public: false, description: '' }
    showCreate.value = false
  } catch (err) {
    createError.value = err.response?.data?.message || 'Failed to create entry'
  }
}

async function handleDelete(key) {
  if (!confirm('Delete this config entry?')) return
  await munin.deleteConfigEntry(key)
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-light text-basic-950">Config Entries</h1>
      <button
        class="rounded-lg border border-tertiary-200 bg-transparent px-4 py-2 text-sm text-basic-800 hover:border-tertiary-100 hover:bg-basic-200 hover:text-basic-900"
        @click="showCreate = !showCreate"
      >
        {{ showCreate ? 'Cancel' : 'New entry' }}
      </button>
    </div>

    <!-- Create form -->
    <div v-if="showCreate" class="mb-6 rounded-lg border border-basic-400 bg-basic-200 p-5">
      <div v-if="createError" class="mb-4 rounded border border-negative-200 bg-negative-200/30 px-4 py-2 text-sm text-negative-100">
        {{ createError }}
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1 block text-sm text-basic-800">Key</label>
          <input
            v-model="newEntry.key"
            class="h-10 w-full rounded border border-basic-700 bg-basic-300 px-3 text-sm text-basic-900 focus:border-primary-100 focus:outline-none"
            placeholder="MODULE_SETTING_KEY"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm text-basic-800">Value</label>
          <input
            v-model="newEntry.value"
            class="h-10 w-full rounded border border-basic-700 bg-basic-300 px-3 text-sm text-basic-900 focus:border-primary-100 focus:outline-none"
            placeholder="value"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm text-basic-800">Description</label>
          <input
            v-model="newEntry.description"
            class="h-10 w-full rounded border border-basic-700 bg-basic-300 px-3 text-sm text-basic-900 focus:border-primary-100 focus:outline-none"
            placeholder="What this setting does"
          />
        </div>
        <div class="flex items-end gap-4">
          <label class="flex items-center gap-2 text-sm text-basic-800">
            <input v-model="newEntry.is_public" type="checkbox" class="accent-primary-100" />
            Public
          </label>
          <button
            :disabled="!newEntry.key"
            class="ml-auto rounded-lg bg-primary-gradient px-6 py-2 text-sm text-basic-950 hover:opacity-90 disabled:opacity-50"
            @click="handleCreate"
          >
            Create
          </button>
        </div>
      </div>
    </div>

    <!-- Search -->
    <input
      v-model="search"
      class="mb-4 h-10 w-full max-w-sm rounded border border-basic-700 bg-basic-300 px-3 text-sm text-basic-900 placeholder:text-basic-600 focus:border-primary-100 focus:outline-none"
      placeholder="Filter by key or description..."
    />

    <!-- Table -->
    <div v-if="munin.loading" class="py-16 text-center text-basic-700">Loading...</div>

    <div v-else-if="!filtered.length" class="py-16 text-center text-basic-700">
      {{ search ? 'No matching entries' : 'No config entries yet' }}
    </div>

    <div v-else class="overflow-hidden rounded-lg border border-basic-400">
      <!-- Header -->
      <div class="grid grid-cols-[1fr_1fr_80px_1fr_60px] gap-4 border-b border-basic-400 bg-basic-300 px-5 py-2 text-xs uppercase tracking-wider text-basic-700">
        <span>Key</span>
        <span>Value</span>
        <span>Public</span>
        <span>Description</span>
        <span></span>
      </div>
      <!-- Rows -->
      <ConfigEntryRow
        v-for="entry in filtered"
        :key="entry.key"
        :entry="entry"
        @delete="handleDelete(entry.key)"
      />
    </div>
  </div>
</template>
