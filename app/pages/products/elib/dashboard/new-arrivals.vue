<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const arrivals = [
  { id: 1, title: 'Deep Work', author: 'Cal Newport', genre: 'Business', isbn: '978-1455586691', date: 'Aug 28, 2026', copies: 4, coverBg: 'bg-teal-100 dark:bg-teal-900/30', coverIcon: 'text-teal-500' },
  { id: 2, title: 'The Psychology of Money', author: 'Morgan Housel', genre: 'Finance', isbn: '978-0857197689', date: 'Aug 25, 2026', copies: 3, coverBg: 'bg-green-100 dark:bg-green-900/30', coverIcon: 'text-green-500' },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Fiction', isbn: '978-0593135204', date: 'Aug 22, 2026', copies: 2, coverBg: 'bg-sky-100 dark:bg-sky-900/30', coverIcon: 'text-sky-500' },
  { id: 4, title: 'Educated', author: 'Tara Westover', genre: 'Biography', isbn: '978-0399590504', date: 'Aug 20, 2026', copies: 5, coverBg: 'bg-rose-100 dark:bg-rose-900/30', coverIcon: 'text-rose-500' },
  { id: 5, title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction', isbn: '978-0525559474', date: 'Aug 18, 2026', copies: 3, coverBg: 'bg-indigo-100 dark:bg-indigo-900/30', coverIcon: 'text-indigo-500' },
  { id: 6, title: 'Homo Deus', author: 'Yuval Noah Harari', genre: 'Science', isbn: '978-0062464316', date: 'Aug 15, 2026', copies: 4, coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500' },
  { id: 7, title: 'Zero to One', author: 'Peter Thiel', genre: 'Business', isbn: '978-0804139021', date: 'Aug 12, 2026', copies: 3, coverBg: 'bg-purple-100 dark:bg-purple-900/30', coverIcon: 'text-purple-500' },
  { id: 8, title: 'The Lean Startup', author: 'Eric Ries', genre: 'Business', isbn: '978-0307887894', date: 'Aug 10, 2026', copies: 6, coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500' },
]

// Group by date
const grouped = computed(() => {
  const groups: Record<string, typeof arrivals> = {}
  for (const book of arrivals) {
    if (!groups[book.date]) groups[book.date] = []
    groups[book.date]!.push(book)
  }
  return Object.entries(groups)
})

const totalNewCopies = computed(() => arrivals.reduce((s, b) => s + b.copies, 0))
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">New Arrivals</h1>
        <p class="text-muted text-sm mt-1">{{ arrivals.length }} new titles added this month — {{ totalNewCopies }} total copies acquired.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton label="Export List" icon="i-lucide-download" color="neutral" variant="outline" />
        <UButton label="Add Arrival" icon="i-lucide-plus" color="primary" />
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-3 gap-4">
      <UCard v-for="stat in [{ label: 'Titles Added', value: arrivals.length, icon: 'i-lucide-sparkles', color: 'text-primary', bg: 'bg-primary/10' }, { label: 'Copies Acquired', value: totalNewCopies, icon: 'i-lucide-package', color: 'text-success', bg: 'bg-success/10' }, { label: 'Genres Covered', value: new Set(arrivals.map(a => a.genre)).size, icon: 'i-lucide-tag', color: 'text-warning', bg: 'bg-warning/10' }]" :key="stat.label">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">{{ stat.value }}</p>
            <p class="text-muted text-xs">{{ stat.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Timeline grouped by date -->
    <div class="space-y-6">
      <div v-for="[date, books] in grouped" :key="date">
        <!-- Date label -->
        <div class="flex items-center gap-3 mb-4">
          <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <UIcon name="i-lucide-calendar" class="size-4 text-primary" />
          </div>
          <h3 class="font-semibold text-highlighted text-sm">{{ date }}</h3>
          <div class="flex-1 h-px bg-default" />
          <span class="text-xs text-dimmed">{{ books.length }} title{{ books.length > 1 ? 's' : '' }}</span>
        </div>

        <!-- Books row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <UCard v-for="book in books" :key="book.id" :ui="{ body: 'p-4 sm:p-4' }">
            <div class="flex gap-4">
              <div :class="['size-14 rounded-xl flex items-center justify-center shrink-0', book.coverBg]">
                <UIcon name="i-lucide-book" :class="['size-7', book.coverIcon]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-highlighted leading-tight mb-0.5">{{ book.title }}</p>
                <p class="text-xs text-muted mb-1">{{ book.author }}</p>
                <div class="flex items-center gap-2">
                  <UBadge color="primary" variant="subtle" size="xs" :label="book.genre" />
                  <span class="text-xs text-dimmed">{{ book.copies }} copies</span>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
