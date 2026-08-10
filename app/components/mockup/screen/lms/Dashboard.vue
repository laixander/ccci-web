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
        <span class="text-dimmed text-[10px]">app.learncore.edu/dashboard</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <!-- Logo -->
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-book-open" class="size-3.5 text-white" />
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
          <UAvatar text="DS" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Good morning, Dr. Smith 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">Fall Semester 2026 · 34 submissions to grade</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="New Announcement" icon="i-lucide-megaphone" color="primary" />
          </div>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- KPI cards -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="rounded-lg border border-default bg-elevated p-2.5"
            >
              <div class="flex items-center justify-between mb-1.5">
                <p class="text-[9.5px] text-muted font-medium">{{ kpi.label }}</p>
                <UIcon :name="kpi.icon" class="size-3.5" :class="kpi.iconColor" />
              </div>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
              <p class="text-[9px] mt-0.5" :class="kpi.changeColor">{{ kpi.change }}</p>
            </div>
          </div>

          <!-- Courses table + enrollment chart -->
          <div class="grid grid-cols-5 gap-2">
            <!-- Courses table -->
            <div class="col-span-3 rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 border-b border-default">
                <p class="text-[10px] font-semibold text-highlighted">Active Courses</p>
                <span class="text-[9px] text-primary cursor-default">View all &rarr;</span>
              </div>
              <table class="w-full">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Course</th>
                    <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Students</th>
                    <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="course in courses"
                    :key="course.title"
                    class="border-b border-default last:border-0"
                  >
                    <td class="px-3 py-1.5">
                      <div class="flex items-center gap-1.5">
                        <div class="size-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <UIcon :name="course.icon" class="size-3 text-primary" />
                        </div>
                        <div>
                          <span class="text-[10px] text-highlighted font-medium">{{ course.code }}</span>
                          <p class="text-[8.5px] text-muted">{{ course.title }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-2 py-1.5 text-[10px] text-muted">{{ course.students }}</td>
                    <td class="px-2 py-1.5">
                      <div class="flex items-center gap-1.5">
                        <div class="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                          <div class="h-full rounded-full bg-primary" :style="{ width: `${course.progress}%` }" />
                        </div>
                        <span class="text-[9px] text-dimmed w-6 text-right">{{ course.progress }}%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Submissions card -->
            <div class="col-span-2 rounded-lg border border-default bg-elevated p-3 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-semibold text-highlighted">Pending Grading</p>
                <span class="text-[9px] text-dimmed">This Week</span>
              </div>
              <div class="flex items-center justify-center my-1">
                <div class="size-14 rounded-full flex items-center justify-center" :style="donutStyle">
                  <div class="size-10 rounded-full bg-elevated flex items-center justify-center">
                    <span class="text-[9px] font-bold text-highlighted">34</span>
                  </div>
                </div>
              </div>
              <div class="space-y-1">
                <div v-for="item in pendingBreakdown" :key="item.label" class="flex items-center justify-between">
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
  return {
    background: `conic-gradient(#3b82f6 0% 60%, ${neutral} 60% 80%, #1d4ed8 80% 100%)`,
  }
})

const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'Courses', icon: 'i-lucide-book-open', active: false },
  { label: 'Students', icon: 'i-lucide-users', active: false },
  { label: 'Assignments', icon: 'i-lucide-file-text', active: false },
  { label: 'Grades', icon: 'i-lucide-award', active: false },
  { label: 'Live Class', icon: 'i-lucide-video', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Students', value: '1,248', icon: 'i-lucide-users', iconColor: 'text-primary', change: '↑ 48 this semester', changeColor: 'text-success' },
  { label: 'Submissions', value: '34', icon: 'i-lucide-file-edit', iconColor: 'text-warning', change: '↑ 12 since yesterday', changeColor: 'text-muted' },
  { label: 'Avg Progress', value: '65%', icon: 'i-lucide-trending-up', iconColor: 'text-primary', change: '↑ 5% this week', changeColor: 'text-success' },
  { label: 'Live Sessions', value: '3', icon: 'i-lucide-video', iconColor: 'text-info', change: 'Next: 2:00 PM today', changeColor: 'text-info' },
]

const courses = [
  { title: 'Introduction to Computer Science', code: 'CS101', students: 450, progress: 65, icon: 'i-lucide-monitor' },
  { title: 'Data Structures & Algorithms', code: 'CS201', students: 320, progress: 42, icon: 'i-lucide-git-merge' },
  { title: 'Web Development Bootcamp', code: 'WD100', students: 478, progress: 88, icon: 'i-lucide-globe' },
  { title: 'UI/UX Design Fundamentals', code: 'DES101', students: 210, progress: 55, icon: 'i-lucide-pen-tool' },
]

const pendingBreakdown = [
  { label: 'Quizzes', value: '18', dotClass: 'bg-primary' },
  { label: 'Assignments', value: '12', dotClass: 'bg-neutral-300 dark:bg-neutral-600' },
  { label: 'Projects', value: '4', dotClass: 'bg-blue-700' },
]
</script>
