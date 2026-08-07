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
        <span class="text-dimmed text-[10px]">app.campuscore.io/enrollment</span>
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

      <!-- Main enrollment content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Student Enrollment — 1st Semester 2026–27</p>
            <p class="text-[9px] text-dimmed mt-0.5">4,821 students · Enrollment closes Oct 15</p>
          </div>
          <div class="flex items-center gap-2">
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
            <UButton size="xs" label="Enroll Student" icon="i-lucide-user-plus" color="primary" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- Summary strip -->
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="s in summaryCards"
              :key="s.label"
              class="rounded-lg border border-default bg-elevated p-2.5"
            >
              <p class="text-[9px] text-muted mb-1">{{ s.label }}</p>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
              <p class="text-[8.5px] mt-0.5" :class="s.subtleClass">{{ s.sub }}</p>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="rounded-lg border border-default bg-elevated p-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-[10px] font-semibold text-highlighted">Enrollment Progress</p>
              <span class="text-[9px] text-primary font-medium">87% of target</span>
            </div>
            <div class="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div class="h-full rounded-full bg-primary transition-all" style="width: 87%" />
            </div>
            <div class="flex justify-between mt-1.5">
              <span class="text-[8.5px] text-dimmed">4,821 of 5,500 target slots</span>
              <span class="text-[8.5px] text-warning">679 slots remaining</span>
            </div>
          </div>

          <!-- Student enrollment table -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-2 border-b border-default">
              <p class="text-[10px] font-semibold text-highlighted">Student Records</p>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1">
                  <UIcon name="i-lucide-search" class="size-2.5 text-dimmed" />
                  <span class="text-[9px] text-dimmed">Search student...</span>
                </div>
                <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
                  <UIcon name="i-lucide-filter" class="size-2.5 text-dimmed" />
                  <span class="text-[9px] text-dimmed">College</span>
                  <UIcon name="i-lucide-chevron-down" class="size-2 text-dimmed" />
                </div>
              </div>
            </div>
            <table class="w-full">
              <thead>
                <tr class="border-b border-default">
                  <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Student</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">ID No.</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Program</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Year Level</th>
                  <th class="text-center px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in studentRows"
                  :key="row.name"
                  class="border-b border-default last:border-0"
                >
                  <td class="px-3 py-1.5">
                    <div class="flex items-center gap-1.5">
                      <UAvatar :text="row.initials" size="2xs" :color="row.avatarColor" />
                      <span class="text-[10px] text-highlighted font-medium">{{ row.name }}</span>
                    </div>
                  </td>
                  <td class="px-2 py-1.5 text-[10px] text-muted font-mono">{{ row.id }}</td>
                  <td class="px-2 py-1.5 text-[10px] text-muted">{{ row.program }}</td>
                  <td class="px-2 py-1.5 text-[10px] text-muted">{{ row.year }}</td>
                  <td class="px-2 py-1.5 text-center">
                    <span
                      class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium"
                      :class="row.statusClass"
                    >{{ row.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
  { label: 'Enrollment', icon: 'i-lucide-clipboard-list', active: true },
  { label: 'Courses', icon: 'i-lucide-book-open', active: false },
  { label: 'Faculty', icon: 'i-lucide-user-check', active: false },
  { label: 'Grades', icon: 'i-lucide-award', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const summaryCards = [
  { label: 'Fully Enrolled', value: '3,944', sub: '↑ 342 vs last semester', subtleClass: 'text-success' },
  { label: 'Pending Assessment', value: '621', sub: 'Awaiting clearance', subtleClass: 'text-warning' },
  { label: 'Tuition Collected', value: '₱12.4M', sub: '87% collection rate', subtleClass: 'text-primary' },
]

const studentRows = [
  { name: 'Juan dela Cruz', initials: 'JC', id: '2024-10042', program: 'BS Comp. Sci.', year: '3rd Year', status: 'Enrolled', statusClass: 'bg-success/10 text-success', avatarColor: 'primary' as const },
  { name: 'Maria Santos', initials: 'MS', id: '2025-00187', program: 'BS Nursing', year: '2nd Year', status: 'Pending', statusClass: 'bg-warning/10 text-warning', avatarColor: 'secondary' as const },
  { name: 'Carlo Reyes', initials: 'CR', id: '2023-05521', program: 'BS Civil Engr.', year: '4th Year', status: 'Enrolled', statusClass: 'bg-success/10 text-success', avatarColor: 'neutral' as const },
  { name: 'Ana Lim', initials: 'AL', id: '2026-00034', program: 'AB Communication', year: '1st Year', status: 'For Assessment', statusClass: 'bg-info/10 text-info', avatarColor: 'primary' as const },
  { name: 'Diego Manalo', initials: 'DM', id: '2022-09983', program: 'BS Accountancy', year: '4th Year', status: 'Enrolled', statusClass: 'bg-success/10 text-success', avatarColor: 'neutral' as const },
]
</script>
