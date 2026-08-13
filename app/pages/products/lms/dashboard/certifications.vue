<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const stats = [
  { label: 'Total Issued', value: '312', icon: 'i-lucide-award', color: 'text-warning', bg: 'bg-warning/10', change: '↑ 22 this month' },
  { label: 'Expiring Soon', value: '18', icon: 'i-lucide-clock', color: 'text-error', bg: 'bg-error/10', change: 'Within 30 days' },
  { label: 'Active Certificates', value: '294', icon: 'i-lucide-shield-check', color: 'text-success', bg: 'bg-success/10', change: '94% still valid' },
  { label: 'Courses with Certs', value: '14', icon: 'i-lucide-book-open', color: 'text-primary', bg: 'bg-primary/10', change: 'Out of 84 courses' },
]

const certificates = ref([
  { id: 'CERT-0312', learner: 'Ana Dela Cruz', initials: 'AD', course: 'Q3 Compliance Training', issued: 'Aug 5, 2026', expiry: 'Aug 5, 2027', status: 'Active', avatarColor: 'warning' as const },
  { id: 'CERT-0311', learner: 'Priya Lal', initials: 'PL', course: 'New Employee Onboarding', issued: 'Aug 8, 2026', expiry: 'N/A', status: 'Active', avatarColor: 'success' as const },
  { id: 'CERT-0310', learner: 'Lena Park', initials: 'LP', course: 'Q3 Compliance Training', issued: 'Aug 5, 2026', expiry: 'Aug 5, 2027', status: 'Active', avatarColor: 'primary' as const },
  { id: 'CERT-0285', learner: 'James Reyes', initials: 'JR', course: 'Excel Advanced Techniques', issued: 'Jun 15, 2025', expiry: 'Sep 15, 2026', status: 'Expiring', avatarColor: 'neutral' as const },
  { id: 'CERT-0201', learner: 'Carlos Wu', initials: 'CW', course: 'Leadership Essentials', issued: 'Jan 12, 2025', expiry: 'Jan 12, 2026', status: 'Expired', avatarColor: 'secondary' as const },
  { id: 'CERT-0300', learner: 'Maria Santos', initials: 'MS', course: 'Project Management Pro', issued: 'Jul 30, 2026', expiry: 'Jul 30, 2027', status: 'Active', avatarColor: 'primary' as const },
])

const statusConfig: Record<string, string> = {
  'Active': 'bg-success/10 text-success',
  'Expiring': 'bg-warning/10 text-warning',
  'Expired': 'bg-error/10 text-error',
}

const badges = [
  { name: 'Fast Learner', icon: 'i-lucide-zap', color: 'text-warning', bg: 'bg-warning/10', count: 48 },
  { name: 'Perfect Score', icon: 'i-lucide-star', color: 'text-primary', bg: 'bg-primary/10', count: 23 },
  { name: 'Compliance Pro', icon: 'i-lucide-shield-check', color: 'text-success', bg: 'bg-success/10', count: 156 },
  { name: 'Mentor', icon: 'i-lucide-users', color: 'text-info', bg: 'bg-info/10', count: 12 },
]

const showIssueModal = ref(false)
const courseOptions = ['Q3 Compliance Training', 'New Employee Onboarding', 'Project Management Pro', 'Leadership Essentials', 'Excel Advanced Techniques']
const search = ref('')
const filteredCerts = computed(() =>
  certificates.value.filter(c => !search.value || c.learner.toLowerCase().includes(search.value.toLowerCase()) || c.course.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Certifications</h1>
        <p class="text-muted text-sm mt-1">Design and award custom certificates automatically upon course completion</p>
      </div>
      <UButton icon="i-lucide-award" label="Issue Certificate" @click="showIssueModal = true" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ body: 'p-5' }" class="hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
            <p class="text-xs text-muted">{{ stat.label }}</p>
          </div>
        </div>
        <p class="text-xs text-dimmed mt-2">{{ stat.change }}</p>
      </UCard>
    </div>

    <!-- Badges -->
    <UCard :ui="{ body: 'p-5' }">
      <h2 class="font-semibold text-highlighted mb-5">Achievement Badges</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="badge in badges"
          :key="badge.name"
          class="flex flex-col items-center gap-3 p-5 rounded-xl bg-muted/30 border border-default hover:shadow-sm transition-shadow text-center"
        >
          <div :class="['size-14 rounded-full flex items-center justify-center', badge.bg]">
            <UIcon :name="badge.icon" :class="['size-7', badge.color]" />
          </div>
          <div>
            <p class="font-semibold text-highlighted text-sm">{{ badge.name }}</p>
            <p class="text-xs text-dimmed mt-0.5">{{ badge.count }} awarded</p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Search -->
    <UCard :ui="{ body: 'p-4' }">
      <UInput v-model="search" placeholder="Search by learner or course…" icon="i-lucide-search" class="max-w-md" />
    </UCard>

    <!-- Certificate Table -->
    <UCard :ui="{ body: 'p-0' }">
      <div class="flex items-center justify-between px-5 py-4 border-b border-default">
        <h2 class="font-semibold text-highlighted">Certificate Registry</h2>
        <span class="text-sm text-muted">{{ filteredCerts.length }} certificates</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Learner</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Course</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Issued</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Expires</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="cert in filteredCerts" :key="cert.id" class="hover:bg-muted/30 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="cert.initials" size="sm" :color="cert.avatarColor" />
                  <div>
                    <p class="font-medium text-highlighted">{{ cert.learner }}</p>
                    <p class="text-xs text-dimmed">{{ cert.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-muted">{{ cert.course }}</td>
              <td class="px-4 py-4 text-muted text-xs">{{ cert.issued }}</td>
              <td class="px-4 py-4 text-muted text-xs">{{ cert.expiry }}</td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[cert.status]">
                  {{ cert.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1">
                  <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
                  <UButton icon="i-lucide-share-2" size="xs" color="neutral" variant="ghost" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Issue Certificate Modal -->
    <UModal v-model:open="showIssueModal" title="Issue Certificate" description="Manually award a certificate to a learner">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Learner Name">
            <UInput placeholder="Full name" class="w-full" />
          </UFormField>
          <UFormField label="Course">
            <USelect :items="courseOptions" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Issue Date">
              <UInput type="date" class="w-full" />
            </UFormField>
            <UFormField label="Expiry Date (optional)">
              <UInput type="date" class="w-full" />
            </UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showIssueModal = false" />
        <UButton label="Issue Certificate" icon="i-lucide-award" @click="showIssueModal = false" />
      </template>
    </UModal>
  </div>
</template>
