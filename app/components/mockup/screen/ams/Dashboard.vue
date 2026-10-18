<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/dashboard" title="Dashboard">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header Row -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Today</h3>
          <p class="text-[11px] text-muted">3 assets need your attention</p>
        </div>
        <UBadge label="LIVE" variant="subtle" color="success" size="xs" class="font-mono font-bold" />
      </div>

      <!-- KPI Stat Cards -->
      <div class="grid grid-cols-2 gap-2.5">
        <UCard
          v-for="stat in stats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-3 sm:p-3 flex flex-col gap-0.5' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] text-muted uppercase tracking-widest font-bold">{{ stat.label }}</span>
          <span class="text-[20px] font-black text-highlighted leading-none tracking-tight">{{ stat.value }}</span>
          <span class="text-[9px] font-semibold text-muted">{{ stat.note }}</span>
        </UCard>
      </div>

      <!-- Needs Attention List -->
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Needs Attention</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">View all →</span>
        </div>
        <div v-if="items?.length" class="flex flex-col gap-2">
          <UCard
            v-for="item in items"
            :key="item.item"
            variant="outline"
            :ui="{ body: 'px-3.5 py-3 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UBadge
                :label="item.tag"
                :color="item.color"
                variant="subtle"
                size="xs"
                class="font-mono font-bold tracking-wider"
              />
              <span class="font-medium text-[12.5px] text-highlighted">{{ item.item }}</span>
            </div>
            <span class="text-[11px] font-mono text-muted">{{ item.status }}</span>
          </UCard>
        </div>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface StatCard {
  label: string
  value: string
  note: string
}

interface AttentionItem {
  tag: string
  item: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const stats: StatCard[] = [
  { label: 'Total Assets', value: '5,234', note: '+124 this month' },
  { label: 'Maintenance Due', value: '18', note: '3 critical' },
  { label: 'Awaiting Acceptance', value: '7', note: 'In transit' },
  { label: 'Low Inventory', value: '4', note: 'Below threshold' },
]

const items: AttentionItem[] = [
  { tag: 'For release', item: 'Server rack SRV-008 → Data Center', status: 'Now', color: 'info' },
  { tag: 'Maintenance', item: 'Printer PRN-001 due', status: '2h', color: 'warning' },
  { tag: 'Low stock', item: 'Toner below threshold', status: '5h', color: 'warning' },
  { tag: 'Reserved', item: 'Projector PRJ-014 · Aug 26', status: 'Booked', color: 'primary' },
]
</script>
