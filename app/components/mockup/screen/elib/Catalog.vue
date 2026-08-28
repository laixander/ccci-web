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
        <span class="text-dimmed text-[10px]">app.bibliocore.io/catalog</span>
      </div>
    </div>

    <!-- App layout -->
    <div class="flex h-[340px]">
      <!-- Sidebar filters -->
      <aside class="w-28 flex-shrink-0 border-r border-default bg-elevated p-2.5 flex flex-col gap-3 overflow-hidden">
        <p class="text-[9px] font-bold text-dimmed uppercase tracking-widest">Filters</p>
        <!-- Genre filters -->
        <div>
          <p class="text-[8px] font-semibold text-muted mb-1.5">Genre</p>
          <div class="space-y-1">
            <div
              v-for="g in genres"
              :key="g.label"
              :class="['flex items-center justify-between px-1.5 py-1 rounded cursor-default', g.active ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-muted']"
            >
              <span class="text-[8px] font-medium truncate">{{ g.label }}</span>
              <span class="text-[7px] bg-muted rounded-full px-1">{{ g.count }}</span>
            </div>
          </div>
        </div>
        <!-- Availability -->
        <div>
          <p class="text-[8px] font-semibold text-muted mb-1.5">Availability</p>
          <div class="space-y-1">
            <div v-for="a in availability" :key="a.label" :class="['flex items-center gap-1.5 px-1.5 py-1 rounded cursor-default', a.active ? 'bg-primary/10 text-primary' : 'text-muted']">
              <div :class="['size-1.5 rounded-full shrink-0', a.dot]" />
              <span class="text-[8px]">{{ a.label }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main catalog grid -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Search bar -->
        <div class="px-3 py-2 border-b border-default flex items-center gap-2">
          <div class="flex-1 bg-muted rounded-md h-6 flex items-center px-2 gap-1.5">
            <UIcon name="i-lucide-search" class="size-3 text-dimmed" />
            <span class="text-[9px] text-dimmed">Search by title, author, or ISBN…</span>
          </div>
          <UButton size="xs" label="Add Book" icon="i-lucide-plus" color="primary" />
        </div>

        <!-- Result count -->
        <div class="px-3 pt-2 pb-1 flex items-center justify-between">
          <p class="text-[9px] text-dimmed">Showing <span class="font-semibold text-highlighted">12,842</span> titles</p>
          <div class="flex items-center gap-1">
            <div class="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[8px] font-medium">Grid</div>
            <div class="bg-muted rounded px-1.5 py-0.5 text-[8px] text-muted">List</div>
          </div>
        </div>

        <!-- Book grid -->
        <div class="flex-1 overflow-hidden px-3 py-1.5">
          <div class="grid grid-cols-4 gap-2 h-full">
            <div
              v-for="book in books"
              :key="book.title"
              class="rounded-lg border border-default bg-default p-2 flex flex-col gap-1.5 hover:shadow-sm transition-shadow cursor-default"
            >
              <!-- Colored cover placeholder -->
              <div :class="['w-full h-14 rounded-md flex items-center justify-center', book.coverBg]">
                <UIcon name="i-lucide-book" :class="['size-5', book.coverIcon]" />
              </div>
              <!-- Book info -->
              <div class="flex-1 min-w-0">
                <p class="text-[8px] font-bold text-highlighted leading-tight truncate">{{ book.title }}</p>
                <p class="text-[7px] text-dimmed truncate">{{ book.author }}</p>
              </div>
              <!-- Status badge -->
              <span :class="['text-[7px] px-1.5 py-0.5 rounded-full font-semibold text-center', book.available ? 'bg-success/10 text-success' : 'bg-error/10 text-error']">
                {{ book.available ? 'Available' : 'Checked Out' }}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const genres = [
  { label: 'All Genres', count: '12.8k', active: true },
  { label: 'Fiction', count: '4.2k', active: false },
  { label: 'Science', count: '2.3k', active: false },
  { label: 'History', count: '1.8k', active: false },
  { label: 'Technology', count: '1.4k', active: false },
  { label: 'Philosophy', count: '980', active: false },
]

const availability = [
  { label: 'All', dot: 'bg-muted', active: false },
  { label: 'Available', dot: 'bg-success', active: true },
  { label: 'Checked Out', dot: 'bg-error', active: false },
  { label: 'Reserved', dot: 'bg-warning', active: false },
]

const books = [
  { title: 'Clean Code', author: 'Robert C. Martin', coverBg: 'bg-purple-100 dark:bg-purple-900/30', coverIcon: 'text-purple-500', available: true },
  { title: 'The Alchemist', author: 'Paulo Coelho', coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500', available: false },
  { title: 'Sapiens', author: 'Yuval Noah Harari', coverBg: 'bg-sky-100 dark:bg-sky-900/30', coverIcon: 'text-sky-500', available: true },
  { title: 'Atomic Habits', author: 'James Clear', coverBg: 'bg-green-100 dark:bg-green-900/30', coverIcon: 'text-green-500', available: true },
  { title: 'Dune', author: 'Frank Herbert', coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500', available: false },
  { title: 'Thinking Fast', author: 'Daniel Kahneman', coverBg: 'bg-rose-100 dark:bg-rose-900/30', coverIcon: 'text-rose-500', available: true },
  { title: 'Deep Work', author: 'Cal Newport', coverBg: 'bg-teal-100 dark:bg-teal-900/30', coverIcon: 'text-teal-500', available: true },
  { title: '1984', author: 'George Orwell', coverBg: 'bg-indigo-100 dark:bg-indigo-900/30', coverIcon: 'text-indigo-500', available: false },
]
</script>
