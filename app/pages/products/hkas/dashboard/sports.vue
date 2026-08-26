<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const athletes = ref([
  { id: 'AT-001', name: 'Miguel Reyes', initials: 'MR', sport: 'Swimming', position: 'Freestyle Sprinter', trainingLoad: 88, recoveryScore: 74, speed: 'A+', endurance: 'A', strength: 'B+', overallRating: 91, status: 'In Season', lastSession: 'Aug 26, 2026', avatarColor: 'primary' as const },
  { id: 'AT-002', name: 'Carla Gomez', initials: 'CG', sport: 'Volleyball', position: 'Middle Blocker', trainingLoad: 76, recoveryScore: 82, speed: 'B+', endurance: 'A-', strength: 'A', overallRating: 86, status: 'In Season', lastSession: 'Aug 25, 2026', avatarColor: 'secondary' as const },
  { id: 'AT-003', name: 'Paolo Santos', initials: 'PS', sport: 'Basketball', position: 'Point Guard', trainingLoad: 92, recoveryScore: 61, speed: 'A', endurance: 'B+', strength: 'B', overallRating: 83, status: 'Training', lastSession: 'Aug 26, 2026', avatarColor: 'warning' as const },
  { id: 'AT-004', name: 'Diane Cruz', initials: 'DC', sport: 'Track & Field', position: '100m Sprinter', trainingLoad: 45, recoveryScore: 90, speed: 'A+', endurance: 'B', strength: 'B-', overallRating: 78, status: 'Injured', lastSession: 'Aug 10, 2026', avatarColor: 'error' as const },
  { id: 'AT-005', name: 'Ryan Lim', initials: 'RL', sport: 'Badminton', position: 'Singles', trainingLoad: 70, recoveryScore: 88, speed: 'A-', endurance: 'A', strength: 'B+', overallRating: 88, status: 'In Season', lastSession: 'Aug 24, 2026', avatarColor: 'success' as const },
  { id: 'AT-006', name: 'Trisha Bautista', initials: 'TB', sport: 'Football', position: 'Midfielder', trainingLoad: 82, recoveryScore: 77, speed: 'B+', endurance: 'A+', strength: 'B', overallRating: 85, status: 'Off Season', lastSession: 'Aug 20, 2026', avatarColor: 'info' as const },
])

const statusConfig: Record<string, string> = {
  'In Season': 'bg-success/10 text-success',
  Training: 'bg-primary/10 text-primary',
  'Off Season': 'bg-muted text-muted',
  Injured: 'bg-error/10 text-error',
}

const sportIcons: Record<string, string> = {
  Swimming: 'i-lucide-waves',
  Volleyball: 'i-lucide-circle-dot',
  Basketball: 'i-lucide-circle',
  'Track & Field': 'i-lucide-timer',
  Badminton: 'i-lucide-zap',
  Football: 'i-lucide-shield',
}

const selectedSport = ref('All')
const selectedStatus = ref('All')
const sports = ['All', 'Swimming', 'Basketball', 'Volleyball', 'Track & Field', 'Badminton', 'Football']
const statuses = ['All', 'In Season', 'Training', 'Off Season', 'Injured']

const filtered = computed(() =>
  athletes.value.filter(a => {
    const matchSport = selectedSport.value === 'All' || a.sport === selectedSport.value
    const matchStatus = selectedStatus.value === 'All' || a.status === selectedStatus.value
    return matchSport && matchStatus
  })
)

const showAddModal = ref(false)
const selectedAthlete = ref<typeof athletes.value[0] | null>(null)
const showDetailModal = ref(false)

function viewAthlete(a: typeof athletes.value[0]) {
  selectedAthlete.value = a
  showDetailModal.value = true
}

function ratingColor(score: number) {
  if (score >= 88) return 'text-success'
  if (score >= 80) return 'text-primary'
  if (score >= 70) return 'text-warning'
  return 'text-error'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Sports Performance</h1>
        <p class="text-muted text-sm mt-1">Monitor varsity athlete training loads, recovery, and performance metrics</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add Athlete" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 items-center">
      <USelect v-model="selectedSport" :items="sports" class="w-44" />
      <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
      <span class="text-sm text-muted ml-auto">{{ filtered.length }} athletes</span>
    </div>

    <!-- Athlete profile cards -->
    <div v-if="filtered.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <UCard
        v-for="a in filtered"
        :key="a.id"
        class="hover:ring-1 hover:ring-primary/20 transition-all cursor-pointer group"
        @click="viewAthlete(a)"
      >
        <!-- Athlete identity -->
        <div class="flex items-center gap-3 mb-4">
          <UAvatar :text="a.initials" size="lg" :color="a.avatarColor" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-highlighted group-hover:text-primary transition-colors">{{ a.name }}</p>
            <div class="flex items-center gap-1.5 mt-0.5">
              <UIcon :name="sportIcons[a.sport] ?? 'i-lucide-trophy'" class="size-3.5 text-dimmed" />
              <p class="text-xs text-muted truncate">{{ a.sport }} · {{ a.position }}</p>
            </div>
          </div>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0" :class="statusConfig[a.status]">
            {{ a.status }}
          </span>
        </div>

        <!-- Overall rating — big number -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-center px-3">
            <p class="text-3xl font-extrabold" :class="ratingColor(a.overallRating)">{{ a.overallRating }}</p>
            <p class="text-xs text-dimmed mt-0.5">Rating</p>
          </div>
          <div class="grid grid-cols-3 gap-3 flex-1">
            <div class="text-center">
              <p class="text-base font-bold text-highlighted">{{ a.speed }}</p>
              <p class="text-xs text-dimmed">Speed</p>
            </div>
            <div class="text-center">
              <p class="text-base font-bold text-highlighted">{{ a.endurance }}</p>
              <p class="text-xs text-dimmed">Endurance</p>
            </div>
            <div class="text-center">
              <p class="text-base font-bold text-highlighted">{{ a.strength }}</p>
              <p class="text-xs text-dimmed">Strength</p>
            </div>
          </div>
        </div>

        <USeparator />

        <!-- Training load + Recovery bars -->
        <div class="mt-4 space-y-3">
          <div>
            <div class="flex items-center justify-between mb-1 text-xs">
              <span class="text-muted">Training Load</span>
              <span :class="['font-semibold', a.trainingLoad > 85 ? 'text-error' : 'text-highlighted']">{{ a.trainingLoad }}%</span>
            </div>
            <UProgress :model-value="a.trainingLoad" :color="a.trainingLoad > 85 ? 'error' : 'primary'" />
            <p v-if="a.trainingLoad > 85" class="text-xs text-error mt-1 flex items-center gap-1">
              <UIcon name="i-lucide-alert-triangle" class="size-3" /> High load — consider rest day
            </p>
          </div>
          <div>
            <div class="flex items-center justify-between mb-1 text-xs">
              <span class="text-muted">Recovery Score</span>
              <span class="font-semibold text-highlighted">{{ a.recoveryScore }}%</span>
            </div>
            <UProgress :model-value="a.recoveryScore" color="success" />
          </div>
        </div>

        <!-- Last session footer -->
        <div class="mt-4 pt-3 border-t border-default flex items-center justify-between text-xs text-dimmed" @click.stop>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar" class="size-3.5" />Last session: {{ a.lastSession }}
          </span>
          <UButton icon="i-lucide-plus-circle" label="Log" size="xs" color="neutral" variant="ghost" @click.stop="viewAthlete(a)" />
        </div>
      </UCard>
    </div>

    <!-- Empty state -->
    <div v-else class="py-20 flex flex-col items-center justify-center">
      <UEmpty icon="i-lucide-trophy" title="No athletes found" description="Add your first athlete or adjust the filters" />
    </div>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedAthlete?.name || ''" :description="`${selectedAthlete?.sport} · ${selectedAthlete?.position}`">
      <template #body>
        <div v-if="selectedAthlete" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedAthlete.initials" size="xl" :color="selectedAthlete.avatarColor" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedAthlete.name }}</p>
              <p class="text-muted">{{ selectedAthlete.sport }} · {{ selectedAthlete.position }}</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2" :class="statusConfig[selectedAthlete.status]">{{ selectedAthlete.status }}</span>
            </div>
            <div class="ml-auto text-center">
              <p class="text-4xl font-extrabold" :class="ratingColor(selectedAthlete.overallRating)">{{ selectedAthlete.overallRating }}</p>
              <p class="text-xs text-dimmed">Overall Rating</p>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-3 gap-4 text-center">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Speed</p><p class="text-highlighted font-bold text-lg">{{ selectedAthlete.speed }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Endurance</p><p class="text-highlighted font-bold text-lg">{{ selectedAthlete.endurance }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Strength</p><p class="text-highlighted font-bold text-lg">{{ selectedAthlete.strength }}</p></div>
          </div>
          <USeparator />
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1"><span class="text-dimmed font-semibold uppercase">Training Load</span><span :class="selectedAthlete.trainingLoad > 85 ? 'text-error font-semibold' : 'text-muted'">{{ selectedAthlete.trainingLoad }}%</span></div>
              <UProgress :model-value="selectedAthlete.trainingLoad" :color="selectedAthlete.trainingLoad > 85 ? 'error' : 'primary'" />
              <p v-if="selectedAthlete.trainingLoad > 85" class="text-xs text-error mt-1">⚠ High training load — consider scheduling a rest day</p>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1"><span class="text-dimmed font-semibold uppercase">Recovery Score</span><span class="text-muted">{{ selectedAthlete.recoveryScore }}%</span></div>
              <UProgress :model-value="selectedAthlete.recoveryScore" color="success" />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedAthlete = null" />
        <UButton label="Log Session" icon="i-lucide-plus-circle" />
      </template>
    </UModal>

    <!-- Add Modal -->
    <UModal v-model:open="showAddModal" title="Add Athlete" description="Register a new varsity athlete for performance tracking">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="First Name"><UInput placeholder="e.g. Miguel" class="w-full" /></UFormField>
            <UFormField label="Last Name"><UInput placeholder="e.g. Reyes" class="w-full" /></UFormField>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Sport"><USelect :items="sports.slice(1)" class="w-full" /></UFormField>
            <UFormField label="Position"><UInput placeholder="e.g. Freestyle Sprinter" class="w-full" /></UFormField>
          </div>
          <UFormField label="Status"><USelect :items="statuses.slice(1)" class="w-full" /></UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Add Athlete" icon="i-lucide-plus" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
