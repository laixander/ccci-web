<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/asset-master" title="Asset Master" :floating-tags="floatingTags">
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
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'
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

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'issued-asset',
    title: 'Asset Issued',
    subtitle: '4 Items · Serialized',
    icon: 'i-lucide-box',
    color: 'primary',
    badge: { label: 'ISSUED', color: 'primary' }
  },
  {
    id: 'depreciable',
    title: 'Depreciable',
    subtitle: '₱584,846 Net Book Value',
    icon: 'i-lucide-trending-down',
    color: 'warning',
    pulse: true
  },
  {
    id: 'custodian',
    title: 'Custodian',
    subtitle: 'A. Ubaldo · RMS Dept.',
    icon: 'i-lucide-user-check',
    color: 'success',
    badge: { label: 'ACTIVE', color: 'success' }
  }
]

const assets: AssetRecord[] = [
  { code: '0019902', description: 'Carving Station', netAmt: '420,236', custodian: 'A. Ubaldo' },
  { code: '0000002', description: 'Laptop Sony', netAmt: '15,178', custodian: 'A. Ubaldo' },
  { code: '0000999', description: 'Samsung TV', netAmt: '128,172', custodian: 'RMS Dept.' },
  { code: '0020168', description: 'Glass Racks', netAmt: '21,260', custodian: 'Storeroom' }
]
</script>
