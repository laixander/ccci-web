<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const stats = [
  { label: 'Assessments Created', value: '24', icon: 'i-lucide-file-text', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Total Submissions', value: '856', icon: 'i-lucide-send', color: 'text-info', bg: 'bg-info/10' },
  { label: 'Average Score', value: '82%', icon: 'i-lucide-star', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Pass Rate', value: '91%', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10' },
]

const assessments = [
  { id: 'A001', title: 'JS Fundamentals – Final Quiz', course: 'JavaScript Fundamentals', type: 'Quiz', learners: 214, avgScore: 84, passed: 198, failed: 16, status: 'Active' },
  { id: 'A002', title: 'Q3 Compliance Knowledge Check', course: 'Q3 Compliance Training', type: 'Assessment', learners: 342, avgScore: 91, passed: 330, failed: 12, status: 'Active' },
  { id: 'A003', title: 'Leadership Case Study', course: 'Leadership Essentials', type: 'Assignment', learners: 98, avgScore: 79, passed: 87, failed: 11, status: 'Active' },
  { id: 'A004', title: 'Data Literacy Mid-Check', course: 'Data Literacy Bootcamp', type: 'Quiz', learners: 130, avgScore: 72, passed: 108, failed: 22, status: 'Active' },
  { id: 'A005', title: 'Excel Mastery Certification Exam', course: 'Excel Advanced Techniques', type: 'Exam', learners: 188, avgScore: 88, passed: 175, failed: 13, status: 'Closed' },
]

const typeConfig: Record<string, string> = {
  'Quiz': 'bg-info/10 text-info',
  'Assessment': 'bg-primary/10 text-primary',
  'Assignment': 'bg-warning/10 text-warning',
  'Exam': 'bg-success/10 text-success',
}

const statusConfig: Record<string, string> = {
  'Active': 'bg-success/10 text-success',
  'Closed': 'bg-muted/30 text-muted',
}

const peerFeedback = [
  { from: 'Maria Santos', to: 'James Reyes', comment: 'Excellent practical exercises — really helped me understand closures in JavaScript.', rating: 5, initials: 'MS', color: 'primary' as const },
  { from: 'Carlos Wu', to: 'Leadership Module', comment: 'The case study was challenging but very realistic. Best assignment in the course.', rating: 5, initials: 'CW', color: 'neutral' as const },
  { from: 'Priya Lal', to: 'Compliance Team', comment: 'Well-structured quiz. Clear and relevant questions tied to actual policies.', rating: 4, initials: 'PL', color: 'success' as const },
]

const activeCycle = { name: 'Q3 2026 Assessment Cycle', deadline: 'September 1, 2026', progress: 64 }

const showCreateModal = ref(false)
const assessmentTypes = ['Quiz', 'Assessment', 'Assignment', 'Exam']
const courseOptions = ['JavaScript Fundamentals', 'Q3 Compliance Training', 'Leadership Essentials', 'Data Literacy Bootcamp']

const assessmentColumns = [
  { id: 'assessment', header: 'Assessment' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'learners', header: 'Learners', meta: { class: { td: 'font-semibold text-highlighted' } } },
  { id: 'avgScore', header: 'Avg Score' },
  { id: 'passedFailed', header: 'Passed / Failed' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', meta: { class: { th: 'text-right', td: 'text-right' } } },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Assessments & Grading</h1>
        <p class="text-muted text-sm mt-1">Automated grading, peer reviews, and instant learner feedback</p>
      </div>
      <UButton icon="i-lucide-plus" label="Create Assessment" size="sm" @click="showCreateModal = true" />
    </div>

    <!-- Active Cycle Banner -->
    <UCard :ui="{ root: 'shadow-sm ring-primary/30 bg-primary/5' }">
      <div class="flex items-center gap-5">
        <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <UIcon name="i-lucide-check-circle" class="size-6 text-primary" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h2 class="font-bold text-highlighted">{{ activeCycle.name }}</h2>
            <UBadge label="Active" color="success" variant="subtle" size="sm" />
          </div>
          <p class="text-sm text-muted mb-3">Deadline: {{ activeCycle.deadline }} · {{ activeCycle.progress }}% of submissions received</p>
          <UProgress :model-value="activeCycle.progress" class="max-w-sm" />
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

    <!-- Assessment Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="flex items-center justify-between px-5 py-4 border-b border-default">
        <h2 class="font-semibold text-highlighted">Assessments</h2>
        <UBadge label="Q3 2026" color="primary" variant="subtle" size="sm" />
      </div>
      <div class="overflow-x-auto">
        <UTable :data="assessments" :columns="assessmentColumns" class="w-full">
          <template #assessment-cell="{ row }">
            <p class="font-medium text-highlighted">{{ row.original.title }}</p>
            <p class="text-xs text-dimmed">{{ row.original.course }}</p>
          </template>
          <template #type-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="typeConfig[row.original.type]">{{ row.original.type }}</span>
          </template>
          <template #avgScore-cell="{ row }">
            <div class="flex items-center gap-2">
              <UProgress :model-value="row.original.avgScore" class="w-16" />
              <span class="text-xs font-semibold text-highlighted">{{ row.original.avgScore }}%</span>
            </div>
          </template>
          <template #passedFailed-cell="{ row }">
            <span class="text-success font-semibold text-xs">{{ row.original.passed }} passed</span>
            <span class="text-muted mx-1">·</span>
            <span class="text-error font-semibold text-xs">{{ row.original.failed }} failed</span>
          </template>
          <template #status-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]">{{ row.original.status }}</span>
          </template>
          <template #actions-cell>
            <UTooltip text="View Assessment">
              <UButton icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" />
            </UTooltip>
          </template>
          <template #empty>
            <UEmpty icon="i-lucide-file-text" title="No assessments found" />
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Peer Feedback -->
    <UCard :ui="{ root: 'shadow-sm' }">
      <h2 class="font-semibold text-highlighted">Learner Feedback</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 sm:mt-6">
        <UCard
          v-for="fb in peerFeedback"
          :key="fb.from + fb.to"
          variant="subtle"
          :ui="{ root: 'shadow-sm', body: 'sm:p-4 space-y-3' }"
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

    <!-- Create Assessment Modal -->
    <UModal v-model:open="showCreateModal" title="Create Assessment" description="Add a new quiz, assignment, or exam to a course">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Title">
            <UInput placeholder="e.g. Module 3 Knowledge Check" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Type">
              <USelect :items="assessmentTypes" class="w-full" />
            </UFormField>
            <UFormField label="Course">
              <USelect :items="courseOptions" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Passing Score (%)">
            <UInput type="number" placeholder="75" class="w-full" />
          </UFormField>
          <UFormField label="Deadline">
            <UInput type="date" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showCreateModal = false" />
        <UButton label="Create Assessment" icon="i-lucide-plus" @click="showCreateModal = false" />
      </template>
    </UModal>
  </div>
</template>
