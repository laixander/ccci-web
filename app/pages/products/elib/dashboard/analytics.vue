<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const checkoutTrend = [
  { month: 'Mar', value: 890 }, { month: 'Apr', value: 1020 }, { month: 'May', value: 1180 },
  { month: 'Jun', value: 980 }, { month: 'Jul', value: 1140 }, { month: 'Aug', value: 1248 },
]
const maxTrend = Math.max(...checkoutTrend.map(d => d.value))

const topTitles = [
  { title: 'Atomic Habits', author: 'James Clear', checkouts: 142, pct: 100 },
  { title: 'Sapiens', author: 'Yuval N. Harari', checkouts: 128, pct: 90 },
  { title: 'Clean Code', author: 'Robert C. Martin', checkouts: 115, pct: 81 },
  { title: 'The Alchemist', author: 'Paulo Coelho', checkouts: 107, pct: 75 },
  { title: 'Deep Work', author: 'Cal Newport', checkouts: 98, pct: 69 },
]

const genreDist = [
  { label: 'Fiction', pct: 35, color: 'bg-primary' },
  { label: 'Technology', pct: 25, color: 'bg-info' },
  { label: 'Science', pct: 18, color: 'bg-success' },
  { label: 'History', pct: 12, color: 'bg-warning' },
  { label: 'Other', pct: 10, color: 'bg-muted' },
]

const kpis = [
  { label: 'Total Checkouts', value: '7,456', change: '↑ 12% vs last month', up: true, icon: 'i-lucide-book-open', bg: 'bg-primary/10', color: 'text-primary' },
  { label: 'Unique Patrons', value: '1,820', change: '↑ 5% vs last month', up: true, icon: 'i-lucide-users', bg: 'bg-success/10', color: 'text-success' },
  { label: 'Avg Loan Duration', value: '14.2d', change: '↓ 0.8d vs last month', up: false, icon: 'i-lucide-clock', bg: 'bg-info/10', color: 'text-info' },
  { label: 'Collection Size', value: '12,842', change: '+92 new this month', up: true, icon: 'i-lucide-library', bg: 'bg-warning/10', color: 'text-warning' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Analytics</h1>
        <p class="text-muted text-sm mt-1">Library usage insights and collection performance metrics.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton label="Last 6 Months" color="neutral" variant="outline" icon="i-lucide-calendar" />
        <UButton label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="kpi in kpis" :key="kpi.label">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-muted text-sm">{{ kpi.label }}</p>
            <p class="text-3xl font-extrabold text-highlighted mt-1">{{ kpi.value }}</p>
            <p :class="['text-xs mt-1 font-medium', kpi.up ? 'text-success' : 'text-error']">{{ kpi.change }}</p>
          </div>
          <div :class="['size-10 rounded-xl flex items-center justify-center', kpi.bg]">
            <UIcon :name="kpi.icon" :class="['size-5', kpi.color]" />
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Checkout trend bar chart -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <h3 class="font-semibold text-highlighted">Monthly Checkouts</h3>
          </template>
          <div class="flex items-end gap-3 h-48 pt-4">
            <div v-for="d in checkoutTrend" :key="d.month" class="flex-1 flex flex-col items-center gap-2">
              <span class="text-xs font-semibold text-highlighted">{{ d.value }}</span>
              <div class="w-full rounded-t-md bg-primary/20 relative overflow-hidden" :style="{ height: `${(d.value / maxTrend) * 140}px` }">
                <div class="absolute bottom-0 inset-x-0 bg-primary rounded-t-md" :style="{ height: '100%' }" />
              </div>
              <span class="text-xs text-dimmed">{{ d.month }}</span>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Genre distribution -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Checkouts by Genre</h3>
        </template>
        <div class="space-y-3 py-2">
          <div v-for="g in genreDist" :key="g.label">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm text-muted">{{ g.label }}</span>
              <span class="text-sm font-semibold text-highlighted">{{ g.pct }}%</span>
            </div>
            <div class="bg-muted rounded-full h-2">
              <div :class="['h-2 rounded-full transition-all', g.color]" :style="{ width: g.pct + '%' }" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Top titles -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-highlighted">Most Borrowed Titles</h3>
      </template>
      <div class="space-y-3">
        <div v-for="(book, i) in topTitles" :key="book.title" class="flex items-center gap-4">
          <span class="text-lg font-extrabold text-dimmed w-6 shrink-0">{{ i + 1 }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <div>
                <span class="text-sm font-semibold text-highlighted">{{ book.title }}</span>
                <span class="text-xs text-muted ml-2">{{ book.author }}</span>
              </div>
              <span class="text-sm font-bold text-highlighted">{{ book.checkouts }} checkouts</span>
            </div>
            <div class="bg-muted rounded-full h-1.5">
              <div class="h-1.5 rounded-full bg-primary" :style="{ width: book.pct + '%' }" />
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
