<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedGrade = ref('All')
const selectedStatus = ref('All')

const grades = ['All', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
const statuses = ['All', 'Pass', 'Fail', 'Pending']

const tests = ref([
  { id: 'FT-001', name: 'Maria Santos', initials: 'MS', grade: 'Grade 10', vo2: 48.2, bmi: 21.4, flexibility: 88, strength: 'A', score: 92, status: 'Pass', date: 'Aug 26, 2026' },
  { id: 'FT-002', name: 'Juan dela Cruz', initials: 'JC', grade: 'Grade 10', vo2: 41.5, bmi: 23.1, flexibility: 72, strength: 'B+', score: 78, status: 'Pass', date: 'Aug 26, 2026' },
  { id: 'FT-003', name: 'Ana Reyes', initials: 'AR', grade: 'Grade 11', vo2: 44.8, bmi: 20.9, flexibility: 85, strength: 'A-', score: 85, status: 'Pass', date: 'Aug 25, 2026' },
  { id: 'FT-004', name: 'Carlo Bautista', initials: 'CB', grade: 'Grade 9', vo2: 32.1, bmi: 27.8, flexibility: 40, strength: 'C', score: 54, status: 'Fail', date: 'Aug 25, 2026' },
  { id: 'FT-005', name: 'Liza Navarro', initials: 'LN', grade: 'Grade 12', vo2: 46.3, bmi: 22.0, flexibility: 90, strength: 'A', score: 88, status: 'Pass', date: 'Aug 24, 2026' },
  { id: 'FT-006', name: 'Marco Torres', initials: 'MT', grade: 'Grade 8', vo2: 38.9, bmi: 25.2, flexibility: 61, strength: 'B', score: 71, status: 'Pass', date: 'Aug 24, 2026' },
  { id: 'FT-007', name: 'Rosa Mendoza', initials: 'RM', grade: 'Grade 7', vo2: 35.0, bmi: 22.8, flexibility: 55, strength: 'B-', score: 65, status: 'Pass', date: 'Aug 23, 2026' },
  { id: 'FT-008', name: 'Pedro Garcia', initials: 'PG', grade: 'Grade 9', vo2: 29.4, bmi: 30.1, flexibility: 35, strength: 'D', score: 41, status: 'Fail', date: 'Aug 23, 2026' },
])

const statusConfig: Record<string, string> = {
  Pass: 'bg-success/10 text-success',
  Fail: 'bg-error/10 text-error',
  Pending: 'bg-warning/10 text-warning',
}

const filtered = computed(() =>
  tests.value.filter(t => {
    const matchSearch = !search.value || t.name.toLowerCase().includes(search.value.toLowerCase()) || t.id.toLowerCase().includes(search.value.toLowerCase())
    const matchGrade = selectedGrade.value === 'All' || t.grade === selectedGrade.value
    const matchStatus = selectedStatus.value === 'All' || t.status === selectedStatus.value
    return matchSearch && matchGrade && matchStatus
  })
)

const columns = [
  { accessorKey: 'student', header: 'Student' },
  { accessorKey: 'grade', header: 'Grade Level' },
  { accessorKey: 'vo2', header: 'VO₂ Max' },
  { accessorKey: 'bmi', header: 'BMI' },
  { accessorKey: 'flexibility', header: 'Flexibility' },
  { accessorKey: 'strength', header: 'Strength' },
  { accessorKey: 'score', header: 'Score' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'date', header: 'Date' },
  { id: 'actions' },
]

const showAddModal = ref(false)
const selectedTest = ref<typeof tests.value[0] | null>(null)
const showDetailModal = ref(false)

function viewTest(t: typeof tests.value[0]) {
  selectedTest.value = t
  showDetailModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Fitness Tests</h1>
        <p class="text-muted text-sm mt-1">{{ tests.length }} assessment records this period</p>
      </div>
      <UButton icon="i-lucide-play-circle" label="Start Assessment" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Filters -->
    <UCard :ui="{ body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search students…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedGrade" :items="grades" class="w-40" />
        <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} results</span>
      </div>
    </UCard>

    <!-- Table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="overflow-x-auto">
        <UTable
          :data="filtered"
          :columns="columns"
          class="scrollbar w-full text-sm"
          :ui="{
            th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
            td: 'px-4 py-4',
            tr: 'hover:bg-muted/30 transition-colors cursor-pointer'
          }"
          @select="(e, row) => viewTest(row.original)"
        >
          <template #student-header><span class="px-1">Student</span></template>
          <template #student-cell="{ row }">
            <div class="flex items-center gap-3 px-1">
              <UAvatar :text="row.original.initials" size="sm" color="primary" />
              <div>
                <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                <p class="text-xs text-dimmed">{{ row.original.id }}</p>
              </div>
            </div>
          </template>
          <template #grade-cell="{ row }">
            <UBadge :label="row.original.grade" color="neutral" variant="subtle" size="sm" />
          </template>
          <template #vo2-cell="{ row }">
            <span class="text-muted text-sm">{{ row.original.vo2 }} mL/kg/min</span>
          </template>
          <template #bmi-cell="{ row }">
            <span :class="['text-sm font-medium', row.original.bmi > 25 ? 'text-warning' : 'text-highlighted']">{{ row.original.bmi }}</span>
          </template>
          <template #flexibility-cell="{ row }">
            <div class="flex items-center gap-2 w-24">
              <div class="flex-1 bg-muted rounded-full h-1.5">
                <div class="h-1.5 rounded-full bg-primary" :style="{ width: row.original.flexibility + '%' }" />
              </div>
              <span class="text-xs text-dimmed">{{ row.original.flexibility }}%</span>
            </div>
          </template>
          <template #strength-cell="{ row }">
            <span class="font-semibold text-highlighted">{{ row.original.strength }}</span>
          </template>
          <template #score-cell="{ row }">
            <span class="font-bold" :class="row.original.score >= 75 ? 'text-primary' : 'text-error'">{{ row.original.score }}</span>
          </template>
          <template #status-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]">
              {{ row.original.status }}
            </span>
          </template>
          <template #date-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.date }}</span>
          </template>
          <template #actions-cell="{ row }">
            <div @click.stop>
              <UDropdownMenu
                :items="[[{ label: 'View', icon: 'i-lucide-eye', onSelect: () => viewTest(row.original) }, { label: 'Re-assess', icon: 'i-lucide-refresh-cw' }]]"
                :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
                size="sm"
              >
                <UButton icon="i-lucide-more-vertical" size="xs" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </div>
          </template>
          <template #empty>
            <div class="py-16 flex flex-col items-center justify-center">
              <UEmpty icon="i-lucide-clipboard-list" title="No fitness tests found" description="Try adjusting your filters or start a new assessment" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedTest?.name || ''" :description="`${selectedTest?.grade} · ${selectedTest?.date}`">
      <template #body>
        <div v-if="selectedTest" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedTest.initials" size="xl" color="primary" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedTest.name }}</p>
              <p class="text-muted">{{ selectedTest.grade }}</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2" :class="statusConfig[selectedTest.status]">
                {{ selectedTest.status }}
              </span>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">VO₂ Max</p><p class="text-highlighted font-medium">{{ selectedTest.vo2 }} mL/kg/min</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">BMI</p><p class="text-highlighted font-medium">{{ selectedTest.bmi }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Flexibility</p><p class="text-highlighted font-medium">{{ selectedTest.flexibility }}%</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Strength Grade</p><p class="text-highlighted font-medium">{{ selectedTest.strength }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Overall Score</p><p class="font-bold text-lg" :class="selectedTest.score >= 75 ? 'text-primary' : 'text-error'">{{ selectedTest.score }} / 100</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Date Assessed</p><p class="text-highlighted font-medium">{{ selectedTest.date }}</p></div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedTest = null" />
        <UButton label="Re-assess" icon="i-lucide-refresh-cw" />
      </template>
    </UModal>

    <!-- Add Assessment Modal -->
    <UModal v-model:open="showAddModal" title="Start New Assessment" description="Select a student and configure the fitness test">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Student Name">
            <UInput placeholder="Search student…" icon="i-lucide-search" class="w-full" />
          </UFormField>
          <UFormField label="Grade Level">
            <USelect :items="grades.slice(1)" class="w-full" />
          </UFormField>
          <UFormField label="Assessment Date">
            <UInput type="date" class="w-full" />
          </UFormField>
          <UFormField label="Test Type">
            <USelect :items="['Standard Fitness Battery', 'VO₂ Max Only', 'Body Composition Only', 'Flexibility & Strength']" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Start Assessment" icon="i-lucide-play-circle" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
