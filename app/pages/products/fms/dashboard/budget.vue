<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Budgeting'
})

const budgets = [
  { id: 1, department: 'IT Operations', allocated: 4500000, spent: 3200000, remaining: 1300000, utilization: 71 },
  { id: 2, department: 'Marketing', allocated: 2000000, spent: 1850000, remaining: 150000, utilization: 92 },
  { id: 3, department: 'Human Resources', allocated: 1500000, spent: 800000, remaining: 700000, utilization: 53 },
  { id: 4, department: 'Facilities', allocated: 3000000, spent: 2900000, remaining: 100000, utilization: 96 },
]

const columns: TableColumn<typeof budgets[0]>[] = [
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'allocated', header: 'Allocated Budget' },
  { accessorKey: 'spent', header: 'Actual Spend' },
  { accessorKey: 'remaining', header: 'Remaining' },
  { accessorKey: 'utilization', header: 'Utilization %' },
  { id: 'actions', header: '' }
]

const formatCurrency = (val: number) => `₱${val.toLocaleString()}`
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Budget & Forecasting</h1>
        <p class="text-muted mt-1">Track departmental budgets and spending.</p>
      </div>
      <UButton icon="i-lucide-pie-chart" color="primary">Create Budget</UButton>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-highlighted">FY 2026 Department Budgets</h3>
        </div>
      </template>
      <UTable :data="budgets" :columns="columns">
        <template #department-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.department }}</span>
        </template>
        <template #allocated-cell="{ row }">
          <span>{{ formatCurrency(row.original.allocated) }}</span>
        </template>
        <template #spent-cell="{ row }">
          <span>{{ formatCurrency(row.original.spent) }}</span>
        </template>
        <template #remaining-cell="{ row }">
          <span>{{ formatCurrency(row.original.remaining) }}</span>
        </template>
        <template #utilization-cell="{ row }">
          <div class="flex items-center gap-2">
            <UProgress :value="row.original.utilization" class="w-24" :color="row.original.utilization > 90 ? 'error' : 'primary'" />
            <span class="text-xs text-muted">{{ row.original.utilization }}%</span>
          </div>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-right" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
