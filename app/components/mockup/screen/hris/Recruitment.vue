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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/recruitment</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-users" class="size-3.5 text-white" />
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
          <UAvatar text="SC" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Recruitment & Onboarding</p>
            <p class="text-[9px] text-dimmed mt-0.5">Manage hiring pipeline and onboard new hires</p>
          </div>
          <UButton size="xs" label="Post Job" icon="i-lucide-plus" color="primary" />
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-3 py-2.5 space-y-2.5">
          <!-- Stat strip -->
          <div class="grid grid-cols-4 gap-1.5">
            <div v-for="s in statCards" :key="s.label" class="rounded-lg border border-default bg-elevated p-2">
              <div class="flex items-center gap-1 mb-1">
                <UIcon :name="s.icon" class="size-2.5 text-muted" />
                <p class="text-[8.5px] text-muted">{{ s.label }}</p>
              </div>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
            </div>
          </div>

          <!-- Kanban pipeline -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-1.5 border-b border-default">
              <p class="text-[9.5px] font-semibold text-highlighted">Recruitment Pipeline</p>
            </div>
            <div class="grid grid-cols-4 divide-x divide-default p-0">
              <div v-for="col in pipeline" :key="col.stage" class="p-2.5 space-y-1.5">
                <!-- Column header -->
                <div class="flex items-center gap-1.5 mb-2">
                  <div :class="['size-4 rounded flex items-center justify-center', col.bg]">
                    <UIcon :name="col.icon" :class="['size-2.5', col.color]" />
                  </div>
                  <span class="text-[9px] font-semibold text-highlighted">{{ col.stage }}</span>
                  <span class="text-[8px] text-dimmed ml-auto">{{ col.candidates.length }}</span>
                </div>
                <!-- Candidate cards -->
                <div
                  v-for="cand in col.candidates"
                  :key="cand.name"
                  class="rounded-md border border-default bg-default p-1.5 flex items-center gap-1.5"
                >
                  <UAvatar :text="cand.initials" size="2xs" :color="cand.color" />
                  <div class="min-w-0">
                    <p class="text-[9px] font-medium text-highlighted truncate">{{ cand.name }}</p>
                    <p class="text-[7.5px] text-dimmed truncate">{{ cand.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Onboarding tracker -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-1.5 border-b border-default">
              <p class="text-[9.5px] font-semibold text-highlighted">Onboarding Tracker</p>
              <span class="text-[8px] bg-success/10 text-success rounded-full px-1.5 py-0.5">3 Active</span>
            </div>
            <div class="divide-y divide-default">
              <div
                v-for="emp in onboarding"
                :key="emp.name"
                class="flex items-center gap-2.5 px-3 py-2 hover:bg-muted/20"
              >
                <UAvatar :text="emp.initials" size="2xs" :color="emp.color" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <p class="text-[9.5px] font-medium text-highlighted truncate">{{ emp.name }}</p>
                    <span class="text-[8px] text-primary font-semibold ml-2 shrink-0">{{ emp.progress }}%</span>
                  </div>
                  <!-- Progress bar -->
                  <div class="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="emp.progress === 100 ? 'bg-success' : 'bg-primary'"
                      :style="`width: ${emp.progress}%`"
                    />
                  </div>
                  <p class="text-[7.5px] text-dimmed mt-0.5">{{ emp.role }} · Starts {{ emp.startDate }}</p>
                </div>
                <!-- Steps mini pills -->
                <div class="flex gap-0.5 shrink-0">
                  <span
                    v-for="(done, i) in emp.steps"
                    :key="i"
                    :class="['size-1.5 rounded-full', done ? 'bg-success' : 'bg-muted']"
                  />
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
  { label: 'Dashboard',    icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Employees',    icon: 'i-lucide-users',            active: false },
  { label: 'Timekeeping',  icon: 'i-lucide-clock',            active: false },
  { label: 'Payroll',      icon: 'i-lucide-banknote',         active: false },
  { label: 'Recruitment',  icon: 'i-lucide-user-plus',        active: true  },
  { label: 'Learning',     icon: 'i-lucide-book-open',        active: false },
  { label: 'Performance',  icon: 'i-lucide-trending-up',      active: false },
  { label: 'Self-Service', icon: 'i-lucide-user-cog',         active: false },
  { label: 'Analytics',    icon: 'i-lucide-bar-chart-2',      active: false },
]

const statCards = [
  { label: 'Open Positions',   value: '9',   icon: 'i-lucide-briefcase'  },
  { label: 'Applications',     value: '142', icon: 'i-lucide-file-text'  },
  { label: 'Interviews',       value: '3',   icon: 'i-lucide-calendar'   },
  { label: 'Onboarding',       value: '5',   icon: 'i-lucide-user-check' },
]

const pipeline = [
  {
    stage: 'Applied',    icon: 'i-lucide-file-text', color: 'text-muted',    bg: 'bg-muted/50',
    candidates: [
      { name: 'Ana Reyes',  role: 'Sr. Software Eng.',  initials: 'AR', color: 'primary'   as const },
      { name: 'Mark Tan',   role: 'Marketing Spec.',    initials: 'MT', color: 'secondary' as const },
      { name: 'Sofia Lim',  role: 'Sales Dev Rep',      initials: 'SL', color: 'neutral'   as const },
    ]
  },
  {
    stage: 'Screening',  icon: 'i-lucide-search',    color: 'text-info',     bg: 'bg-info/10',
    candidates: [
      { name: 'Jake Uy',   role: 'Sr. Software Eng.', initials: 'JU', color: 'primary' as const },
      { name: 'Mara Go',   role: 'HR Business Partner', initials: 'MG', color: 'warning' as const },
    ]
  },
  {
    stage: 'Interview',  icon: 'i-lucide-video',     color: 'text-warning',  bg: 'bg-warning/10',
    candidates: [
      { name: 'Leo Cruz',  role: 'DevOps Engineer',   initials: 'LC', color: 'success'   as const },
      { name: 'Nina Buan', role: 'Sales Dev Rep',     initials: 'NB', color: 'secondary' as const },
    ]
  },
  {
    stage: 'Offer Sent', icon: 'i-lucide-mail',      color: 'text-success',  bg: 'bg-success/10',
    candidates: [
      { name: 'C. Mendoza', role: 'DevOps Engineer', initials: 'CM', color: 'success' as const },
    ]
  },
]

const onboarding = [
  { name: 'Carlos Mendoza', initials: 'CM', role: 'DevOps Engineer',       color: 'success'   as const, progress: 60, startDate: 'Oct 1', steps: [true, true, true, false, false] },
  { name: 'Diana Flores',   initials: 'DF', role: 'Marketing Coordinator', color: 'secondary' as const, progress: 20, startDate: 'Oct 6', steps: [true, false, false, false, false] },
  { name: 'Ethan Liu',      initials: 'EL', role: 'Sales Dev Rep',         color: 'info'      as const, progress: 40, startDate: 'Oct 8', steps: [true, true, false, false, false] },
]
</script>
