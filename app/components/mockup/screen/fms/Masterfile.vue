<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/customer-info" title="Customer Info" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col justify-between gap-5">
      <!-- Customer Fields Grid -->
      <div
        v-if="fields?.length"
        class="grid grid-cols-2 gap-3"
      >
        <UCard
          v-for="field in fields"
          :key="field.label"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <span class="w-20 text-[10px] font-semibold text-muted tracking-wider uppercase shrink-0">
            {{ field.label }}
          </span>
          <span class="font-bold text-[13px] text-highlighted truncate">
            {{ field.value }}
          </span>
        </UCard>
      </div>

      <!-- Bottom Action Buttons -->
      <div class="flex items-center justify-end gap-2.5 pt-1">
        <UButton
          label="Save"
          size="sm"
          class="px-5 font-medium rounded-lg shadow-2xs"
        />
        <UButton
          label="Delete"
          color="neutral"
          variant="outline"
          size="sm"
          class="px-4 font-mono text-xs text-muted hover:text-highlighted rounded-lg"
        />
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'
interface CustomerField {
  label: string
  value: string
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'credit-limit',
    title: 'Credit Limit',
    subtitle: '₱250,000 Approved',
    icon: 'i-lucide-credit-card',
    color: 'success',
    badge: { label: 'N30', color: 'success' }
  },
  {
    id: 'vatable',
    title: 'VAT Registered',
    subtitle: 'TIN 004-221-118',
    icon: 'i-lucide-file-badge',
    color: 'primary',
    pulse: true
  },
  {
    id: 'trade-customer',
    title: 'Trade Customer',
    subtitle: 'APL Merchandising',
    icon: 'i-lucide-building-2',
    color: 'info',
    badge: { label: 'PESO', color: 'info' }
  }
]

const fields: CustomerField[] = [
  { label: 'CODE', value: 'C-00012' },
  { label: 'TYPE', value: 'Trade' },
  { label: 'NAME', value: 'APL Merchandising' },
  { label: 'TIN NO.', value: '004-221-118' },
  { label: 'TERMS', value: 'N30' },
  { label: 'VAT TYPE', value: 'Vatable' },
  { label: 'CURRENCY', value: 'PESO' },
  { label: 'CREDIT', value: '₱250,000' }
]
</script>
