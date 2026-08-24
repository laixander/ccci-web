<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.fms.ccci.com.ph/reports</span>
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
            <p class="text-[11px] font-bold text-highlighted">Financial Reports</p>
            <p class="text-[9px] text-dimmed mt-0.5">Q3 2026 — Generate and export statements</p>
          </div>
          <UButton size="xs" label="New Report" icon="i-lucide-plus" color="primary" />
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          <div class="grid grid-cols-3 gap-2">
            <div v-for="s in summaryCards" :key="s.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9px] text-muted mb-1">{{ s.label }}</p>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
              <p class="text-[8.5px] mt-0.5" :class="s.color">{{ s.sub }}</p>
            </div>
          </div>
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-2 border-b border-default">
              <p class="text-[10px] font-semibold text-highlighted">Generated Reports</p>
              <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1">
                <UIcon name="i-lucide-search" class="size-2.5 text-dimmed" />
                <span class="text-[9px] text-dimmed">Search...</span>
              </div>
            </div>
            <table class="w-full">
              <thead>
                <tr class="border-b border-default">
                  <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Report</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Period</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Format</th>
                  <th class="text-center px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in reports" :key="r.name" class="border-b border-default last:border-0">
                  <td class="px-3 py-1.5">
                    <div class="flex items-center gap-1.5">
                      <UIcon name="i-lucide-file-text" class="size-3 text-primary" />
                      <span class="text-[10px] text-highlighted font-medium">{{ r.name }}</span>
                    </div>
                  </td>
                  <td class="px-2 py-1.5 text-[10px] text-muted">{{ r.period }}</td>
                  <td class="px-2 py-1.5"><span class="text-[9px] text-dimmed bg-muted px-1.5 py-0.5 rounded">{{ r.format }}</span></td>
                  <td class="px-2 py-1.5 text-center"><span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium" :class="r.statusClass">{{ r.status }}</span></td>
                </tr>
              </tbody>
            </table>
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
  { label: 'Budgeting', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Cash Flow', icon: 'i-lucide-banknote', active: false },
  { label: 'Reports', icon: 'i-lucide-file-text', active: true },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const summaryCards = [
  { label: 'Income Statement', value: 'Net: P1.4M', sub: 'Ready to export', color: 'text-success' },
  { label: 'Balance Sheet', value: 'Assets: P18.2M', sub: 'Balanced', color: 'text-primary' },
  { label: 'Cash Flow', value: 'P+820k', sub: 'Q3 operating CF', color: 'text-success' },
]
const reports = [
  { name: 'Income Statement', period: 'Jul 2026', format: 'PDF', status: 'Ready', statusClass: 'bg-success/10 text-success' },
  { name: 'Balance Sheet', period: 'Jul 2026', format: 'Excel', status: 'Ready', statusClass: 'bg-success/10 text-success' },
  { name: 'Cash Flow', period: 'Q2 2026', format: 'PDF', status: 'Ready', statusClass: 'bg-success/10 text-success' },
  { name: 'Trial Balance', period: 'YTD 2026', format: 'Excel', status: 'Processing', statusClass: 'bg-warning/10 text-warning' },
]
</script>
