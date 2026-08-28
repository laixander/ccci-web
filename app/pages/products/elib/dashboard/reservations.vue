<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const reservations = ref([
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', patron: 'Pedro Reyes', patronId: 'P-012', reservedOn: 'Aug 20, 2026', queuePosition: 1, totalQueue: 3, expectedDate: 'Sep 2, 2026', coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500', status: 'Ready' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', patron: 'Grace Tan', patronId: 'P-013', reservedOn: 'Aug 22, 2026', queuePosition: 2, totalQueue: 4, expectedDate: 'Sep 15, 2026', coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500', status: 'Waiting' },
  { id: 3, title: 'Design Patterns', author: 'Gang of Four', patron: 'Marco Santos', patronId: 'P-014', reservedOn: 'Aug 24, 2026', queuePosition: 1, totalQueue: 1, expectedDate: 'Sep 5, 2026', coverBg: 'bg-gray-100 dark:bg-gray-900/30', coverIcon: 'text-gray-500', status: 'Ready' },
  { id: 4, title: '1984', author: 'George Orwell', patron: 'Anne Cruz', patronId: 'P-015', reservedOn: 'Aug 25, 2026', queuePosition: 3, totalQueue: 5, expectedDate: 'Sep 20, 2026', coverBg: 'bg-indigo-100 dark:bg-indigo-900/30', coverIcon: 'text-indigo-500', status: 'Waiting' },
  { id: 5, title: 'Sapiens', author: 'Yuval Noah Harari', patron: 'Luis Garcia', patronId: 'P-016', reservedOn: 'Aug 26, 2026', queuePosition: 1, totalQueue: 2, expectedDate: 'Sep 8, 2026', coverBg: 'bg-sky-100 dark:bg-sky-900/30', coverIcon: 'text-sky-500', status: 'Notified' },
])

function statusColor(status: string) {
  if (status === 'Ready') return 'success'
  if (status === 'Notified') return 'primary'
  return 'neutral'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Reservations</h1>
        <p class="text-muted text-sm mt-1">{{ reservations.length }} active holds · {{ reservations.filter(r => r.status === 'Ready').length }} ready for pickup.</p>
      </div>
      <UButton label="New Reservation" icon="i-lucide-calendar-plus" color="primary" />
    </div>

    <!-- Ready for pickup banner -->
    <UCard v-if="reservations.some(r => r.status === 'Ready')" class="border-success bg-success/5">
      <div class="flex items-center gap-3">
        <div class="size-10 rounded-xl bg-success/10 flex items-center justify-center">
          <UIcon name="i-lucide-bell-ring" class="size-5 text-success" />
        </div>
        <div>
          <p class="font-semibold text-highlighted text-sm">Items ready for pickup!</p>
          <p class="text-muted text-xs">{{ reservations.filter(r => r.status === 'Ready').length }} patron(s) have been notified and their items are on hold at the desk.</p>
        </div>
        <UButton label="Process Pickups" color="success" size="sm" class="ml-auto" />
      </div>
    </UCard>

    <!-- Reservations list -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div
          v-for="res in reservations"
          :key="res.id"
          class="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors"
        >
          <!-- Cover -->
          <div :class="['size-10 rounded-lg flex items-center justify-center shrink-0', res.coverBg]">
            <UIcon name="i-lucide-book" :class="['size-5', res.coverIcon]" />
          </div>
          <!-- Book info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-highlighted">{{ res.title }}</p>
            <p class="text-xs text-muted">{{ res.author }}</p>
          </div>
          <!-- Patron -->
          <div class="w-40 shrink-0">
            <p class="text-sm font-medium text-highlighted">{{ res.patron }}</p>
            <p class="text-xs text-dimmed">{{ res.patronId }}</p>
          </div>
          <!-- Queue position -->
          <div class="w-28 shrink-0 text-center">
            <p class="text-xs text-dimmed mb-0.5">Queue Position</p>
            <div class="flex items-center justify-center gap-1">
              <span class="text-lg font-extrabold text-primary">{{ res.queuePosition }}</span>
              <span class="text-xs text-muted">/ {{ res.totalQueue }}</span>
            </div>
          </div>
          <!-- Expected date -->
          <div class="w-36 shrink-0 text-right">
            <p class="text-xs text-dimmed mb-0.5">Expected Available</p>
            <p class="text-sm font-semibold text-highlighted">{{ res.expectedDate }}</p>
          </div>
          <!-- Status -->
          <div class="flex items-center gap-2 shrink-0">
            <UBadge :color="statusColor(res.status) as any" variant="subtle" :label="res.status" />
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xs" title="Cancel reservation" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
