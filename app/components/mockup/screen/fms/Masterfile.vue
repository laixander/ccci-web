<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/customer-info">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary-600 flex items-center justify-center shadow-2xs">
            <span class="text-white font-bold text-[13px] leading-none">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Customer Info</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

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
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface CustomerField {
  label: string
  value: string
}

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
