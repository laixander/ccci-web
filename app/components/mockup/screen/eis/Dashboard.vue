<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.execis.ccci.com.ph/dashboard</span>
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
          <UAvatar text="ET" size="xs" color="primary" />
        </div>
      </aside>
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Executive Dashboard</p>
            <p class="text-[9px] text-dimmed mt-0.5">Q3 2026 — Organization-wide KPIs</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-error" />
            </div>
            <UButton size="xs" label="Board Report" icon="i-lucide-file-bar-chart" color="primary" />
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
            <div class="col-span-3 rounded-lg border border-default bg-elevated p-3">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] font-semibold text-highlighted">Revenue vs Target</p>
                <div class="flex items-center gap-2">
                  <span class="flex items-center gap-1 text-[8.5px] text-muted"><span class="size-1.5 rounded-full bg-primary inline-block" /> Actual</span>
                  <span class="flex items-center gap-1 text-[8.5px] text-muted"><span class="size-1.5 rounded-full bg-success inline-block" /> Target</span>
                </div>
              </div>
              <div class="flex items-end justify-between gap-1">
                <div v-for="bar in revenueBars" :key="bar.month" class="flex-1 flex flex-col items-center gap-0.5">
                  <div class="w-full flex items-end gap-px justify-center" style="height: 120px">
                    <div class="flex-1 rounded-sm bg-primary/80" :style="{ height: bar.actualPct + '%' }" />
                    <div class="flex-1 rounded-sm bg-success/50" :style="{ height: bar.targetPct + '%' }" />
                  </div>
                  <span class="text-[8px] text-dimmed">{{ bar.month }}</span>
                </div>
              </div>
            </div>
            <div class="col-span-2 flex flex-col gap-2">
              <div class="rounded-lg border border-default bg-elevated p-2.5 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Module Health</p>
                <div class="space-y-1.5">
                  <div v-for="mod in modules" :key="mod.name" class="flex items-center gap-2">
                    <span class="text-[9px] text-muted w-14 truncate">{{ mod.name }}</span>
                    <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full" :class="mod.color" :style="{ width: mod.pct + '%' }" />
                    </div>
                    <span class="text-[9px] text-dimmed w-7 text-right">{{ mod.pct }}%</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-default bg-elevated p-2.5 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-1.5">Critical Alerts</p>
                <div class="space-y-1">
                  <div v-for="alert in alerts" :key="alert.msg" class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full flex-shrink-0" :class="alert.dot" />
                    <span class="text-[9px] text-muted truncate">{{ alert.msg }}</span>
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
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'KPI Builder', icon: 'i-lucide-sliders', active: false },
  { label: 'Forecasting', icon: 'i-lucide-trending-up', active: false },
  { label: 'Reports', icon: 'i-lucide-file-bar-chart', active: false },
  { label: 'Alerts', icon: 'i-lucide-bell', active: false },
  { label: 'Integrations', icon: 'i-lucide-layers', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const kpiCards = [
  { label: 'Total Revenue', value: 'P52.4M', icon: 'i-lucide-trending-up', iconColor: 'text-success', change: '12.3% vs target', changeColor: 'text-success' },
  { label: 'Headcount', value: '1,284', icon: 'i-lucide-users', iconColor: 'text-primary', change: '42 new this qtr', changeColor: 'text-muted' },
  { label: 'Enrollment', value: '8,720', icon: 'i-lucide-graduation-cap', iconColor: 'text-info', change: '3.2% vs last yr', changeColor: 'text-success' },
  { label: 'OpEx Ratio', value: '67.2%', icon: 'i-lucide-pie-chart', iconColor: 'text-warning', change: 'Target: 65%', changeColor: 'text-warning' },
]
const revenueBars = [
  { month: 'Feb', actualPct: 62, targetPct: 70 },
  { month: 'Mar', actualPct: 71, targetPct: 72 },
  { month: 'Apr', actualPct: 78, targetPct: 75 },
  { month: 'May', actualPct: 80, targetPct: 78 },
  { month: 'Jun', actualPct: 85, targetPct: 80 },
  { month: 'Jul', actualPct: 90, targetPct: 85 },
  { month: 'Aug', actualPct: 95, targetPct: 90 },
]
const modules = [
  { name: 'HRIS', pct: 98, color: 'bg-success' },
  { name: 'FMS', pct: 95, color: 'bg-success' },
  { name: 'LMS', pct: 88, color: 'bg-primary' },
  { name: 'AMS', pct: 72, color: 'bg-warning' },
  { name: 'DMS', pct: 91, color: 'bg-primary' },
]
const alerts = [
  { msg: 'OpEx exceeds 65% threshold', dot: 'bg-error' },
  { msg: 'Q3 forecast below target', dot: 'bg-warning' },
  { msg: 'AMS uptime below SLA', dot: 'bg-warning' },
]
</script>
