<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/organization" title="Campus Structure">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Section Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Divisions & Groups</h3>
          <p class="text-[11px] text-muted">Campus organizational hierarchy and asset assignments</p>
        </div>
        <UBadge label="HRIS SYNC ACTIVE" variant="subtle" color="success" size="xs" class="font-mono font-bold" />
      </div>

      <!-- Divisions Table -->
      <UTable
        :data="divisions"
        :columns="columns"
        :ui="tableUi"
      >
        <template #division-cell="{ row }">
          <div class="flex items-center gap-2.5">
            <div class="size-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon :name="row.original.icon" class="size-3.5 text-primary" />
            </div>
            <span class="font-medium text-[12.5px] text-highlighted">{{ row.original.name }}</span>
          </div>
        </template>
      </UTable>

      <!-- HRIS integration alert banner -->
      <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-users" class="size-4 text-primary shrink-0" />
          <span class="text-[11px] font-medium text-highlighted">Personnel changes in HRIS automatically update asset custody</span>
        </div>
        <span class="text-[11px] font-mono font-semibold text-primary cursor-default">46 Staff</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface DivisionItem {
  name: string
  personnel: number
  assets: string
  icon: string
}

const tableUi = {
  root: 'overflow-x-auto',
  th: 'pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-2.5 text-[12px] px-3 first:ps-0 last:pe-0 border-b border-default/60',
}

const columns: TableColumn<DivisionItem>[] = [
  {
    accessorKey: 'name',
    id: 'division',
    header: 'DIVISION',
  },
  {
    accessorKey: 'personnel',
    header: 'PERSONNEL',
    meta: { class: { td: 'font-mono text-[12px] text-muted' } },
  },
  {
    accessorKey: 'assets',
    header: 'ASSIGNED ASSETS',
    meta: { class: { td: 'font-mono font-semibold text-highlighted' } },
  },
]

const divisions: DivisionItem[] = [
  { name: 'Finance', personnel: 14, assets: '320', icon: 'i-lucide-banknote' },
  { name: 'Supply Office', personnel: 9, assets: '1,840', icon: 'i-lucide-boxes' },
  { name: 'IT Office', personnel: 12, assets: '2,105', icon: 'i-lucide-laptop' },
  { name: 'Registrar', personnel: 11, assets: '410', icon: 'i-lucide-book-open' },
]
</script>
