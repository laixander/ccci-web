<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')

const patrons = ref([
  { id: 'P-001', name: 'Juan dela Cruz', email: 'juan.dc@email.com', memberType: 'Student', status: 'Active', booksOut: 2, totalBorrowed: 48, memberSince: 'Jan 2024', initials: 'JC' },
  { id: 'P-002', name: 'Maria Santos', email: 'maria.s@email.com', memberType: 'Student', status: 'Suspended', booksOut: 1, totalBorrowed: 31, memberSince: 'Mar 2024', initials: 'MS' },
  { id: 'P-003', name: 'Ana Reyes', email: 'ana.r@email.com', memberType: 'Faculty', status: 'Active', booksOut: 4, totalBorrowed: 127, memberSince: 'Jun 2022', initials: 'AR' },
  { id: 'P-004', name: 'Carlo Bautista', email: 'carlo.b@email.com', memberType: 'Student', status: 'Suspended', booksOut: 1, totalBorrowed: 22, memberSince: 'Aug 2024', initials: 'CB' },
  { id: 'P-005', name: 'Liza Navarro', email: 'liza.n@email.com', memberType: 'Student', status: 'Active', booksOut: 1, totalBorrowed: 19, memberSince: 'Feb 2025', initials: 'LN' },
  { id: 'P-006', name: 'Paolo Cruz', email: 'paolo.c@email.com', memberType: 'Staff', status: 'Active', booksOut: 3, totalBorrowed: 85, memberSince: 'Mar 2023', initials: 'PC' },
  { id: 'P-007', name: 'Rosa Dela Vega', email: 'rosa.dv@email.com', memberType: 'Faculty', status: 'Active', booksOut: 5, totalBorrowed: 214, memberSince: 'Jan 2021', initials: 'RV' },
  { id: 'P-008', name: 'Marco Tan', email: 'marco.t@email.com', memberType: 'Community', status: 'Active', booksOut: 0, totalBorrowed: 12, memberSince: 'May 2025', initials: 'MT' },
])

const filtered = computed(() =>
  patrons.value.filter(p =>
    !search.value ||
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.id.toLowerCase().includes(search.value.toLowerCase()) ||
    p.email.toLowerCase().includes(search.value.toLowerCase())
  )
)

function memberTypeColor(type: string) {
  if (type === 'Faculty') return 'primary'
  if (type === 'Staff') return 'info'
  if (type === 'Community') return 'warning'
  return 'neutral'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Patrons</h1>
        <p class="text-muted text-sm mt-1">{{ patrons.length }} registered patrons · {{ patrons.filter(p => p.status === 'Active').length }} active.</p>
      </div>
      <UButton label="Add Patron" icon="i-lucide-user-plus" color="primary" />
    </div>

    <!-- Search -->
    <UInput v-model="search" icon="i-lucide-search" placeholder="Search patrons by name, ID, or email…" class="max-w-md" />

    <!-- Patrons table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div
          v-for="patron in filtered"
          :key="patron.id"
          class="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-colors"
        >
          <UAvatar :text="patron.initials" size="sm" color="primary" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-highlighted">{{ patron.name }}</p>
              <UBadge :color="patron.status === 'Active' ? 'success' : 'error'" variant="subtle" size="xs" :label="patron.status" />
            </div>
            <p class="text-xs text-dimmed">{{ patron.email }} · Member since {{ patron.memberSince }}</p>
          </div>
          <UBadge :color="memberTypeColor(patron.memberType) as any" variant="subtle" :label="patron.memberType" />
          <div class="w-24 shrink-0 text-center">
            <p class="text-sm font-bold text-highlighted">{{ patron.booksOut }}</p>
            <p class="text-xs text-dimmed">Books out</p>
          </div>
          <div class="w-24 shrink-0 text-center">
            <p class="text-sm font-bold text-highlighted">{{ patron.totalBorrowed }}</p>
            <p class="text-xs text-dimmed">Total borrows</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton icon="i-lucide-eye" color="neutral" variant="ghost" size="xs" title="View history" />
            <UButton icon="i-lucide-pencil" color="neutral" variant="ghost" size="xs" title="Edit patron" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
