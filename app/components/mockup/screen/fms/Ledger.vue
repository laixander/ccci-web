<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/trial-balance" title="Trial Balance" :floating-tags="floatingTags">
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
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'
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

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'balanced',
    title: 'Trial Balanced',
    subtitle: '₱6,012,000 = ₱6,012,000',
    icon: 'i-lucide-scale',
    color: 'success',
    badge: { label: 'BALANCED', color: 'success' }
  },
  {
    id: 'total-debits',
    title: 'Total Debits',
    subtitle: '₱6,012,000 Posted',
    icon: 'i-lucide-arrow-up-right',
    color: 'primary',
    pulse: true
  },
  {
    id: 'accounts',
    title: '5 Accounts',
    subtitle: 'Cash · Revenue · Expenses',
    icon: 'i-lucide-book-open',
    color: 'info',
    badge: { label: '5 ACCTS', color: 'info' }
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
