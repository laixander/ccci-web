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
        <span class="text-dimmed text-[10px]">app.campuscore.io/analytics</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-graduation-cap" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="RA" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main analytics content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Academic Analytics</p>
            <p class="text-[9px] text-dimmed mt-0.5">A.Y. 2026–2027 · 1st Semester · Updated just now</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-calendar" class="size-3 text-dimmed" />
              <span class="text-[9px] text-muted">This Semester</span>
              <UIcon name="i-lucide-chevron-down" class="size-2.5 text-dimmed" />
            </div>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- KPI row -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="rounded-lg border border-default bg-elevated p-2.5"
            >
              <div class="flex items-center justify-between mb-1">
                <p class="text-[9px] text-muted">{{ kpi.label }}</p>
                <span class="text-[8px] font-medium px-1 py-0.5 rounded" :class="kpi.badgeClass">{{ kpi.badge }}</span>
              </div>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
            </div>
          </div>

          <!-- Charts row -->
          <div class="grid grid-cols-5 gap-2">
            <!-- Enrollment trend bar chart -->
            <div class="col-span-3 rounded-lg border border-default bg-elevated p-3">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] font-semibold text-highlighted">Enrollment Trend</p>
                <div class="flex items-center gap-2">
                  <span class="flex items-center gap-1 text-[8.5px] text-muted">
                    <span class="size-1.5 rounded-full bg-primary inline-block" /> New Enrollees
                  </span>
                  <span class="flex items-center gap-1 text-[8.5px] text-muted">
                    <span class="size-1.5 rounded-full bg-success inline-block" /> Returnees
                  </span>
                </div>
              </div>
              <!-- Bar chart -->
              <div class="flex items-end justify-between gap-1">
                <div
                  v-for="bar in enrollmentBars"
                  :key="bar.sem"
                  class="flex-1 flex flex-col items-center gap-0.5"
                >
                  <div class="w-full flex items-end gap-px justify-center" style="height: 180px">
                    <div
                      class="flex-1 rounded-sm bg-primary/80 transition-all"
                      :style="{ height: bar.newPct + '%' }"
                    />
                    <div
                      class="flex-1 rounded-sm bg-success/70 transition-all"
                      :style="{ height: bar.retPct + '%' }"
                    />
                  </div>
                  <span class="text-[8px] text-dimmed">{{ bar.sem }}</span>
                </div>
              </div>
            </div>

            <!-- Retention rate + college breakdown -->
            <div class="col-span-2 flex flex-col gap-2">
              <!-- Retention rate gauge -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Retention Rate</p>
                <div class="flex items-center gap-3">
                  <div class="relative flex-shrink-0">
                    <svg width="52" height="52" viewBox="0 0 52 52" class="-rotate-90">
                      <circle cx="26" cy="26" r="22" fill="none" stroke-width="5" class="stroke-muted" />
                      <circle
                        cx="26" cy="26" r="22" fill="none" stroke-width="5"
                        class="stroke-success"
                        stroke-linecap="round"
                        :stroke-dasharray="`${2 * Math.PI * 22 * 0.91} ${2 * Math.PI * 22}`"
                      />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-[10px] font-bold text-highlighted">91%</span>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[9px] text-muted">Dropouts this sem: <span class="text-highlighted font-semibold">44</span></p>
                    <p class="text-[9px] text-muted">National avg: <span class="text-dimmed">83%</span></p>
                    <span class="inline-flex items-center gap-0.5 text-[8.5px] text-success font-medium">
                      <UIcon name="i-lucide-trending-up" class="size-3" /> Above average
                    </span>
                  </div>
                </div>
              </div>

              <!-- Top colleges by enrollment -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">By College</p>
                <div class="space-y-1.5">
                  <div v-for="col in collegeData" :key="col.name" class="flex items-center gap-2">
                    <span class="text-[9px] text-muted w-16 truncate">{{ col.name }}</span>
                    <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-primary transition-all" :style="{ width: col.pct + '%' }" />
                    </div>
                    <span class="text-[9px] text-dimmed w-8 text-right">{{ col.count }}</span>
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
  { label: 'Students', icon: 'i-lucide-users', active: false },
  { label: 'Enrollment', icon: 'i-lucide-clipboard-list', active: false },
  { label: 'Courses', icon: 'i-lucide-book-open', active: false },
  { label: 'Faculty', icon: 'i-lucide-user-check', active: false },
  { label: 'Grades', icon: 'i-lucide-award', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: true },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Enrollment', value: '4,821', badge: '↑ 7.6%', badgeClass: 'bg-success/10 text-success' },
  { label: 'Retention Rate', value: '91.0%', badge: '↑ 2.1%', badgeClass: 'bg-success/10 text-success' },
  { label: 'GPA Average', value: '2.85', badge: '↑ 0.12', badgeClass: 'bg-success/10 text-success' },
  { label: 'Failed Subjects', value: '3.4%', badge: '↓ 0.8%', badgeClass: 'bg-warning/10 text-warning' },
]

const enrollmentBars = [
  { sem: 'S1 \'23', newPct: 55, retPct: 70 },
  { sem: 'S2 \'23', newPct: 40, retPct: 75 },
  { sem: 'S1 \'24', newPct: 60, retPct: 78 },
  { sem: 'S2 \'24', newPct: 45, retPct: 80 },
  { sem: 'S1 \'25', newPct: 65, retPct: 82 },
  { sem: 'S2 \'25', newPct: 50, retPct: 85 },
  { sem: 'S1 \'26', newPct: 72, retPct: 92 },
]

const collegeData = [
  { name: 'Engineering', count: '1,840', pct: 90 },
  { name: 'Nursing', count: '1,156', pct: 64 },
  { name: 'Business', count: '966', pct: 53 },
  { name: 'Arts & Sci.', count: '859', pct: 47 },
]
</script>
