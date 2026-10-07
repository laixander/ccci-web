<template>
  <MockupBrowserFrame url="app.learncore.edu/billing/inv-0342">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Invoice · INV-0342</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest font-mono uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Statement Card -->
        <UCard variant="outline" :ui="{ body: 'sm:p-5' }" class="rounded-xl shadow-sm border-0 ring-1 ring-default bg-elevated">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex flex-col">
              <span class="font-bold text-[15px] text-highlighted">Statement of Account</span>
              <span class="text-[10px] text-muted font-mono mt-0.5">Term 2 · AY 2026</span>
            </div>
            <UBadge label="DUE" color="warning" variant="subtle" size="xs" class="uppercase tracking-widest font-bold px-2" />
          </div>

          <!-- Line Items -->
          <div class="flex flex-col mb-4">
            <div
              v-for="item in lineItems"
              :key="item.label"
              class="flex items-center justify-between py-3 border-b border-default last:border-0"
            >
              <span class="text-[13px] text-muted">{{ item.label }}</span>
              <span class="text-[13px] font-mono font-semibold text-highlighted">{{ item.amount }}</span>
            </div>
          </div>
          
          <!-- Total Banner -->
          <div class="flex items-center justify-between bg-gradient-to-r from-primary-500 to-primary-900 text-white px-4 py-3 rounded-lg">
            <span class="font-bold text-[13px]">Balance</span>
            <span class="text-[16px] font-mono font-bold">₱23,550</span>
          </div>
        </UCard>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const lineItems = [
  { label: 'Tuition (18 units)', amount: '₱21,600' },
  { label: 'Laboratory',         amount: '₱3,200' },
  { label: 'Miscellaneous',      amount: '₱4,750' },
  { label: 'Scholarship grant',  amount: '-₱6,000' },
]
</script>
