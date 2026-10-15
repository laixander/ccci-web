<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/budget-vs-actual">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center shadow-2xs">
            <span class="text-white font-bold text-[13px] leading-none">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Budget vs. Actual</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between gap-5">
        <!-- Section Title & Meta -->
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-highlighted">
            8900C · G&A Admin
          </h3>
          <UBadge
            label="FY 2022"
            color="neutral"
            variant="outline"
            size="sm"
            class="font-mono text-[11px] text-muted px-2.5 rounded-md"
          />
        </div>

        <!-- Budget Lines Progress Bars -->
        <div
          v-if="budgetLines?.length"
          class="flex flex-col gap-3.5"
        >
          <div
            v-for="item in budgetLines"
            :key="item.label"
            class="flex items-center gap-4"
          >
            <span class="font-mono text-[12px] text-muted w-28 shrink-0">
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
        <div
          v-if="summaryCards?.length"
          class="grid grid-cols-3 gap-3.5 pt-1"
        >
          <UCard
            v-for="stat in summaryCards"
            :key="stat.label"
            variant="outline"
            :ui="{ body: 'p-3 sm:p-3.5 flex flex-col items-center justify-center gap-1' }"
            class="rounded-xl shadow-xs"
          >
            <span class="text-[11px] font-mono text-muted">
              {{ stat.label }}
            </span>
            <span class="text-base sm:text-[17px] font-bold font-mono text-highlighted tracking-tight leading-none">
              {{ stat.value }}
            </span>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface BudgetLine {
  label: string
  value: number
  color: 'success' | 'warning' | 'info' | 'purple'
}

interface SummaryCard {
  label: string
  value: string
}

const budgetLines: BudgetLine[] = [
  { label: 'Salaries', value: 88, color: 'success' },
  { label: 'Materials', value: 68, color: 'warning' },
  { label: 'Contractors', value: 54, color: 'info' },
  { label: '13th month', value: 38, color: 'purple' }
]

const summaryCards: SummaryCard[] = [
  { label: 'Budget', value: '₱1.2M' },
  { label: 'Actual', value: '₱0.9M' },
  { label: 'Variance', value: '₱0.3M' }
]
</script>
