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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/performance</span>
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
            <p class="text-[11px] font-bold text-highlighted">Performance Management</p>
            <p class="text-[9px] text-dimmed mt-0.5">OKRs, reviews, and 360° feedback — all in one place</p>
          </div>
          <UButton size="xs" label="Start Review Cycle" icon="i-lucide-plus" color="primary" />
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-3 py-2.5 space-y-2.5">
          <!-- Active cycle banner -->
          <div class="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 flex items-center gap-3">
            <div class="size-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UIcon name="i-lucide-star" class="size-3.5 text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <p class="text-[9.5px] font-bold text-highlighted">Q3 2026 Review</p>
                <span class="text-[7.5px] bg-success/10 text-success rounded-full px-1.5 py-0.5 font-medium">Active</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full bg-primary" style="width: 50%" />
                </div>
                <span class="text-[8px] text-primary font-semibold">50%</span>
              </div>
            </div>
            <UButton size="xs" label="Remind" icon="i-lucide-bell" color="neutral" variant="outline" />
          </div>

          <!-- Stat strip -->
          <div class="grid grid-cols-4 gap-1.5">
            <div v-for="s in statCards" :key="s.label" class="rounded-lg border border-default bg-elevated p-2">
              <div class="flex items-center gap-1 mb-1">
                <UIcon :name="s.icon" :class="['size-2.5', s.color]" />
                <p class="text-[8.5px] text-muted">{{ s.label }}</p>
              </div>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
            </div>
          </div>

          <!-- Two-column grid -->
          <div class="grid grid-cols-2 gap-2">
            <!-- Employee reviews -->
            <div class="rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-1.5 border-b border-default">
                <p class="text-[9.5px] font-semibold text-highlighted">Employee Reviews</p>
                <span class="text-[7.5px] bg-primary/10 text-primary rounded-full px-1.5 py-0.5">Q3 2026</span>
              </div>
              <div class="divide-y divide-default">
                <div
                  v-for="emp in employees"
                  :key="emp.name"
                  class="flex items-center gap-2 px-3 py-1.5 hover:bg-muted/20"
                >
                  <UAvatar :text="emp.initials" size="2xs" :color="emp.color" />
                  <div class="flex-1 min-w-0">
                    <p class="text-[9px] font-medium text-highlighted truncate">{{ emp.name }}</p>
                    <p class="text-[7.5px] text-dimmed">{{ emp.dept }}</p>
                  </div>
                  <!-- Stars -->
                  <div class="flex gap-0.5">
                    <UIcon
                      v-for="i in 5"
                      :key="i"
                      name="i-lucide-star"
                      :class="['size-2.5', i <= Math.floor(emp.score) ? 'text-warning' : 'text-muted']"
                    />
                  </div>
                  <span class="text-[9px] font-bold text-highlighted">{{ emp.score }}</span>
                  <span
                    class="text-[7.5px] px-1.5 py-0.5 rounded-full font-medium"
                    :class="emp.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'"
                  >{{ emp.status }}</span>
                </div>
              </div>
            </div>

            <!-- OKR tracker + 360 feedback -->
            <div class="space-y-2">
              <!-- OKR tracker -->
              <div class="rounded-lg border border-default bg-elevated p-2.5">
                <p class="text-[9.5px] font-semibold text-highlighted mb-2">Team OKRs</p>
                <div class="space-y-2">
                  <div v-for="okr in okrTeams" :key="okr.team">
                    <div class="flex items-center justify-between mb-0.5">
                      <p class="text-[8.5px] font-medium text-highlighted">{{ okr.team }}</p>
                      <span
                        class="text-[8px] font-bold"
                        :class="okr.progress >= 80 ? 'text-success' : okr.progress >= 60 ? 'text-warning' : 'text-error'"
                      >{{ okr.progress }}%</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <div class="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          class="h-full rounded-full"
                          :class="okr.progress >= 80 ? 'bg-success' : okr.progress >= 60 ? 'bg-warning' : 'bg-error'"
                          :style="`width: ${okr.progress}%`"
                        />
                      </div>
                    </div>
                    <p class="text-[7.5px] text-dimmed mt-0.5">{{ okr.key }}</p>
                  </div>
                </div>
              </div>

              <!-- 360 Feedback snippet -->
              <div class="rounded-lg border border-default bg-elevated p-2.5">
                <p class="text-[9.5px] font-semibold text-highlighted mb-2">360° Peer Feedback</p>
                <div class="space-y-2">
                  <div
                    v-for="fb in feedbacks"
                    :key="fb.from"
                    class="rounded-md border border-default bg-muted/20 p-1.5 space-y-1"
                  >
                    <div class="flex gap-0.5 mb-0.5">
                      <UIcon
                        v-for="i in 5"
                        :key="i"
                        name="i-lucide-star"
                        :class="['size-2', i <= fb.rating ? 'text-warning' : 'text-muted']"
                      />
                    </div>
                    <p class="text-[7.5px] text-highlighted italic leading-snug line-clamp-2">"{{ fb.comment }}"</p>
                    <div class="flex items-center gap-1 pt-1 border-t border-default">
                      <UAvatar :text="fb.initials" size="2xs" :color="fb.color" />
                      <p class="text-[7.5px] text-dimmed">{{ fb.from }} → {{ fb.to }}</p>
                    </div>
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
  { label: 'Dashboard',    icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Employees',    icon: 'i-lucide-users',            active: false },
  { label: 'Timekeeping',  icon: 'i-lucide-clock',            active: false },
  { label: 'Payroll',      icon: 'i-lucide-banknote',         active: false },
  { label: 'Recruitment',  icon: 'i-lucide-user-plus',        active: false },
  { label: 'Learning',     icon: 'i-lucide-book-open',        active: false },
  { label: 'Performance',  icon: 'i-lucide-trending-up',      active: true  },
  { label: 'Self-Service', icon: 'i-lucide-user-cog',         active: false },
  { label: 'Analytics',    icon: 'i-lucide-bar-chart-2',      active: false },
]

const statCards = [
  { label: 'Reviews Done',  value: '48',  icon: 'i-lucide-check-circle', color: 'text-success' },
  { label: 'Pending',       value: '48',  icon: 'i-lucide-clock',        color: 'text-warning' },
  { label: 'Avg. Score',    value: '4.2', icon: 'i-lucide-star',         color: 'text-warning' },
  { label: 'Top Performers', value: '12', icon: 'i-lucide-trending-up',  color: 'text-primary' },
]

const employees = [
  { name: 'James Reyes',   initials: 'JR', dept: 'Engineering', score: 4.8, status: 'Completed', color: 'primary'   as const },
  { name: 'Ana Dela Cruz', initials: 'AD', dept: 'Operations',  score: 4.6, status: 'Completed', color: 'warning'   as const },
  { name: 'Carlos Wu',     initials: 'CW', dept: 'Sales',       score: 4.5, status: 'Pending',   color: 'neutral'   as const },
  { name: 'Mia Santos',    initials: 'MS', dept: 'Marketing',   score: 4.3, status: 'Completed', color: 'secondary' as const },
  { name: 'Priya Lal',     initials: 'PL', dept: 'HR & Admin',  score: 4.0, status: 'Completed', color: 'primary'   as const },
  { name: 'Ryan Cruz',     initials: 'RC', dept: 'Engineering', score: 3.5, status: 'Pending',   color: 'success'   as const },
]

const okrTeams = [
  { team: 'Engineering', progress: 72, key: '4 of 6 KRs on track'        },
  { team: 'Sales',       progress: 58, key: '₱5.8M / ₱10M ARR'           },
  { team: 'Marketing',   progress: 84, key: '840 of 1,000 leads acquired' },
  { team: 'HR & Admin',  progress: 90, key: 'Avg. 31 days to hire'        },
]

const feedbacks = [
  { from: 'James Reyes', to: 'Ana Dela Cruz', rating: 5, comment: 'Excellent cross-team coordination on the ops dashboard project.',       initials: 'JR', color: 'primary' as const },
  { from: 'Priya Lal',   to: 'James Reyes',   rating: 5, comment: 'Always delivers high quality code and mentors juniors well.',           initials: 'PL', color: 'primary' as const },
  { from: 'Carlos Wu',   to: 'Mia Santos',    rating: 4, comment: 'The new campaign materials were very helpful for sales outreach.',      initials: 'CW', color: 'neutral' as const },
]
</script>
