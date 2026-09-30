<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Active Programs',   value: '14', icon: 'i-lucide-book-open',    color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Enrolled Today',    value: '87', icon: 'i-lucide-users',         color: 'text-info',    bg: 'bg-info/10'    },
  { label: 'Completed (MTD)',   value: '32', icon: 'i-lucide-award',         color: 'text-success', bg: 'bg-success/10' },
  { label: 'Certifications Due', value: '6', icon: 'i-lucide-alert-circle',  color: 'text-warning', bg: 'bg-warning/10' },
]

// ── Training programs ─────────────────────────────────────────────────────────
type TrainingStatus = 'Ongoing' | 'Upcoming' | 'Completed'
const programs = ref([
  { id: 'TRN-001', title: 'Data Privacy & Compliance',      category: 'Compliance',      duration: '2h',   enrolled: 142, completed: 138, status: 'Completed' as TrainingStatus, dueDate: 'Sep 30' },
  { id: 'TRN-002', title: 'Leadership Essentials',          category: 'Leadership',      duration: '8h',   enrolled: 24,  completed: 11,  status: 'Ongoing'   as TrainingStatus, dueDate: 'Oct 15' },
  { id: 'TRN-003', title: 'Onboarding Fundamentals',        category: 'Onboarding',      duration: '4h',   enrolled: 5,   completed: 2,   status: 'Ongoing'   as TrainingStatus, dueDate: 'Oct 8'  },
  { id: 'TRN-004', title: 'Excel for HR Professionals',     category: 'Technical',       duration: '3h',   enrolled: 38,  completed: 0,   status: 'Upcoming'  as TrainingStatus, dueDate: 'Oct 20' },
  { id: 'TRN-005', title: 'Workplace Safety & Health',      category: 'Compliance',      duration: '1.5h', enrolled: 210, completed: 196, status: 'Completed' as TrainingStatus, dueDate: 'Sep 15' },
  { id: 'TRN-006', title: 'Effective Communication Skills', category: 'Soft Skills',     duration: '5h',   enrolled: 60,  completed: 27,  status: 'Ongoing'   as TrainingStatus, dueDate: 'Oct 30' },
])

const statusConfig: Record<TrainingStatus, string> = {
  'Ongoing':   'bg-primary/10 text-primary',
  'Upcoming':  'bg-info/10 text-info',
  'Completed': 'bg-success/10 text-success',
}

function completionPct(p: typeof programs.value[0]) {
  return p.enrolled ? Math.round((p.completed / p.enrolled) * 100) : 0
}

// ── Employee training records ─────────────────────────────────────────────────
const trainingRecords = ref([
  { name: 'James Reyes',   initials: 'JR', color: 'primary'   as const, dept: 'Engineering', programs: 5, completed: 5, certExpiry: 'Dec 2026'  },
  { name: 'Mia Santos',    initials: 'MS', color: 'secondary' as const, dept: 'Marketing',   programs: 4, completed: 3, certExpiry: 'Mar 2027'  },
  { name: 'Carlos Wu',     initials: 'CW', color: 'neutral'   as const, dept: 'Sales',       programs: 6, completed: 4, certExpiry: 'Oct 2026'  },
  { name: 'Priya Lal',     initials: 'PL', color: 'primary'   as const, dept: 'HR & Admin',  programs: 7, completed: 7, certExpiry: 'Jan 2027'  },
  { name: 'Ryan Cruz',     initials: 'RC', color: 'success'   as const, dept: 'Engineering', programs: 3, completed: 1, certExpiry: 'Nov 2026'  },
  { name: 'Ana Dela Cruz', initials: 'AD', color: 'warning'   as const, dept: 'Operations',  programs: 5, completed: 5, certExpiry: 'Feb 2027'  },
])

// ── Certifications expiring soon ──────────────────────────────────────────────
const expiringCerts = ref([
  { name: 'Carlos Wu',   initials: 'CW', color: 'neutral'   as const, cert: 'OSH Compliance',       expiry: 'Oct 12, 2026', daysLeft: 12 },
  { name: 'Ryan Cruz',   initials: 'RC', color: 'success'   as const, cert: 'Data Privacy Act',     expiry: 'Oct 18, 2026', daysLeft: 18 },
  { name: 'Ben Torres',  initials: 'BT', color: 'secondary' as const, cert: 'Fire Safety Training', expiry: 'Oct 25, 2026', daysLeft: 25 },
])

// ── Add program modal ─────────────────────────────────────────────────────────
const showAddModal = ref(false)
const categories = ['Compliance', 'Leadership', 'Technical', 'Soft Skills', 'Onboarding', 'Safety']

// ── Program detail modal ──────────────────────────────────────────────────────
const showDetailModal = ref(false)
const selectedProgram = ref<typeof programs.value[0] | null>(null)
function viewProgram(p: typeof programs.value[0]) {
  selectedProgram.value = p
  showDetailModal.value = true
}

const categoryBreakdown = [
  { label: 'Compliance',  count: 3, pct: 80, icon: 'i-lucide-shield-check',    color: 'text-success',   bg: 'bg-success/10',   barColor: 'bg-success'   },
  { label: 'Leadership',  count: 2, pct: 46, icon: 'i-lucide-trending-up',     color: 'text-primary',   bg: 'bg-primary/10',   barColor: 'bg-primary'   },
  { label: 'Technical',   count: 4, pct: 30, icon: 'i-lucide-code-2',          color: 'text-info',      bg: 'bg-info/10',      barColor: 'bg-info'      },
  { label: 'Soft Skills', count: 3, pct: 55, icon: 'i-lucide-message-circle',  color: 'text-warning',   bg: 'bg-warning/10',   barColor: 'bg-warning'   },
  { label: 'Onboarding',  count: 2, pct: 40, icon: 'i-lucide-user-check',     color: 'text-secondary', bg: 'bg-secondary/10', barColor: 'bg-secondary' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Learning & Development</h1>
        <p class="text-muted text-sm mt-1">Track training programs, certifications, and employee development</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add Program" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
            <p class="text-xs text-muted">{{ stat.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Training Programs (2/3) -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Training Programs</h2>
            <UButton size="xs" label="Add Program" icon="i-lucide-plus" color="neutral" variant="ghost" @click="showAddModal = true" />
          </div>
        </template>
        <div class="divide-y divide-default">
          <div
            v-for="program in programs"
            :key="program.id"
            class="p-4 sm:px-6 hover:bg-muted/20 transition-colors cursor-pointer group"
            @click="viewProgram(program)"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <p class="font-medium text-highlighted text-sm group-hover:text-primary transition-colors">{{ program.title }}</p>
                </div>
                <div class="flex items-center gap-4 text-xs text-dimmed mb-2.5">
                  <UBadge :label="program.category" color="neutral" variant="subtle" size="xs" />
                  <span class="flex items-center gap-1"><UIcon name="i-lucide-clock" class="size-3" /> {{ program.duration }}</span>
                  <span class="flex items-center gap-1"><UIcon name="i-lucide-users" class="size-3" /> {{ program.enrolled }} enrolled</span>
                  <span class="flex items-center gap-1"><UIcon name="i-lucide-calendar" class="size-3" /> Due {{ program.dueDate }}</span>
                </div>
                <!-- Progress bar -->
                <div class="flex items-center gap-3">
                  <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="completionPct(program) === 100 ? 'bg-success' : 'bg-primary'"
                      :style="`width: ${completionPct(program)}%`"
                    />
                  </div>
                  <span class="text-xs font-semibold w-8 text-right" :class="completionPct(program) === 100 ? 'text-success' : 'text-muted'">
                    {{ completionPct(program) }}%
                  </span>
                </div>
              </div>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0"
                :class="statusConfig[program.status]"
              >{{ program.status }}</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Right column -->
      <div class="space-y-4">
        <!-- Expiring Certifications -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Expiring Certifications</h2>
              <UBadge :label="String(expiringCerts.length)" color="warning" variant="subtle" />
            </div>
          </template>
          <div class="space-y-3">
            <div v-for="cert in expiringCerts" :key="cert.name" class="flex items-start gap-3">
              <UAvatar :text="cert.initials" size="sm" :color="cert.color" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-highlighted">{{ cert.name }}</p>
                <p class="text-xs text-muted truncate">{{ cert.cert }}</p>
                <p class="text-xs mt-0.5" :class="cert.daysLeft <= 14 ? 'text-error font-medium' : 'text-dimmed'">
                  Expires {{ cert.expiry }}
                </p>
              </div>
              <span
                class="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                :class="cert.daysLeft <= 14 ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'"
              >{{ cert.daysLeft }}d</span>
            </div>
          </div>
        </UCard>

        <!-- Category breakdown -->
        <UCard title="Programs by Category">
          <div class="space-y-2.5">
            <div v-for="cat in categoryBreakdown" :key="cat.label" class="flex items-center gap-3">
              <div :class="['size-8 rounded-lg flex items-center justify-center flex-shrink-0', cat.bg]">
                <UIcon :name="cat.icon" :class="['size-4', cat.color]" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between mb-1">
                  <p class="text-xs font-medium text-highlighted">{{ cat.label }}</p>
                  <span class="text-xs text-muted">{{ cat.count }}</span>
                </div>
                <div class="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full" :class="cat.barColor" :style="`width: ${cat.pct}%`" />
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Employee Training Records -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Employee Training Records</h2>
      </template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider">Employee</th>
              <th class="text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider">Department</th>
              <th class="text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider">Programs</th>
              <th class="text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider">Completion</th>
              <th class="text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider">Cert Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rec in trainingRecords"
              :key="rec.name"
              class="border-b border-default last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <UAvatar :text="rec.initials" size="sm" :color="rec.color" />
                  <p class="font-medium text-highlighted">{{ rec.name }}</p>
                </div>
              </td>
              <td class="px-4 py-3.5">
                <UBadge :label="rec.dept" color="neutral" variant="subtle" size="sm" />
              </td>
              <td class="px-4 py-3.5 text-muted text-xs">{{ rec.completed }}/{{ rec.programs }} programs</td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2 w-32">
                  <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :class="Math.round(rec.completed / rec.programs * 100) === 100 ? 'bg-success' : 'bg-primary'"
                      :style="`width: ${Math.round(rec.completed / rec.programs * 100)}%`"
                    />
                  </div>
                  <span class="text-xs text-muted w-7 text-right">{{ Math.round(rec.completed / rec.programs * 100) }}%</span>
                </div>
              </td>
              <td class="px-4 py-3.5 text-xs text-muted">{{ rec.certExpiry }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Add Program Modal -->
    <UModal v-model:open="showAddModal" title="Add Training Program" description="Create a new training or development program">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Program Title">
            <UInput placeholder="e.g. Leadership Essentials" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Category">
              <USelect :items="categories" class="w-full" />
            </UFormField>
            <UFormField label="Duration">
              <UInput placeholder="e.g. 4h" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Description">
            <UTextarea placeholder="Describe the program objectives and content…" :rows="3" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Due Date">
              <UInput type="date" class="w-full" />
            </UFormField>
            <UFormField label="Assign To">
              <USelect :items="['All Employees', 'Engineering', 'Sales', 'Marketing', 'HR & Admin', 'Operations']" class="w-full" />
            </UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel"      color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Add Program" icon="i-lucide-plus" @click="showAddModal = false" />
      </template>
    </UModal>

    <!-- Program Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedProgram?.title || ''" :description="selectedProgram?.category">
      <template #body>
        <div v-if="selectedProgram" class="space-y-5">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Program ID</p>
              <p class="text-highlighted font-medium">{{ selectedProgram.id }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Status</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[selectedProgram.status]">
                {{ selectedProgram.status }}
              </span>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Duration</p>
              <p class="text-highlighted font-medium">{{ selectedProgram.duration }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Due Date</p>
              <p class="text-highlighted font-medium">{{ selectedProgram.dueDate }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Enrolled</p>
              <p class="text-highlighted font-medium">{{ selectedProgram.enrolled }} employees</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Completed</p>
              <p class="text-highlighted font-medium">{{ selectedProgram.completed }} employees</p>
            </div>
          </div>
          <USeparator />
          <div>
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-highlighted">Completion Rate</p>
              <span class="text-sm font-bold" :class="completionPct(selectedProgram) === 100 ? 'text-success' : 'text-primary'">
                {{ completionPct(selectedProgram) }}%
              </span>
            </div>
            <div class="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="completionPct(selectedProgram) === 100 ? 'bg-success' : 'bg-primary'"
                :style="`width: ${completionPct(selectedProgram)}%`"
              />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedProgram = null" />
      </template>
    </UModal>
  </div>
</template>

