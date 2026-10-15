<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/purchase-requests">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center shadow-2xs">
            <span class="text-white font-bold text-[13px] leading-none">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Purchase Request</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between gap-5">
        <!-- Request Title & Meta -->
        <div class="flex items-center justify-between">
          <div>
            <p class="font-mono text-[11px] text-muted font-medium">
              RS#000022 · 03/08/2022
            </p>
            <h3 class="text-base font-bold text-highlighted mt-0.5">
              Inventory Goods
            </h3>
          </div>
          <UBadge
            label="NEW"
            color="primary"
            variant="subtle"
            size="sm"
            class="font-mono font-bold tracking-wider px-2.5 rounded-md"
          />
        </div>

        <!-- Inventory Goods Table using UTable -->
        <UTable
          :data="items"
          :columns="columns"
          :ui="tableUi"
        />

        <!-- PR Amount Total Banner -->
        <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 sm:py-3.5 flex items-center justify-between">
          <span class="font-mono text-xs font-semibold text-primary tracking-wide">
            PR Amount
          </span>
          <span class="font-mono text-lg font-bold text-primary tracking-tight">
            ₱75,000.00
          </span>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface InventoryItem {
  item: string
  description: string
  unit: string
  qty: string
}

const tableUi = {
  root: 'overflow-x-auto border-t border-default/60',
  th: 'pb-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-3 text-[12.5px] px-3 first:ps-0 last:pe-0 border-b border-default/60'
}

const columns: TableColumn<InventoryItem>[] = [
  {
    accessorKey: 'item',
    header: 'ITEM',
    meta: { class: { td: 'font-mono text-[12px] font-medium text-highlighted' } }
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    meta: { class: { td: 'text-highlighted font-medium' } }
  },
  {
    accessorKey: 'unit',
    header: 'UNIT',
    meta: { class: { td: 'text-[12px] text-muted font-mono' } }
  },
  {
    accessorKey: 'qty',
    header: 'QTY',
    meta: { class: { td: 'font-mono text-highlighted' } }
  }
]

const items: InventoryItem[] = [
  { item: 'ITEM-1', description: 'Folder', unit: 'pcs', qty: '2,000' },
  { item: 'ITEM-2', description: 'Pencil', unit: 'pcs', qty: '2,000' },
  { item: 'ITEM-3', description: 'Notebook', unit: 'pcs', qty: '2,000' },
  { item: 'ITEM-4', description: 'Envelope', unit: 'pcs', qty: '2,000' }
]
</script>
