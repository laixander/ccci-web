<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Dashboard'
})

const recentActivity = [
  { icon: 'i-lucide-arrow-down-to-line', color: 'text-success', bg: 'bg-success/10', title: 'Payment Received: IN-2026-084', sub: '₱125,000 from Client Alpha', time: '1h ago' },
  { icon: 'i-lucide-arrow-up-from-line', color: 'text-warning', bg: 'bg-warning/10', title: 'Payment Sent: PO-2026-012', sub: '₱45,000 to Vendor Beta', time: '3h ago' },
  { icon: 'i-lucide-file-text', color: 'text-primary', bg: 'bg-primary/10', title: 'Journal Entry Posted: JE-1042', sub: 'Monthly Depreciation', time: '1d ago' },
  { icon: 'i-lucide-pie-chart', color: 'text-info', bg: 'bg-info/10', title: 'Q3 Budget Adjusted', sub: 'Marketing Department', time: '2d ago' },
  { icon: 'i-lucide-arrow-left-right', color: 'text-purple-500', bg: 'bg-purple-500/10', title: 'Bank Reconciliation Completed', sub: 'BDO Account ending in 1234', time: '3d ago' },
]

const actionItems = [
  { icon: 'i-lucide-alert-circle', color: 'text-error', title: 'Overdue Invoices', desc: '5 invoices past 30 days due.' },
  { icon: 'i-lucide-file-check', color: 'text-warning', title: 'Pending Approvals', desc: '3 Purchase Orders require approval.' },
  { icon: 'i-lucide-calculator', color: 'text-primary', title: 'Month-End Close', desc: 'Reconcile payroll accounts for July.' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">Financial Overview</h1>
      <p class="text-muted mt-1">Here is a summary of your organization's financial health.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Revenue (YTD)</p>
        <p class="text-3xl font-bold text-highlighted">₱14.5M</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +8% vs last month
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Expenses (YTD)</p>
        <p class="text-3xl font-bold text-highlighted">₱9.2M</p>
        <p class="text-xs text-error mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +2% vs last month
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Net Income (YTD)</p>
        <p class="text-3xl font-bold text-success">₱5.3M</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +15% vs target
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Cash Balance</p>
        <p class="text-3xl font-bold text-highlighted">₱3.8M</p>
        <p class="text-xs text-muted mt-2">Across all accounts</p>
      </UCard>
    </div>

    <!-- Main Content Area -->
    <div class="grid lg:grid-cols-3 gap-6">
      <UCard class="lg:col-span-2" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-highlighted">Recent Transactions</h3>
            <UButton color="neutral" variant="ghost" size="sm">View Ledger</UButton>
          </div>
        </template>
        <div class="divide-y divide-default">
          <div v-for="item in recentActivity" :key="item.title" class="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
            <div :class="['size-10 rounded-full flex items-center justify-center flex-shrink-0', item.bg]">
              <UIcon :name="item.icon" :class="['size-5', item.color]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">{{ item.title }}</p>
              <p class="text-xs text-muted truncate">{{ item.sub }}</p>
            </div>
            <span class="text-xs font-medium text-dimmed whitespace-nowrap">{{ item.time }}</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-highlighted">Action Items</h3>
          </div>
        </template>
        <div class="space-y-5">
          <div v-for="item in actionItems" :key="item.title" class="flex gap-3">
            <UIcon :name="item.icon" :class="['size-5 shrink-0', item.color]" />
            <div>
              <p class="text-sm font-medium text-highlighted">{{ item.title }}</p>
              <p class="text-xs text-muted mt-0.5">{{ item.desc }}</p>
            </div>
          </div>
          <UButton block color="neutral" variant="outline" class="mt-2">View All Tasks</UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
