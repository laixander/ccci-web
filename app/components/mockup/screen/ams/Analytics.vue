<template>
  <!-- Browser chrome frame -->
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.assetcore.io/analytics</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-boxes" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="SA" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Asset Analytics</p>
            <p class="text-[9px] text-dimmed mt-0.5">Q3 2026 · Updated just now</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-calendar" class="size-3 text-dimmed" />
              <span class="text-[9px] text-muted">Last 90 days</span>
            </div>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- KPI row -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="kpi in kpiCards" :key="kpi.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center justify-between mb-1">
                <p class="text-[9px] text-muted">{{ kpi.label }}</p>
                <span class="text-[8px] font-medium px-1 py-0.5 rounded" :class="kpi.badgeClass">{{ kpi.badge }}</span>
              </div>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
            </div>
          </div>

          <!-- Charts row -->
          <div class="grid grid-cols-5 gap-2">
            <!-- Asset value bar chart -->
            <div class="col-span-3 rounded-lg border border-default bg-elevated p-3">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] font-semibold text-highlighted">Asset Value by Category</p>
                <div class="flex items-center gap-2">
                  <span class="flex items-center gap-1 text-[8.5px] text-muted">
                    <span class="size-1.5 rounded-full bg-primary inline-block" /> Value
                  </span>
                </div>
              </div>
              <!-- Bar chart -->
              <div class="flex items-end justify-between gap-1">
                <div v-for="bar in valueBars" :key="bar.label" class="flex-1 flex flex-col items-center gap-0.5">
                  <div class="w-full flex items-end justify-center" style="height: 160px">
                    <div class="w-full rounded-sm bg-primary/80 transition-all" :style="{ height: bar.pct + '%' }" />
                  </div>
                  <span class="text-[8px] text-dimmed truncate w-full text-center">{{ bar.label }}</span>
                </div>
              </div>
            </div>

            <!-- Depreciation + utilization -->
            <div class="col-span-2 flex flex-col gap-2">
              <!-- Depreciation -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Book Value</p>
                <div class="flex items-center gap-3">
                  <div class="relative flex-shrink-0">
                    <svg width="52" height="52" viewBox="0 0 52 52" class="-rotate-90">
                      <circle cx="26" cy="26" r="22" fill="none" stroke-width="5" class="stroke-muted" />
                      <circle cx="26" cy="26" r="22" fill="none" stroke-width="5" class="stroke-primary" stroke-linecap="round"
                        :stroke-dasharray="`${2 * Math.PI * 22 * 0.57} ${2 * Math.PI * 22}`" />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-[10px] font-bold text-highlighted">57%</span>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[9px] text-muted">Current: <span class="text-highlighted font-semibold">₱8.3M</span></p>
                    <p class="text-[9px] text-muted">Original: <span class="text-dimmed">₱14.5M</span></p>
                    <span class="inline-flex items-center gap-0.5 text-[8.5px] text-warning font-medium">
                      <UIcon name="i-lucide-trending-down" class="size-3" /> Depreciating
                    </span>
                  </div>
                </div>
              </div>

              <!-- Utilization rate -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Utilization Rate</p>
                <div class="space-y-1.5">
                  <div v-for="dept in utilization" :key="dept.name" class="flex items-center gap-2">
                    <span class="text-[9px] text-muted w-14 truncate">{{ dept.name }}</span>
                    <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-primary transition-all" :style="{ width: dept.pct + '%' }" />
                    </div>
                    <span class="text-[9px] text-dimmed w-7 text-right">{{ dept.pct }}%</span>
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
  { label: 'All Assets', icon: 'i-lucide-box', active: false },
  { label: 'Assigned', icon: 'i-lucide-user-check', active: false },
  { label: 'Maintenance', icon: 'i-lucide-wrench', active: false },
  { label: 'Hardware', icon: 'i-lucide-laptop', active: false },
  { label: 'Analytics', icon: 'i-lucide-pie-chart', active: true },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Assets', value: '5,234', badge: '↑ 2.4%', badgeClass: 'bg-success/10 text-success' },
  { label: 'Deployed', value: '4,102', badge: '78.3%', badgeClass: 'bg-primary/10 text-primary' },
  { label: 'Book Value', value: '₱8.3M', badge: '↓ 57%', badgeClass: 'bg-warning/10 text-warning' },
  { label: 'MTD Maint.', value: '₱142k', badge: '↑ 12%', badgeClass: 'bg-error/10 text-error' },
]

const valueBars = [
  { label: 'Hardware', pct: 85 },
  { label: 'Vehicles', pct: 70 },
  { label: 'Furniture', pct: 30 },
  { label: 'Software', pct: 15 },
  { label: 'Other', pct: 10 },
]

const utilization = [
  { name: 'IT', pct: 94 },
  { name: 'Operations', pct: 78 },
  { name: 'Sales', pct: 65 },
  { name: 'HR', pct: 50 },
]
</script>
