<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.execis.ccci.com.ph/forecasting</span>
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
          <UAvatar text="PL" size="xs" color="primary" />
        </div>
      </aside>
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">AI Predictive Forecasting</p>
            <p class="text-[9px] text-dimmed mt-0.5">Q4 2026 Projections — Updated just now</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-1 text-[8.5px] text-success bg-success/10 px-2 py-0.5 rounded-full">
              <UIcon name="i-lucide-sparkles" class="size-3" /> AI Powered
            </span>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <div class="grid grid-cols-4 gap-2">
            <div v-for="kpi in forecasts" :key="kpi.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9px] text-muted mb-1">{{ kpi.label }}</p>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
              <p class="text-[8.5px] mt-0.5" :class="kpi.color">{{ kpi.change }}</p>
            </div>
          </div>
          <div class="rounded-lg border border-default bg-elevated p-3">
            <div class="flex items-center justify-between mb-3">
              <p class="text-[10px] font-semibold text-highlighted">12-Month Revenue Forecast</p>
              <div class="flex items-center gap-2">
                <span class="flex items-center gap-1 text-[8.5px] text-muted"><span class="size-1.5 rounded-full bg-primary inline-block" /> Actual</span>
                <span class="flex items-center gap-1 text-[8.5px] text-muted"><span class="size-1.5 rounded-full bg-primary/30 inline-block" /> Projected</span>
              </div>
            </div>
            <div class="flex items-end justify-between gap-1">
              <div v-for="bar in forecastBars" :key="bar.month" class="flex-1 flex flex-col items-center gap-0.5">
                <div class="w-full flex items-end justify-center" style="height: 100px">
                  <div class="w-full rounded-t-sm" :class="bar.projected ? 'bg-primary/30 border border-dashed border-primary/50' : 'bg-primary/80'" :style="{ height: bar.pct + '%' }" />
                </div>
                <span class="text-[7.5px] text-dimmed">{{ bar.month }}</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="insight in insights" :key="insight.title" class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center gap-1.5 mb-1">
                <UIcon :name="insight.icon" class="size-3" :class="insight.color" />
                <p class="text-[9px] font-semibold text-highlighted">{{ insight.title }}</p>
              </div>
              <p class="text-[8.5px] text-muted">{{ insight.desc }}</p>
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
  { label: 'KPI Builder', icon: 'i-lucide-sliders', active: false },
  { label: 'Forecasting', icon: 'i-lucide-trending-up', active: true },
  { label: 'Reports', icon: 'i-lucide-file-bar-chart', active: false },
  { label: 'Alerts', icon: 'i-lucide-bell', active: false },
  { label: 'Integrations', icon: 'i-lucide-layers', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]
const forecasts = [
  { label: 'Q4 Revenue', value: 'P58.2M', change: 'AI Confidence: 92%', color: 'text-success' },
  { label: 'Q4 Headcount', value: '1,340', change: 'Expected +56 hires', color: 'text-primary' },
  { label: 'Enrollment', value: '9,100', change: '4.4% YoY growth', color: 'text-info' },
  { label: 'Budget Risk', value: 'Low', change: 'All depts on track', color: 'text-success' },
]
const forecastBars = [
  { month: 'Mar', pct: 55, projected: false },
  { month: 'Apr', pct: 62, projected: false },
  { month: 'May', pct: 68, projected: false },
  { month: 'Jun', pct: 72, projected: false },
  { month: 'Jul', pct: 80, projected: false },
  { month: 'Aug', pct: 88, projected: false },
  { month: 'Sep', pct: 78, projected: true },
  { month: 'Oct', pct: 85, projected: true },
  { month: 'Nov', pct: 90, projected: true },
  { month: 'Dec', pct: 95, projected: true },
]
const insights = [
  { title: 'Revenue Trend', desc: 'On track to exceed annual target by 8.4%', icon: 'i-lucide-trending-up', color: 'text-success' },
  { title: 'Headcount Risk', desc: 'Engineering dept may need 12 new hires in Q4', icon: 'i-lucide-users', color: 'text-warning' },
  { title: 'Budget Variance', desc: 'Projected OpEx savings of P1.2M in Q4', icon: 'i-lucide-wallet', color: 'text-primary' },
]
</script>
