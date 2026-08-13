<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const stats = [
  { label: 'Total Billed', value: '₱21.2M', icon: 'i-lucide-file-text', color: 'text-primary', bg: 'bg-primary/10', change: 'This semester' },
  { label: 'Total Collected', value: '₱18.4M', icon: 'i-lucide-banknote', color: 'text-success', bg: 'bg-success/10', change: '86.8% collection rate' },
  { label: 'Outstanding', value: '₱2.8M', icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', change: '312 student accounts' },
  { label: 'Scholarships', value: '₱3.1M', icon: 'i-lucide-gift', color: 'text-info', bg: 'bg-info/10', change: '248 scholars' },
]

const transactions = ref([
  { id: 'OR-2026-08142', student: 'Maria Santos', initials: 'MS', studentId: '2024-00142', amount: '₱28,500', type: 'Full Payment', date: 'Aug 13, 2026', method: 'Online Banking', status: 'Paid', avatarColor: 'primary' as const },
  { id: 'OR-2026-08141', student: 'James Reyes', initials: 'JR', studentId: '2023-00891', amount: '₱16,000', type: '1st Installment', date: 'Aug 12, 2026', method: 'GCash', status: 'Paid', avatarColor: 'neutral' as const },
  { id: 'OR-2026-08140', student: 'Ana Dela Cruz', initials: 'AD', studentId: '2025-00034', amount: '₱22,000', type: 'Full Payment', date: 'Aug 12, 2026', method: 'Cash', status: 'Pending', avatarColor: 'warning' as const },
  { id: 'OR-2026-08139', student: 'Carlos Wu', initials: 'CW', studentId: '2024-00509', amount: '₱25,500', type: 'Full Payment', date: 'Aug 11, 2026', method: 'Stripe', status: 'Paid', avatarColor: 'info' as const },
  { id: 'OR-2026-08138', student: 'Ryan Cruz', initials: 'RC', studentId: '2022-01204', amount: '₱14,000', type: '2nd Installment', date: 'Aug 11, 2026', method: 'Online Banking', status: 'Overdue', avatarColor: 'error' as const },
])

const statusConfig: Record<string, string> = {
  'Paid': 'bg-success/10 text-success',
  'Pending': 'bg-warning/10 text-warning',
  'Overdue': 'bg-error/10 text-error',
}

const collectionTrend = [
  { month: 'Mar', value: 3.2 }, { month: 'Apr', value: 4.1 }, { month: 'May', value: 5.8 },
  { month: 'Jun', value: 2.4 }, { month: 'Jul', value: 6.3 }, { month: 'Aug', value: 18.4 },
]
const maxCol = Math.max(...collectionTrend.map(d => d.value))

const scholarships = [
  { name: 'Academic Excellence', count: 84, amount: '₱1.2M', color: 'bg-primary' },
  { name: 'Government (CHED)', count: 112, amount: '₱1.5M', color: 'bg-success' },
  { name: 'Athletic', count: 28, amount: '₱250k', color: 'bg-warning' },
  { name: 'Financial Assistance', count: 24, amount: '₱180k', color: 'bg-info' },
]

const showPaymentModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Finance & Tuition Management</h1>
        <p class="text-muted text-sm mt-1">Billing, payments, scholarships, and financial reports</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-download" label="Financial Report" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-banknote" label="Process Payment" size="sm" @click="showPaymentModal = true" />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ body: 'p-5' }" class="hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
            <p class="text-xs text-muted">{{ stat.label }}</p>
          </div>
        </div>
        <p class="text-xs text-dimmed mt-2">{{ stat.change }}</p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Collection Trend -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-semibold text-highlighted">Collection Trend</h2>
            <p class="text-xs text-muted mt-0.5">₱M collected per month</p>
          </div>
          <UBadge label="₱18.4M this month" color="success" variant="subtle" />
        </div>
        <div class="flex items-end gap-3 h-36">
          <div v-for="d in collectionTrend" :key="d.month" class="flex-1 flex flex-col items-center gap-1">
            <span class="text-xs font-bold text-highlighted">{{ d.value }}M</span>
            <div class="w-full rounded-t-md bg-success/70 hover:bg-success transition-colors" :style="{ height: (d.value / maxCol * 100) + '%' }" />
            <span class="text-xs text-dimmed">{{ d.month }}</span>
          </div>
        </div>
      </UCard>

      <!-- Scholarships -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-5">Scholarships</h2>
        <div class="space-y-4">
          <div v-for="s in scholarships" :key="s.name" class="space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="text-muted">{{ s.name }}</span>
              <span class="font-semibold text-highlighted">{{ s.count }} <span class="text-xs text-dimmed">· {{ s.amount }}</span></span>
            </div>
            <div class="bg-muted/50 rounded-full h-1.5">
              <div :class="['h-1.5 rounded-full transition-all duration-500', s.color]" :style="{ width: (s.count / 248 * 100) + '%' }" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Transactions -->
    <UCard :ui="{ body: 'p-0' }">
      <div class="flex items-center justify-between px-5 py-4 border-b border-default">
        <h2 class="font-semibold text-highlighted">Recent Transactions</h2>
        <UButton label="View All" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Student</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">OR No.</th>
              <th class="text-right px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Amount</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Type</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Method</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Date</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="t in transactions" :key="t.id" class="hover:bg-muted/30 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="t.initials" size="sm" :color="t.avatarColor" />
                  <div>
                    <p class="font-medium text-highlighted">{{ t.student }}</p>
                    <p class="text-xs text-dimmed">{{ t.studentId }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-muted text-xs font-mono">{{ t.id }}</td>
              <td class="px-4 py-4 text-right font-bold text-success">{{ t.amount }}</td>
              <td class="px-4 py-4 text-muted text-xs">{{ t.type }}</td>
              <td class="px-4 py-4 text-muted text-xs">{{ t.method }}</td>
              <td class="px-4 py-4 text-muted text-xs">{{ t.date }}</td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[t.status]">
                  {{ t.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Process Payment Modal -->
    <UModal v-model:open="showPaymentModal" title="Process Payment" description="Record a tuition payment from a student">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Student ID / Name">
            <UInput placeholder="Search student…" icon="i-lucide-search" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Amount">
              <UInput type="number" placeholder="0.00" class="w-full" />
            </UFormField>
            <UFormField label="Payment Type">
              <USelect :items="['Full Payment', '1st Installment', '2nd Installment']" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Payment Method">
            <USelect :items="['Cash', 'Online Banking', 'GCash', 'Stripe', 'Maya']" class="w-full" />
          </UFormField>
          <UFormField label="Reference No. (optional)">
            <UInput placeholder="e.g. bank ref number" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showPaymentModal = false" />
        <UButton label="Process & Issue OR" icon="i-lucide-banknote" @click="showPaymentModal = false" />
      </template>
    </UModal>
  </div>
</template>
