<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const memberships = ref([
  { id: 'M-001', name: 'Juan dela Cruz', initials: 'JC', email: 'juan.dc@email.com', type: 'Student', plan: 'Semester', status: 'Active', startDate: 'Jun 1, 2026', expiry: 'Oct 31, 2026', booksAllowed: 3, booksOut: 2 },
  { id: 'M-002', name: 'Maria Santos', initials: 'MS', email: 'maria.s@email.com', type: 'Student', plan: 'Semester', status: 'Suspended', startDate: 'Jun 1, 2026', expiry: 'Oct 31, 2026', booksAllowed: 3, booksOut: 1 },
  { id: 'M-003', name: 'Ana Reyes', initials: 'AR', email: 'ana.r@email.com', type: 'Faculty', plan: 'Annual', status: 'Active', startDate: 'Jan 1, 2026', expiry: 'Dec 31, 2026', booksAllowed: 10, booksOut: 4 },
  { id: 'M-004', name: 'Paolo Cruz', initials: 'PC', email: 'paolo.c@email.com', type: 'Staff', plan: 'Annual', status: 'Active', startDate: 'Mar 1, 2026', expiry: 'Feb 28, 2027', booksAllowed: 7, booksOut: 3 },
  { id: 'M-005', name: 'Rosa Dela Vega', initials: 'RV', email: 'rosa.dv@email.com', type: 'Faculty', plan: 'Annual', status: 'Active', startDate: 'Jan 1, 2026', expiry: 'Dec 31, 2026', booksAllowed: 10, booksOut: 5 },
  { id: 'M-006', name: 'Marco Tan', initials: 'MT', email: 'marco.t@email.com', type: 'Community', plan: 'Monthly', status: 'Expired', startDate: 'Jul 1, 2026', expiry: 'Jul 31, 2026', booksAllowed: 2, booksOut: 0 },
])

const plans = [
  { name: 'Monthly', color: 'text-info', bg: 'bg-info/10', price: '₱50/mo', limit: '2 books', members: 12 },
  { name: 'Semester', color: 'text-primary', bg: 'bg-primary/10', price: '₱200/sem', limit: '3 books', members: 2850 },
  { name: 'Annual', color: 'text-success', bg: 'bg-success/10', price: '₱350/yr', limit: '10 books', members: 320 },
]

function statusColor(s: string) {
  if (s === 'Active') return 'success'
  if (s === 'Suspended') return 'error'
  return 'neutral'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Memberships</h1>
        <p class="text-muted text-sm mt-1">Manage patron membership plans and access levels.</p>
      </div>
      <UButton label="Issue Membership" icon="i-lucide-id-card" color="primary" />
    </div>

    <!-- Plan overview -->
    <div class="grid grid-cols-3 gap-4">
      <UCard v-for="plan in plans" :key="plan.name">
        <div class="flex items-start justify-between">
          <div>
            <div :class="['inline-flex items-center justify-center size-8 rounded-lg mb-3', plan.bg]">
              <UIcon name="i-lucide-id-card" :class="['size-4', plan.color]" />
            </div>
            <p class="font-bold text-highlighted">{{ plan.name }}</p>
            <p :class="['text-sm font-semibold', plan.color]">{{ plan.price }}</p>
            <p class="text-xs text-muted mt-1">{{ plan.limit }} · {{ plan.members }} members</p>
          </div>
          <UBadge :color="plan.color.replace('text-', '') as any" variant="subtle" :label="`${plan.members}`" />
        </div>
      </UCard>
    </div>

    <!-- Membership table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <h3 class="font-semibold text-highlighted">All Members</h3>
      </template>
      <div class="divide-y divide-default">
        <div v-for="m in memberships" :key="m.id" class="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20">
          <UAvatar :text="m.initials" size="sm" color="primary" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-highlighted">{{ m.name }}</p>
              <UBadge :color="statusColor(m.status) as any" variant="subtle" size="xs" :label="m.status" />
            </div>
            <p class="text-xs text-dimmed">{{ m.email }}</p>
          </div>
          <UBadge color="neutral" variant="subtle" :label="m.type" />
          <div class="w-28 shrink-0 text-center">
            <p class="text-xs text-dimmed">Plan</p>
            <p class="text-sm font-semibold text-highlighted">{{ m.plan }}</p>
          </div>
          <div class="w-36 shrink-0 text-right">
            <p class="text-xs text-dimmed">Expires</p>
            <p class="text-sm font-semibold text-highlighted">{{ m.expiry }}</p>
          </div>
          <div class="w-20 shrink-0 text-center">
            <p class="text-xs text-dimmed">Books</p>
            <p class="text-sm font-semibold text-highlighted">{{ m.booksOut }}/{{ m.booksAllowed }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton icon="i-lucide-refresh-cw" size="xs" color="neutral" variant="ghost" title="Renew" />
            <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" title="Edit" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
