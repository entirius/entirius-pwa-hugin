<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMuninStore } from '../stores/munin'
import CapabilityBadge from '../components/CapabilityBadge.vue'

const route = useRoute()
const router = useRouter()
const munin = useMuninStore()

onMounted(() => {
  if (!munin.modules.length) munin.fetchModules()
})

const mod = computed(() => munin.getModule(route.params.key))

const autoFields = computed(() => {
  if (!mod.value) return []
  return [
    { label: 'Key', value: mod.value.key },
    { label: 'App Label', value: mod.value.app_label },
    { label: 'Version', value: mod.value.version },
    { label: 'Has API', value: mod.value.has_api },
    { label: 'Has Admin', value: mod.value.has_admin },
    { label: 'Has Channels', value: mod.value.has_channels },
    { label: 'Has Models', value: mod.value.has_models },
    { label: 'Has URLs', value: mod.value.has_urls },
    { label: 'Has Fixtures', value: mod.value.has_fixtures },
    { label: 'Has Management Commands', value: mod.value.has_management_commands },
  ].filter((f) => f.value !== undefined && f.value !== null)
})

const adminFields = computed(() => {
  if (!mod.value) return []
  return [
    { label: 'Display Label', value: mod.value.label, key: 'label' },
    { label: 'Display Order', value: mod.value.display_order, key: 'display_order' },
    { label: 'Enabled in CMS', value: mod.value.enabled_in_cms, key: 'enabled_in_cms' },
  ].filter((f) => f.value !== undefined)
})

function formatValue(val) {
  if (typeof val === 'boolean') return val ? 'Yes' : 'No'
  if (val === null || val === undefined) return '-'
  return String(val)
}
</script>

<template>
  <div>
    <button
      class="mb-6 inline-flex items-center gap-2 text-sm text-basic-700 hover:text-basic-900"
      @click="router.push('/')"
    >
      <span class="text-lg leading-none">&larr;</span> Back to modules
    </button>

    <div v-if="!mod && !munin.loading" class="py-16 text-center text-basic-700">
      Module "{{ route.params.key }}" not found.
    </div>

    <div v-else-if="munin.loading" class="py-16 text-center text-basic-700">Loading...</div>

    <template v-else>
      <div class="mb-8 flex items-center gap-4">
        <h1 class="text-2xl font-light text-basic-950">{{ mod.label || mod.key }}</h1>
        <span class="rounded bg-basic-300 px-2 py-0.5 text-xs text-basic-700">{{ mod.version || 'n/a' }}</span>
      </div>

      <!-- Auto-detected fields -->
      <section class="mb-8">
        <h2 class="mb-4 text-sm font-normal uppercase tracking-wider text-basic-600">Auto-detected</h2>
        <div class="rounded-lg border border-basic-400 bg-basic-200">
          <div
            v-for="(field, i) in autoFields"
            :key="field.label"
            class="flex items-center justify-between border-b border-basic-400 px-5 py-3 last:border-0"
          >
            <span class="text-sm text-basic-800">{{ field.label }}</span>
            <CapabilityBadge v-if="typeof field.value === 'boolean'" :active="field.value" :label="field.value ? 'Yes' : 'No'" />
            <span v-else class="text-sm text-basic-900">{{ formatValue(field.value) }}</span>
          </div>
        </div>
      </section>

      <!-- Admin-controlled fields -->
      <section v-if="adminFields.length">
        <h2 class="mb-4 text-sm font-normal uppercase tracking-wider text-basic-600">Admin-controlled</h2>
        <div class="rounded-lg border border-basic-400 bg-basic-200">
          <div
            v-for="field in adminFields"
            :key="field.key"
            class="flex items-center justify-between border-b border-basic-400 px-5 py-3 last:border-0"
          >
            <span class="text-sm text-basic-800">{{ field.label }}</span>
            <span class="text-sm text-basic-900">{{ formatValue(field.value) }}</span>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
