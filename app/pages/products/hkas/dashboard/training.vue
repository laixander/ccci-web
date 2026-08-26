<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const plans = ref([
  {
    id: 'TP-001', planName: 'Grade 10 Cardio Foundation', type: 'Cardio',
    participants: 40, sessions: 12, completed: 8, duration: '6 weeks',
    trainer: 'Coach R. Santos', status: 'Active', startDate: 'Aug 1, 2026',
    description: 'Build aerobic base through progressive interval training and endurance circuits.',
    color: 'text-primary', bg: 'bg-primary/10', icon: 'i-lucide-heart-pulse',
  },
  {
    id: 'TP-002', planName: 'Varsity Strength & Power', type: 'Strength',
    participants: 15, sessions: 20, completed: 20, duration: '10 weeks',
    trainer: 'Coach A. Dela Cruz', status: 'Completed', startDate: 'Jun 1, 2026',
    description: 'Advanced progressive overload program for varsity athletes targeting strength and explosive power.',
    color: 'text-success', bg: 'bg-success/10', icon: 'i-lucide-dumbbell',
  },
  {
    id: 'TP-003', planName: 'Junior Flexibility Program', type: 'Flexibility',
    participants: 55, sessions: 8, completed: 3, duration: '4 weeks',
    trainer: 'Coach J. Flores', status: 'Active', startDate: 'Aug 15, 2026',
    description: 'Daily stretching and mobility routines to improve range of motion across all grade levels.',
    color: 'text-warning', bg: 'bg-warning/10', icon: 'i-lucide-move',
  },
  {
    id: 'TP-004', planName: 'Senior Athletic Conditioning', type: 'Mixed',
    participants: 28, sessions: 24, completed: 0, duration: '12 weeks',
    trainer: 'Coach M. Reyes', status: 'Scheduled', startDate: 'Sep 1, 2026',
    description: 'Comprehensive multi-modal conditioning for senior athletes before inter-school competition season.',
    color: 'text-info', bg: 'bg-info/10', icon: 'i-lucide-zap',
  },
  {
    id: 'TP-005', planName: 'Post-Injury Rehab — Swimming', type: 'Rehabilitation',
    participants: 4, sessions: 16, completed: 10, duration: '8 weeks',
    trainer: 'Coach R. Santos', status: 'Active', startDate: 'Jul 20, 2026',
    description: 'Low-impact aquatic rehab protocol for athletes recovering from musculoskeletal injuries.',
    color: 'text-error', bg: 'bg-error/10', icon: 'i-lucide-waves',
  },
  {
    id: 'TP-006', planName: 'Corporate Wellness — Cardio', type: 'Cardio',
    participants: 120, sessions: 10, completed: 10, duration: '5 weeks',
    trainer: 'Coach M. Reyes', status: 'Completed', startDate: 'May 1, 2026',
    description: 'Step and cycling-based cardio program designed for office employees with sedentary lifestyles.',
    color: 'text-primary', bg: 'bg-primary/10', icon: 'i-lucide-bike',
  },
])

const statusConfig: Record<string, { badge: string; progress: string }> = {
  Active: { badge: 'bg-success/10 text-success', progress: 'success' },
  Completed: { badge: 'bg-info/10 text-info', progress: 'info' },
  Scheduled: { badge: 'bg-warning/10 text-warning', progress: 'warning' },
  'On Hold': { badge: 'bg-error/10 text-error', progress: 'error' },
}

const selectedFilter = ref('All')
const filterOptions = ['All', 'Active', 'Completed', 'Scheduled']

const filtered = computed(() =>
  plans.value.filter(p => selectedFilter.value === 'All' || p.status === selectedFilter.value)
)

const showAddModal = ref(false)
const selectedPlan = ref<typeof plans.value[0] | null>(null)
const showDetailModal = ref(false)

function viewPlan(p: typeof plans.value[0]) {
  selectedPlan.value = p
  showDetailModal.value = true
}

function sessionProgress(p: (typeof plans.value)[0]) {
  return Math.round((p.completed / p.sessions) * 100)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Training Plans</h1>
        <p class="text-muted text-sm mt-1">Manage structured fitness programs with session-by-session progress tracking</p>
      </div>
      <UButton icon="i-lucide-plus" label="Create Plan" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Filter pills -->
    <div class="flex gap-2">
      <button
        v-for="f in filterOptions"
        :key="f"
        :class="[
          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
          selectedFilter === f
            ? 'bg-primary text-white shadow-sm'
            : 'bg-muted text-muted hover:text-highlighted hover:bg-muted/80'
        ]"
        @click="selectedFilter = f"
      >
        {{ f }}
      </button>
      <span class="ml-auto text-sm text-muted self-center">{{ filtered.length }} plans</span>
    </div>

    <!-- Plan Cards — Kanban-like columns by status -->
    <div v-if="filtered.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <UCard
        v-for="plan in filtered"
        :key="plan.id"
        class="hover:ring-1 hover:ring-primary/20 transition-all cursor-pointer group flex flex-col"
        @click="viewPlan(plan)"
      >
        <!-- Top: icon + status -->
        <div class="flex items-start justify-between mb-3">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', plan.bg]">
            <UIcon :name="plan.icon" :class="['size-5', plan.color]" />
          </div>
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0" :class="statusConfig[plan.status]?.badge">
            {{ plan.status }}
          </span>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-highlighted text-sm leading-snug group-hover:text-primary transition-colors">{{ plan.planName }}</h3>
        <p class="text-xs text-muted mt-1 leading-relaxed line-clamp-2">{{ plan.description }}</p>

        <!-- Meta tags -->
        <div class="flex flex-wrap gap-1.5 mt-3">
          <UBadge :label="plan.type" color="neutral" variant="subtle" size="sm" />
          <UBadge :label="plan.duration" color="neutral" variant="outline" size="sm" />
        </div>

        <USeparator class="my-4" />

        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 text-center mb-4">
          <div>
            <p class="text-base font-bold text-highlighted">{{ plan.participants }}</p>
            <p class="text-xs text-dimmed">Participants</p>
          </div>
          <div>
            <p class="text-base font-bold text-highlighted">{{ plan.completed }}/{{ plan.sessions }}</p>
            <p class="text-xs text-dimmed">Sessions</p>
          </div>
          <div>
            <p class="text-base font-bold" :class="plan.color">{{ sessionProgress(plan) }}%</p>
            <p class="text-xs text-dimmed">Complete</p>
          </div>
        </div>

        <!-- Progress bar -->
        <UProgress
          :model-value="sessionProgress(plan)"
          :color="statusConfig[plan.status]?.progress as any"
        />

        <!-- Trainer + date -->
        <div class="flex items-center justify-between mt-4 pt-3 border-t border-default text-xs text-dimmed" @click.stop>
          <span class="flex items-center gap-1.5"><UIcon name="i-lucide-user" class="size-3.5" />{{ plan.trainer }}</span>
          <span class="flex items-center gap-1.5"><UIcon name="i-lucide-calendar" class="size-3.5" />{{ plan.startDate }}</span>
        </div>
      </UCard>
    </div>

    <!-- Empty state -->
    <div v-else class="py-20 flex flex-col items-center justify-center">
      <UEmpty icon="i-lucide-dumbbell" title="No training plans found" description="Create your first structured training program to get started" />
    </div>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedPlan?.planName || ''" :description="`${selectedPlan?.type} · ${selectedPlan?.trainer}`">
      <template #body>
        <div v-if="selectedPlan" class="space-y-5">
          <p class="text-sm text-muted leading-relaxed">{{ selectedPlan.description }}</p>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Trainer</p><p class="text-highlighted font-medium">{{ selectedPlan.trainer }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Duration</p><p class="text-highlighted font-medium">{{ selectedPlan.duration }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Participants</p><p class="text-highlighted font-medium">{{ selectedPlan.participants }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Start Date</p><p class="text-highlighted font-medium">{{ selectedPlan.startDate }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Sessions</p><p class="text-highlighted font-medium">{{ selectedPlan.completed }} / {{ selectedPlan.sessions }} completed</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Status</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[selectedPlan.status]?.badge">{{ selectedPlan.status }}</span>
            </div>
          </div>
          <div>
            <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-2">Overall Progress</p>
            <div class="flex items-center gap-3">
              <div class="flex-1"><UProgress :model-value="sessionProgress(selectedPlan)" :color="statusConfig[selectedPlan.status]?.progress as any" /></div>
              <span class="font-bold text-highlighted">{{ sessionProgress(selectedPlan) }}%</span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedPlan = null" />
        <UButton label="Edit Plan" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Add Modal -->
    <UModal v-model:open="showAddModal" title="Create Training Plan" description="Set up a new structured fitness training program">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Plan Name"><UInput placeholder="e.g. Grade 10 Cardio Foundation" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Type"><USelect :items="['Strength', 'Cardio', 'Flexibility', 'Mixed', 'Rehabilitation']" class="w-full" /></UFormField>
            <UFormField label="Duration"><UInput placeholder="e.g. 6 weeks" class="w-full" /></UFormField>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Trainer"><UInput placeholder="e.g. Coach Santos" class="w-full" /></UFormField>
            <UFormField label="Total Sessions"><UInput type="number" placeholder="e.g. 12" class="w-full" /></UFormField>
          </div>
          <UFormField label="Start Date"><UInput type="date" class="w-full" /></UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Create Plan" icon="i-lucide-plus" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
