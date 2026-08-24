<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.aissp.ccci.com.ph/dashboard</span>
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
          <UAvatar text="MR" size="xs" color="primary" />
        </div>
      </aside>
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">ISSP Overview</p>
            <p class="text-[9px] text-dimmed mt-0.5">FY 2026-2028 — ICT Strategic Planning</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-warning" />
            </div>
            <UButton size="xs" label="Compliance Report" icon="i-lucide-shield-check" color="primary" />
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
                <p class="text-[10px] font-semibold text-highlighted">ICT Projects Pipeline</p>
                <span class="text-[9px] text-primary cursor-default">View all</span>
              </div>
              <table class="w-full">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Project</th>
                    <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Phase</th>
                    <th class="text-center px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="proj in projects" :key="proj.name" class="border-b border-default last:border-0">
                    <td class="px-3 py-1.5">
                      <div class="flex items-center gap-1.5">
                        <UIcon name="i-lucide-monitor" class="size-3 text-primary" />
                        <span class="text-[10px] text-highlighted font-medium">{{ proj.name }}</span>
                      </div>
                    </td>
                    <td class="px-2 py-1.5 text-[10px] text-muted">{{ proj.phase }}</td>
                    <td class="px-2 py-1.5 text-center"><span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium" :class="proj.statusClass">{{ proj.status }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-span-2 rounded-lg border border-default bg-elevated p-3 flex flex-col gap-2">
              <p class="text-[10px] font-semibold text-highlighted">Budget Allocation</p>
              <div class="flex items-center justify-center my-1">
                <div class="size-14 rounded-full flex items-center justify-center" :style="donutStyle">
                  <div class="size-10 rounded-full bg-elevated flex items-center justify-center">
                    <span class="text-[9px] font-bold text-highlighted">62%</span>
                  </div>
                </div>
              </div>
              <div class="space-y-1">
                <div v-for="item in budgetItems" :key="item.label" class="flex items-center justify-between">
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
  return { background: `conic-gradient(#3b82f6 0% 62%, ${neutral} 62% 80%, #1d4ed8 80% 100%)` }
})
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'ICT Projects', icon: 'i-lucide-monitor', active: false },
  { label: 'Budget Tracker', icon: 'i-lucide-wallet', active: false },
  { label: 'Risk Management', icon: 'i-lucide-alert-triangle', active: false },
  { label: 'Compliance', icon: 'i-lucide-shield-check', active: false },
  { label: 'Reports', icon: 'i-lucide-file-text', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const kpiCards = [
  { label: 'Systems Tracked', value: '54', icon: 'i-lucide-monitor', iconColor: 'text-primary', change: '8 new this quarter', changeColor: 'text-success' },
  { label: 'Budget Utilized', value: '62%', icon: 'i-lucide-wallet', iconColor: 'text-warning', change: 'P4.2M of P6.8M', changeColor: 'text-muted' },
  { label: 'Compliance Rate', value: '98.4%', icon: 'i-lucide-shield-check', iconColor: 'text-success', change: 'DICT aligned', changeColor: 'text-success' },
  { label: 'Active Risks', value: '7', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: '3 high priority', changeColor: 'text-error' },
]
const projects = [
  { name: 'ERP Modernization', phase: 'Development', status: 'On Track', statusClass: 'bg-success/10 text-success' },
  { name: 'HRIS Integration', phase: 'Testing', status: 'On Track', statusClass: 'bg-success/10 text-success' },
  { name: 'Network Upgrade', phase: 'Procurement', status: 'At Risk', statusClass: 'bg-warning/10 text-warning' },
  { name: 'Data Center Migration', phase: 'Planning', status: 'Pending', statusClass: 'bg-muted text-muted' },
]
const budgetItems = [
  { label: 'Infrastructure', value: 'P2.1M', dotClass: 'bg-primary' },
  { label: 'Software', value: 'P1.4M', dotClass: 'bg-neutral-300 dark:bg-neutral-600' },
  { label: 'Training', value: 'P0.7M', dotClass: 'bg-blue-700' },
]
</script>
