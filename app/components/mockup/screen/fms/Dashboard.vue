<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.fms.ccci.com.ph/dashboard</span>
      </div>
    </div>
    <div class="flex h-[340px]">
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-wallet" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div v-for="item in sidebarItems" :key="item.label" :title="item.label" :class="['flex items-center justify-center size-7 rounded-md cursor-default', item.active ? 'bg-primary/10 text-primary' : 'text-muted']">
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="AC" size="xs" color="primary" />
        </div>
      </aside>
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Financial Overview</p>
            <p class="text-[9px] text-dimmed mt-0.5">August 2026 — Fiscal Year Q3</p>
          </div>
          <div class="flex items-center gap-2">
            <UButton size="xs" label="Generate Report" icon="i-lucide-file-text" color="primary" />
          </div>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <div class="grid grid-cols-4 gap-2">
            <div v-for="kpi in kpiCards" :key="kpi.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center justify-between mb-1.5">
                <p class="text-[9.5px] text-muted font-medium">{{ kpi.label }}</p>
                <UIcon :name="kpi.icon" class="size-3.5" :class="kpi.iconColor" />
              </div>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
              <p class="text-[9px] mt-0.5" :class="kpi.changeColor">{{ kpi.change }}</p>
            </div>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <div class="col-span-3 rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 border-b border-default">
                <p class="text-[10px] font-semibold text-highlighted">Recent Transactions</p>
                <span class="text-[9px] text-primary cursor-default">View all</span>
              </div>
              <table class="w-full">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Description</th>
                    <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Account</th>
                    <th class="text-right px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="txn in transactions" :key="txn.description" class="border-b border-default last:border-0">
                    <td class="px-3 py-1.5">
                      <div class="flex items-center gap-1.5">
                        <div class="size-4 rounded-md flex items-center justify-center" :class="txn.iconBg">
                          <UIcon :name="txn.icon" class="size-2.5" :class="txn.iconColor" />
                        </div>
                        <span class="text-[10px] text-highlighted font-medium">{{ txn.description }}</span>
                      </div>
                    </td>
                    <td class="px-2 py-1.5 text-[10px] text-muted">{{ txn.account }}</td>
                    <td class="px-3 py-1.5 text-[10px] font-semibold text-right" :class="txn.amountColor">{{ txn.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-span-2 rounded-lg border border-default bg-elevated p-3 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-semibold text-highlighted">Budget Utilization</p>
                <span class="text-[9px] text-dimmed">Aug 2026</span>
              </div>
              <div class="flex items-center justify-center my-1">
                <div class="size-14 rounded-full flex items-center justify-center" :style="donutStyle">
                  <div class="size-10 rounded-full bg-elevated flex items-center justify-center">
                    <span class="text-[9px] font-bold text-highlighted">68%</span>
                  </div>
                </div>
              </div>
              <div class="space-y-1">
                <div v-for="item in budgetBreakdown" :key="item.label" class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full" :class="item.dotClass" />
                    <span class="text-[9.5px] text-muted">{{ item.label }}</span>
                  </div>
                  <span class="text-[9.5px] font-semibold text-highlighted">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const donutStyle = computed(() => {
  const isDark = colorMode.value === 'dark'
  const neutral = isDark ? '#374151' : '#e5e7eb'
  return { background: `conic-gradient(#3b82f6 0% 68%, ${neutral} 68% 80%, #1d4ed8 80% 100%)` }
})
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'General Ledger', icon: 'i-lucide-book', active: false },
  { label: 'Accounts Payable', icon: 'i-lucide-arrow-down-circle', active: false },
  { label: 'Accounts Receivable', icon: 'i-lucide-arrow-up-circle', active: false },
  { label: 'Budgeting', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Cash Flow', icon: 'i-lucide-banknote', active: false },
  { label: 'Reports', icon: 'i-lucide-file-text', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const kpiCards = [
  { label: 'Total Revenue', value: 'P4.2M', icon: 'i-lucide-trending-up', iconColor: 'text-success', change: '12.5% vs last mo.', changeColor: 'text-success' },
  { label: 'Total Expenses', value: 'P2.8M', icon: 'i-lucide-trending-down', iconColor: 'text-error', change: '3.1% vs last mo.', changeColor: 'text-muted' },
  { label: 'Net Profit', value: 'P1.4M', icon: 'i-lucide-wallet', iconColor: 'text-primary', change: '8.7% vs last mo.', changeColor: 'text-success' },
  { label: 'Cash Balance', value: 'P8.6M', icon: 'i-lucide-landmark', iconColor: 'text-info', change: '3 pending approvals', changeColor: 'text-warning' },
]
const transactions = [
  { description: 'Office Supplies', account: 'Operating Exp.', amount: '-P12,500', icon: 'i-lucide-shopping-bag', iconBg: 'bg-error/10', iconColor: 'text-error', amountColor: 'text-error' },
  { description: 'Client Payment', account: 'Accounts Rec.', amount: '+P380,000', icon: 'i-lucide-arrow-down-circle', iconBg: 'bg-success/10', iconColor: 'text-success', amountColor: 'text-success' },
  { description: 'Vendor Invoice', account: 'Accounts Pay.', amount: '-P95,200', icon: 'i-lucide-receipt', iconBg: 'bg-warning/10', iconColor: 'text-warning', amountColor: 'text-error' },
  { description: 'Bank Interest', account: 'Misc. Income', amount: '+P8,400', icon: 'i-lucide-landmark', iconBg: 'bg-success/10', iconColor: 'text-success', amountColor: 'text-success' },
]
const budgetBreakdown = [
  { label: 'Operations', value: 'P1.9M', dotClass: 'bg-primary' },
  { label: 'Marketing', value: 'P540k', dotClass: 'bg-neutral-300 dark:bg-neutral-600' },
  { label: 'Capital Exp.', value: 'P360k', dotClass: 'bg-blue-700' },
]
</script>
