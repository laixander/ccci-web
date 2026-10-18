<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/budget-scenarios" title="Budget Scenario B">
    <div class="p-5 flex-1 flex flex-col justify-between gap-5">
      <!-- Section heading row -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[14px] text-highlighted">Cost breakdown</span>
        <UButton
          label="Scenario B"
          trailing-icon="i-lucide-chevron-down"
          size="xs"
          color="neutral"
          variant="outline"
          class="rounded-lg text-[11px] font-medium"
        />
      </div>

      <!-- Progress breakdown bars -->
      <div v-if="breakdown?.length" class="flex flex-col gap-3.5">
        <div
          v-for="item in breakdown"
          :key="item.label"
          class="flex items-center gap-4"
        >
          <span class="text-[11.5px] font-mono text-muted w-28 truncate">
            {{ item.label }}
          </span>
          <UProgress
            :model-value="item.value"
            :color="item.color"
            size="md"
            class="flex-1"
          />
        </div>
      </div>

      <!-- Summary Stat Cards -->
      <div v-if="summaryCards?.length" class="grid grid-cols-3 gap-3.5 pt-1">
        <UCard
          v-for="stat in summaryCards"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-3 sm:p-3.5 flex flex-col items-center justify-center gap-1' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[10px] font-mono font-semibold uppercase text-muted tracking-wider">
            {{ stat.label }}
          </span>
          <span class="text-[16px] font-black text-highlighted tracking-tight leading-none">
            {{ stat.value }}
          </span>
        </UCard>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface CostItem {
  label: string
  value: number
  color: 'indigo' | 'primary' | 'warning' | 'purple' | 'error'
}

interface SummaryCard {
  label: string
  value: string
}

const breakdown: CostItem[] = [
  { label: 'Capital Outl...', value: 78, color: 'indigo' },
  { label: 'MOOE', value: 58, color: 'primary' },
  { label: 'Supplies', value: 34, color: 'warning' },
]

const summaryCards: SummaryCard[] = [
  { label: 'MOOE', value: '₱3.1M' },
  { label: 'Capital', value: '₱8.4M' },
  { label: 'Total', value: '₱11.5M' },
]
</script>