<script setup>
import { ref } from 'vue'
import { useMuninStore } from '../stores/munin'

const props = defineProps({
  entry: { type: Object, required: true },
})

const emit = defineEmits(['delete'])
const munin = useMuninStore()

const editing = ref(false)
const form = ref({ ...props.entry })
const saving = ref(false)

function startEdit() {
  form.value = { ...props.entry }
  editing.value = true
}

function cancelEdit() {
  editing.value = false
}

async function save() {
  saving.value = true
  try {
    await munin.updateConfigEntry(props.entry.key, {
      value: form.value.value,
      is_public: form.value.is_public,
      description: form.value.description,
    })
    editing.value = false
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <!-- Display mode -->
  <div
    v-if="!editing"
    class="grid grid-cols-[1fr_1fr_80px_1fr_60px] items-center gap-4 border-b border-basic-400 bg-basic-200 px-5 py-3 last:border-0 hover:bg-basic-300/50"
  >
    <span class="truncate text-sm text-primary-100">{{ entry.key }}</span>
    <span class="truncate text-sm text-basic-900">{{ entry.value }}</span>
    <span class="text-xs" :class="entry.is_public ? 'text-positive-100' : 'text-basic-600'">
      {{ entry.is_public ? 'Yes' : 'No' }}
    </span>
    <span class="truncate text-sm text-basic-700">{{ entry.description || '-' }}</span>
    <div class="flex gap-2">
      <button class="text-xs text-basic-700 hover:text-basic-900" @click="startEdit">Edit</button>
      <button class="text-xs text-negative-100 hover:text-negative-100/80" @click="emit('delete')">Del</button>
    </div>
  </div>

  <!-- Edit mode -->
  <div
    v-else
    class="grid grid-cols-[1fr_1fr_80px_1fr_60px] items-center gap-4 border-b border-primary-100/20 bg-basic-300 px-5 py-3"
  >
    <span class="truncate text-sm text-primary-100">{{ entry.key }}</span>
    <input
      v-model="form.value"
      class="h-8 rounded border border-basic-700 bg-basic-200 px-2 text-sm text-basic-900 focus:border-primary-100 focus:outline-none"
    />
    <label class="flex items-center">
      <input v-model="form.is_public" type="checkbox" class="accent-primary-100" />
    </label>
    <input
      v-model="form.description"
      class="h-8 rounded border border-basic-700 bg-basic-200 px-2 text-sm text-basic-900 focus:border-primary-100 focus:outline-none"
    />
    <div class="flex gap-2">
      <button :disabled="saving" class="text-xs text-primary-100 hover:text-primary-200" @click="save">
        {{ saving ? '...' : 'OK' }}
      </button>
      <button class="text-xs text-basic-700 hover:text-basic-900" @click="cancelEdit">X</button>
    </div>
  </div>
</template>
