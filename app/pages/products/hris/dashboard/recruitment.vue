<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const stats = [
  { label: 'Open Positions', value: '9', icon: 'i-lucide-briefcase', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Applications', value: '142', icon: 'i-lucide-file-text', color: 'text-info', bg: 'bg-info/10' },
  { label: 'Interviews Today', value: '3', icon: 'i-lucide-calendar', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Offers Sent', value: '2', icon: 'i-lucide-mail', color: 'text-success', bg: 'bg-success/10' },
]

const openRoles = ref([
  { title: 'Senior Software Engineer', dept: 'Engineering', type: 'Full-time', applicants: 38, stage: 'Interviewing', posted: 'Jul 20', priority: 'High' },
  { title: 'Marketing Specialist', dept: 'Marketing', type: 'Full-time', applicants: 24, stage: 'Screening', posted: 'Aug 1', priority: 'Medium' },
  { title: 'Sales Development Rep', dept: 'Sales', type: 'Full-time', applicants: 51, stage: 'Interviewing', posted: 'Jul 28', priority: 'High' },
  { title: 'HR Business Partner', dept: 'HR & Admin', type: 'Full-time', applicants: 17, stage: 'Review', posted: 'Aug 5', priority: 'Medium' },
  { title: 'DevOps Engineer', dept: 'Engineering', type: 'Full-time', applicants: 12, stage: 'Offer', posted: 'Jul 15', priority: 'High' },
])

const pipeline = [
  {
    stage: 'Applied',
    icon: 'i-lucide-file-text',
    color: 'text-muted',
    bg: 'bg-muted/50',
    candidates: [
      { name: 'Ana Reyes', role: 'Sr. Software Engineer', initials: 'AR', color: 'primary' as const },
      { name: 'Mark Tan', role: 'Marketing Specialist', initials: 'MT', color: 'secondary' as const },
      { name: 'Sofia Lim', role: 'Sales Dev Rep', initials: 'SL', color: 'neutral' as const },
    ]
  },
  {
    stage: 'Screening',
    icon: 'i-lucide-search',
    color: 'text-info',
    bg: 'bg-info/10',
    candidates: [
      { name: 'Jake Uy', role: 'Sr. Software Engineer', initials: 'JU', color: 'primary' as const },
      { name: 'Mara Go', role: 'HR Business Partner', initials: 'MG', color: 'warning' as const },
    ]
  },
  {
    stage: 'Interview',
    icon: 'i-lucide-video',
    color: 'text-warning',
    bg: 'bg-warning/10',
    candidates: [
      { name: 'Leo Cruz', role: 'DevOps Engineer', initials: 'LC', color: 'success' as const },
      { name: 'Nina Buan', role: 'Sales Dev Rep', initials: 'NB', color: 'secondary' as const },
    ]
  },
  {
    stage: 'Offer',
    icon: 'i-lucide-mail',
    color: 'text-success',
    bg: 'bg-success/10',
    candidates: [
      { name: 'Carlos Mendoza', role: 'DevOps Engineer', initials: 'CM', color: 'success' as const },
    ]
  },
]

const todayInterviews = [
  { candidate: 'Leo Cruz', role: 'DevOps Engineer', time: '10:00 AM', interviewer: 'James Reyes', type: 'Technical' },
  { candidate: 'Nina Buan', role: 'Sales Dev Rep', time: '2:00 PM', interviewer: 'Carlos Wu', type: 'Behavioral' },
  { candidate: 'Jake Uy', role: 'Sr. Software Engineer', time: '4:00 PM', interviewer: 'Priya Lal', type: 'HR Screen' },
]

const priorityConfig: Record<string, string> = {
  'High': 'error',
  'Medium': 'warning',
  'Low': 'neutral',
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Talent Acquisition</h1>
        <p class="text-muted text-sm mt-1">Manage your full recruitment pipeline</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-plus" label="Post Job" size="sm" />
      </div>
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

    <!-- Kanban Pipeline -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-highlighted">Recruitment Pipeline</h2>
          <UButton label="View all candidates" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" />
        </div>
      </template>
      <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-default">
        <div v-for="col in pipeline" :key="col.stage" class="space-y-3 p-4">
          <!-- Column Header -->
          <div class="flex items-center gap-2 mb-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center', col.bg]">
              <UIcon :name="col.icon" :class="['size-3.5', col.color]" />
            </div>
            <span class="text-sm font-semibold text-highlighted">{{ col.stage }}</span>
            <span class="text-xs text-dimmed ml-auto">{{ col.candidates.length }}</span>
          </div>
          <!-- Cards -->
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
              <UButton size="xs" icon="i-lucide-arrow-right" color="neutral" variant="ghost" class="text-[10px]" />
              <UButton size="xs" icon="i-lucide-x" color="error" variant="ghost" class="text-[10px]" />
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Open Positions -->
      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Open Positions</h2>
            <UButton label="Post new job" size="xs" color="neutral" variant="ghost" trailing-icon="i-lucide-plus" />
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
                <UBadge :label="role.stage" color="neutral" variant="soft" class="rounded-full shrink-0" />
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
  </div>
</template>
