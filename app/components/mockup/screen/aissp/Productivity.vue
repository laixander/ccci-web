<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/deployment" title="Deployment · End Users">
    <div class="p-5 flex-1 flex flex-col justify-between gap-6">
      <!-- Deployment Table using UTable -->
      <UTable
        :data="deployments"
        :columns="columns"
        :ui="{
          root: 'overflow-x-auto',
          th: 'pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default',
          td: 'py-2.5 text-[12px] text-highlighted px-3 first:ps-0 last:pe-0 border-b border-default/60',
        }"
      >
        <template #user-cell="{ row }">
          <span class="font-mono text-[11.5px] text-highlighted">
            {{ row.original.user }}
          </span>
        </template>
      </UTable>

      <!-- Status callout banner using UAlert -->
      <UAlert
        variant="subtle"
        title="APP/PPMP · FMS linked"
        :ui="{
          root: 'rounded-xl',
          wrapper: 'flex-row items-center justify-between',
          title: 'font-mono text-xs font-semibold text-primary',
          actions: 'mt-0'
        }"
      >
        <template #actions>
          <UBadge
            label="SYNCED"
            color="primary"
            variant="subtle"
            size="sm"
            class="font-bold tracking-wider uppercase rounded-full"
          />
        </template>
      </UAlert>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface DeploymentItem {
  user: string
  item: string
  qty: number
  dept: string
}

const columns: TableColumn<DeploymentItem>[] = [
  { accessorKey: 'user', header: 'END USER' },
  { accessorKey: 'item', header: 'ITEM' },
  { accessorKey: 'qty', header: 'QTY' },
  { accessorKey: 'dept', header: 'DEPT' },
]

const deployments: DeploymentItem[] = [
  { user: 'J. Dela Cruz', item: 'Laptop', qty: 1, dept: 'Registrar' },
  { user: 'M. Santos', item: 'Desktop', qty: 2, dept: 'Accounting' },
  { user: 'A. Reyes', item: 'Printer', qty: 1, dept: 'Library' },
  { user: 'L. Cruz', item: 'Laptop', qty: 3, dept: 'IT Office' },
]
</script>