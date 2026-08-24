<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.fms.ccci.com.ph/budgeting</span>
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
            <p class="text-[11px] font-bold text-highlighted">Budget vs Actuals</p>
            <p class="text-[9px] text-dimmed mt-0.5">FY 2026 — Track departmental spending</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[9px] text-dimmed bg-muted px-2 py-1 rounded-md">FY 2026</span>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <div class="grid grid-cols-3 gap-2">
            <div v-for="s in summaryCards" :key="s.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9px] text-muted mb-1">{{ s.label }}</p>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
              <p class="text-[8.5px] mt-0.5" :class="s.color">{{ s.sub }}</p>
            </div>
          </div>
          <div class="rounded-lg border border-default bg-elevated p-3">
            <p class="text-[10px] font-semibold text-highlighted mb-3">Department Budget Utilization</p>
            <div class="space-y-2.5">
              <div v-for="dept in departments" :key="dept.name">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[9.5px] text-highlighted font-medium">{{ dept.name }}</span>
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] text-muted">{{ dept.actual }} / {{ dept.budget }}</span>
                    <span class="text-[8.5px] font-medium" :class="dept.pct > 90 ? 'text-error' : dept.pct > 75 ? 'text-warning' : 'text-success'">{{ dept.pct }}%</span>
                  </div>
                </div>
                <div class="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full transition-all" :class="dept.pct > 90 ? 'bg-error' : dept.pct > 75 ? 'bg-warning' : 'bg-primary'" :style="{ width: dept.pct + '%' }" />
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
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'General Ledger', icon: 'i-lucide-book', active: false },
  { label: 'Accounts Payable', icon: 'i-lucide-arrow-down-circle', active: false },
  { label: 'Accounts Receivable', icon: 'i-lucide-arrow-up-circle', active: false },
  { label: 'Budgeting', icon: 'i-lucide-pie-chart', active: true },
  { label: 'Cash Flow', icon: 'i-lucide-banknote', active: false },
  { label: 'Reports', icon: 'i-lucide-file-text', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const summaryCards = [
  { label: 'Total Budget', value: 'P12.0M', sub: 'Approved FY2026', color: 'text-muted' },
  { label: 'Total Spent', value: 'P8.4M', sub: '70% utilized', color: 'text-warning' },
  { label: 'Remaining', value: 'P3.6M', sub: 'On track', color: 'text-success' },
]
const departments = [
  { name: 'Operations', budget: 'P4.2M', actual: 'P3.9M', pct: 93 },
  { name: 'Marketing', budget: 'P2.5M', actual: 'P1.8M', pct: 72 },
  { name: 'Engineering', budget: 'P3.0M', actual: 'P1.9M', pct: 63 },
  { name: 'HR & Admin', budget: 'P1.5M', actual: 'P0.8M', pct: 53 },
  { name: 'Sales', budget: 'P0.8M', actual: 'P0.4M', pct: 50 },
]
</script>
