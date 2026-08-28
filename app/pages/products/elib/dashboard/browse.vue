<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedGenre = ref('All')
const selectedAvailability = ref('All')

const genres = ['All', 'Fiction', 'Science', 'History', 'Technology', 'Philosophy', 'Arts', 'Business']
const availabilities = ['All', 'Available', 'Checked Out', 'Reserved']

const books = ref([
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', isbn: '978-0132350884', copies: 3, available: 2, coverBg: 'bg-purple-100 dark:bg-purple-900/30', coverIcon: 'text-purple-500', year: 2008 },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', isbn: '978-0062315007', copies: 5, available: 0, coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500', year: 1988 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', isbn: '978-0062316097', copies: 4, available: 3, coverBg: 'bg-sky-100 dark:bg-sky-900/30', coverIcon: 'text-sky-500', year: 2011 },
  { id: 4, title: 'Atomic Habits', author: 'James Clear', genre: 'Business', isbn: '978-0735211292', copies: 6, available: 4, coverBg: 'bg-green-100 dark:bg-green-900/30', coverIcon: 'text-green-500', year: 2018 },
  { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Fiction', isbn: '978-0441013593', copies: 2, available: 0, coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500', year: 1965 },
  { id: 6, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Science', isbn: '978-0374533557', copies: 3, available: 1, coverBg: 'bg-rose-100 dark:bg-rose-900/30', coverIcon: 'text-rose-500', year: 2011 },
  { id: 7, title: 'Deep Work', author: 'Cal Newport', genre: 'Business', isbn: '978-1455586691', copies: 4, available: 4, coverBg: 'bg-teal-100 dark:bg-teal-900/30', coverIcon: 'text-teal-500', year: 2016 },
  { id: 8, title: '1984', author: 'George Orwell', genre: 'Fiction', isbn: '978-0451524935', copies: 7, available: 2, coverBg: 'bg-indigo-100 dark:bg-indigo-900/30', coverIcon: 'text-indigo-500', year: 1949 },
  { id: 9, title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', isbn: '978-0553380163', copies: 2, available: 2, coverBg: 'bg-cyan-100 dark:bg-cyan-900/30', coverIcon: 'text-cyan-500', year: 1988 },
  { id: 10, title: 'The Art of War', author: 'Sun Tzu', genre: 'Philosophy', isbn: '978-1599869773', copies: 3, available: 3, coverBg: 'bg-yellow-100 dark:bg-yellow-900/30', coverIcon: 'text-yellow-500', year: -500 },
  { id: 11, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Business', isbn: '978-1612680194', copies: 5, available: 3, coverBg: 'bg-lime-100 dark:bg-lime-900/30', coverIcon: 'text-lime-500', year: 1997 },
  { id: 12, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', isbn: '978-0743273565', copies: 4, available: 1, coverBg: 'bg-pink-100 dark:bg-pink-900/30', coverIcon: 'text-pink-500', year: 1925 },
])

const filtered = computed(() =>
  books.value.filter(b => {
    const matchesSearch = !search.value || b.title.toLowerCase().includes(search.value.toLowerCase()) || b.author.toLowerCase().includes(search.value.toLowerCase())
    const matchesGenre = selectedGenre.value === 'All' || b.genre === selectedGenre.value
    const matchesAvail = selectedAvailability.value === 'All' || (selectedAvailability.value === 'Available' && b.available > 0) || (selectedAvailability.value === 'Checked Out' && b.available === 0)
    return matchesSearch && matchesGenre && matchesAvail
  })
)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Browse Collection</h1>
        <p class="text-muted text-sm mt-1">Explore and manage the library's entire catalog of {{ books.length.toLocaleString() }}+ titles.</p>
      </div>
      <UButton label="Add New Book" icon="i-lucide-plus" color="primary" />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 items-center">
      <UInput v-model="search" icon="i-lucide-search" placeholder="Search by title or author…" class="w-64" />
      <USelect v-model="selectedGenre" :options="genres" class="w-40" />
      <USelect v-model="selectedAvailability" :options="availabilities" class="w-44" />
      <p class="text-sm text-muted ml-auto">{{ filtered.length }} titles found</p>
    </div>

    <!-- Book grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <UCard
        v-for="book in filtered"
        :key="book.id"
        :ui="{ body: 'p-3 sm:p-3' }"
        class="hover:shadow-md transition-shadow cursor-pointer group"
      >
        <!-- Cover -->
        <div :class="['w-full aspect-[3/4] rounded-lg flex items-center justify-center mb-3', book.coverBg]">
          <UIcon name="i-lucide-book" :class="['size-8 group-hover:scale-110 transition-transform', book.coverIcon]" />
        </div>
        <!-- Info -->
        <p class="text-xs font-bold text-highlighted leading-tight line-clamp-2 mb-1">{{ book.title }}</p>
        <p class="text-xs text-dimmed truncate mb-2">{{ book.author }}</p>
        <!-- Status -->
        <div class="flex items-center justify-between">
          <UBadge
            :color="book.available > 0 ? 'success' : 'error'"
            variant="subtle"
            size="xs"
            :label="book.available > 0 ? `${book.available} avail.` : 'Out'"
          />
          <span class="text-[10px] text-dimmed">{{ book.genre }}</span>
        </div>
      </UCard>
    </div>
  </div>
</template>
