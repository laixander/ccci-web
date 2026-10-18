<template>
  <MockupBrowserFrame url="app.peoplecore.io/performance" title="PCR — Ratee">
    <div class="p-5 flex-1 flex flex-col gap-5">
      <!-- Tabs -->
      <div class="flex items-center gap-2">
        <UButton label="Template" color="neutral" variant="outline" size="md" class="rounded-full px-4" />
        <UButton label="Request" color="neutral" variant="outline" size="md" class="rounded-full px-4" />
        <UButton label="Ratee" color="primary" variant="solid" size="md" class="rounded-full px-5" />
      </div>

      <!-- PCR Grid -->
      <div class="grid grid-cols-2 gap-4">
        <UCard
          v-for="pcr in pcrs"
          :key="pcr.title"
          variant="outline"
          :ui="{ body: 'sm:p-4 flex flex-col gap-3' }"
          class="rounded-xl shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-[13px] text-highlighted">{{ pcr.title }}</span>
            <UBadge :label="pcr.status" color="primary" variant="soft" size="xs" class="font-semibold px-2" />
          </div>
          <span class="text-[11px] text-muted font-mono">{{ pcr.date }}</span>
          <UProgress :model-value="pcr.progress" color="rose" />
        </UCard>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const pcrs = [
  { title: 'OPCR FMT',       status: 'Status', date: 'Oct 21 - Oct 21, 2024', progress: 30 },
  { title: 'IPCR Immediate', status: 'Status', date: 'Oct 21 - Oct 21, 2024', progress: 45 },
  { title: 'DPCR Immediate', status: 'Status', date: 'Oct 21 - Oct 21, 2024', progress: 65 },
  { title: 'DPCR Immediate', status: 'Status', date: 'Oct 21 - Oct 21, 2024', progress: 80 },
]
</script>
