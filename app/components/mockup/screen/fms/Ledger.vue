<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/trial-balance">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center shadow-2xs">
            <span class="text-white font-bold text-[13px] leading-none">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Trial Balance</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between gap-5">
        <!-- Trial Balance Table using UTable -->
        <UTable
          :data="ledgerEntries"
          :columns="columns"
          :ui="tableUi"
        />

        <!-- Balanced Status Banner -->
        <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 sm:py-3.5 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-check"
              class="size-4 text-primary"
            />
            <span class="font-mono text-xs font-semibold text-primary tracking-wide">
              Balanced
            </span>
          </div>
          <span class="font-mono text-base font-bold text-primary tracking-tight">
            ₱6,012,000 = ₱6,012,000
          </span>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface LedgerItem {
  account: string
  debit: string
  credit: string
}

const tableUi = {
  root: 'overflow-x-auto',
  th: 'py-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-3 text-[12.5px] px-3 first:ps-0 last:pe-0 border-b border-default/60'
}

const columns: TableColumn<LedgerItem>[] = [
  {
    accessorKey: 'account',
    header: 'ACCOUNT',
    meta: { class: { td: 'text-highlighted font-medium' } }
  },
  {
    accessorKey: 'debit',
    header: 'DEBIT',
    meta: { class: { td: 'font-mono text-highlighted' } }
  },
  {
    accessorKey: 'credit',
    header: 'CREDIT',
    meta: { class: { td: 'font-mono text-highlighted' } }
  }
]

const ledgerEntries: LedgerItem[] = [
  { account: 'Cash', debit: '1,900,000', credit: '—' },
  { account: 'Receivables', debit: '1,100,000', credit: '—' },
  { account: 'Payables', debit: '—', credit: '812,000' },
  { account: 'Revenue', debit: '—', credit: '4,200,000' },
  { account: 'Expenses', debit: '3,012,000', credit: '—' }
]
</script>
