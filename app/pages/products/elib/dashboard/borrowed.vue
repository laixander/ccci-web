<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')

const loans = ref([
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', patron: 'Juan dela Cruz', patronId: 'P-001', checkoutDate: 'Aug 14, 2026', dueDate: 'Sep 4, 2026', overdue: false, daysLeft: 7, coverBg: 'bg-purple-100 dark:bg-purple-900/30', coverIcon: 'text-purple-500', callNo: 'QA 76.73' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', patron: 'Maria Santos', patronId: 'P-002', checkoutDate: 'Aug 10, 2026', dueDate: 'Aug 20, 2026', overdue: true, daysLeft: -8, coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500', callNo: 'PQ 9281' },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', patron: 'Ana Reyes', patronId: 'P-003', checkoutDate: 'Aug 20, 2026', dueDate: 'Sep 10, 2026', overdue: false, daysLeft: 13, coverBg: 'bg-sky-100 dark:bg-sky-900/30', coverIcon: 'text-sky-500', callNo: 'GN 360' },
  { id: 4, title: 'Atomic Habits', author: 'James Clear', patron: 'Carlo Bautista', patronId: 'P-004', checkoutDate: 'Aug 22, 2026', dueDate: 'Sep 1, 2026', overdue: false, daysLeft: 4, coverBg: 'bg-green-100 dark:bg-green-900/30', coverIcon: 'text-green-500', callNo: 'BF 637' },
  { id: 5, title: 'Dune', author: 'Frank Herbert', patron: 'Liza Navarro', patronId: 'P-005', checkoutDate: 'Aug 5, 2026', dueDate: 'Aug 15, 2026', overdue: true, daysLeft: -13, coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500', callNo: 'PS 3556' },
  { id: 6, title: 'Deep Work', author: 'Cal Newport', patron: 'Paolo Cruz', patronId: 'P-006', checkoutDate: 'Aug 24, 2026', dueDate: 'Sep 3, 2026', overdue: false, daysLeft: 6, coverBg: 'bg-teal-100 dark:bg-teal-900/30', coverIcon: 'text-teal-500', callNo: 'BF 481' },
  { id: 7, title: '1984', author: 'George Orwell', patron: 'Rosa Dela Vega', patronId: 'P-007', checkoutDate: 'Aug 18, 2026', dueDate: 'Sep 7, 2026', overdue: false, daysLeft: 10, coverBg: 'bg-indigo-100 dark:bg-indigo-900/30', coverIcon: 'text-indigo-500', callNo: 'PR 6029' },
])

const filtered = computed(() =>
  loans.value.filter(l =>
    !search.value ||
    l.title.toLowerCase().includes(search.value.toLowerCase()) ||
    l.patron.toLowerCase().includes(search.value.toLowerCase())
  )
)

const overdueCount = computed(() => loans.value.filter(l => l.overdue).length)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Borrowed Books</h1>
        <p class="text-muted text-sm mt-1">
          {{ loans.length }} active loans ·
          <span class="text-error font-medium">{{ overdueCount }} overdue</span>
        </p>
      </div>
      <UButton label="Check Out Book" icon="i-lucide-book-plus" color="primary" />
    </div>

    <!-- Filters -->
    <div class="flex gap-3 items-center">
      <UInput v-model="search" icon="i-lucide-search" placeholder="Search by title or patron…" class="w-72" />
      <UBadge color="error" variant="subtle" :label="`${overdueCount} overdue`" v-if="overdueCount > 0" />
    </div>

    <!-- Loans table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div
          v-for="loan in filtered"
          :key="loan.id"
          :class="['flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors', loan.overdue && 'bg-error/5']"
        >
          <!-- Cover -->
          <div :class="['size-10 rounded-lg flex items-center justify-center shrink-0', loan.coverBg]">
            <UIcon name="i-lucide-book" :class="['size-5', loan.coverIcon]" />
          </div>
          <!-- Book info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-highlighted truncate">{{ loan.title }}</p>
            <p class="text-xs text-muted">{{ loan.author }} · {{ loan.callNo }}</p>
          </div>
          <!-- Patron -->
          <div class="w-40 shrink-0">
            <p class="text-sm font-medium text-highlighted">{{ loan.patron }}</p>
            <p class="text-xs text-dimmed">{{ loan.patronId }}</p>
          </div>
          <!-- Due date -->
          <div class="w-36 shrink-0 text-right">
            <p :class="['text-sm font-semibold', loan.overdue ? 'text-error' : 'text-muted']">{{ loan.dueDate }}</p>
            <p :class="['text-xs', loan.overdue ? 'text-error' : 'text-dimmed']">
              {{ loan.overdue ? `${Math.abs(loan.daysLeft)}d overdue` : `${loan.daysLeft}d remaining` }}
            </p>
          </div>
          <!-- Status + action -->
          <div class="flex items-center gap-2 shrink-0">
            <UBadge :color="loan.overdue ? 'error' : 'success'" variant="subtle" :label="loan.overdue ? 'Overdue' : 'Active'" />
            <UButton label="Return" icon="i-lucide-undo-2" color="neutral" variant="outline" size="xs" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
