<template>
  <!-- Browser chrome frame -->
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.bibliocore.io/dashboard</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <!-- Logo -->
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-library" class="size-3.5 text-white" />
          </div>
        </div>
        <!-- Nav icons -->
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <!-- User avatar -->
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="LM" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Good morning, Librarian Maria 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">August 28, 2026 · 24 books due for return today</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="Check Out" icon="i-lucide-book-plus" color="primary" />
          </div>
        </div>

        <!-- Dashboard body -->
        <div class="flex-1 overflow-hidden px-4 py-3 space-y-3">
          <!-- KPI row -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="rounded-lg p-2.5 border border-default bg-default"
            >
              <div class="flex items-center justify-between mb-1.5">
                <div :class="['size-5 rounded flex items-center justify-center', kpi.bg]">
                  <UIcon :name="kpi.icon" :class="['size-3', kpi.color]" />
                </div>
                <span :class="['text-[9px] font-medium', kpi.trend === 'up' ? 'text-success' : kpi.trend === 'down' ? 'text-error' : 'text-muted']">
                  {{ kpi.change }}
                </span>
              </div>
              <p class="text-[13px] font-extrabold text-highlighted leading-none">{{ kpi.value }}</p>
              <p class="text-[9px] text-dimmed mt-0.5">{{ kpi.label }}</p>
            </div>
          </div>

          <!-- Content row -->
          <div class="grid grid-cols-5 gap-2 h-[180px]">
            <!-- Recent checkouts -->
            <div class="col-span-3 rounded-lg border border-default bg-default p-2.5 flex flex-col">
              <p class="text-[10px] font-semibold text-highlighted mb-2">Recent Checkouts</p>
              <div class="space-y-1.5 flex-1 overflow-hidden">
                <div
                  v-for="item in recentCheckouts"
                  :key="item.patron"
                  class="flex items-center gap-2"
                >
                  <UAvatar :text="item.initials" size="xs" color="primary" />
                  <div class="flex-1 min-w-0">
                    <p class="text-[9px] font-semibold text-highlighted truncate">{{ item.title }}</p>
                    <p class="text-[8px] text-dimmed">{{ item.patron }} · Due {{ item.due }}</p>
                  </div>
                  <span :class="['text-[8px] px-1.5 py-0.5 rounded-full font-semibold shrink-0', item.overdue ? 'bg-error/10 text-error' : 'bg-success/10 text-success']">
                    {{ item.overdue ? 'Overdue' : 'Active' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Collection summary -->
            <div class="col-span-2 rounded-lg border border-default bg-default p-2.5 flex flex-col">
              <p class="text-[10px] font-semibold text-highlighted mb-2">Collection by Genre</p>
              <div class="space-y-2 flex-1">
                <div v-for="genre in genres" :key="genre.label">
                  <div class="flex justify-between items-center mb-0.5">
                    <span class="text-[9px] text-dimmed">{{ genre.label }}</span>
                    <span class="text-[9px] font-semibold text-highlighted">{{ genre.count }}</span>
                  </div>
                  <div class="bg-muted rounded-full h-1.5">
                    <div :class="['h-1.5 rounded-full', genre.color]" :style="{ width: genre.pct + '%' }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'Browse', icon: 'i-lucide-book-open', active: false },
  { label: 'Circulation', icon: 'i-lucide-bookmark', active: false },
  { label: 'Patrons', icon: 'i-lucide-users', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Books Checked Out', value: '1,248', icon: 'i-lucide-book-open', color: 'text-primary', bg: 'bg-primary/10', change: '↑ 38', trend: 'up' },
  { label: 'Active Members', value: '3,420', icon: 'i-lucide-users', color: 'text-success', bg: 'bg-success/10', change: '↑ 15', trend: 'up' },
  { label: 'Overdue Items', value: '47', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', change: '↓ 8', trend: 'down' },
  { label: 'New Arrivals', value: '92', icon: 'i-lucide-sparkles', color: 'text-warning', bg: 'bg-warning/10', change: 'This month', trend: 'neutral' },
]

const recentCheckouts = [
  { title: 'Clean Code', patron: 'Juan dela Cruz', initials: 'JC', due: 'Sep 4', overdue: false },
  { title: 'The Alchemist', patron: 'Maria Santos', initials: 'MS', due: 'Aug 25', overdue: true },
  { title: 'Sapiens', patron: 'Ana Reyes', initials: 'AR', due: 'Sep 10', overdue: false },
  { title: 'Atomic Habits', patron: 'Carlo Bautista', initials: 'CB', due: 'Aug 20', overdue: true },
  { title: 'Dune', patron: 'Liza Navarro', initials: 'LN', due: 'Sep 7', overdue: false },
]

const genres = [
  { label: 'Fiction', count: '4,210', pct: 85, color: 'bg-primary' },
  { label: 'Science', count: '2,340', pct: 65, color: 'bg-info' },
  { label: 'History', count: '1,870', pct: 55, color: 'bg-warning' },
  { label: 'Technology', count: '1,420', pct: 40, color: 'bg-success' },
]
</script>
