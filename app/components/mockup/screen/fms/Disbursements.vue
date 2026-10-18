<template>
  <MockupBrowserFrame url="app.fms.ccci.com.ph/payable-voucher" title="Payable Voucher">
    <div class="p-5 flex-1 flex flex-col justify-between gap-5">
      <!-- Voucher Title & Meta -->
      <div class="flex items-center justify-between">
        <div>
          <p class="font-mono text-[11px] text-muted font-medium">
            APV#000111 · 03/08/2022
          </p>
          <h3 class="text-base font-bold text-highlighted mt-0.5">
            APL Merchandising
          </h3>
        </div>
        <UBadge
          label="POSTED"
          color="success"
          variant="subtle"
          size="sm"
          class="font-mono font-bold tracking-wider px-2.5 rounded-md"
        />
      </div>

      <!-- Voucher Lines Cards -->
      <div
        v-if="lines?.length"
        class="flex flex-col gap-3"
      >
        <UCard
          v-for="line in lines"
          :key="line.account"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <!-- Account Name -->
          <span class="font-bold text-[13.5px] text-highlighted">
            {{ line.account }}
          </span>

          <!-- Debit/Credit Badge & Amount -->
          <div class="flex items-center gap-3">
            <UBadge
              :label="line.type"
              :color="line.badgeColor"
              variant="subtle"
              size="sm"
              class="font-mono font-bold tracking-wider px-2.5 rounded-md uppercase"
            />
            <span class="font-mono text-[13px] text-highlighted font-medium min-w-[85px] text-right">
              {{ line.amount }}
            </span>
          </div>
        </UCard>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface VoucherLine {
  account: string
  type: 'Debit' | 'Credit'
  badgeColor: 'info' | 'error'
  amount: string
}

const lines: VoucherLine[] = [
  { account: 'Payable', type: 'Debit', badgeColor: 'info', amount: '112,000.00' },
  { account: 'Input VAT', type: 'Debit', badgeColor: 'info', amount: '12,000.00' },
  { account: 'WH Tax', type: 'Credit', badgeColor: 'error', amount: '2,000.00' },
  { account: 'Check Account', type: 'Credit', badgeColor: 'error', amount: '122,000.00' }
]
</script>
