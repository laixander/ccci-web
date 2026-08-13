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
    <UCard :ui="{ body: 'p-5' }" class="border-primary/30 bg-primary/5">
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
          <div class="bg-muted/50 rounded-full h-2 w-full max-w-sm">
            <div class="bg-primary h-2 rounded-full transition-all duration-500" :style="{ width: activeCycle.progress + '%' }" />
          </div>
        </div>
        <UButton label="Send Reminder" icon="i-lucide-bell" color="neutral" variant="outline" size="sm" />
      </div>
    </UCard>

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

    <!-- Assessment Table -->
    <UCard :ui="{ body: 'p-0' }">
      <div class="flex items-center justify-between px-5 py-4 border-b border-default">
        <h2 class="font-semibold text-highlighted">Assessments</h2>
        <UBadge label="Q3 2026" color="primary" variant="subtle" size="sm" />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Assessment</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Type</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Learners</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Avg Score</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Passed / Failed</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="a in assessments" :key="a.id" class="hover:bg-muted/30 transition-colors">
              <td class="px-5 py-4">
                <p class="font-medium text-highlighted">{{ a.title }}</p>
                <p class="text-xs text-dimmed">{{ a.course }}</p>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="typeConfig[a.type]">
                  {{ a.type }}
                </span>
              </td>
              <td class="px-4 py-4 font-semibold text-highlighted">{{ a.learners }}</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-16 bg-muted/50 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full bg-primary transition-all duration-500" :style="{ width: a.avgScore + '%' }" />
                  </div>
                  <span class="text-xs font-semibold text-highlighted">{{ a.avgScore }}%</span>
                </div>
              </td>
              <td class="px-4 py-4 text-xs">
                <span class="text-success font-semibold">{{ a.passed }} passed</span>
                <span class="text-muted mx-1">·</span>
                <span class="text-error font-semibold">{{ a.failed }} failed</span>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[a.status]">
                  {{ a.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <UButton icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Peer Feedback -->
    <UCard :ui="{ body: 'p-5' }">
      <h2 class="font-semibold text-highlighted mb-5">Learner Feedback</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="fb in peerFeedback"
          :key="fb.from + fb.to"
          class="p-4 rounded-xl bg-muted/30 border border-default space-y-3"
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
        </div>
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
