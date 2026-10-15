<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/withholding-tax">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center shadow-2xs">
            <span class="text-white font-bold text-[13px] leading-none">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Withholding Tax Rates</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between gap-5">
        <!-- Tax Rates Table using UTable -->
        <UTable
          :data="taxRates"
          :columns="columns"
          :ui="tableUi"
        />

        <!-- Bottom Action Buttons -->
        <div class="flex items-center gap-2.5 pt-1">
          <UButton
            label="Extract"
            color="primary"
            size="sm"
            class="px-5 font-mono text-xs font-semibold rounded-lg shadow-2xs"
          />
          <UButton
            label="SLSP Export"
            color="neutral"
            variant="outline"
            size="sm"
            class="px-4 font-mono text-xs text-muted hover:text-highlighted rounded-lg"
          />
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface TaxRateItem {
  code: string
  atc: string
  rate: string
  type: string
}

const tableUi = {
  root: 'overflow-x-auto',
  th: 'py-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-3 text-[12.5px] px-3 first:ps-0 last:pe-0 border-b border-default/60'
}

const columns: TableColumn<TaxRateItem>[] = [
  {
    accessorKey: 'code',
    header: 'CODE',
    meta: { class: { td: 'font-mono text-[12px] font-medium text-highlighted' } }
  },
  {
    accessorKey: 'atc',
    header: 'ATC',
    meta: { class: { td: 'font-mono text-[12px] font-medium text-highlighted' } }
  },
  {
    accessorKey: 'rate',
    header: 'RATE',
    meta: { class: { td: 'font-mono text-highlighted' } }
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
    meta: { class: { td: 'text-highlighted font-medium' } }
  }
]

const taxRates: TaxRateItem[] = [
  { code: 'CWC160', atc: 'WC160', rate: '2.00%', type: 'Creditable' },
  { code: 'WC100', atc: 'WC100', rate: '5.00%', type: 'Expanded' },
  { code: 'WC158', atc: 'WC158', rate: '1.00%', type: 'Expanded' },
  { code: 'WC160', atc: 'WC160', rate: '2.00%', type: 'Expanded' }
]
</script>
