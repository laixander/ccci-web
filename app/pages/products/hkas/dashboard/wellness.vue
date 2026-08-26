<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const programs = ref([
  {
    id: 'CW-001', program: '10,000 Steps Challenge', dept: 'All Departments',
    participants: 1240, target: 3000, challengeType: 'Steps',
    duration: '4 weeks', startDate: 'Aug 1, 2026', endDate: 'Aug 28, 2026',
    avgCompletion: 72, status: 'Active',
    icon: 'i-lucide-footprints', color: 'text-primary', bg: 'bg-primary/10',
    description: 'Encourage employees to hit 10,000 steps per day using wearables and manual logging.',
    milestones: [{ label: '25%', pct: 25, done: true }, { label: '50%', pct: 50, done: true }, { label: '75%', pct: 75, done: false }, { label: '100%', pct: 100, done: false }],
  },
  {
    id: 'CW-002', program: 'Mindful Movement Month', dept: 'HR & Admin',
    participants: 48, target: 60, challengeType: 'Yoga / Stretching',
    duration: '1 month', startDate: 'Aug 1, 2026', endDate: 'Aug 31, 2026',
    avgCompletion: 64, status: 'Active',
    icon: 'i-lucide-leaf', color: 'text-success', bg: 'bg-success/10',
    description: 'Daily 10-minute guided stretching and mindfulness sessions for desk workers.',
    milestones: [{ label: '25%', pct: 25, done: true }, { label: '50%', pct: 50, done: true }, { label: '75%', pct: 75, done: false }, { label: '100%', pct: 100, done: false }],
  },
  {
    id: 'CW-003', program: 'Q2 Fitness Assessment Drive', dept: 'All Departments',
    participants: 3000, target: 3000, challengeType: 'Assessment',
    duration: '2 weeks', startDate: 'Jun 10, 2026', endDate: 'Jun 21, 2026',
    avgCompletion: 100, status: 'Completed',
    icon: 'i-lucide-clipboard-check', color: 'text-info', bg: 'bg-info/10',
    description: 'Company-wide fitness assessment campaign that achieved 100% employee participation.',
    milestones: [{ label: '25%', pct: 25, done: true }, { label: '50%', pct: 50, done: true }, { label: '75%', pct: 75, done: true }, { label: '100%', pct: 100, done: true }],
  },
  {
    id: 'CW-004', program: 'Cycling to Work Initiative', dept: 'Engineering',
    participants: 95, target: 120, challengeType: 'Cardio',
    duration: '2 months', startDate: 'Jul 1, 2026', endDate: 'Aug 31, 2026',
    avgCompletion: 55, status: 'Active',
    icon: 'i-lucide-bike', color: 'text-warning', bg: 'bg-warning/10',
    description: 'Incentivize engineers to commute by bicycle with a points-based leaderboard.',
    milestones: [{ label: '25%', pct: 25, done: true }, { label: '50%', pct: 50, done: true }, { label: '75%', pct: 75, done: false }, { label: '100%', pct: 100, done: false }],
  },
  {
    id: 'CW-005', program: 'Q4 Wellness Kickoff', dept: 'All Departments',
    participants: 0, target: 3000, challengeType: 'Mixed',
    duration: '6 weeks', startDate: 'Oct 1, 2026', endDate: 'Nov 12, 2026',
    avgCompletion: 0, status: 'Upcoming',
    icon: 'i-lucide-sparkles', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20',
    description: 'All-hands wellness program launching Q4 with cardio, nutrition, and mental health tracks.',
    milestones: [{ label: '25%', pct: 25, done: false }, { label: '50%', pct: 50, done: false }, { label: '75%', pct: 75, done: false }, { label: '100%', pct: 100, done: false }],
  },
])

const statusConfig: Record<string, { badge: string; progress: string }> = {
  Active: { badge: 'bg-success/10 text-success', progress: 'primary' },
  Completed: { badge: 'bg-info/10 text-info', progress: 'success' },
  Upcoming: { badge: 'bg-warning/10 text-warning', progress: 'warning' },
  Cancelled: { badge: 'bg-error/10 text-error', progress: 'error' },
}

const selectedFilter = ref('All')
const filterOptions = ['All', 'Active', 'Completed', 'Upcoming']

const filtered = computed(() =>
  programs.value.filter(p => selectedFilter.value === 'All' || p.status === selectedFilter.value)
)

// Summary stats
const totalParticipants = computed(() => programs.value.reduce((s, p) => s + p.participants, 0))
const activeCount = computed(() => programs.value.filter(p => p.status === 'Active').length)
const completedCount = computed(() => programs.value.filter(p => p.status === 'Completed').length)
const avgEngagement = computed(() => {
  const active = programs.value.filter(p => p.status === 'Active')
  return active.length ? Math.round(active.reduce((s, p) => s + p.avgCompletion, 0) / active.length) : 0
})

const summaryCards = [
  { label: 'Total Enrolled', value: totalParticipants, icon: 'i-lucide-users', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Active Programs', value: activeCount, icon: 'i-lucide-heart-pulse', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Completed', value: completedCount, icon: 'i-lucide-check-circle', color: 'text-info', bg: 'bg-info/10' },
  { label: 'Avg Engagement', value: computed(() => avgEngagement.value + '%'), icon: 'i-lucide-trending-up', color: 'text-warning', bg: 'bg-warning/10' },
]

const showAddModal = ref(false)
const selectedProgram = ref<typeof programs.value[0] | null>(null)
const showDetailModal = ref(false)

function viewProgram(p: typeof programs.value[0]) {
  selectedProgram.value = p
  showDetailModal.value = true
}

function participantPct(p: (typeof programs.value)[0]) {
  return p.target > 0 ? Math.round((p.participants / p.target) * 100) : 0
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Corporate Wellness</h1>
        <p class="text-muted text-sm mt-1">Launch and track employee wellness challenges and fitness programs</p>
      </div>
      <UButton icon="i-lucide-plus" label="New Program" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Summary stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="card in summaryCards" :key="card.label">
        <div class="flex items-center gap-3">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', card.bg]">
            <UIcon :name="card.icon" :class="['size-5', card.color]" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">{{ card.value }}</p>
            <p class="text-xs text-muted">{{ card.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Filter pills -->
    <div class="flex gap-2 flex-wrap">
      <button
        v-for="f in filterOptions"
        :key="f"
        :class="[
          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
          selectedFilter === f
            ? 'bg-primary text-white shadow-sm'
            : 'bg-muted text-muted hover:text-highlighted'
        ]"
        @click="selectedFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <!-- Program cards -->
    <div v-if="filtered.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <UCard
        v-for="prog in filtered"
        :key="prog.id"
        class="hover:ring-1 hover:ring-primary/20 transition-all cursor-pointer group"
        @click="viewProgram(prog)"
      >
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div :class="['size-12 rounded-2xl flex items-center justify-center flex-shrink-0', prog.bg]">
            <UIcon :name="prog.icon" :class="['size-6', prog.color]" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-highlighted leading-snug group-hover:text-primary transition-colors">{{ prog.program }}</h3>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0" :class="statusConfig[prog.status]?.badge">
                {{ prog.status }}
              </span>
            </div>
            <p class="text-xs text-muted mt-1 leading-relaxed">{{ prog.description }}</p>

            <div class="flex flex-wrap gap-1.5 mt-2">
              <UBadge :label="prog.challengeType" color="neutral" variant="subtle" size="sm" />
              <UBadge :label="prog.dept" color="neutral" variant="outline" size="sm" />
              <UBadge :label="prog.duration" color="neutral" variant="outline" size="sm" />
            </div>
          </div>
        </div>

        <!-- Metrics -->
        <div class="mt-4 grid grid-cols-2 gap-4">
          <!-- Participants -->
          <div>
            <div class="flex items-center justify-between mb-1 text-xs">
              <span class="text-muted">Enrollment</span>
              <span class="font-semibold text-highlighted">{{ prog.participants.toLocaleString() }} / {{ prog.target.toLocaleString() }}</span>
            </div>
            <UProgress :model-value="participantPct(prog)" color="neutral" />
          </div>

          <!-- Completion -->
          <div>
            <div class="flex items-center justify-between mb-1 text-xs">
              <span class="text-muted">Avg Completion</span>
              <span class="font-semibold" :class="prog.avgCompletion === 100 ? 'text-success' : 'text-highlighted'">{{ prog.avgCompletion }}%</span>
            </div>
            <UProgress :model-value="prog.avgCompletion" :color="statusConfig[prog.status]?.progress as any" />
          </div>
        </div>

        <!-- Milestones -->
        <div class="mt-4 pt-4 border-t border-default flex items-center justify-between" @click.stop>
          <div class="flex items-center gap-3">
            <span v-for="m in prog.milestones" :key="m.label" class="flex items-center gap-1 text-xs" :class="m.done ? 'text-success' : 'text-dimmed'">
              <UIcon :name="m.done ? 'i-lucide-check-circle-2' : 'i-lucide-circle'" class="size-3.5" />
              {{ m.label }}
            </span>
          </div>
          <div class="text-xs text-dimmed">{{ prog.startDate }} → {{ prog.endDate }}</div>
        </div>
      </UCard>
    </div>

    <!-- Empty state -->
    <div v-else class="py-20 flex flex-col items-center justify-center">
      <UEmpty icon="i-lucide-heart-pulse" title="No wellness programs found" description="Launch your first corporate wellness challenge" />
    </div>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedProgram?.program || ''" :description="selectedProgram?.challengeType">
      <template #body>
        <div v-if="selectedProgram" class="space-y-5">
          <p class="text-sm text-muted leading-relaxed">{{ selectedProgram.description }}</p>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Department</p><p class="text-highlighted font-medium">{{ selectedProgram.dept }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Duration</p><p class="text-highlighted font-medium">{{ selectedProgram.duration }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Start Date</p><p class="text-highlighted font-medium">{{ selectedProgram.startDate }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">End Date</p><p class="text-highlighted font-medium">{{ selectedProgram.endDate }}</p></div>
          </div>
          <USeparator />
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-muted">Enrollment</span><span class="font-semibold text-highlighted">{{ selectedProgram.participants.toLocaleString() }} / {{ selectedProgram.target.toLocaleString() }}</span></div>
              <UProgress :model-value="participantPct(selectedProgram)" color="neutral" />
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-muted">Avg Completion</span><span class="font-semibold text-highlighted">{{ selectedProgram.avgCompletion }}%</span></div>
              <UProgress :model-value="selectedProgram.avgCompletion" :color="statusConfig[selectedProgram.status]?.progress as any" />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedProgram = null" />
        <UButton label="Edit Program" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Add Modal -->
    <UModal v-model:open="showAddModal" title="Create Wellness Program" description="Set up a new corporate wellness challenge">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Program Name"><UInput placeholder="e.g. 10,000 Steps Challenge" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Challenge Type"><USelect :items="['Steps', 'Cardio', 'Yoga / Stretching', 'Assessment', 'Mixed', 'Wellness']" class="w-full" /></UFormField>
            <UFormField label="Department"><USelect :items="['All Departments', 'Engineering', 'Sales', 'Marketing', 'HR & Admin', 'Finance']" class="w-full" /></UFormField>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Start Date"><UInput type="date" class="w-full" /></UFormField>
            <UFormField label="End Date"><UInput type="date" class="w-full" /></UFormField>
          </div>
          <UFormField label="Target Participants"><UInput type="number" placeholder="e.g. 3000" class="w-full" /></UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Launch Program" icon="i-lucide-heart-pulse" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
