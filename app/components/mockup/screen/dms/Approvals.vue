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
        <span class="text-dimmed text-[10px]">app.docucore.io/approvals</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-folder-open" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="AJ" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">My Approvals</p>
            <p class="text-[9px] text-dimmed mt-0.5">34 pending · 5 urgent</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-calendar" class="size-3 text-dimmed" />
              <span class="text-[9px] text-muted">Last 30 days</span>
            </div>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- Summary row -->
          <div class="grid grid-cols-3 gap-2">
            <div v-for="stat in summaryStats" :key="stat.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9px] text-muted">{{ stat.label }}</p>
              <p class="text-base font-bold mt-0.5" :class="stat.valueColor">{{ stat.value }}</p>
            </div>
          </div>

          <!-- Approval queue -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-2 border-b border-default">
              <p class="text-[10px] font-semibold text-highlighted">Approval Queue</p>
              <span class="text-[8.5px] text-error font-medium bg-error/10 px-1.5 py-0.5 rounded-full">5 urgent</span>
            </div>
            <div class="divide-y divide-default">
              <div v-for="item in approvals" :key="item.title" class="flex items-center gap-3 px-3 py-2.5">
                <div :class="['size-7 rounded-full flex items-center justify-center flex-shrink-0', item.bg]">
                  <UIcon name="i-lucide-file-text" :class="['size-3.5', item.color]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-medium text-highlighted truncate">{{ item.title }}</p>
                  <div class="flex items-center gap-1.5 mt-0.5">
                    <p class="text-[8.5px] text-dimmed">Requested by {{ item.requester }}</p>
                    <span class="size-1 rounded-full bg-muted flex-shrink-0" />
                    <span :class="['text-[8.5px] font-medium', item.urgencyColor]">{{ item.urgency }}</span>
                  </div>
                </div>
                <div class="flex gap-1 flex-shrink-0">
                  <button class="px-2 py-0.5 rounded text-[8.5px] font-semibold bg-success/10 text-success cursor-default">Approve</button>
                  <button class="px-2 py-0.5 rounded text-[8.5px] font-semibold bg-error/10 text-error cursor-default">Reject</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress bars -->
          <div class="rounded-lg border border-default bg-elevated p-3">
            <p class="text-[10px] font-semibold text-highlighted mb-2">Approval Completion Rate</p>
            <div class="space-y-2">
              <div v-for="dept in deptProgress" :key="dept.name" class="flex items-center gap-2">
                <span class="text-[9px] text-muted w-16 truncate">{{ dept.name }}</span>
                <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full bg-primary transition-all" :style="{ width: dept.pct + '%' }" />
                </div>
                <span class="text-[9px] text-dimmed w-7 text-right">{{ dept.pct }}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Documents', icon: 'i-lucide-files', active: false },
  { label: 'Shared', icon: 'i-lucide-users', active: false },
  { label: 'Starred', icon: 'i-lucide-star', active: false },
  { label: 'Approvals', icon: 'i-lucide-check-circle', active: true },
  { label: 'Signatures', icon: 'i-lucide-pen-tool', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const summaryStats = [
  { label: 'Pending', value: '34', valueColor: 'text-warning' },
  { label: 'Approved (MTD)', value: '127', valueColor: 'text-success' },
  { label: 'Avg. Time', value: '4.2h', valueColor: 'text-info' },
]

const approvals = [
  { title: 'NDA — Acme Corp', requester: 'Legal Dept', urgency: 'Due Today', urgencyColor: 'text-error', color: 'text-error', bg: 'bg-error/10' },
  { title: 'Q3 Budget Revision', requester: 'Finance Team', urgency: 'Due Tomorrow', urgencyColor: 'text-warning', color: 'text-warning', bg: 'bg-warning/10' },
  { title: 'IT Security Policy', requester: 'IT Dept', urgency: 'Due Friday', urgencyColor: 'text-primary', color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Vendor Contract – XYZ', requester: 'Procurement', urgency: 'Next Week', urgencyColor: 'text-muted', color: 'text-success', bg: 'bg-success/10' },
]

const deptProgress = [
  { name: 'Finance', pct: 92 },
  { name: 'Legal', pct: 78 },
  { name: 'HR', pct: 85 },
  { name: 'Operations', pct: 63 },
]
</script>
