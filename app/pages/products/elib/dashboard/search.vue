<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const query = ref('')
const selectedField = ref('Any Field')
const selectedGenre = ref('All Genres')
const selectedYear = ref('Any Year')
const searchExecuted = ref(false)

const fields = ['Any Field', 'Title', 'Author', 'ISBN', 'Subject', 'Publisher']
const genres = ['All Genres', 'Fiction', 'Science', 'History', 'Technology', 'Philosophy', 'Business', 'Arts']
const years = ['Any Year', '2024–2026', '2020–2023', '2015–2019', '2000–2014', 'Before 2000']

const results = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', year: 2008, isbn: '978-0132350884', publisher: 'Prentice Hall', copies: 3, available: 2, coverBg: 'bg-purple-100 dark:bg-purple-900/30', coverIcon: 'text-purple-500', callNo: 'QA 76.73', location: 'Section A, Shelf 3' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas, Andrew Hunt', genre: 'Technology', year: 2019, isbn: '978-0135957059', publisher: 'Addison-Wesley', copies: 2, available: 1, coverBg: 'bg-blue-100 dark:bg-blue-900/30', coverIcon: 'text-blue-500', callNo: 'QA 76.6', location: 'Section A, Shelf 3' },
  { id: 3, title: 'Design Patterns', author: 'Gang of Four', genre: 'Technology', year: 1994, isbn: '978-0201633610', publisher: 'Addison-Wesley', copies: 2, available: 0, coverBg: 'bg-gray-100 dark:bg-gray-900/30', coverIcon: 'text-gray-500', callNo: 'QA 76.64', location: 'Section A, Shelf 4' },
  { id: 4, title: 'You Don\'t Know JS', author: 'Kyle Simpson', genre: 'Technology', year: 2015, isbn: '978-1491924464', publisher: 'O\'Reilly', copies: 1, available: 1, coverBg: 'bg-yellow-100 dark:bg-yellow-900/30', coverIcon: 'text-yellow-500', callNo: 'QA 76.73', location: 'Section A, Shelf 5' },
]

function doSearch() {
  if (query.value.trim()) searchExecuted.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Search & Discovery</h1>
      <p class="text-muted text-sm mt-1">Search the catalog by title, author, ISBN, or subject heading.</p>
    </div>

    <!-- Search card -->
    <UCard>
      <div class="space-y-4">
        <div class="flex gap-3">
          <UInput
            v-model="query"
            icon="i-lucide-search"
            placeholder="Search the library catalog…"
            class="flex-1"
            size="lg"
            @keyup.enter="doSearch"
          />
          <UButton label="Search" icon="i-lucide-search" size="lg" color="primary" @click="doSearch" />
        </div>
        <!-- Advanced filters -->
        <div class="flex flex-wrap gap-3 pt-2 border-t border-default">
          <USelect v-model="selectedField" :options="fields" class="w-36" />
          <USelect v-model="selectedGenre" :options="genres" class="w-36" />
          <USelect v-model="selectedYear" :options="years" class="w-36" />
          <UButton label="Clear Filters" color="neutral" variant="ghost" size="sm" @click="selectedField = 'Any Field'; selectedGenre = 'All Genres'; selectedYear = 'Any Year'" />
        </div>
      </div>
    </UCard>

    <!-- Results -->
    <div v-if="searchExecuted">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-muted">Found <span class="font-semibold text-highlighted">{{ results.length }}</span> results for "<span class="font-semibold text-primary">{{ query }}</span>"</p>
        <UBadge color="primary" variant="subtle" :label="`${results.filter(r => r.available > 0).length} available now`" />
      </div>

      <div class="space-y-3">
        <UCard v-for="book in results" :key="book.id" :ui="{ body: 'p-4 sm:p-4' }">
          <div class="flex gap-4">
            <!-- Cover -->
            <div :class="['size-16 rounded-xl flex items-center justify-center shrink-0', book.coverBg]">
              <UIcon name="i-lucide-book" :class="['size-8', book.coverIcon]" />
            </div>
            <!-- Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="font-bold text-highlighted text-base">{{ book.title }}</h3>
                  <p class="text-sm text-muted">{{ book.author }} · {{ book.year }}</p>
                  <p class="text-xs text-dimmed mt-0.5">{{ book.publisher }} · ISBN {{ book.isbn }}</p>
                </div>
                <UBadge :color="book.available > 0 ? 'success' : 'error'" variant="subtle" :label="book.available > 0 ? `${book.available} of ${book.copies} available` : 'All checked out'" />
              </div>
              <div class="flex items-center gap-4 mt-3 text-xs text-muted">
                <span class="flex items-center gap-1"><UIcon name="i-lucide-tag" class="size-3" /> {{ book.genre }}</span>
                <span class="flex items-center gap-1"><UIcon name="i-lucide-map-pin" class="size-3" /> {{ book.location }}</span>
                <span class="flex items-center gap-1"><UIcon name="i-lucide-hash" class="size-3" /> {{ book.callNo }}</span>
              </div>
            </div>
            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0">
              <UButton label="Reserve" icon="i-lucide-calendar-plus" color="neutral" variant="outline" size="sm" :disabled="book.available > 0" />
              <UButton label="Check Out" icon="i-lucide-book-plus" color="primary" size="sm" :disabled="book.available === 0" />
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Empty state before search -->
    <div v-else class="py-20">
      <UEmpty
        icon="i-lucide-search"
        title="Start your search"
        description="Enter a title, author, ISBN, or subject to search the library catalog."
      />
    </div>
  </div>
</template>
