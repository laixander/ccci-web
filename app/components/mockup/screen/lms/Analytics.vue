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
        <span class="text-dimmed text-[10px]">app.learncore.edu/analytics</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-book-open" class="size-3.5 text-white" />
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
          <UAvatar text="DS" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main analytics content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Learning Analytics</p>
            <p class="text-[9px] text-dimmed mt-0.5">Fall 2026 · Updated just now</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-calendar" class="size-3 text-dimmed" />
              <span class="text-[9px] text-muted">Last 30 days</span>
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
            <!-- Engagement bar chart -->
            <div class="col-span-3 rounded-lg border border-default bg-elevated p-3">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] font-semibold text-highlighted">Engagement Over Time</p>
                <div class="flex items-center gap-2">
                  <span class="flex items-center gap-1 text-[8.5px] text-muted">
                    <span class="size-1.5 rounded-full bg-primary inline-block" /> Logins
                  </span>
                  <span class="flex items-center gap-1 text-[8.5px] text-muted">
                    <span class="size-1.5 rounded-full bg-success inline-block" /> Completions
                  </span>
                </div>
              </div>
              <!-- Bar chart -->
              <div class="flex items-end justify-between gap-1">
                <div
                  v-for="bar in chartData"
                  :key="bar.label"
                  class="flex-1 flex flex-col items-center gap-0.5"
                >
                  <div class="w-full flex items-end gap-px justify-center" style="height: 140px">
                    <div
                      class="flex-1 rounded-sm bg-primary/80 transition-all"
                      :style="{ height: bar.logins + '%' }"
                    />
                    <div
                      class="flex-1 rounded-sm bg-success/70 transition-all"
                      :style="{ height: bar.completions + '%' }"
                    />
                  </div>
                  <span class="text-[8px] text-dimmed">{{ bar.label }}</span>
                </div>
              </div>
            </div>

            <!-- Right column -->
            <div class="col-span-2 flex flex-col gap-2">
              <!-- Completion rate -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Completion Rate</p>
                <div class="flex items-center gap-3">
                  <div class="relative flex-shrink-0">
                    <svg width="52" height="52" viewBox="0 0 52 52" class="-rotate-90">
                      <circle cx="26" cy="26" r="22" fill="none" stroke-width="5" class="stroke-muted" />
                      <circle
                        cx="26" cy="26" r="22" fill="none" stroke-width="5"
                        class="stroke-primary"
                        stroke-linecap="round"
                        :stroke-dasharray="`${2 * Math.PI * 22 * 0.74} ${2 * Math.PI * 22}`"
                      />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-[10px] font-bold text-highlighted">74%</span>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[9px] text-muted">Completed: <span class="text-highlighted font-semibold">922</span></p>
                    <p class="text-[9px] text-muted">In Progress: <span class="text-dimmed">326</span></p>
                    <span class="inline-flex items-center gap-0.5 text-[8.5px] text-success font-medium">
                      <UIcon name="i-lucide-trending-up" class="size-3" /> Above avg
                    </span>
                  </div>
                </div>
              </div>

              <!-- At-risk learners -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">At-Risk Learners</p>
                <div class="space-y-1.5">
                  <div v-for="student in atRiskStudents" :key="student.name" class="flex items-center gap-2">
                    <UAvatar :text="student.initials" size="2xs" />
                    <div class="flex-1 min-w-0">
                      <p class="text-[9.5px] font-medium text-highlighted truncate">{{ student.name }}</p>
                      <p class="text-[8px] text-muted">{{ student.issue }}</p>
                    </div>
                    <span class="text-[8px] font-medium px-1 py-0.5 rounded bg-warning/10 text-warning flex-shrink-0">{{ student.progress }}%</span>
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
  { label: 'Courses', icon: 'i-lucide-book-open', active: false },
  { label: 'Students', icon: 'i-lucide-users', active: false },
  { label: 'Assignments', icon: 'i-lucide-file-text', active: false },
  { label: 'Grades', icon: 'i-lucide-award', active: false },
  { label: 'Live Class', icon: 'i-lucide-video', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: true },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Learners', value: '1,248', badge: '↑ 5.2%', badgeClass: 'bg-success/10 text-success' },
  { label: 'Completion Rate', value: '74%', badge: '↑ 3.1%', badgeClass: 'bg-success/10 text-success' },
  { label: 'Avg Score', value: '82/100', badge: '↑ 4pt', badgeClass: 'bg-success/10 text-success' },
  { label: 'At-Risk', value: '47', badge: '↑ 8', badgeClass: 'bg-warning/10 text-warning' },
]

const chartData = [
  { label: 'W1', logins: 45, completions: 20 },
  { label: 'W2', logins: 60, completions: 35 },
  { label: 'W3', logins: 55, completions: 40 },
  { label: 'W4', logins: 80, completions: 65 },
  { label: 'W5', logins: 70, completions: 75 },
  { label: 'W6', logins: 90, completions: 85 },
]

const atRiskStudents = [
  { name: 'Alice Walker', initials: 'AW', issue: 'Missed 2 assignments', progress: 28 },
  { name: 'Bob Smith', initials: 'BS', issue: 'Inactive for 7 days', progress: 15 },
  { name: 'Charlie Davis', initials: 'CD', issue: 'Failed last quiz', progress: 41 },
]
</script>
