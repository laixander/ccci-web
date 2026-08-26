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
        <span class="text-dimmed text-[10px]">app.kineticscore.io/analytics</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-activity" class="size-3.5 text-white" />
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
          <UAvatar text="JR" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Fitness Analytics</p>
            <p class="text-[9px] text-dimmed mt-0.5">School Year 2025–2026 · All Grade Levels</p>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 text-[9px] text-muted">
              <UIcon name="i-lucide-calendar" class="size-3" />
              SY 2025–2026
            </div>
            <UButton size="xs" label="Download Report" icon="i-lucide-file-bar-chart" color="primary" />
          </div>
        </div>

        <!-- Analytics grid -->
        <div class="flex-1 overflow-hidden px-3 py-2.5 grid grid-cols-5 gap-2.5">
          <!-- Left: Fitness trend chart (sparkline simulation) -->
          <div class="col-span-3 rounded-lg border border-default bg-default p-2.5 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <p class="text-[10px] font-semibold text-highlighted">Overall Fitness Trend</p>
              <div class="flex gap-1.5">
                <div v-for="legend in chartLegend" :key="legend.label" class="flex items-center gap-1">
                  <span class="size-1.5 rounded-full" :class="legend.color" />
                  <span class="text-[8px] text-dimmed">{{ legend.label }}</span>
                </div>
              </div>
            </div>
            <!-- SVG chart -->
            <div class="flex-1 relative">
              <svg viewBox="0 0 260 100" class="w-full h-full" preserveAspectRatio="none">
                <!-- Grid lines -->
                <line v-for="y in [20, 40, 60, 80]" :key="y" x1="0" :y1="y" x2="260" :y2="y" stroke="currentColor" stroke-width="0.5" class="text-default" />
                <!-- Pass rate area -->
                <path d="M0,55 L40,48 L80,42 L120,38 L160,32 L200,28 L240,22 L260,18 L260,100 L0,100Z" fill="currentColor" class="text-primary/10" />
                <path d="M0,55 L40,48 L80,42 L120,38 L160,32 L200,28 L240,22 L260,18" fill="none" stroke="currentColor" stroke-width="1.5" class="text-primary" stroke-linecap="round" stroke-linejoin="round" />
                <!-- Avg score line -->
                <path d="M0,70 L40,65 L80,60 L120,58 L160,52 L200,48 L240,44 L260,40" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3,2" class="text-warning" stroke-linecap="round" stroke-linejoin="round" />
                <!-- Data points -->
                <circle v-for="pt in chartPoints" :key="pt.x" :cx="pt.x" :cy="pt.y" r="2" fill="currentColor" class="text-primary" />
              </svg>
              <!-- X-axis labels -->
              <div class="flex justify-between mt-1">
                <span v-for="m in months" :key="m" class="text-[8px] text-dimmed">{{ m }}</span>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="col-span-2 flex flex-col gap-2">
            <!-- Department comparison -->
            <div class="rounded-lg border border-default bg-default p-2.5">
              <p class="text-[10px] font-semibold text-highlighted mb-2">By Grade Level</p>
              <div class="space-y-1.5">
                <div v-for="grade in gradeData" :key="grade.label" class="flex items-center gap-2">
                  <span class="text-[8px] text-dimmed w-10 shrink-0">{{ grade.label }}</span>
                  <div class="flex-1 bg-muted rounded-full h-1.5">
                    <div class="h-1.5 rounded-full bg-primary" :style="{ width: grade.pct + '%' }" />
                  </div>
                  <span class="text-[8px] font-semibold text-highlighted w-6 text-right">{{ grade.pct }}%</span>
                </div>
              </div>
            </div>

            <!-- Health distribution donut-like stats -->
            <div class="rounded-lg border border-default bg-default p-2.5 flex-1">
              <p class="text-[10px] font-semibold text-highlighted mb-2">Health Status</p>
              <div class="grid grid-cols-2 gap-1.5">
                <div v-for="stat in healthStats" :key="stat.label" :class="['rounded-md p-1.5', stat.bg]">
                  <p :class="['text-[13px] font-extrabold leading-none', stat.color]">{{ stat.value }}</p>
                  <p class="text-[8px] text-dimmed mt-0.5">{{ stat.label }}</p>
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
  { label: 'Fitness Tests', icon: 'i-lucide-clipboard-list', active: false },
  { label: 'Body Composition', icon: 'i-lucide-person-standing', active: false },
  { label: 'PE Curriculum', icon: 'i-lucide-book-open', active: false },
  { label: 'Wellness', icon: 'i-lucide-heart-pulse', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: true },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const chartLegend = [
  { label: 'Pass Rate', color: 'bg-primary' },
  { label: 'Avg Score', color: 'bg-warning' },
]

const chartPoints = [
  { x: 0, y: 55 }, { x: 40, y: 48 }, { x: 80, y: 42 },
  { x: 120, y: 38 }, { x: 160, y: 32 }, { x: 200, y: 28 },
  { x: 240, y: 22 }, { x: 260, y: 18 },
]

const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

const gradeData = [
  { label: 'Grade 7', pct: 72 },
  { label: 'Grade 8', pct: 78 },
  { label: 'Grade 9', pct: 81 },
  { label: 'Grade 10', pct: 87 },
  { label: 'Grade 11', pct: 85 },
]

const healthStats = [
  { label: 'Excellent', value: '31%', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Good', value: '44%', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'At Risk', value: '18%', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Critical', value: '7%', color: 'text-error', bg: 'bg-error/10' },
]
</script>
