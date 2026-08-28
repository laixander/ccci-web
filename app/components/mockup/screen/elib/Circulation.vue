<template>
  <!-- Browser chrome frame -->
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.bibliocore.io/circulation</span>
      </div>
    </div>

    <!-- App layout -->
    <div class="flex h-[340px]">
      <!-- Sidebar -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-library" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div v-for="item in sidebarItems" :key="item.label" :class="['flex items-center justify-center size-7 rounded-md cursor-default', item.active ? 'bg-primary/10 text-primary' : 'text-muted']">
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="LM" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Circulation Desk</p>
            <p class="text-[9px] text-dimmed mt-0.5">24 returns due today · 8 overdue items</p>
          </div>
          <div class="flex items-center gap-2">
            <UButton size="xs" label="Check In" icon="i-lucide-undo-2" color="neutral" variant="outline" />
            <UButton size="xs" label="Check Out" icon="i-lucide-book-plus" color="primary" />
          </div>
        </div>

        <!-- Tab strip -->
        <div class="flex items-center gap-0 border-b border-default px-4">
          <div v-for="tab in tabs" :key="tab.label" :class="['px-3 py-2 text-[9px] font-semibold cursor-default border-b-2 -mb-px flex items-center gap-1', tab.active ? 'border-primary text-primary' : 'border-transparent text-muted']">
            {{ tab.label }}
            <span v-if="tab.badge" :class="['text-[7px] rounded-full px-1 font-bold', tab.active ? 'bg-primary/20' : 'bg-muted']">{{ tab.badge }}</span>
          </div>
        </div>

        <!-- Transactions list -->
        <div class="flex-1 overflow-hidden p-3 space-y-1.5">
          <div
            v-for="item in transactions"
            :key="item.id"
            class="flex items-center gap-3 rounded-lg border border-default bg-default px-3 py-2 hover:bg-muted/30 transition-colors cursor-default"
          >
            <!-- Borrower avatar -->
            <UAvatar :text="item.initials" size="xs" color="primary" />

            <!-- Book info -->
            <div class="flex-1 min-w-0">
              <p class="text-[9px] font-semibold text-highlighted truncate">{{ item.book }}</p>
              <p class="text-[8px] text-dimmed">{{ item.patron }} · Call No: {{ item.callNo }}</p>
            </div>

            <!-- Due date -->
            <div class="text-right shrink-0">
              <p :class="['text-[8px] font-semibold', item.overdue ? 'text-error' : 'text-muted']">{{ item.due }}</p>
              <p class="text-[7px] text-dimmed">{{ item.overdue ? `${item.daysLate}d overdue` : 'Due date' }}</p>
            </div>

            <!-- Status badge -->
            <span :class="['text-[7px] px-1.5 py-0.5 rounded-full font-bold shrink-0', statusClass(item.status)]">
              {{ item.status }}
            </span>

            <!-- Fine indicator -->
            <div v-if="item.fine" class="text-error text-[8px] font-bold shrink-0">₱{{ item.fine }}</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Browse', icon: 'i-lucide-book-open', active: false },
  { label: 'Circulation', icon: 'i-lucide-bookmark', active: true },
  { label: 'Patrons', icon: 'i-lucide-users', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const tabs = [
  { label: 'Checked Out', active: true, badge: '1,248' },
  { label: 'Reservations', active: false, badge: '34' },
  { label: 'Overdue', active: false, badge: '47' },
  { label: 'Returned Today', active: false, badge: null },
]

const transactions = [
  { id: 1, book: 'Clean Code', patron: 'Juan dela Cruz', callNo: 'QA 76.73', initials: 'JC', due: 'Sep 4, 2026', overdue: false, daysLate: 0, status: 'Active', fine: null },
  { id: 2, book: 'The Alchemist', patron: 'Maria Santos', callNo: 'PQ 9281', initials: 'MS', due: 'Aug 20, 2026', overdue: true, daysLate: 8, status: 'Overdue', fine: '40' },
  { id: 3, book: 'Sapiens', patron: 'Ana Reyes', callNo: 'GN 360', initials: 'AR', due: 'Sep 10, 2026', overdue: false, daysLate: 0, status: 'Active', fine: null },
  { id: 4, book: 'Dune', patron: 'Carlo Bautista', callNo: 'PS 3556', initials: 'CB', due: 'Aug 15, 2026', overdue: true, daysLate: 13, status: 'Overdue', fine: '65' },
  { id: 5, book: 'Atomic Habits', patron: 'Liza Navarro', callNo: 'BF 637', initials: 'LN', due: 'Sep 1, 2026', overdue: false, daysLate: 0, status: 'Reserved', fine: null },
  { id: 6, book: 'Deep Work', patron: 'Paolo Cruz', callNo: 'BF 481', initials: 'PC', due: 'Sep 3, 2026', overdue: false, daysLate: 0, status: 'Active', fine: null },
]

function statusClass(status: string) {
  if (status === 'Overdue') return 'bg-error/10 text-error'
  if (status === 'Reserved') return 'bg-warning/10 text-warning'
  return 'bg-success/10 text-success'
}
</script>
