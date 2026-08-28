<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const kpiCards = [
  { label: 'Books Checked Out', value: '1,248', icon: 'i-lucide-book-open', color: 'text-primary', bg: 'bg-primary/10', change: '↑ 38 from last week', up: true, down: false },
  { label: 'Active Members', value: '3,420', icon: 'i-lucide-users', color: 'text-success', bg: 'bg-success/10', change: '↑ 15 new this month', up: true, down: false },
  { label: 'Overdue Items', value: '47', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', change: '↓ 8 from last week', up: false, down: true },
  { label: 'New Arrivals', value: '92', icon: 'i-lucide-sparkles', color: 'text-warning', bg: 'bg-warning/10', change: 'This month', up: false, down: false },
]

const recentCheckouts = [
  { id: 1, title: 'Clean Code', patron: 'Juan dela Cruz', due: 'Sep 4, 2026', overdue: false, coverBg: 'bg-purple-100 dark:bg-purple-900/30', coverIcon: 'text-purple-500' },
  { id: 2, title: 'The Alchemist', patron: 'Maria Santos', due: 'Aug 20, 2026', overdue: true, coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500' },
  { id: 3, title: 'Sapiens', patron: 'Ana Reyes', due: 'Sep 10, 2026', overdue: false, coverBg: 'bg-sky-100 dark:bg-sky-900/30', coverIcon: 'text-sky-500' },
  { id: 4, title: 'Atomic Habits', patron: 'Carlo Bautista', due: 'Sep 1, 2026', overdue: false, coverBg: 'bg-green-100 dark:bg-green-900/30', coverIcon: 'text-green-500' },
  { id: 5, title: 'Dune', patron: 'Liza Navarro', due: 'Aug 15, 2026', overdue: true, coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500' },
]

const genres = [
  { label: 'Fiction', count: '4,210', pct: 85, color: 'bg-primary' },
  { label: 'Science', count: '2,340', pct: 65, color: 'bg-info' },
  { label: 'History', count: '1,870', pct: 55, color: 'bg-warning' },
  { label: 'Technology', count: '1,420', pct: 40, color: 'bg-success' },
]

const newArrivals = [
  { title: 'Deep Work', author: 'Cal Newport', bg: 'bg-teal-100 dark:bg-teal-900/30', icon: 'text-teal-500' },
  { title: '1984', author: 'George Orwell', bg: 'bg-indigo-100 dark:bg-indigo-900/30', icon: 'text-indigo-500' },
  { title: 'Thinking Fast', author: 'Daniel Kahneman', bg: 'bg-rose-100 dark:bg-rose-900/30', icon: 'text-rose-500' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Library Dashboard</h1>
        <p class="text-muted text-sm mt-1">Welcome back, Librarian Maria — here's your library at a glance.</p>
      </div>
      <UButton label="Check Out Book" icon="i-lucide-book-plus" color="primary" />
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="kpi in kpiCards" :key="kpi.label">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-muted text-sm">{{ kpi.label }}</p>
            <p class="text-3xl font-extrabold text-highlighted mt-1">{{ kpi.value }}</p>
            <p :class="['text-xs mt-1 font-medium', kpi.up ? 'text-success' : kpi.down ? 'text-error' : 'text-muted']">
              {{ kpi.change }}
            </p>
          </div>
          <div :class="['size-10 rounded-xl flex items-center justify-center', kpi.bg]">
            <UIcon :name="kpi.icon" :class="['size-5', kpi.color]" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Main content grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent checkouts -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-highlighted">Recent Checkouts</h3>
              <UButton label="View All" color="neutral" variant="ghost" size="xs" to="/products/elib/dashboard/borrowed" />
            </div>
          </template>
          <div class="divide-y divide-default">
            <div v-for="item in recentCheckouts" :key="item.id" class="flex items-center gap-4 py-3">
              <div :class="['size-10 rounded-lg flex items-center justify-center shrink-0', item.coverBg]">
                <UIcon name="i-lucide-book" :class="['size-5', item.coverIcon]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-highlighted truncate">{{ item.title }}</p>
                <p class="text-xs text-muted">{{ item.patron }} · Due {{ item.due }}</p>
              </div>
              <UBadge :color="item.overdue ? 'error' : 'success'" variant="subtle" :label="item.overdue ? 'Overdue' : 'Active'" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Quick stats -->
      <div class="space-y-4">
        <!-- Collection by genre -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-highlighted">Collection by Genre</h3>
          </template>
          <div class="space-y-3">
            <div v-for="genre in genres" :key="genre.label">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm text-muted">{{ genre.label }}</span>
                <span class="text-sm font-semibold text-highlighted">{{ genre.count }}</span>
              </div>
              <div class="bg-muted rounded-full h-2">
                <div :class="['h-2 rounded-full', genre.color]" :style="{ width: genre.pct + '%' }" />
              </div>
            </div>
          </div>
        </UCard>

        <!-- New arrivals preview -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-highlighted">New Arrivals</h3>
              <UButton label="See All" color="neutral" variant="ghost" size="xs" to="/products/elib/dashboard/new-arrivals" />
            </div>
          </template>
          <div class="space-y-2">
            <div v-for="book in newArrivals" :key="book.title" class="flex items-center gap-3">
              <div :class="['size-8 rounded-md flex items-center justify-center shrink-0', book.bg]">
                <UIcon name="i-lucide-book" :class="['size-4', book.icon]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-highlighted truncate">{{ book.title }}</p>
                <p class="text-xs text-dimmed">{{ book.author }}</p>
              </div>
              <UBadge color="primary" variant="subtle" label="New" />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
