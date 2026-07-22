<script setup>
import { useRouter } from 'vue-router'
import CapabilityBadge from './CapabilityBadge.vue'

const props = defineProps({
  module: { type: Object, required: true },
})

const router = useRouter()

const capabilities = [
  { key: 'has_api', label: 'API', color: 'primary' },
  { key: 'has_channels', label: 'Channels', color: 'secondary' },
  { key: 'has_admin', label: 'Admin', color: 'tertiary' },
  { key: 'has_models', label: 'Models', color: 'informative' },
  { key: 'has_urls', label: 'URLs', color: 'positive' },
]
</script>

<template>
  <div
    class="cursor-pointer rounded-lg border border-basic-400 bg-basic-200 p-5 transition-colors hover:border-primary-100/40"
    @click="router.push(`/modules/${module.key}`)"
  >
    <div class="mb-3 flex items-start justify-between">
      <h3 class="text-sm font-normal text-basic-950">{{ module.label || module.key }}</h3>
      <span v-if="module.version" class="ml-2 shrink-0 rounded bg-basic-300 px-1.5 py-0.5 text-xs text-basic-700">
        {{ module.version }}
      </span>
    </div>

    <p class="mb-4 text-xs text-basic-700">{{ module.app_label }}</p>

    <div class="flex flex-wrap gap-1.5">
      <CapabilityBadge
        v-for="cap in capabilities"
        :key="cap.key"
        :active="!!module[cap.key]"
        :label="cap.label"
        :color="cap.color"
      />
    </div>
  </div>
</template>
