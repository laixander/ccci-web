<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Open Positions',    value: '9',   icon: 'i-lucide-briefcase',  color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Applications',      value: '142', icon: 'i-lucide-file-text',  color: 'text-info',    bg: 'bg-info/10'    },
  { label: 'Interviews Today',  value: '3',   icon: 'i-lucide-calendar',   color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Onboarding Now',    value: '5',   icon: 'i-lucide-user-check', color: 'text-success', bg: 'bg-success/10' },
]

// ── Kanban pipeline ───────────────────────────────────────────────────────────
const pipeline = [
  {
    stage: 'Applied',
    icon: 'i-lucide-file-text',
    color: 'text-muted',
    bg: 'bg-muted/50',
    candidates: [
      { name: 'Ana Reyes',    role: 'Sr. Software Engineer',  initials: 'AR', color: 'primary'   as const },
      { name: 'Mark Tan',     role: 'Marketing Specialist',   initials: 'MT', color: 'secondary' as const },
      { name: 'Sofia Lim',    role: 'Sales Dev Rep',          initials: 'SL', color: 'neutral'   as const },
    ]
  },
  {
    stage: 'Screening',
    icon: 'i-lucide-search',
    color: 'text-info',
    bg: 'bg-info/10',
    candidates: [
      { name: 'Jake Uy',   role: 'Sr. Software Engineer', initials: 'JU', color: 'primary' as const },
      { name: 'Mara Go',   role: 'HR Business Partner',   initials: 'MG', color: 'warning' as const },
    ]
  },
  {
    stage: 'Interview',
    icon: 'i-lucide-video',
    color: 'text-warning',
    bg: 'bg-warning/10',
    candidates: [
      { name: 'Leo Cruz',  role: 'DevOps Engineer',  initials: 'LC', color: 'success'   as const },
      { name: 'Nina Buan', role: 'Sales Dev Rep',    initials: 'NB', color: 'secondary' as const },
    ]
  },
  {
    stage: 'Offer Sent',
    icon: 'i-lucide-mail',
    color: 'text-success',
    bg: 'bg-success/10',
    candidates: [
      { name: 'Carlos Mendoza', role: 'DevOps Engineer', initials: 'CM', color: 'success' as const },
    ]
  },
]

// ── Open positions ────────────────────────────────────────────────────────────
const openRoles = ref([
  { title: 'Senior Software Engineer', dept: 'Engineering',  type: 'Full-time', applicants: 38, stage: 'Interviewing', posted: 'Jul 20', priority: 'High'   },
  { title: 'Marketing Specialist',     dept: 'Marketing',    type: 'Full-time', applicants: 24, stage: 'Screening',    posted: 'Aug 1',  priority: 'Medium' },
  { title: 'Sales Development Rep',    dept: 'Sales',        type: 'Full-time', applicants: 51, stage: 'Interviewing', posted: 'Jul 28', priority: 'High'   },
  { title: 'HR Business Partner',      dept: 'HR & Admin',   type: 'Full-time', applicants: 17, stage: 'Review',       posted: 'Aug 5',  priority: 'Medium' },
  { title: 'DevOps Engineer',          dept: 'Engineering',  type: 'Full-time', applicants: 12, stage: 'Offer',        posted: 'Jul 15', priority: 'High'   },
])

const priorityConfig: Record<string, string> = {
  'High': 'error', 'Medium': 'warning', 'Low': 'neutral',
}

// ── Today's interviews ────────────────────────────────────────────────────────
const todayInterviews = [
  { candidate: 'Leo Cruz',  role: 'DevOps Engineer',       time: '10:00 AM', interviewer: 'James Reyes', type: 'Technical'  },
  { candidate: 'Nina Buan', role: 'Sales Dev Rep',         time: '2:00 PM',  interviewer: 'Carlos Wu',   type: 'Behavioral' },
  { candidate: 'Jake Uy',   role: 'Sr. Software Engineer', time: '4:00 PM',  interviewer: 'Priya Lal',   type: 'HR Screen'  },
]

// ── Onboarding ────────────────────────────────────────────────────────────────
type OnboardStep = { label: string; done: boolean }
type OnboardEmployee = {
  name: string
  initials: string
  role: string
  dept: string
  startDate: string
  color: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'
  steps: OnboardStep[]
}

const onboardingEmployees = ref<OnboardEmployee[]>([
  {
    name: 'Carlos Mendoza', initials: 'CM', role: 'DevOps Engineer',       dept: 'Engineering', startDate: 'Oct 1, 2026', color: 'success',
    steps: [
      { label: 'Offer Accepted',       done: true  },
      { label: 'Documents Submitted',  done: true  },
      { label: 'IT Setup',             done: true  },
      { label: 'Orientation',          done: false },
      { label: 'Training Assigned',    done: false },
    ]
  },
  {
    name: 'Diana Flores',   initials: 'DF', role: 'Marketing Coordinator', dept: 'Marketing',   startDate: 'Oct 6, 2026', color: 'secondary',
    steps: [
      { label: 'Offer Accepted',       done: true  },
      { label: 'Documents Submitted',  done: false },
      { label: 'IT Setup',             done: false },
      { label: 'Orientation',          done: false },
      { label: 'Training Assigned',    done: false },
    ]
  },
  {
    name: 'Ethan Liu',      initials: 'EL', role: 'Sales Development Rep', dept: 'Sales',       startDate: 'Oct 8, 2026', color: 'info',
    steps: [
      { label: 'Offer Accepted',       done: true  },
      { label: 'Documents Submitted',  done: true  },
      { label: 'IT Setup',             done: false },
      { label: 'Orientation',          done: false },
      { label: 'Training Assigned',    done: false },
    ]
  },
])

function completedSteps(emp: OnboardEmployee) {
  return emp.steps.filter(s => s.done).length
}
function progressPercent(emp: OnboardEmployee) {
  return Math.round((completedSteps(emp) / emp.steps.length) * 100)
}
function toggleStep(emp: OnboardEmployee, stepIdx: number) {
  const step = emp.steps[stepIdx]
  if (step) step.done = !step.done
}

// ── Post Job modal ────────────────────────────────────────────────────────────
const showPostJobModal = ref(false)
const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR & Admin']

// ── Detail modal ──────────────────────────────────────────────────────────────
const showOnboardModal = ref(false)
const selectedEmployee = ref<OnboardEmployee | null>(null)
function openOnboardDetail(emp: OnboardEmployee) {
  selectedEmployee.value = emp
  showOnboardModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Recruitment & Onboarding</h1>
        <p class="text-muted text-sm mt-1">Manage your full hiring pipeline and onboard new hires seamlessly</p>
      </div>
      <UButton icon="i-lucide-plus" label="Post Job" size="sm" @click="showPostJobModal = true" />
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

    <!-- Recruitment Pipeline (Kanban) -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-highlighted">Recruitment Pipeline</h2>
          <UButton label="View all candidates" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" />
        </div>
      </template>
      <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-default">
        <div v-for="col in pipeline" :key="col.stage" class="space-y-3 p-4">
          <div class="flex items-center gap-2 mb-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center', col.bg]">
              <UIcon :name="col.icon" :class="['size-3.5', col.color]" />
            </div>
            <span class="text-sm font-semibold text-highlighted">{{ col.stage }}</span>
            <span class="text-xs text-dimmed ml-auto">{{ col.candidates.length }}</span>
          </div>
          <UCard
            v-for="cand in col.candidates"
            :key="cand.name"
            :ui="{ root: 'group hover:ring-1 hover:ring-primary/30 transition-colors cursor-pointer', body: 'sm:p-4 flex items-center justify-between' }"
          >
            <UUser
              :description="cand.role"
              :avatar="{ text: cand.initials, color: cand.color }"
              size="sm"
              :ui="{ description: 'text-[10px] leading-tight' }"
            >
              <template #name>
                <span class="group-hover:text-primary transition-colors">{{ cand.name }}</span>
              </template>
            </UUser>
            <div class="flex gap-1">
              <UButton size="xs" icon="i-lucide-arrow-right" color="neutral" variant="ghost" />
              <UButton size="xs" icon="i-lucide-x" color="error" variant="ghost" />
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Bottom grid: Open Positions + Interviews -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Open Positions -->
      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Open Positions</h2>
            <UButton label="Post new job" size="xs" color="neutral" variant="ghost" trailing-icon="i-lucide-plus" @click="showPostJobModal = true" />
          </div>
        </template>
        <div class="divide-y divide-default">
          <div
            v-for="role in openRoles"
            :key="role.title"
            class="p-4 sm:px-6 group hover:bg-muted/20 transition-colors"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-medium text-highlighted text-sm group-hover:text-primary transition-colors">{{ role.title }}</p>
                <p class="text-xs text-muted mt-0.5">{{ role.dept }} · {{ role.type }}</p>
                <div class="flex items-center gap-4 text-xs text-dimmed mt-1">
                  <span class="flex items-center gap-1"><UIcon name="i-lucide-users" class="size-3" /> {{ role.applicants }} applicants</span>
                  <span class="flex items-center gap-1"><UIcon name="i-lucide-calendar" class="size-3" /> Posted {{ role.posted }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UBadge :label="role.stage"    color="neutral"                                  variant="soft" class="rounded-full shrink-0" />
                <UBadge :label="role.priority" :color="(priorityConfig[role.priority] as any)" variant="soft" class="rounded-full shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Today's Interviews -->
      <UCard title="Today's Interviews">
        <div class="space-y-3">
          <UCard
            v-for="interview in todayInterviews"
            :key="interview.candidate"
            :ui="{ root: 'group hover:ring-1 hover:ring-primary/30 transition-colors', body: 'p-4 sm:p-4 flex items-center gap-4' }"
          >
            <div class="text-center min-w-16">
              <p class="text-xs font-bold text-primary">{{ interview.time }}</p>
            </div>
            <div class="flex-1">
              <p class="font-medium text-highlighted text-sm group-hover:text-primary transition-colors">{{ interview.candidate }}</p>
              <p class="text-xs text-muted">{{ interview.role }}</p>
              <div class="flex items-center gap-2 mt-2">
                <UBadge :label="interview.type" color="neutral" variant="subtle" size="xs" />
                <span class="text-xs text-dimmed">with {{ interview.interviewer }}</span>
              </div>
            </div>
            <UButton icon="i-lucide-video" size="xs" color="primary" variant="subtle" />
          </UCard>
        </div>
      </UCard>
    </div>

    <!-- Onboarding Tracker -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold text-highlighted">Onboarding Tracker</h2>
            <p class="text-xs text-muted mt-0.5">{{ onboardingEmployees.length }} new hires in progress</p>
          </div>
          <UBadge label="Active" color="success" variant="subtle" :ui="{ base: 'flex items-center gap-1.5' }">
            <template #leading>
              <span class="relative flex size-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span class="relative inline-flex size-2 rounded-full bg-success" />
              </span>
            </template>
          </UBadge>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard
          v-for="emp in onboardingEmployees"
          :key="emp.name"
          :ui="{ root: 'hover:ring-1 hover:ring-primary/30 transition-all cursor-pointer' }"
          @click="openOnboardDetail(emp)"
        >
          <!-- Employee header -->
          <div class="flex items-center gap-3 mb-4">
            <UAvatar :text="emp.initials" size="md" :color="emp.color" />
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-highlighted text-sm truncate">{{ emp.name }}</p>
              <p class="text-xs text-muted truncate">{{ emp.role }}</p>
              <p class="text-xs text-dimmed">Starts {{ emp.startDate }}</p>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="mb-3">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-muted">Progress</span>
              <span class="text-xs font-semibold" :class="progressPercent(emp) === 100 ? 'text-success' : 'text-primary'">
                {{ completedSteps(emp) }}/{{ emp.steps.length }} steps
              </span>
            </div>
            <div class="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="progressPercent(emp) === 100 ? 'bg-success' : 'bg-primary'"
                :style="`width: ${progressPercent(emp)}%`"
              />
            </div>
          </div>

          <!-- Step checklist -->
          <ul class="space-y-1.5">
            <li
              v-for="(step, i) in emp.steps"
              :key="step.label"
              class="flex items-center gap-2 text-xs"
              @click.stop="toggleStep(emp, i)"
            >
              <UIcon
                :name="step.done ? 'i-lucide-check-circle' : 'i-lucide-circle'"
                class="size-3.5 flex-shrink-0 transition-colors"
                :class="step.done ? 'text-success' : 'text-muted'"
              />
              <span :class="step.done ? 'text-muted line-through' : 'text-highlighted'">{{ step.label }}</span>
            </li>
          </ul>
        </UCard>
      </div>
    </UCard>

    <!-- Post Job Modal -->
    <UModal v-model:open="showPostJobModal" title="Post New Job" description="Fill in the details to create a new job listing">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Job Title">
            <UInput placeholder="e.g. Senior Software Engineer" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Department">
              <USelect :items="departments" class="w-full" />
            </UFormField>
            <UFormField label="Employment Type">
              <USelect :items="['Full-time', 'Part-time', 'Contract', 'Internship']" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Job Description">
            <UTextarea placeholder="Describe the role, responsibilities, and requirements…" :rows="4" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Priority">
              <USelect :items="['High', 'Medium', 'Low']" class="w-full" />
            </UFormField>
            <UFormField label="Target Start Date">
              <UInput type="date" class="w-full" />
            </UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel"   color="neutral" variant="outline" @click="showPostJobModal = false" />
        <UButton label="Post Job" icon="i-lucide-plus" @click="showPostJobModal = false" />
      </template>
    </UModal>

    <!-- Onboarding Detail Modal -->
    <UModal v-model:open="showOnboardModal" :title="selectedEmployee?.name || ''" :description="selectedEmployee?.role">
      <template #body>
        <div v-if="selectedEmployee" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedEmployee.initials" size="xl" :color="selectedEmployee.color" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedEmployee.name }}</p>
              <p class="text-muted">{{ selectedEmployee.role }} · {{ selectedEmployee.dept }}</p>
              <p class="text-xs text-dimmed mt-1">Start Date: {{ selectedEmployee.startDate }}</p>
            </div>
          </div>
          <USeparator />
          <div>
            <p class="text-sm font-semibold text-highlighted mb-3">Onboarding Checklist</p>
            <ul class="space-y-3">
              <li
                v-for="(step, i) in selectedEmployee.steps"
                :key="step.label"
                class="flex items-center gap-3 cursor-pointer group"
                @click="toggleStep(selectedEmployee, i)"
              >
                <UIcon
                  :name="step.done ? 'i-lucide-check-circle' : 'i-lucide-circle'"
                  class="size-5 flex-shrink-0 transition-colors group-hover:text-primary"
                  :class="step.done ? 'text-success' : 'text-muted'"
                />
                <span class="text-sm" :class="step.done ? 'text-muted line-through' : 'text-highlighted'">{{ step.label }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-lg bg-muted/40 p-3">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-semibold text-highlighted">Overall Progress</span>
              <span class="text-xs font-bold text-primary">{{ progressPercent(selectedEmployee) }}%</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="progressPercent(selectedEmployee) === 100 ? 'bg-success' : 'bg-primary'"
                :style="`width: ${progressPercent(selectedEmployee)}%`"
              />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showOnboardModal = false; selectedEmployee = null" />
      </template>
    </UModal>
  </div>
</template>
