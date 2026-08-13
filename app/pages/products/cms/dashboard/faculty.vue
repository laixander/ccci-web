<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const stats = [
  { label: 'Total Faculty', value: '218', icon: 'i-lucide-user-check', color: 'text-primary', bg: 'bg-primary/10', change: '↑ 12 this semester' },
  { label: 'Active Programs', value: '24', icon: 'i-lucide-book-open', color: 'text-info', bg: 'bg-info/10', change: 'Across 6 departments' },
  { label: 'Avg Teaching Load', value: '21 units', icon: 'i-lucide-clock', color: 'text-warning', bg: 'bg-warning/10', change: 'Standard is 21 units' },
  { label: 'CHED Compliant', value: '100%', icon: 'i-lucide-shield-check', color: 'text-success', bg: 'bg-success/10', change: 'Last audit: Jul 2026' },
]

const faculty = ref([
  { id: 'F001', name: 'Prof. Rosa Reyes', initials: 'RR', dept: 'Nursing', position: 'Full-time', load: 24, subjects: 4, status: 'Active', evaluation: 4.8, avatarColor: 'primary' as const },
  { id: 'F002', name: 'Prof. Juan Santos', initials: 'JS', dept: 'Engineering', position: 'Full-time', load: 21, subjects: 3, status: 'Active', evaluation: 4.5, avatarColor: 'neutral' as const },
  { id: 'F003', name: 'Prof. Carla Cruz', initials: 'CC', dept: 'Business', position: 'Part-time', load: 12, subjects: 2, status: 'Active', evaluation: 4.2, avatarColor: 'warning' as const },
  { id: 'F004', name: 'Prof. Mark Park', initials: 'MP', dept: 'IT & CS', position: 'Full-time', load: 21, subjects: 3, status: 'On Leave', evaluation: 4.7, avatarColor: 'info' as const },
  { id: 'F005', name: 'Prof. Elena Lim', initials: 'EL', dept: 'Arts & Sciences', position: 'Full-time', load: 18, subjects: 3, status: 'Active', evaluation: 3.9, avatarColor: 'success' as const },
])

const statusConfig: Record<string, string> = {
  'Active': 'bg-success/10 text-success',
  'On Leave': 'bg-warning/10 text-warning',
  'Resigned': 'bg-error/10 text-error',
}

const programs = [
  { name: 'BS Nursing', dept: 'Nursing', years: 4, units: 180, students: 742, status: 'CHED Accredited', statusClass: 'bg-success/10 text-success' },
  { name: 'BS Civil Engineering', dept: 'Engineering', years: 5, units: 210, students: 512, status: 'CHED Accredited', statusClass: 'bg-success/10 text-success' },
  { name: 'BS Computer Science', dept: 'IT & CS', years: 4, units: 168, students: 380, status: 'CHED Accredited', statusClass: 'bg-success/10 text-success' },
  { name: 'BS Business Administration', dept: 'Business', years: 4, units: 154, students: 620, status: 'For Renewal', statusClass: 'bg-warning/10 text-warning' },
  { name: 'Bachelor of Secondary Education', dept: 'Education', years: 4, units: 156, students: 856, status: 'CHED Accredited', statusClass: 'bg-success/10 text-success' },
]

const search = ref('')
const filtered = computed(() => faculty.value.filter(f => !search.value || f.name.toLowerCase().includes(search.value.toLowerCase())))

const showAddFacultyModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Faculty & Curriculum Management</h1>
        <p class="text-muted text-sm mt-1">Manage faculty loads, programs, and CHED compliance</p>
      </div>
      <UButton icon="i-lucide-user-plus" label="Add Faculty" @click="showAddFacultyModal = true" />
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

    <!-- Faculty Table -->
    <UCard :ui="{ body: 'p-0' }">
      <div class="flex items-center justify-between px-5 py-4 border-b border-default">
        <h2 class="font-semibold text-highlighted">Faculty Roster</h2>
        <UInput v-model="search" placeholder="Search faculty…" icon="i-lucide-search" size="sm" class="w-52" />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Faculty</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Department</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Position</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Load</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Evaluation</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="f in filtered" :key="f.id" class="hover:bg-muted/30 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="f.initials" size="sm" :color="f.avatarColor" />
                  <div>
                    <p class="font-medium text-highlighted">{{ f.name }}</p>
                    <p class="text-xs text-dimmed">{{ f.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-muted">{{ f.dept }}</td>
              <td class="px-4 py-4">
                <UBadge :label="f.position" color="neutral" variant="subtle" size="sm" />
              </td>
              <td class="px-4 py-4">
                <span class="font-semibold text-highlighted">{{ f.load }}</span>
                <span class="text-xs text-muted ml-1">units · {{ f.subjects }} subjects</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1.5">
                  <div class="flex gap-0.5">
                    <UIcon v-for="i in 5" :key="i" name="i-lucide-star" :class="['size-3.5', i <= Math.round(f.evaluation) ? 'text-warning' : 'text-muted']" />
                  </div>
                  <span class="text-xs font-bold text-highlighted">{{ f.evaluation }}</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[f.status]">
                  {{ f.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Academic Programs -->
    <UCard :ui="{ body: 'p-5' }">
      <h2 class="font-semibold text-highlighted mb-5">Academic Programs & Curriculum</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="program in programs"
          :key="program.name"
          class="p-4 rounded-xl bg-muted/30 border border-default hover:shadow-sm transition-shadow space-y-3"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="font-semibold text-highlighted text-sm">{{ program.name }}</p>
              <p class="text-xs text-muted">{{ program.dept }}</p>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0" :class="program.statusClass">
              {{ program.status }}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="bg-muted/30 rounded-lg p-2">
              <p class="font-bold text-highlighted text-sm">{{ program.years }}yr</p>
              <p class="text-xs text-dimmed">Duration</p>
            </div>
            <div class="bg-muted/30 rounded-lg p-2">
              <p class="font-bold text-highlighted text-sm">{{ program.units }}</p>
              <p class="text-xs text-dimmed">Units</p>
            </div>
            <div class="bg-muted/30 rounded-lg p-2">
              <p class="font-bold text-highlighted text-sm">{{ program.students.toLocaleString() }}</p>
              <p class="text-xs text-dimmed">Students</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Add Faculty Modal -->
    <UModal v-model:open="showAddFacultyModal" title="Add Faculty Member" description="Onboard a new faculty member">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="First Name"><UInput placeholder="Rosa" class="w-full" /></UFormField>
            <UFormField label="Last Name"><UInput placeholder="Reyes" class="w-full" /></UFormField>
          </div>
          <UFormField label="Email"><UInput type="email" placeholder="faculty@campus.edu" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Department"><USelect :items="['Nursing', 'Engineering', 'Business', 'IT & CS', 'Arts & Sciences', 'Education']" class="w-full" /></UFormField>
            <UFormField label="Position"><USelect :items="['Full-time', 'Part-time', 'Visiting']" class="w-full" /></UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddFacultyModal = false" />
        <UButton label="Add Faculty" icon="i-lucide-user-plus" @click="showAddFacultyModal = false" />
      </template>
    </UModal>
  </div>
</template>
