<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedGrade = ref('All')
const selectedCategory = ref('All')

const grades = ['All', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
const categories = ['All', 'Normal', 'Underweight', 'Overweight', 'Obese', 'At Risk']

const records = ref([
  { id: 'BC-001', name: 'Maria Santos', initials: 'MS', grade: 'Grade 10', height: 162, weight: 56.2, bmi: 21.4, bodyFat: 22.1, muscleMass: 38.5, category: 'Normal', lastUpdated: 'Aug 26, 2026' },
  { id: 'BC-002', name: 'Juan dela Cruz', initials: 'JC', grade: 'Grade 10', height: 170, weight: 67.0, bmi: 23.1, bodyFat: 18.4, muscleMass: 44.2, category: 'Normal', lastUpdated: 'Aug 26, 2026' },
  { id: 'BC-003', name: 'Ana Reyes', initials: 'AR', grade: 'Grade 11', height: 158, weight: 52.1, bmi: 20.9, bodyFat: 24.0, muscleMass: 35.8, category: 'Normal', lastUpdated: 'Aug 25, 2026' },
  { id: 'BC-004', name: 'Carlo Bautista', initials: 'CB', grade: 'Grade 9', height: 168, weight: 78.5, bmi: 27.8, bodyFat: 31.2, muscleMass: 36.1, category: 'Overweight', lastUpdated: 'Aug 25, 2026' },
  { id: 'BC-005', name: 'Liza Navarro', initials: 'LN', grade: 'Grade 12', height: 165, weight: 60.0, bmi: 22.0, bodyFat: 23.5, muscleMass: 40.2, category: 'Normal', lastUpdated: 'Aug 24, 2026' },
  { id: 'BC-006', name: 'Pedro Garcia', initials: 'PG', grade: 'Grade 9', height: 172, weight: 89.2, bmi: 30.1, bodyFat: 38.0, muscleMass: 34.5, category: 'Obese', lastUpdated: 'Aug 24, 2026' },
  { id: 'BC-007', name: 'Rosa Mendoza', initials: 'RM', grade: 'Grade 7', height: 150, weight: 40.1, bmi: 17.8, bodyFat: 16.0, muscleMass: 28.9, category: 'Underweight', lastUpdated: 'Aug 23, 2026' },
  { id: 'BC-008', name: 'Marco Torres', initials: 'MT', grade: 'Grade 8', height: 165, weight: 68.7, bmi: 25.2, bodyFat: 26.3, muscleMass: 42.0, category: 'At Risk', lastUpdated: 'Aug 23, 2026' },
])

const categoryConfig: Record<string, string> = {
  Normal: 'bg-success/10 text-success',
  Underweight: 'bg-info/10 text-info',
  Overweight: 'bg-warning/10 text-warning',
  Obese: 'bg-error/10 text-error',
  'At Risk': 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
}

const filtered = computed(() =>
  records.value.filter(r => {
    const matchSearch = !search.value || r.name.toLowerCase().includes(search.value.toLowerCase()) || r.id.toLowerCase().includes(search.value.toLowerCase())
    const matchGrade = selectedGrade.value === 'All' || r.grade === selectedGrade.value
    const matchCat = selectedCategory.value === 'All' || r.category === selectedCategory.value
    return matchSearch && matchGrade && matchCat
  })
)

const columns = [
  { accessorKey: 'student', header: 'Student' },
  { accessorKey: 'grade', header: 'Grade' },
  { accessorKey: 'height', header: 'Height (cm)' },
  { accessorKey: 'weight', header: 'Weight (kg)' },
  { accessorKey: 'bmi', header: 'BMI' },
  { accessorKey: 'bodyFat', header: 'Body Fat %' },
  { accessorKey: 'muscleMass', header: 'Muscle Mass (kg)' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'lastUpdated', header: 'Updated' },
  { id: 'actions' },
]

const showAddModal = ref(false)
const selectedRecord = ref<typeof records.value[0] | null>(null)
const showDetailModal = ref(false)

function viewRecord(r: typeof records.value[0]) {
  selectedRecord.value = r
  showDetailModal.value = true
}

// ── Chart.js: Doughnut — BMI Category Distribution ───────────────────────
const categoryOrder = ['Normal', 'Underweight', 'Overweight', 'Obese', 'At Risk']
const categoryColors = [
  'rgba(34,197,94,0.8)',   // Normal — green
  'rgba(14,165,233,0.8)',  // Underweight — sky
  'rgba(234,179,8,0.8)',   // Overweight — yellow
  'rgba(239,68,68,0.8)',   // Obese — red
  'rgba(249,115,22,0.8)',  // At Risk — orange
]

const categoryDescriptions: Record<string, string> = {
  Normal: 'BMI within the healthy parameters for age and height.',
  Underweight: 'BMI below the 5th percentile. May need nutritional monitoring.',
  Overweight: 'BMI between the 85th and 95th percentiles. At risk for conditions.',
  Obese: 'BMI at or above the 95th percentile. Intervention strongly advised.',
  'At Risk': 'Significantly outside healthy parameters. Immediate action needed.',
}

const doughnutData = computed(() => {
  const counts = categoryOrder.map(cat =>
    records.value.filter(r => r.category === cat).length
  )
  return {
    labels: categoryOrder,
    datasets: [{
      data: counts,
      backgroundColor: categoryColors,
      borderWidth: 2,
      borderColor: 'transparent',
      hoverOffset: 8,
    }],
  }
})

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: 'rgba(107,114,128,1)',
        padding: 16,
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 6,
        useBorderRadius: true,
        generateLabels: (chart: any) => {
          const data = chart.data
          const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)
          return data.labels.map((label: string, i: number) => {
            const count = data.datasets[0].data[i]
            const pct = total ? ((count / total) * 100).toFixed(0) : '0'
            return {
              text: `${label} — ${count} (${pct}%)`,
              fontColor: 'rgba(107,114,128,1)',
              fillStyle: categoryColors[i],
              strokeStyle: categoryColors[i],
              lineWidth: 0,
              index: i,
              hidden: false,
            }
          })
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const pct = total ? ((ctx.parsed / total) * 100).toFixed(1) : '0'
          return ` ${ctx.label}: ${ctx.parsed} students (${pct}%)`
        },
      },
    },
  },
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Body Composition</h1>
        <p class="text-muted text-sm mt-1">Track and monitor individual body composition over time</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add Record" size="sm" @click="showAddModal = true" />
    </div>

    <UCard :ui="{ body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search students…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedGrade" :items="grades" class="w-40" />
        <USelect v-model="selectedCategory" :items="categories" class="w-36" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} results</span>
      </div>
    </UCard>
    <!-- BMI Distribution Doughnut + summary stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Doughnut chart -->
      <UCard class="md:col-span-1">
        <template #header>
          <h2 class="font-semibold text-highlighted">BMI Category Distribution</h2>
        </template>
        <div class="h-52">
          <Doughnut :data="doughnutData" :options="doughnutOptions" />
        </div>
      </UCard>

      <!-- Per-category stat cards -->
      <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <UCard v-for="(cat, i) in categoryOrder" :key="cat">
          <div class="flex items-center gap-2 mb-2">
            <span class="size-3 rounded-full shrink-0" :style="{ background: categoryColors[i] }" />
            <span class="text-xs font-semibold text-muted">{{ cat }}</span>
          </div>
          <p class="text-2xl font-extrabold text-highlighted">
            {{ records.filter(r => r.category === cat).length }}
          </p>
          <p class="text-xs text-dimmed mt-1">
            {{ records.length ? ((records.filter(r => r.category === cat).length / records.length) * 100).toFixed(0) : 0 }}% of total
          </p>
          <p class="text-[10px] text-dimmed mt-2 leading-relaxed">
            {{ categoryDescriptions[cat] }}
          </p>
        </UCard>
        <!-- Total tile -->
        <UCard class="bg-primary/5 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-users" class="size-3.5 text-primary" />
              <span class="text-xs font-semibold text-muted">Total</span>
            </div>
            <p class="text-2xl font-extrabold text-primary">{{ records.length }}</p>
            <p class="text-xs text-dimmed mt-1">records loaded</p>
          </div>
          <p class="text-[10px] text-primary/70 mt-2 leading-relaxed">
            Overall snapshot of body composition and BMI records in the system.
          </p>
        </UCard>
      </div>
    </div>

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
          <template #height-cell="{ row }">
            <span class="text-muted">{{ row.original.height }} cm</span>
          </template>
          <template #weight-cell="{ row }">
            <span class="text-muted">{{ row.original.weight }} kg</span>
          </template>
          <template #bmi-cell="{ row }">
            <span class="font-semibold" :class="row.original.bmi > 25 ? 'text-warning' : row.original.bmi < 18.5 ? 'text-info' : 'text-highlighted'">
              {{ row.original.bmi }}
            </span>
          </template>
          <template #bodyFat-cell="{ row }">
            <span class="text-muted">{{ row.original.bodyFat }}%</span>
          </template>
          <template #muscleMass-cell="{ row }">
            <span class="text-muted">{{ row.original.muscleMass }} kg</span>
          </template>
          <template #category-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="categoryConfig[row.original.category]">
              {{ row.original.category }}
            </span>
          </template>
          <template #lastUpdated-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.lastUpdated }}</span>
          </template>
          <template #actions-cell="{ row }">
            <div @click.stop>
              <UDropdownMenu
                :items="[[{ label: 'View History', icon: 'i-lucide-eye', onSelect: () => viewRecord(row.original) }, { label: 'Update Record', icon: 'i-lucide-pencil' }]]"
                :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
                size="sm"
              >
                <UButton icon="i-lucide-more-vertical" size="xs" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </div>
          </template>
          <template #empty>
            <div class="py-16 flex flex-col items-center justify-center">
              <UEmpty icon="i-lucide-person-standing" title="No body composition records found" description="Try adjusting filters or add a new record" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedRecord?.name || ''" :description="`${selectedRecord?.grade} · Last updated: ${selectedRecord?.lastUpdated}`">
      <template #body>
        <div v-if="selectedRecord" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedRecord.initials" size="xl" color="primary" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedRecord.name }}</p>
              <p class="text-muted">{{ selectedRecord.grade }}</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2" :class="categoryConfig[selectedRecord.category]">
                {{ selectedRecord.category }}
              </span>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Height</p><p class="text-highlighted font-medium">{{ selectedRecord.height }} cm</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Weight</p><p class="text-highlighted font-medium">{{ selectedRecord.weight }} kg</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">BMI</p><p class="text-highlighted font-medium">{{ selectedRecord.bmi }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Body Fat %</p><p class="text-highlighted font-medium">{{ selectedRecord.bodyFat }}%</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Muscle Mass</p><p class="text-highlighted font-medium">{{ selectedRecord.muscleMass }} kg</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Category</p><p class="font-medium" :class="categoryConfig[selectedRecord.category]">{{ selectedRecord.category }}</p></div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedRecord = null" />
        <UButton label="Update Record" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Add Record Modal -->
    <UModal v-model:open="showAddModal" title="Add Body Composition Record" description="Enter the student's latest measurements">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Student Name"><UInput placeholder="Search student…" icon="i-lucide-search" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Height (cm)"><UInput type="number" placeholder="e.g. 165" class="w-full" /></UFormField>
            <UFormField label="Weight (kg)"><UInput type="number" placeholder="e.g. 60.5" class="w-full" /></UFormField>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Body Fat %"><UInput type="number" placeholder="e.g. 22.5" class="w-full" /></UFormField>
            <UFormField label="Muscle Mass (kg)"><UInput type="number" placeholder="e.g. 38.0" class="w-full" /></UFormField>
          </div>
          <UFormField label="Measurement Date"><UInput type="date" class="w-full" /></UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Save Record" icon="i-lucide-save" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
