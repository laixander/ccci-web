<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.execis.ccci.com.ph/reports</span>
      </div>
    </div>
    <div class="flex h-[340px]">
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-bar-chart-3" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div v-for="item in sidebarItems" :key="item.label" :title="item.label" :class="['flex items-center justify-center size-7 rounded-md cursor-default', item.active ? 'bg-primary/10 text-primary' : 'text-muted']">
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="JR" size="xs" color="primary" />
        </div>
      </aside>
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Executive Reports</p>
            <p class="text-[9px] text-dimmed mt-0.5">Board-ready reports and scheduled delivery</p>
          </div>
          <UButton size="xs" label="Schedule Report" icon="i-lucide-calendar" color="primary" />
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <div class="grid grid-cols-3 gap-2">
            <div v-for="s in statCards" :key="s.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center gap-1.5 mb-1">
                <UIcon :name="s.icon" class="size-3" :class="s.color" />
                <p class="text-[9px] text-muted">{{ s.label }}</p>
              </div>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
            </div>
          </div>
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-2 border-b border-default">
              <p class="text-[10px] font-semibold text-highlighted">Board Report Library</p>
              <span class="text-[9px] text-primary cursor-default">View all</span>
            </div>
            <table class="w-full">
              <thead>
                <tr class="border-b border-default">
                  <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Report</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Frequency</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Last Sent</th>
                  <th class="text-center px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in reports" :key="r.name" class="border-b border-default last:border-0">
                  <td class="px-3 py-1.5">
                    <div class="flex items-center gap-1.5">
                      <UIcon name="i-lucide-file-bar-chart" class="size-3 text-primary" />
                      <span class="text-[10px] text-highlighted font-medium">{{ r.name }}</span>
                    </div>
                  </td>
                  <td class="px-2 py-1.5 text-[10px] text-muted">{{ r.freq }}</td>
                  <td class="px-2 py-1.5 text-[10px] text-muted">{{ r.sent }}</td>
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
  { label: 'KPI Builder', icon: 'i-lucide-sliders', active: false },
  { label: 'Forecasting', icon: 'i-lucide-trending-up', active: false },
  { label: 'Reports', icon: 'i-lucide-file-bar-chart', active: true },
  { label: 'Alerts', icon: 'i-lucide-bell', active: false },
  { label: 'Integrations', icon: 'i-lucide-layers', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const statCards = [
  { label: 'Reports Sent', value: '148', icon: 'i-lucide-send', color: 'text-primary' },
  { label: 'Scheduled', value: '12', icon: 'i-lucide-calendar-clock', color: 'text-warning' },
  { label: 'Recipients', value: '34', icon: 'i-lucide-users', color: 'text-success' },
]
const reports = [
  { name: 'Board Performance Report', freq: 'Monthly', sent: 'Aug 1, 2026', status: 'Delivered', statusClass: 'bg-success/10 text-success' },
  { name: 'Q3 KPI Summary', freq: 'Quarterly', sent: 'Jul 1, 2026', status: 'Delivered', statusClass: 'bg-success/10 text-success' },
  { name: 'Cross-Module Analytics', freq: 'Weekly', sent: 'Aug 18, 2026', status: 'Scheduled', statusClass: 'bg-warning/10 text-warning' },
  { name: 'Annual Strategic Review', freq: 'Annually', sent: 'Jan 1, 2026', status: 'Draft', statusClass: 'bg-muted text-muted' },
]
</script>
