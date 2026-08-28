<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const fines = ref([
  { id: 'F-001', patron: 'Maria Santos', initials: 'MS', patronId: 'P-002', book: 'The Alchemist', daysOverdue: 8, amount: 40, status: 'Unpaid', issuedDate: 'Aug 20, 2026' },
  { id: 'F-002', patron: 'Carlo Bautista', initials: 'CB', patronId: 'P-004', book: 'Dune', daysOverdue: 13, amount: 65, status: 'Unpaid', issuedDate: 'Aug 15, 2026' },
  { id: 'F-003', patron: 'Rosa Villanueva', initials: 'RV', patronId: 'P-018', book: 'Think Again', daysOverdue: 10, amount: 50, status: 'Unpaid', issuedDate: 'Aug 18, 2026' },
  { id: 'F-004', patron: 'Jerome Tan', initials: 'JT', patronId: 'P-019', book: 'The Martian', daysOverdue: 19, amount: 95, status: 'Unpaid', issuedDate: 'Aug 9, 2026' },
  { id: 'F-005', patron: 'Grace Lim', initials: 'GL', patronId: 'P-020', book: 'Sapiens', daysOverdue: 5, amount: 25, status: 'Paid', issuedDate: 'Aug 22, 2026' },
  { id: 'F-006', patron: 'Noel Reyes', initials: 'NR', patronId: 'P-021', book: 'Clean Code', daysOverdue: 3, amount: 15, status: 'Waived', issuedDate: 'Aug 25, 2026' },
])

const totalUnpaid = computed(() => fines.value.filter(f => f.status === 'Unpaid').reduce((s, f) => s + f.amount, 0))
const totalCollected = computed(() => fines.value.filter(f => f.status === 'Paid').reduce((s, f) => s + f.amount, 0))

function statusColor(s: string) {
  if (s === 'Paid') return 'success'
  if (s === 'Waived') return 'neutral'
  return 'error'
}

function markPaid(id: string) {
  const fine = fines.value.find(f => f.id === id)
  if (fine) fine.status = 'Paid'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Fines & Fees</h1>
        <p class="text-muted text-sm mt-1">Track overdue fines and payment status.</p>
      </div>
      <UButton label="Issue Fine" icon="i-lucide-receipt" color="primary" />
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-3 gap-4">
      <UCard>
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-error/10 flex items-center justify-center">
            <UIcon name="i-lucide-alert-circle" class="size-5 text-error" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">₱{{ totalUnpaid }}</p>
            <p class="text-muted text-xs">Total Unpaid Fines</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-success/10 flex items-center justify-center">
            <UIcon name="i-lucide-banknote" class="size-5 text-success" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">₱{{ totalCollected }}</p>
            <p class="text-muted text-xs">Collected This Month</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <UIcon name="i-lucide-users" class="size-5 text-warning" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">{{ fines.filter(f => f.status === 'Unpaid').length }}</p>
            <p class="text-muted text-xs">Patrons with Fines</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Fines table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div v-for="fine in fines" :key="fine.id" class="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-colors">
          <UAvatar :text="fine.initials" size="sm" color="primary" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-highlighted">{{ fine.patron }}</p>
            <p class="text-xs text-dimmed">{{ fine.book }} · {{ fine.daysOverdue }}d overdue</p>
          </div>
          <div class="w-24 shrink-0 text-right">
            <p class="text-xs text-dimmed">Fine Amount</p>
            <p :class="['text-base font-extrabold', fine.status === 'Paid' ? 'text-muted line-through' : 'text-error']">₱{{ fine.amount }}</p>
          </div>
          <div class="w-32 shrink-0 text-right">
            <p class="text-xs text-dimmed">Issued</p>
            <p class="text-sm text-muted">{{ fine.issuedDate }}</p>
          </div>
          <UBadge :color="statusColor(fine.status) as any" variant="subtle" :label="fine.status" />
          <div class="flex items-center gap-2 shrink-0">
            <UButton v-if="fine.status === 'Unpaid'" label="Mark Paid" color="success" size="xs" variant="outline" @click="markPaid(fine.id)" />
            <UButton v-if="fine.status === 'Unpaid'" label="Waive" color="neutral" size="xs" variant="ghost" @click="fine.status = 'Waived'" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
