<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedGrade = ref('All')
const selectedTerm = ref('All')

const grades = ['All', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
const terms = ['All', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026']

const records = ref([
  { id: 'AR-001', name: 'Maria Santos', initials: 'MS', grade: 'Grade 10', vo2: 48.2, flexibility: 88, strength: 'A', endurance: 91, overall: 92, term: 'Q2 2026', remarks: 'Excellent performance' },
  { id: 'AR-002', name: 'Juan dela Cruz', initials: 'JC', grade: 'Grade 10', vo2: 41.5, flexibility: 72, strength: 'B+', endurance: 76, overall: 78, term: 'Q2 2026', remarks: 'Good improvement' },
  { id: 'AR-003', name: 'Ana Reyes', initials: 'AR', grade: 'Grade 11', vo2: 44.8, flexibility: 85, strength: 'A-', endurance: 82, overall: 85, term: 'Q2 2026', remarks: 'Consistent progress' },
  { id: 'AR-004', name: 'Carlo Bautista', initials: 'CB', grade: 'Grade 9', vo2: 32.1, flexibility: 40, strength: 'C', endurance: 50, overall: 54, term: 'Q2 2026', remarks: 'Needs intervention' },
  { id: 'AR-005', name: 'Liza Navarro', initials: 'LN', grade: 'Grade 12', vo2: 46.3, flexibility: 90, strength: 'A', endurance: 88, overall: 88, term: 'Q2 2026', remarks: 'Outstanding' },
  { id: 'AR-006', name: 'Marco Torres', initials: 'MT', grade: 'Grade 8', vo2: 38.9, flexibility: 61, strength: 'B', endurance: 70, overall: 71, term: 'Q1 2026', remarks: 'Steady progress' },
  { id: 'AR-007', name: 'Rosa Mendoza', initials: 'RM', grade: 'Grade 7', vo2: 35.0, flexibility: 55, strength: 'B-', endurance: 62, overall: 65, term: 'Q1 2026', remarks: 'Good for beginners' },
  { id: 'AR-008', name: 'Pedro Garcia', initials: 'PG', grade: 'Grade 9', vo2: 29.4, flexibility: 35, strength: 'D', endurance: 42, overall: 41, term: 'Q1 2026', remarks: 'Requires special program' },
])

const filtered = computed(() =>
  records.value.filter(r => {
    const matchSearch = !search.value || r.name.toLowerCase().includes(search.value.toLowerCase()) || r.id.toLowerCase().includes(search.value.toLowerCase())
    const matchGrade = selectedGrade.value === 'All' || r.grade === selectedGrade.value
    const matchTerm = selectedTerm.value === 'All' || r.term === selectedTerm.value
    return matchSearch && matchGrade && matchTerm
  })
)

const columns = [
  { accessorKey: 'student', header: 'Student' },
  { accessorKey: 'grade', header: 'Grade' },
  { accessorKey: 'vo2', header: 'VO₂ Max' },
  { accessorKey: 'flexibility', header: 'Flexibility' },
  { accessorKey: 'strength', header: 'Strength' },
  { accessorKey: 'endurance', header: 'Endurance' },
  { accessorKey: 'overall', header: 'Overall' },
  { accessorKey: 'term', header: 'Term' },
  { accessorKey: 'remarks', header: 'Remarks' },
  { id: 'actions' },
]

const selectedRecord = ref<typeof records.value[0] | null>(null)
const showDetailModal = ref(false)

function viewRecord(r: typeof records.value[0]) {
  selectedRecord.value = r
  showDetailModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Assessment Records</h1>
        <p class="text-muted text-sm mt-1">Complete fitness assessment history for all students</p>
      </div>
      <UButton icon="i-lucide-download" label="Export Records" size="sm" color="neutral" variant="outline" />
    </div>

    <UCard :ui="{ body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search students…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedGrade" :items="grades" class="w-40" />
        <USelect v-model="selectedTerm" :items="terms" class="w-36" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} records</span>
      </div>
    </UCard>

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
          @select="(e, row) => viewRecord(row.original)"
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
            <span class="text-muted">{{ row.original.vo2 }}</span>
          </template>
          <template #flexibility-cell="{ row }">
            <div class="flex items-center gap-2 w-20">
              <div class="flex-1 bg-muted rounded-full h-1.5">
                <div class="h-1.5 rounded-full bg-primary" :style="{ width: row.original.flexibility + '%' }" />
              </div>
              <span class="text-xs text-dimmed">{{ row.original.flexibility }}%</span>
            </div>
          </template>
          <template #strength-cell="{ row }">
            <span class="font-semibold text-highlighted">{{ row.original.strength }}</span>
          </template>
          <template #endurance-cell="{ row }">
            <span class="text-muted">{{ row.original.endurance }}%</span>
          </template>
          <template #overall-cell="{ row }">
            <span class="font-bold text-base" :class="row.original.overall >= 75 ? 'text-primary' : 'text-error'">{{ row.original.overall }}</span>
          </template>
          <template #term-cell="{ row }">
            <UBadge :label="row.original.term" color="neutral" variant="outline" size="sm" />
          </template>
          <template #remarks-cell="{ row }">
            <span class="text-muted text-xs italic">{{ row.original.remarks }}</span>
          </template>
          <template #actions-cell="{ row }">
            <div @click.stop>
              <UDropdownMenu
                :items="[[{ label: 'View Details', icon: 'i-lucide-eye', onSelect: () => viewRecord(row.original) }, { label: 'Print Record', icon: 'i-lucide-printer' }]]"
                :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
                size="sm"
              >
                <UButton icon="i-lucide-more-vertical" size="xs" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </div>
          </template>
          <template #empty>
            <div class="py-16 flex flex-col items-center justify-center">
              <UEmpty icon="i-lucide-file-check" title="No assessment records found" description="Try adjusting your filters or conduct a new fitness assessment" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedRecord?.name || ''" :description="`${selectedRecord?.grade} · ${selectedRecord?.term}`">
      <template #body>
        <div v-if="selectedRecord" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedRecord.initials" size="xl" color="primary" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedRecord.name }}</p>
              <p class="text-muted">{{ selectedRecord.grade }} · {{ selectedRecord.term }}</p>
              <p class="text-sm text-dimmed italic mt-1">{{ selectedRecord.remarks }}</p>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">VO₂ Max</p><p class="text-highlighted font-medium">{{ selectedRecord.vo2 }} mL/kg/min</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Flexibility</p><p class="text-highlighted font-medium">{{ selectedRecord.flexibility }}%</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Strength</p><p class="text-highlighted font-medium">{{ selectedRecord.strength }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Endurance</p><p class="text-highlighted font-medium">{{ selectedRecord.endurance }}%</p></div>
            <div class="col-span-2">
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Overall Score</p>
              <p class="text-3xl font-extrabold" :class="selectedRecord.overall >= 75 ? 'text-primary' : 'text-error'">{{ selectedRecord.overall }} <span class="text-base font-normal text-muted">/ 100</span></p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedRecord = null" />
        <UButton label="Print Record" icon="i-lucide-printer" />
      </template>
    </UModal>
  </div>
</template>
