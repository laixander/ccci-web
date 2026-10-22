<template>
  <MockupBrowserFrame
    url="ams.ccci.com.ph/inventory"
    title="Asset Inventory"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Search & Filters -->
      <div class="flex items-center justify-between">
        <!-- <div>
          <h3 class="font-bold text-[14px] text-highlighted">All Assets</h3>
          <p class="text-[11px] text-muted">5,234 registered tags · Central Registry</p>
        </div> -->
        <div class="flex justify-between items-center gap-2 w-full">
          <UButton
            label="Import"
            icon="i-lucide-file-spreadsheet"
            color="neutral"
            variant="outline"
          />
          <UBadge
            label="QR / BARCODE"
            variant="subtle"
            color="primary"
            class="font-mono font-bold"
          />
        </div>
      </div>

      <!-- Assets Table -->
      <UTable
        :data="assets"
        :columns="columns"
        :ui="tableUi"
      >
        <template #asset-cell="{ row }">
          <div class="flex items-center gap-2">
            <div class="size-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon
                :name="row.original.icon"
                class="size-3.5 text-primary"
              />
            </div>
            <div>
              <p class="font-medium text-[12.5px] text-highlighted">
                {{ row.original.name }}
              </p>
              <!-- <p class="text-[10px] font-mono text-muted">{{ row.original.tag }}</p> -->
            </div>
          </div>
        </template>

        <template #status-cell="{ row }">
          <UBadge
            :label="row.original.status"
            :color="row.original.color"
            variant="subtle"
            size="xs"
            class="uppercase tracking-widest font-bold px-2"
          />
        </template>
      </UTable>

      <!-- Bottom Tagging Status -->
      <!-- <div class="flex items-center justify-between text-[11px] text-muted pt-1 border-t border-default/60">
        <span class="font-mono">Showing 4 of 5,234 assets</span>
        <span class="text-primary font-medium cursor-default">Scan Tag via Mobile →</span>
      </div> -->
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

interface AssetItem {
  name: string
  tag: string
  group: string
  assignee: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
}

const tableUi = {
  root: 'overflow-x-auto',
  th: 'pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-2.5 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-2.5 text-[12.5px] px-2.5 first:ps-0 last:pe-0 border-b border-default/60'
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'qr-scan',
    title: 'QR & Barcode Scan',
    subtitle: 'Instant Serial Lookup',
    icon: 'i-lucide-qr-code',
    color: 'primary',
    pulse: true
  },
  {
    id: 'bulk-import',
    title: 'Bulk Migration',
    subtitle: 'Excel & CSV Ready',
    icon: 'i-lucide-file-spreadsheet',
    color: 'success',
    badge: { label: 'SYNCED', color: 'success' }
  },
  {
    id: 'sw-licenses',
    title: 'License Tracking',
    subtitle: 'Auto-Renew Monitored',
    icon: 'i-lucide-key-round',
    color: 'info',
    badge: { label: 'ACTIVE', color: 'info' }
  }
]

const columns: TableColumn<AssetItem>[] = [
  {
    accessorKey: 'name',
    id: 'asset',
    header: 'ASSET'
  },
  {
    accessorKey: 'group',
    header: 'GROUP',
    meta: { class: { td: 'text-[11px] text-muted font-medium' } }
  },
  {
    accessorKey: 'assignee',
    header: 'ASSIGNEE',
    meta: { class: { td: 'text-[11.5px] text-highlighted font-medium' } }
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  }
]

const assets: AssetItem[] = [
  {
    name: 'MacBook Pro 16"',
    tag: 'AST-1001',
    group: 'Equipment',
    assignee: 'J. Dela Cruz',
    status: 'Deployed',
    color: 'success',
    icon: 'i-lucide-laptop'
  },
  {
    name: 'Adobe Creative Cloud',
    tag: 'LIC-2044',
    group: 'SW license',
    assignee: 'Media Office',
    status: 'Active',
    color: 'success',
    icon: 'i-lucide-key-round'
  },
  {
    name: 'Ergonomic chair',
    tag: 'FURN-042',
    group: 'Furniture',
    assignee: 'Unassigned',
    status: 'In storage',
    color: 'neutral',
    icon: 'i-lucide-armchair'
  },
  {
    name: 'Toyota Hiace',
    tag: 'VEH-003',
    group: 'Vehicle',
    assignee: 'Motorpool',
    status: 'Maintenance',
    color: 'warning',
    icon: 'i-lucide-truck'
  }
]
</script>
