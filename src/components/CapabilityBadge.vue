<script setup>
defineProps({
  active: { type: Boolean, default: false },
  label: { type: String, required: true },
  color: { type: String, default: 'primary' },
})

const colorMap = {
  primary: { dot: 'bg-primary-100', text: 'text-primary-100' },
  secondary: { dot: 'bg-secondary-100', text: 'text-secondary-100' },
  tertiary: { dot: 'bg-tertiary-100', text: 'text-tertiary-100' },
  informative: { dot: 'bg-informative-100', text: 'text-informative-100' },
  positive: { dot: 'bg-positive-100', text: 'text-positive-100' },
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs"
    :class="active ? 'bg-basic-300' : 'bg-basic-300/50 opacity-40'"
  >
    <span
      class="inline-block h-1.5 w-1.5 rounded-full"
      :class="active ? (colorMap[color]?.dot || 'bg-primary-100') : 'bg-basic-600'"
    />
    <span :class="active ? (colorMap[color]?.text || 'text-primary-100') : 'text-basic-600'">
      {{ label }}
    </span>
  </span>
</template>
