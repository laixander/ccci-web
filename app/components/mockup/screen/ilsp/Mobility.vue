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
        <span class="text-dimmed text-[10px]">app.linkagescore.io/mobility</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-globe" class="size-3.5 text-white" />
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
          <UAvatar text="LD" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Mobility Programs</p>
            <p class="text-[9px] text-dimmed mt-0.5">Fall 2026 Semester</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <span class="text-[9px] font-medium text-highlighted">Inbound / Outbound</span>
              <UIcon name="i-lucide-chevron-down" class="size-3 text-muted" />
            </div>
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- KPI row -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="stat in summaryStats" :key="stat.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9px] text-muted">{{ stat.label }}</p>
              <p class="text-base font-bold mt-0.5 text-highlighted">{{ stat.value }}</p>
            </div>
          </div>

          <!-- Applications & Status -->
          <div class="grid grid-cols-2 gap-3">
            <!-- Active Applications -->
            <div class="rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 border-b border-default">
                <p class="text-[10px] font-semibold text-highlighted">Recent Applications</p>
              </div>
              <div class="divide-y divide-default">
                <div v-for="app in applications" :key="app.name" class="flex items-center justify-between px-3 py-2">
                  <div class="flex items-center gap-2">
                    <UAvatar :text="app.initials" size="2xs" :color="app.color" />
                    <div>
                      <p class="text-[10px] font-medium text-highlighted">{{ app.name }}</p>
                      <p class="text-[8.5px] text-dimmed">{{ app.program }} ({{ app.type }})</p>
                    </div>
                  </div>
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium" :class="app.statusClass">{{ app.status }}</span>
                </div>
              </div>
            </div>

            <!-- Visa / Requirement Status -->
            <div class="rounded-lg border border-default bg-elevated p-3">
              <p class="text-[10px] font-semibold text-highlighted mb-3">Pre-Departure Requirements</p>
              <div class="space-y-3">
                <div v-for="req in requirements" :key="req.label">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[9px] font-medium text-muted">{{ req.label }}</span>
                    <span class="text-[9px] font-bold text-highlighted">{{ req.completed }}/{{ req.total }}</span>
                  </div>
                  <div class="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div class="h-full rounded-full bg-primary transition-all" :style="{ width: (req.completed / req.total) * 100 + '%' }" />
                  </div>
                </div>
              </div>
              <div class="mt-4 pt-3 border-t border-default flex items-center gap-2 bg-warning/10 p-2 rounded-md">
                <UIcon name="i-lucide-alert-triangle" class="size-3.5 text-warning flex-shrink-0" />
                <p class="text-[8.5px] text-warning font-medium leading-tight">5 inbound students have missing visa documents. Deadline is next week.</p>
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
  { label: 'Institutions', icon: 'i-lucide-building-2', active: false },
  { label: 'MOUs', icon: 'i-lucide-file-text', active: false },
  { label: 'Mobility', icon: 'i-lucide-plane', active: true },
  { label: 'Grants', icon: 'i-lucide-badge-dollar-sign', active: false },
  { label: 'Analytics', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const summaryStats = [
  { label: 'Inbound Students', value: '45' },
  { label: 'Outbound Students', value: '39' },
  { label: 'Faculty Exchange', value: '12' },
  { label: 'Pending Visas', value: '8' },
]

const applications = [
  { name: 'Elena Rodriguez', initials: 'ER', color: 'primary', program: 'Erasmus+ Semester', type: 'Inbound', status: 'Approved', statusClass: 'bg-success/10 text-success' },
  { name: 'Kenji Sato', initials: 'KS', color: 'info', program: 'UTokyo Joint Research', type: 'Inbound', status: 'Pending Visa', statusClass: 'bg-warning/10 text-warning' },
  { name: 'Miguel Santos', initials: 'MS', color: 'rose', program: 'NUS Exchange', type: 'Outbound', status: 'Reviewing', statusClass: 'bg-primary/10 text-primary' },
  { name: 'Sarah Lee', initials: 'SL', color: 'amber', program: 'Stanford Summer', type: 'Outbound', status: 'Incomplete', statusClass: 'bg-error/10 text-error' },
]

const requirements = [
  { label: 'Acceptance Letters Issued', completed: 84, total: 84 },
  { label: 'Visa Approvals', completed: 76, total: 84 },
  { label: 'Accommodation Secured', completed: 62, total: 84 },
  { label: 'Medical Clearance', completed: 45, total: 84 },
]
</script>
