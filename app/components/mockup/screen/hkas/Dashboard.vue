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
        <span class="text-dimmed text-[10px]">app.kineticscore.io/dashboard</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <!-- Logo -->
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-activity" class="size-3.5 text-white" />
          </div>
        </div>
        <!-- Nav icons -->
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
        <!-- User avatar -->
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="JR" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Good morning, Coach Reyes 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">August 26, 2026 · 42 assessments scheduled today</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="Start Assessment" icon="i-lucide-play" color="primary" />
          </div>
        </div>

        <!-- Dashboard body -->
        <div class="flex-1 overflow-hidden px-4 py-3 space-y-3">
          <!-- KPI row -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="rounded-lg p-2.5 border border-default bg-default"
            >
              <div class="flex items-center justify-between mb-1.5">
                <div :class="['size-5 rounded flex items-center justify-center', kpi.bg]">
                  <UIcon :name="kpi.icon" :class="['size-3', kpi.color]" />
                </div>
                <span :class="['text-[9px] font-medium', kpi.trend === 'up' ? 'text-success' : 'text-muted']">
                  {{ kpi.change }}
                </span>
              </div>
              <p class="text-[13px] font-extrabold text-highlighted leading-none">{{ kpi.value }}</p>
              <p class="text-[9px] text-dimmed mt-0.5">{{ kpi.label }}</p>
            </div>
          </div>

          <!-- Content row -->
          <div class="grid grid-cols-5 gap-2 h-[180px]">
            <!-- Recent assessments -->
            <div class="col-span-3 rounded-lg border border-default bg-default p-2.5 flex flex-col">
              <p class="text-[10px] font-semibold text-highlighted mb-2">Recent Assessments</p>
              <div class="space-y-1.5 flex-1 overflow-hidden">
                <div
                  v-for="item in recentAssessments"
                  :key="item.name"
                  class="flex items-center gap-2"
                >
                  <UAvatar :text="item.initials" size="xs" color="primary" />
                  <div class="flex-1 min-w-0">
                    <p class="text-[9px] font-semibold text-highlighted truncate">{{ item.name }}</p>
                    <div class="flex items-center gap-1 mt-0.5">
                      <div class="flex-1 bg-muted rounded-full h-1">
                        <div
                          class="h-1 rounded-full bg-primary transition-all"
                          :style="{ width: item.score + '%' }"
                        />
                      </div>
                      <span class="text-[9px] text-dimmed shrink-0">{{ item.score }}%</span>
                    </div>
                  </div>
                  <span :class="['text-[8px] px-1.5 py-0.5 rounded-full font-semibold shrink-0', item.passed ? 'bg-success/10 text-success' : 'bg-error/10 text-error']">
                    {{ item.passed ? 'Pass' : 'Fail' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Fitness scores summary -->
            <div class="col-span-2 rounded-lg border border-default bg-default p-2.5 flex flex-col">
              <p class="text-[10px] font-semibold text-highlighted mb-2">Avg Fitness Scores</p>
              <div class="space-y-2 flex-1">
                <div v-for="metric in fitnessMetrics" :key="metric.label">
                  <div class="flex justify-between items-center mb-0.5">
                    <span class="text-[9px] text-dimmed">{{ metric.label }}</span>
                    <span class="text-[9px] font-semibold text-highlighted">{{ metric.value }}</span>
                  </div>
                  <div class="bg-muted rounded-full h-1.5">
                    <div
                      :class="['h-1.5 rounded-full', metric.color]"
                      :style="{ width: metric.pct + '%' }"
                    />
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
  { label: 'Fitness Tests', icon: 'i-lucide-clipboard-list', active: false },
  { label: 'Body Composition', icon: 'i-lucide-person-standing', active: false },
  { label: 'PE Curriculum', icon: 'i-lucide-book-open', active: false },
  { label: 'Wellness', icon: 'i-lucide-heart-pulse', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Assessed Today', value: '128', icon: 'i-lucide-clipboard-list', color: 'text-primary', bg: 'bg-primary/10', change: '↑ 14', trend: 'up' },
  { label: 'Pass Rate', value: '87.3%', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', change: '↑ 3.1%', trend: 'up' },
  { label: 'Avg VO₂ Max', value: '44.2', icon: 'i-lucide-wind', color: 'text-info', bg: 'bg-info/10', change: '↑ 0.8', trend: 'up' },
  { label: 'Active Programs', value: '12', icon: 'i-lucide-trophy', color: 'text-warning', bg: 'bg-warning/10', change: 'This term', trend: 'neutral' },
]

const recentAssessments = [
  { name: 'Maria Santos', initials: 'MS', score: 92, passed: true },
  { name: 'Juan dela Cruz', initials: 'JC', score: 78, passed: true },
  { name: 'Ana Reyes', initials: 'AR', score: 85, passed: true },
  { name: 'Carlo Bautista', initials: 'CB', score: 54, passed: false },
  { name: 'Liza Navarro', initials: 'LN', score: 88, passed: true },
]

const fitnessMetrics = [
  { label: 'Cardiovascular', value: '82%', pct: 82, color: 'bg-primary' },
  { label: 'Flexibility', value: '74%', pct: 74, color: 'bg-warning' },
  { label: 'Strength', value: '68%', pct: 68, color: 'bg-info' },
  { label: 'Endurance', value: '79%', pct: 79, color: 'bg-success' },
]
</script>
