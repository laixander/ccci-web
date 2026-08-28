<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const overdueItems = ref([
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', patron: 'Maria Santos', patronId: 'P-002', email: 'maria.santos@email.com', checkoutDate: 'Aug 10, 2026', dueDate: 'Aug 20, 2026', daysOverdue: 8, fine: 40, coverBg: 'bg-amber-100 dark:bg-amber-900/30', coverIcon: 'text-amber-500' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', patron: 'Carlo Bautista', patronId: 'P-004', email: 'carlo.b@email.com', checkoutDate: 'Aug 5, 2026', dueDate: 'Aug 15, 2026', daysOverdue: 13, fine: 65, coverBg: 'bg-orange-100 dark:bg-orange-900/30', coverIcon: 'text-orange-500' },
  { id: 3, title: 'Think Again', author: 'Adam Grant', patron: 'Rosa Villanueva', patronId: 'P-018', email: 'rosa.v@email.com', checkoutDate: 'Aug 8, 2026', dueDate: 'Aug 18, 2026', daysOverdue: 10, fine: 50, coverBg: 'bg-rose-100 dark:bg-rose-900/30', coverIcon: 'text-rose-500' },
  { id: 4, title: 'The Martian', author: 'Andy Weir', patron: 'Jerome Tan', patronId: 'P-019', email: 'jtan@email.com', checkoutDate: 'Jul 30, 2026', dueDate: 'Aug 9, 2026', daysOverdue: 19, fine: 95, coverBg: 'bg-red-100 dark:bg-red-900/30', coverIcon: 'text-red-500' },
])

const totalFines = computed(() => overdueItems.value.reduce((s, i) => s + i.fine, 0))
const avgDaysOverdue = computed(() => Math.round(overdueItems.value.reduce((s, i) => s + i.daysOverdue, 0) / overdueItems.value.length))

function processReturn(id: number) {
  const idx = overdueItems.value.findIndex(i => i.id === id)
  if (idx !== -1) overdueItems.value.splice(idx, 1)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Returns & Overdue</h1>
        <p class="text-muted text-sm mt-1">Track and process overdue items and pending returns.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton label="Send Reminders" icon="i-lucide-mail" color="neutral" variant="outline" />
        <UButton label="Process Return" icon="i-lucide-undo-2" color="primary" />
      </div>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-3 gap-4">
      <UCard>
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-error/10 flex items-center justify-center">
            <UIcon name="i-lucide-alert-triangle" class="size-5 text-error" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">{{ overdueItems.length }}</p>
            <p class="text-muted text-xs">Overdue Items</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <UIcon name="i-lucide-receipt" class="size-5 text-warning" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">₱{{ totalFines }}</p>
            <p class="text-muted text-xs">Total Fines Outstanding</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-muted flex items-center justify-center">
            <UIcon name="i-lucide-clock" class="size-5 text-muted" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">{{ avgDaysOverdue }}d</p>
            <p class="text-muted text-xs">Avg Days Overdue</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Overdue list -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <h3 class="font-semibold text-highlighted">Overdue Items</h3>
      </template>
      <div class="divide-y divide-default">
        <div
          v-for="item in overdueItems"
          :key="item.id"
          class="flex items-center gap-4 px-5 py-4 bg-error/5 hover:bg-error/10 transition-colors"
        >
          <div :class="['size-10 rounded-lg flex items-center justify-center shrink-0', item.coverBg]">
            <UIcon name="i-lucide-book" :class="['size-5', item.coverIcon]" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-highlighted">{{ item.title }}</p>
            <p class="text-xs text-muted">{{ item.author }}</p>
          </div>
          <div class="w-44 shrink-0">
            <p class="text-sm font-medium text-highlighted">{{ item.patron }}</p>
            <p class="text-xs text-dimmed">{{ item.email }}</p>
          </div>
          <div class="w-28 shrink-0 text-right">
            <p class="text-sm font-bold text-error">{{ item.daysOverdue }}d overdue</p>
            <p class="text-xs text-dimmed">Due {{ item.dueDate }}</p>
          </div>
          <div class="w-20 shrink-0 text-right">
            <p class="text-sm font-extrabold text-error">₱{{ item.fine }}</p>
            <p class="text-xs text-dimmed">Fine</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton label="Return" icon="i-lucide-undo-2" color="primary" size="xs" @click="processReturn(item.id)" />
          </div>
        </div>
      </div>
      <div v-if="overdueItems.length === 0" class="py-12">
        <UEmpty icon="i-lucide-check-circle" title="No overdue items" description="All borrowed items are within their loan periods." />
      </div>
    </UCard>
  </div>
</template>
