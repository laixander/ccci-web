<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/summary-of-investments">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Summary of Investments</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between gap-5">
        <!-- Summary of Investments Table using UTable -->
        <UTable
          :data="investments"
          :columns="columns"
          :ui="{
            root: 'overflow-x-auto',
            th: 'pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default',
            td: 'py-2.5 text-[12px] text-highlighted px-3 first:ps-0 last:pe-0 border-b border-default/60',
          }"
        >
          <template #system-cell="{ row }">
            <span class="font-mono text-[11.5px] text-highlighted">
              {{ row.original.system }}
            </span>
          </template>
        </UTable>

        <!-- Grand Total Banner -->
        <UCard variant="soft" class="bg-gradient-to-r from-primary-600 to-primary-900 text-white rounded-xl" :ui="{ body: 'sm:p-4' }">
            <div class="flex items-center justify-between">
                <span class="font-mono text-[11px] font-semibold tracking-wider uppercase text-white/85">
                    GRAND TOTAL
                </span>
                <span class="font-bold font-mono text-lg tracking-tight leading-none text-white">
                    ₱12.4M
                </span>
            </div>
        </UCard>
        

        <!-- Export Action Buttons -->
        <div class="flex items-center gap-2.5">
          <UButton
            label="Export XLSX"
            color="neutral"
            variant="outline"
            size="sm"
            class="font-mono"
          />
          <UButton
            label="Export CSV"
            color="neutral"
            variant="outline"
            size="sm"
            class="font-mono"
          />
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface InvestmentItem {
  system: string
  mooe: string
  capital: string
  total: string
}

const columns: TableColumn<InvestmentItem>[] = [
  { accessorKey: 'system', header: 'SYSTEM' },
  { accessorKey: 'mooe', header: 'MOOE' },
  { accessorKey: 'capital', header: 'CAPITAL' },
  { accessorKey: 'total', header: 'TOTAL' },
]

const investments: InvestmentItem[] = [
  { system: 'SIS', mooe: '0.6M', capital: '3.6M', total: '4.2M' },
  { system: 'Library', mooe: '0.4M', capital: '1.7M', total: '2.1M' },
  { system: 'HR', mooe: '0.5M', capital: '1.3M', total: '1.8M' },
]
</script>