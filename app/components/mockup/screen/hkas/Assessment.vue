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
        <span class="text-dimmed text-[10px]">app.kineticscore.io/fitness-tests</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
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
            <p class="text-[11px] font-bold text-highlighted">Fitness Assessment Records</p>
            <p class="text-[9px] text-dimmed mt-0.5">Q2 2026 · Grade 10-A · 38 students</p>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1">
              <UIcon name="i-lucide-search" class="size-3 text-dimmed" />
              <span class="text-[9px] text-dimmed">Search students...</span>
            </div>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>

        <!-- Filter tabs -->
        <div class="flex items-center gap-1 px-4 py-1.5 border-b border-default">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="[
              'text-[9px] px-2 py-0.5 rounded-full font-medium transition-colors',
              tab === 'All' ? 'bg-primary text-white' : 'text-muted hover:text-highlighted'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Assessment table -->
        <div class="flex-1 overflow-hidden px-3 py-2">
          <!-- Header -->
          <div class="grid grid-cols-12 gap-1 px-2 py-1 text-[8px] font-semibold text-dimmed uppercase tracking-wider">
            <span class="col-span-3">Student</span>
            <span class="col-span-2 text-center">VO₂ Max</span>
            <span class="col-span-2 text-center">BMI</span>
            <span class="col-span-2 text-center">Flexibility</span>
            <span class="col-span-1 text-center">Strength</span>
            <span class="col-span-1 text-center">Score</span>
            <span class="col-span-1 text-center">Status</span>
          </div>
          <!-- Rows -->
          <div class="space-y-0.5">
            <div
              v-for="student in students"
              :key="student.name"
              class="grid grid-cols-12 gap-1 px-2 py-1.5 rounded-md hover:bg-muted/50 items-center"
            >
              <div class="col-span-3 flex items-center gap-1.5 min-w-0">
                <UAvatar :text="student.initials" size="xs" :color="student.passed ? 'primary' : 'error'" />
                <span class="text-[9px] font-medium text-highlighted truncate">{{ student.name }}</span>
              </div>
              <span class="col-span-2 text-center text-[9px] text-muted">{{ student.vo2 }} mL/kg</span>
              <span class="col-span-2 text-center text-[9px] text-muted">{{ student.bmi }}</span>
              <div class="col-span-2 flex items-center justify-center">
                <div class="flex-1 bg-muted rounded-full h-1 max-w-[40px]">
                  <div class="h-1 rounded-full bg-primary" :style="{ width: student.flex + '%' }" />
                </div>
              </div>
              <span class="col-span-1 text-center text-[9px] font-semibold text-highlighted">{{ student.strength }}</span>
              <span class="col-span-1 text-center text-[9px] font-bold" :class="student.passed ? 'text-primary' : 'text-error'">
                {{ student.score }}
              </span>
              <div class="col-span-1 flex justify-center">
                <span :class="['text-[7.5px] px-1 py-0.5 rounded-full font-semibold', student.passed ? 'bg-success/10 text-success' : 'bg-error/10 text-error']">
                  {{ student.passed ? 'Pass' : 'Fail' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-4 py-1.5 border-t border-default">
          <span class="text-[9px] text-dimmed">Showing 6 of 38 students</span>
          <div class="flex gap-1">
            <div class="size-5 rounded border border-default flex items-center justify-center text-dimmed">
              <UIcon name="i-lucide-chevron-left" class="size-3" />
            </div>
            <div class="size-5 rounded bg-primary text-white flex items-center justify-center text-[9px] font-semibold">1</div>
            <div class="size-5 rounded border border-default flex items-center justify-center text-[9px] text-muted">2</div>
            <div class="size-5 rounded border border-default flex items-center justify-center text-dimmed">
              <UIcon name="i-lucide-chevron-right" class="size-3" />
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
  { label: 'Fitness Tests', icon: 'i-lucide-clipboard-list', active: true },
  { label: 'Body Composition', icon: 'i-lucide-person-standing', active: false },
  { label: 'PE Curriculum', icon: 'i-lucide-book-open', active: false },
  { label: 'Wellness', icon: 'i-lucide-heart-pulse', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const tabs = ['All', 'Pass', 'Fail', 'Pending']

const students = [
  { name: 'Maria Santos', initials: 'MS', vo2: '48.2', bmi: '21.4', flex: 88, strength: 'A', score: '92', passed: true },
  { name: 'Juan dela Cruz', initials: 'JC', vo2: '41.5', bmi: '23.1', flex: 72, strength: 'B+', score: '78', passed: true },
  { name: 'Ana Reyes', initials: 'AR', vo2: '44.8', bmi: '20.9', flex: 85, strength: 'A-', score: '85', passed: true },
  { name: 'Carlo Bautista', initials: 'CB', vo2: '32.1', bmi: '27.8', flex: 40, strength: 'C', score: '54', passed: false },
  { name: 'Liza Navarro', initials: 'LN', vo2: '46.3', bmi: '22.0', flex: 90, strength: 'A', score: '88', passed: true },
  { name: 'Marco Torres', initials: 'MT', vo2: '38.9', bmi: '25.2', flex: 61, strength: 'B', score: '71', passed: true },
]
</script>
