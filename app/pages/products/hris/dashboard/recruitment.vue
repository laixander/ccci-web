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
  'High': 'bg-error/10 text-error',
  'Medium': 'bg-warning/10 text-warning',
  'Low': 'bg-muted text-muted',
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
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ body: 'p-5' }">
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
    <UCard :ui="{ body: 'p-5' }">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-semibold text-highlighted">Recruitment Pipeline</h2>
        <UButton label="View all candidates" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" />
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="col in pipeline" :key="col.stage" class="space-y-3">
          <!-- Column Header -->
          <div class="flex items-center gap-2 mb-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center', col.bg]">
              <UIcon :name="col.icon" :class="['size-3.5', col.color]" />
            </div>
            <span class="text-sm font-semibold text-highlighted">{{ col.stage }}</span>
            <span class="text-xs text-dimmed ml-auto">{{ col.candidates.length }}</span>
          </div>
          <!-- Cards -->
          <div
            v-for="cand in col.candidates"
            :key="cand.name"
            class="bg-muted/30 rounded-lg p-3 border border-default hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div class="flex items-center gap-2.5 mb-2">
              <UAvatar :text="cand.initials" size="xs" :color="cand.color" />
              <div>
                <p class="text-xs font-semibold text-highlighted">{{ cand.name }}</p>
                <p class="text-[10px] text-muted leading-tight">{{ cand.role }}</p>
              </div>
            </div>
            <div class="flex gap-1">
              <UButton size="xs" icon="i-lucide-arrow-right" color="neutral" variant="ghost" class="text-[10px]" />
              <UButton size="xs" icon="i-lucide-x" color="error" variant="ghost" class="text-[10px]" />
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Open Positions -->
      <UCard :ui="{ body: 'p-0' }">
        <div class="flex items-center justify-between px-5 py-4 border-b border-default">
          <h2 class="font-semibold text-highlighted">Open Positions</h2>
          <UButton label="Post new job" size="xs" color="neutral" variant="ghost" trailing-icon="i-lucide-plus" />
        </div>
        <div class="divide-y divide-default">
          <div
            v-for="role in openRoles"
            :key="role.title"
            class="px-5 py-4 hover:bg-muted/30 transition-colors"
          >
            <div class="flex items-start justify-between gap-3 mb-2">
              <div>
                <p class="font-medium text-highlighted text-sm">{{ role.title }}</p>
                <p class="text-xs text-muted mt-0.5">{{ role.dept }} · {{ role.type }}</p>
              </div>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0" :class="priorityConfig[role.priority]">{{ role.priority }}</span>
            </div>
            <div class="flex items-center gap-4 text-xs text-dimmed">
              <span class="flex items-center gap-1"><UIcon name="i-lucide-users" class="size-3" /> {{ role.applicants }} applicants</span>
              <span class="flex items-center gap-1"><UIcon name="i-lucide-calendar" class="size-3" /> Posted {{ role.posted }}</span>
              <UBadge :label="role.stage" color="primary" variant="subtle" size="xs" class="ml-auto" />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Today's Interviews -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-4">Today's Interviews</h2>
        <div class="space-y-4">
          <div
            v-for="interview in todayInterviews"
            :key="interview.candidate"
            class="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div class="text-center min-w-16">
              <p class="text-xs font-bold text-primary">{{ interview.time }}</p>
            </div>
            <div class="flex-1">
              <p class="font-medium text-highlighted text-sm">{{ interview.candidate }}</p>
              <p class="text-xs text-muted">{{ interview.role }}</p>
              <div class="flex items-center gap-3 mt-2">
                <UBadge :label="interview.type" color="neutral" variant="subtle" size="xs" />
                <span class="text-xs text-dimmed">with {{ interview.interviewer }}</span>
              </div>
            </div>
            <UButton icon="i-lucide-video" size="xs" color="primary" variant="subtle" />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
