<script setup>
import { computed, onMounted } from 'vue'
import { useMuninStore } from '../stores/munin'
import ModuleCard from '../components/ModuleCard.vue'

const munin = useMuninStore()

onMounted(() => {
  if (!munin.modules.length) munin.fetchModules()
})

const stats = computed(() => {
  const mods = munin.modules
  return {
    total: mods.length,
    withApi: mods.filter((m) => m.has_api).length,
    withChannels: mods.filter((m) => m.has_channels).length,
    withAdmin: mods.filter((m) => m.has_admin).length,
  }
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-extralight text-basic-950">Modules</h1>
      <p class="mt-2 text-sm text-basic-700">
        {{ stats.total }} installed
        <span class="mx-1.5 text-basic-500">/</span>
        {{ stats.withApi }} API
        <span class="mx-1.5 text-basic-500">/</span>
        {{ stats.withChannels }} channels
        <span class="mx-1.5 text-basic-500">/</span>
        {{ stats.withAdmin }} admin
      </p>
    </div>

    <div v-if="munin.loading" class="py-20 text-center text-basic-700">Loading modules...</div>

    <div v-else-if="munin.error" class="rounded-lg border border-negative-200 bg-negative-200/20 p-4 text-sm text-negative-100">
      {{ munin.error }}
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ModuleCard
        v-for="mod in munin.modules"
        :key="mod.key"
        :module="mod"
      />
    </div>
  </div>
</template>
