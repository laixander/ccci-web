<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type Severity = 'critical' | 'high' | 'medium' | 'low'
type Status = 'open' | 'in-review' | 'resolved' | 'closed'

const search = ref('')
const selectedSeverity = ref<Severity | 'all'>('all')
const selectedStatus = ref<Status | 'all'>('all')

const severities = ['all', 'critical', 'high', 'medium', 'low']
const statuses = ['all', 'open', 'in-review', 'resolved', 'closed']

const incidents = [
  { id: 'IRS-001', title: 'Chemical Spill — Lab 2', location: 'R&D Building', reporter: 'J. Santos', date: 'Aug 28, 2026', severity: 'critical' as Severity, status: 'open' as Status, icon: 'i-lucide-flask-conical', iconBg: 'bg-error/10', iconColor: 'text-error' },
  { id: 'IRS-002', title: 'Forklift Near-Miss — Bay 3', location: 'Warehouse A', reporter: 'A. Cruz', date: 'Aug 28, 2026', severity: 'high' as Severity, status: 'in-review' as Status, icon: 'i-lucide-truck', iconBg: 'bg-warning/10', iconColor: 'text-warning' },
  { id: 'IRS-003', title: 'Slip & Fall — Lobby', location: 'Main Entrance', reporter: 'L. Navarro', date: 'Aug 27, 2026', severity: 'medium' as Severity, status: 'in-review' as Status, icon: 'i-lucide-person-standing', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500' },
  { id: 'IRS-004', title: 'Electrical Hazard Reported', location: 'Floor 4, Rm 401', reporter: 'M. Reyes', date: 'Aug 26, 2026', severity: 'high' as Severity, status: 'resolved' as Status, icon: 'i-lucide-zap', iconBg: 'bg-success/10', iconColor: 'text-success' },
  { id: 'IRS-005', title: 'Ladder Fall — Storage Area', location: 'Warehouse B', reporter: 'C. Bautista', date: 'Aug 25, 2026', severity: 'medium' as Severity, status: 'closed' as Status, icon: 'i-lucide-triangle-alert', iconBg: 'bg-muted', iconColor: 'text-muted' },
  { id: 'IRS-006', title: 'Gas Leak — Boiler Room', location: 'Basement, B-02', reporter: 'R. Dela Cruz', date: 'Aug 24, 2026', severity: 'critical' as Severity, status: 'resolved' as Status, icon: 'i-lucide-wind', iconBg: 'bg-success/10', iconColor: 'text-success' },
  { id: 'IRS-007', title: 'Eye Irritation — Paint Bay', location: 'Production Floor', reporter: 'P. Garcia', date: 'Aug 23, 2026', severity: 'low' as Severity, status: 'closed' as Status, icon: 'i-lucide-eye', iconBg: 'bg-muted', iconColor: 'text-muted' },
  { id: 'IRS-008', title: 'Machinery Entanglement Risk', location: 'CNC Area', reporter: 'B. Santos', date: 'Aug 22, 2026', severity: 'high' as Severity, status: 'open' as Status, icon: 'i-lucide-settings', iconBg: 'bg-warning/10', iconColor: 'text-warning' },
]

const severityConfig: Record<Severity, { label: string, color: string, badge: string }> = {
  critical: { label: 'Critical', color: 'text-error', badge: 'bg-error/10 text-error' },
  high: { label: 'High', color: 'text-warning', badge: 'bg-warning/10 text-warning' },
  medium: { label: 'Medium', color: 'text-orange-500', badge: 'bg-orange-500/10 text-orange-500' },
  low: { label: 'Low', color: 'text-muted', badge: 'bg-muted text-muted' },
}

const statusConfig: Record<Status, { label: string, badge: string }> = {
  open: { label: 'Open', badge: 'bg-primary/10 text-primary' },
  'in-review': { label: 'In Review', badge: 'bg-warning/10 text-warning' },
  resolved: { label: 'Resolved', badge: 'bg-success/10 text-success' },
  closed: { label: 'Closed', badge: 'bg-muted text-muted' },
}

const filtered = computed(() => incidents.filter(i => {
  const matchSearch = !search.value || i.title.toLowerCase().includes(search.value.toLowerCase()) || i.location.toLowerCase().includes(search.value.toLowerCase())
  const matchSeverity = selectedSeverity.value === 'all' || i.severity === selectedSeverity.value
  const matchStatus = selectedStatus.value === 'all' || i.status === selectedStatus.value
  return matchSearch && matchSeverity && matchStatus
}))
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">All Incidents</h1>
        <p class="text-muted text-sm mt-1">View, filter, and manage all reported incidents</p>
      </div>
      <UButton label="Report Incident" icon="i-lucide-plus-circle" color="primary" size="sm" to="/products/irs/dashboard/report" />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <UInput v-model="search" icon="i-lucide-search" placeholder="Search incidents..." class="w-64" />
      <USelect v-model="selectedSeverity" :items="severities" class="w-36" />
      <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
    </div>

    <!-- Table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div v-for="incident in filtered" :key="incident.id" class="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
          <div :class="['size-10 rounded-xl flex items-center justify-center shrink-0', incident.iconBg]">
            <UIcon :name="incident.icon" :class="['size-5', incident.iconColor]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-xs text-dimmed font-mono">{{ incident.id }}</span>
              <span :class="['text-xs px-2 py-0.5 rounded-full font-semibold', severityConfig[incident.severity].badge]">
                {{ severityConfig[incident.severity].label }}
              </span>
            </div>
            <p class="text-sm font-semibold text-highlighted mt-0.5">{{ incident.title }}</p>
            <p class="text-xs text-muted">{{ incident.location }} · {{ incident.reporter }} · {{ incident.date }}</p>
          </div>
          <span :class="['text-xs px-2.5 py-1 rounded-full font-semibold', statusConfig[incident.status].badge]">
            {{ statusConfig[incident.status].label }}
          </span>
          <UButton icon="i-lucide-arrow-right" color="neutral" variant="ghost" size="xs" />
        </div>

        <div v-if="filtered.length === 0" class="py-16">
          <UEmpty icon="i-lucide-triangle-alert" title="No incidents found" description="Try adjusting your filters or search query." />
        </div>
      </div>
    </UCard>
  </div>
</template>
