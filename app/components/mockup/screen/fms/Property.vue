<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/asset-master">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center shadow-2xs">
            <span class="text-white font-bold text-[13px] leading-none">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Asset Master</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between gap-5">
        <!-- Asset Master Table using UTable -->
        <UTable
          :data="assets"
          :columns="columns"
          :ui="tableUi"
        />

        <!-- Asset Classification & Status Banner -->
        <div class="rounded-xl border border-default bg-elevated/40 px-4 py-3 sm:py-3.5 flex items-center justify-between">
          <span class="font-mono text-[11.5px] text-muted">
            Depreciable · Serialized
          </span>
          <UBadge
            label="ISSUED"
            color="primary"
            variant="subtle"
            size="sm"
            class="font-mono font-bold tracking-wider px-2.5 rounded-md"
          />
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface AssetRecord {
  code: string
  description: string
  netAmt: string
  custodian: string
}

const tableUi = {
  root: 'overflow-x-auto',
  th: 'py-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-3 text-[12.5px] px-3 first:ps-0 last:pe-0 border-b border-default/60'
}

const columns: TableColumn<AssetRecord>[] = [
  {
    accessorKey: 'code',
    header: 'CODE',
    meta: { class: { td: 'font-mono text-[12px] font-medium text-highlighted' } }
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    meta: { class: { td: 'text-highlighted font-medium' } }
  },
  {
    accessorKey: 'netAmt',
    header: 'NET AMT',
    meta: { class: { td: 'font-mono text-highlighted' } }
  },
  {
    accessorKey: 'custodian',
    header: 'CUSTODIAN',
    meta: { class: { td: 'text-muted' } }
  }
]

const assets: AssetRecord[] = [
  { code: '0019902', description: 'Carving Station', netAmt: '420,236', custodian: 'A. Ubaldo' },
  { code: '0000002', description: 'Laptop Sony', netAmt: '15,178', custodian: 'A. Ubaldo' },
  { code: '0000999', description: 'Samsung TV', netAmt: '128,172', custodian: 'RMS Dept.' },
  { code: '0020168', description: 'Glass Racks', netAmt: '21,260', custodian: 'Storeroom' }
]
</script>
