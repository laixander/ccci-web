<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.aissp.ccci.com.ph/compliance</span>
      </div>
    </div>
    <div class="flex h-[340px]">
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-network" class="size-3.5 text-white" />
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
            <p class="text-[11px] font-bold text-highlighted">Compliance & Audit Trails</p>
            <p class="text-[9px] text-dimmed mt-0.5">DICT ISSP Compliance — FY 2026</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-1 text-[8.5px] text-success bg-success/10 px-2 py-0.5 rounded-full">
              <UIcon name="i-lucide-shield-check" class="size-3" /> DICT Aligned
            </span>
            <UButton size="xs" label="Export Audit" icon="i-lucide-download" color="neutral" variant="outline" />
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
              <div class="px-3 py-2 border-b border-default">
                <p class="text-[10px] font-semibold text-highlighted">DICT Compliance Checklist</p>
              </div>
              <div class="p-3 space-y-1.5">
                <div v-for="item in checklist" :key="item.label" class="flex items-center gap-2">
                  <UIcon :name="item.done ? 'i-lucide-check-circle' : 'i-lucide-clock'" class="size-3.5 flex-shrink-0" :class="item.done ? 'text-success' : 'text-warning'" />
                  <span class="text-[9.5px] text-highlighted flex-1">{{ item.label }}</span>
                  <span class="text-[8.5px] font-medium" :class="item.done ? 'text-success' : 'text-warning'">{{ item.done ? 'Done' : 'Pending' }}</span>
                </div>
              </div>
            </div>
            <div class="col-span-2 flex flex-col gap-2">
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">ISSP Alignment</p>
                <div class="flex items-center justify-center my-1">
                  <svg width="52" height="52" viewBox="0 0 52 52" class="-rotate-90">
                    <circle cx="26" cy="26" r="22" fill="none" stroke-width="5" class="stroke-muted" />
                    <circle cx="26" cy="26" r="22" fill="none" stroke-width="5" class="stroke-success" stroke-linecap="round" :stroke-dasharray="`${2 * Math.PI * 22 * 0.984} ${2 * Math.PI * 22}`" />
                  </svg>
                  <div class="absolute">
                    <span class="text-[10px] font-bold text-highlighted">98%</span>
                  </div>
                </div>
                <p class="text-[8.5px] text-muted text-center mt-1">Strategic alignment score</p>
              </div>
              <div class="rounded-lg border border-default bg-elevated p-2.5 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-1.5">Recent Audit Logs</p>
                <div class="space-y-1">
                  <div v-for="log in auditLogs" :key="log.action" class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full flex-shrink-0 bg-primary" />
                    <span class="text-[9px] text-muted truncate">{{ log.action }}</span>
                  </div>
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
  { label: 'ICT Projects', icon: 'i-lucide-monitor', active: false },
  { label: 'Budget Tracker', icon: 'i-lucide-wallet', active: false },
  { label: 'Risk Management', icon: 'i-lucide-alert-triangle', active: false },
  { label: 'Compliance', icon: 'i-lucide-shield-check', active: true },
  { label: 'Reports', icon: 'i-lucide-file-text', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const kpiCards = [
  { label: 'Compliance Rate', value: '98.4%', icon: 'i-lucide-shield-check', iconColor: 'text-success', change: 'DICT requirements met', changeColor: 'text-success' },
  { label: 'Audit Items', value: '142', icon: 'i-lucide-clipboard-list', iconColor: 'text-primary', change: '6 pending review', changeColor: 'text-warning' },
  { label: 'Open Risks', value: '7', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: '3 high priority', changeColor: 'text-error' },
  { label: 'Next Submission', value: 'Sep 30', icon: 'i-lucide-calendar', iconColor: 'text-info', change: '37 days away', changeColor: 'text-muted' },
]
const checklist = [
  { label: 'Strategic Goals Documented', done: true },
  { label: 'ICT Projects Mapped to Objectives', done: true },
  { label: 'Budget Justification Submitted', done: true },
  { label: 'Risk Assessment Completed', done: true },
  { label: 'DICT Submission (Q3)', done: false },
  { label: 'Annual ISSP Review', done: false },
]
const auditLogs = [
  { action: 'Budget updated — ERP Project' },
  { action: 'New system added — Network Upgrade' },
  { action: 'Risk flagged — Data Center delay' },
  { action: 'Compliance report exported' },
]
</script>
