<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/accounts-receivable" title="Accounts Receivable">
    <div class="p-5 flex-1 flex flex-col justify-between gap-5">
      <!-- Summary Stats Banner -->
       <UCard variant="soft" class="bg-linear-to-r from-primary to-primary-800"
       :ui="{ body: 'flex items-center justify-around sm:p-4' }">
          <div
            v-for="stat in summaryStats"
            :key="stat.label"
            class="flex flex-col items-center justify-center px-2"
          >
            <span class="text-xl font-mono font-bold tracking-tight leading-none text-white">
              {{ stat.value }}
            </span>
            <span class="text-[11px] text-white/80 mt-1.5">
              {{ stat.label }}
            </span>
          </div>
       </UCard>

      <!-- Collections Table using UTable -->
      <UTable
        :data="collections"
        :columns="columns"
        :ui="tableUi"
      />
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface SummaryStat {
  value: string
  label: string
}

interface CollectionItem {
  orNo: string
  customer: string
  amount: string
  status: string
}

const summaryStats: SummaryStat[] = [
  { value: '₱4.2M', label: 'Invoiced' },
  { value: '₱3.1M', label: 'Collected' },
  { value: '₱1.1M', label: 'Open' }
]

const tableUi = {
  root: 'overflow-x-auto border-t border-default/60',
  th: 'py-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-3 text-[12.5px] px-3 first:ps-0 last:pe-0 border-b border-default/60'
}

const columns: TableColumn<CollectionItem>[] = [
  {
    accessorKey: 'orNo',
    header: 'OR NO.',
    meta: { class: { td: 'font-mono text-[12px] font-medium text-highlighted' } }
  },
  {
    accessorKey: 'customer',
    header: 'CUSTOMER',
    meta: { class: { td: 'text-highlighted font-medium' } }
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT',
    meta: { class: { td: 'font-mono text-highlighted' } }
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    meta: { class: { td: 'text-muted' } }
  }
]

const collections: CollectionItem[] = [
  { orNo: 'OR000002', customer: 'Bem Corp', amount: '80,000', status: 'Applied' },
  { orNo: 'OR000003', customer: 'Edwin Co', amount: '78,100', status: 'Partial' },
  { orNo: 'OR000004', customer: 'APL', amount: '25,000', status: 'Open' }
]
</script>
