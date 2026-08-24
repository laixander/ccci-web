<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'General Ledger'
})

const entries = [
  { id: 'JE-1045', date: '2026-08-24', account: '1010 - Cash in Bank', description: 'Client Invoice Payment IN-2026-084', debit: '₱125,000', credit: '-', status: 'Posted' },
  { id: 'JE-1045', date: '2026-08-24', account: '1200 - Accounts Receivable', description: 'Client Invoice Payment IN-2026-084', debit: '-', credit: '₱125,000', status: 'Posted' },
  { id: 'JE-1046', date: '2026-08-23', account: '5100 - Office Supplies', description: 'Purchased printer toner', debit: '₱5,000', credit: '-', status: 'Draft' },
  { id: 'JE-1046', date: '2026-08-23', account: '2100 - Accounts Payable', description: 'Purchased printer toner', debit: '-', credit: '₱5,000', status: 'Draft' },
  { id: 'JE-1047', date: '2026-08-22', account: '6010 - Depreciation Expense', description: 'Monthly Depreciation - IT Equipment', debit: '₱12,500', credit: '-', status: 'Posted' },
]

const columns: TableColumn<typeof entries[0]>[] = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'id', header: 'Entry ID' },
  { accessorKey: 'account', header: 'Account' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'debit', header: 'Debit' },
  { accessorKey: 'credit', header: 'Credit' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">General Ledger</h1>
        <p class="text-muted mt-1">Manage journal entries and account balances.</p>
      </div>
      <UButton icon="i-lucide-plus" color="primary">New Journal Entry</UButton>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search entries, accounts..." class="w-full sm:max-w-sm" />
          <div class="flex gap-2 w-full sm:w-auto">
            <USelect :items="['All Status', 'Posted', 'Draft', 'Pending Approval']" class="w-full sm:w-40" />
          </div>
        </div>
      </template>
      <UTable :data="entries" :columns="columns">
        <template #account-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.account }}</span>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="row.original.status === 'Posted' ? 'success' : 'neutral'" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-edit" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
