<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const stats = [
  { label: 'Reviews Completed', value: '48', total: 96, icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Pending Reviews', value: '48', total: 96, icon: 'i-lucide-clock', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Average Score', value: '4.2', total: null, icon: 'i-lucide-star', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Top Performers', value: '12', total: null, icon: 'i-lucide-trending-up', color: 'text-primary', bg: 'bg-primary/10' },
]

const employees = [
  { name: 'James Reyes', initials: 'JR', role: 'Senior Engineer', dept: 'Engineering', score: 4.8, okrs: 95, status: 'Completed', avatarColor: 'primary' as const, trend: 'up' },
  { name: 'Mia Santos', initials: 'MS', role: 'Marketing Manager', dept: 'Marketing', score: 4.3, okrs: 82, status: 'Completed', avatarColor: 'secondary' as const, trend: 'up' },
  { name: 'Carlos Wu', initials: 'CW', role: 'Sales Lead', dept: 'Sales', score: 4.5, okrs: 88, status: 'Pending', avatarColor: 'neutral' as const, trend: 'up' },
  { name: 'Priya Lal', initials: 'PL', role: 'HR Specialist', dept: 'HR & Admin', score: 4.0, okrs: 75, status: 'Completed', avatarColor: 'primary' as const, trend: 'neutral' },
  { name: 'Ryan Cruz', initials: 'RC', role: 'DevOps Engineer', dept: 'Engineering', score: 3.5, okrs: 62, status: 'Pending', avatarColor: 'success' as const, trend: 'down' },
  { name: 'Ana Dela Cruz', initials: 'AD', role: 'Operations Analyst', dept: 'Operations', score: 4.6, okrs: 91, status: 'Completed', avatarColor: 'warning' as const, trend: 'up' },
]

function starColor(score: number, i: number) {
  if (i <= Math.floor(score)) return 'text-warning'
  return 'text-muted'
}

const okrTeams = [
  { team: 'Engineering', objective: 'Ship PeopleCore v3.0 by Q4', progress: 72, key: '4 of 6 KRs on track' },
  { team: 'Sales', objective: 'Reach ₱10M ARR', progress: 58, key: '₱5.8M current' },
  { team: 'Marketing', objective: 'Drive 1,000 qualified leads', progress: 84, key: '840 leads acquired' },
  { team: 'HR & Admin', objective: 'Reduce time-to-hire to 30 days', progress: 90, key: 'Avg. 31 days currently' },
]

const feedbacks = [
  { from: 'James Reyes', to: 'Ana Dela Cruz', comment: 'Excellent cross-team coordination on the ops dashboard project.', rating: 5, initials: 'JR', color: 'primary' as const },
  { from: 'Priya Lal', to: 'James Reyes', comment: 'Always delivers high quality code and mentors juniors well.', rating: 5, initials: 'PL', color: 'primary' as const },
  { from: 'Carlos Wu', to: 'Mia Santos', comment: 'The new campaign materials were very helpful for sales outreach.', rating: 4, initials: 'CW', color: 'neutral' as const },
]

const cycle = { name: 'Q3 2026 Review', deadline: 'September 1, 2026', progress: 50 }
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Performance Management</h1>
        <p class="text-muted text-sm mt-1">OKRs, reviews, and 360° feedback — all in one place</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-plus" label="Start Review Cycle" size="sm" />
      </div>
    </div>

    <!-- Active Cycle Banner -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }" class="ring-primary/30 bg-primary/5">
      <div class="flex items-center gap-5">
        <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <UIcon name="i-lucide-star" class="size-6 text-primary" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h2 class="font-bold text-highlighted">{{ cycle.name }}</h2>
            <UBadge label="Active" color="success" variant="subtle" size="sm" />
          </div>
          <p class="text-sm text-muted mb-3">Deadline: {{ cycle.deadline }} · {{ cycle.progress }}% of reviews completed</p>
          <UProgress :model-value="cycle.progress" :max="100" class="max-w-sm" />
        </div>
        <UButton label="Send Reminder" icon="i-lucide-bell" variant="outline" size="sm" />
      </div>
    </UCard>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Employee Scores Table -->
      <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Employee Reviews</h2>
            <UBadge label="Q3 2026" color="primary" variant="subtle" size="sm" />
          </div>
        </template>
        <div class="divide-y divide-default">
          <div v-for="emp in employees" :key="emp.name" class="flex items-center gap-4 sm:px-6 p-4 hover:bg-muted/30 transition-colors">
            <UAvatar :text="emp.initials" size="sm" :color="emp.avatarColor" />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-highlighted text-sm">{{ emp.name }}</p>
              <p class="text-xs text-muted">{{ emp.dept }}</p>
            </div>
            <div class="flex gap-0.5">
              <UIcon v-for="i in 5" :key="i" name="i-lucide-star" :class="['size-3.5', starColor(emp.score, i)]" />
            </div>
            <span class="text-sm font-bold text-highlighted w-8">{{ emp.score }}</span>
            <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', emp.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning']">{{ emp.status }}</span>
          </div>
        </div>
      </UCard>

      <!-- OKR Tracker -->
      <UCard :ui="{ root: 'shadow-sm' }">
        <h2 class="font-semibold text-highlighted">Team OKRs</h2>
        <div class="space-y-4 mt-4 sm:mt-6">
          <div v-for="okr in okrTeams" :key="okr.team" class="space-y-2">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-highlighted">{{ okr.team }}</p>
                <p class="text-xs text-muted">{{ okr.objective }}</p>
              </div>
              <span :class="['text-sm font-bold', okr.progress >= 80 ? 'text-success' : okr.progress >= 60 ? 'text-warning' : 'text-error']">{{ okr.progress }}%</span>
            </div>
            <UProgress
              :model-value="okr.progress"
              :color="okr.progress >= 80 ? 'success' : okr.progress >= 60 ? 'warning' : 'error'"
            />
            <p class="text-xs text-dimmed">{{ okr.key }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 360° Feedback -->
    <UCard :ui="{ root: 'shadow-sm' }">
      <h2 class="font-semibold text-highlighted">360° Peer Feedback</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 sm:mt-6">
        <UCard
          v-for="fb in feedbacks"
          :key="fb.from + fb.to"
          :ui="{ root: 'shadow-sm', body: 'sm:p-4 space-y-3' }"
          variant="subtle"
        >
          <div class="flex gap-0.5">
            <UIcon v-for="i in 5" :key="i" name="i-lucide-star" :class="['size-3.5', i <= fb.rating ? 'text-warning' : 'text-muted']" />
          </div>
          <p class="text-sm text-highlighted italic leading-relaxed">"{{ fb.comment }}"</p>
          <div class="flex items-center gap-2 pt-2 border-t border-default">
            <UAvatar :text="fb.initials" size="xs" :color="fb.color" />
            <div>
              <p class="text-xs font-semibold text-highlighted">{{ fb.from }}</p>
              <p class="text-xs text-dimmed">→ {{ fb.to }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>
  </div>
</template>
