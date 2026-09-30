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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/learning</span>
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
            <p class="text-[11px] font-bold text-highlighted">Learning & Development</p>
            <p class="text-[9px] text-dimmed mt-0.5">Track training programs, certifications & skills</p>
          </div>
          <UButton size="xs" label="Add Program" icon="i-lucide-plus" color="primary" />
        </div>

        <div class="flex flex-1 overflow-hidden">
          <!-- Left: programs list -->
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

            <!-- Programs list -->
            <div class="rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-1.5 border-b border-default">
                <p class="text-[9.5px] font-semibold text-highlighted">Training Programs</p>
                <span class="text-[8px] text-dimmed">6 programs</span>
              </div>
              <div class="divide-y divide-default">
                <div
                  v-for="program in programs"
                  :key="program.title"
                  class="px-3 py-2 hover:bg-muted/20"
                >
                  <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <p class="text-[9.5px] font-medium text-highlighted truncate">{{ program.title }}</p>
                    </div>
                    <span
                      class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[7.5px] font-medium ml-2 shrink-0"
                      :class="program.statusClass"
                    >{{ program.status }}</span>
                  </div>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-[7.5px] bg-muted text-muted rounded px-1 py-0.5">{{ program.category }}</span>
                    <span class="text-[7.5px] text-dimmed flex items-center gap-0.5">
                      <UIcon name="i-lucide-users" class="size-2" />{{ program.enrolled }}
                    </span>
                    <span class="text-[7.5px] text-dimmed flex items-center gap-0.5">
                      <UIcon name="i-lucide-clock" class="size-2" />{{ program.duration }}
                    </span>
                  </div>
                  <!-- Progress bar -->
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        class="h-full rounded-full"
                        :class="program.pct === 100 ? 'bg-success' : 'bg-primary'"
                        :style="`width: ${program.pct}%`"
                      />
                    </div>
                    <span class="text-[7.5px] text-dimmed w-6 text-right">{{ program.pct }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right panel -->
          <div class="w-[38%] border-l border-default flex-shrink-0 overflow-y-auto scrollbar px-3 py-2.5 space-y-2.5">
            <!-- Expiring certs -->
            <div class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center justify-between mb-2">
                <p class="text-[9.5px] font-semibold text-highlighted">Expiring Certs</p>
                <span class="text-[8px] bg-warning/10 text-warning rounded-full px-1.5 py-0.5">3 Soon</span>
              </div>
              <div class="space-y-2">
                <div
                  v-for="cert in expiringCerts"
                  :key="cert.name"
                  class="flex items-center gap-2 pb-2 border-b border-default last:border-0 last:pb-0"
                >
                  <UAvatar :text="cert.initials" size="2xs" :color="cert.color" />
                  <div class="flex-1 min-w-0">
                    <p class="text-[9px] font-medium text-highlighted truncate">{{ cert.name }}</p>
                    <p class="text-[7.5px] text-dimmed truncate">{{ cert.cert }}</p>
                  </div>
                  <span
                    class="text-[7.5px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                    :class="cert.urgent ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'"
                  >{{ cert.days }}d</span>
                </div>
              </div>
            </div>

            <!-- Category breakdown -->
            <div class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9.5px] font-semibold text-highlighted mb-2">By Category</p>
              <div class="space-y-2">
                <div v-for="cat in categories" :key="cat.label">
                  <div class="flex items-center justify-between mb-0.5">
                    <p class="text-[8.5px] text-highlighted">{{ cat.label }}</p>
                    <span class="text-[7.5px] text-dimmed">{{ cat.count }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full" :class="cat.barColor" :style="`width: ${cat.pct}%`" />
                    </div>
                    <span class="text-[7.5px] text-dimmed">{{ cat.pct }}%</span>
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
  { label: 'Learning',     icon: 'i-lucide-book-open',        active: true  },
  { label: 'Performance',  icon: 'i-lucide-trending-up',      active: false },
  { label: 'Self-Service', icon: 'i-lucide-user-cog',         active: false },
  { label: 'Analytics',    icon: 'i-lucide-bar-chart-2',      active: false },
]

const statCards = [
  { label: 'Programs',     value: '14', icon: 'i-lucide-book-open'   },
  { label: 'Enrolled',     value: '87', icon: 'i-lucide-users'        },
  { label: 'Completed',    value: '32', icon: 'i-lucide-award'        },
  { label: 'Certs Due',    value: '6',  icon: 'i-lucide-alert-circle' },
]

const programs = [
  { title: 'Data Privacy & Compliance',      category: 'Compliance',  duration: '2h',   enrolled: 142, pct: 97, status: 'Completed', statusClass: 'bg-success/10 text-success' },
  { title: 'Leadership Essentials',          category: 'Leadership',  duration: '8h',   enrolled: 24,  pct: 46, status: 'Ongoing',   statusClass: 'bg-primary/10 text-primary' },
  { title: 'Onboarding Fundamentals',        category: 'Onboarding',  duration: '4h',   enrolled: 5,   pct: 40, status: 'Ongoing',   statusClass: 'bg-primary/10 text-primary' },
  { title: 'Excel for HR Professionals',     category: 'Technical',   duration: '3h',   enrolled: 38,  pct: 0,  status: 'Upcoming',  statusClass: 'bg-info/10 text-info'       },
  { title: 'Effective Communication Skills', category: 'Soft Skills', duration: '5h',   enrolled: 60,  pct: 45, status: 'Ongoing',   statusClass: 'bg-primary/10 text-primary' },
]

const expiringCerts = [
  { name: 'Carlos Wu',  initials: 'CW', color: 'neutral'   as const, cert: 'OSH Compliance',       days: 12, urgent: true  },
  { name: 'Ryan Cruz',  initials: 'RC', color: 'success'   as const, cert: 'Data Privacy Act',     days: 18, urgent: false },
  { name: 'Ben Torres', initials: 'BT', color: 'secondary' as const, cert: 'Fire Safety Training', days: 25, urgent: false },
]

const categories = [
  { label: 'Compliance',  count: 3, pct: 80, barColor: 'bg-success'   },
  { label: 'Leadership',  count: 2, pct: 46, barColor: 'bg-primary'   },
  { label: 'Technical',   count: 4, pct: 30, barColor: 'bg-info'      },
  { label: 'Soft Skills', count: 3, pct: 55, barColor: 'bg-warning'   },
  { label: 'Onboarding',  count: 2, pct: 40, barColor: 'bg-secondary' },
]
</script>
