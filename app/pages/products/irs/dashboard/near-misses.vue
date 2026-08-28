<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const nearMisses = [
  { id: 'NM-001', title: 'Forklift nearly struck pedestrian — Bay 3', location: 'Warehouse A', reporter: 'A. Cruz', date: 'Aug 28, 2026', status: 'open', statusBadge: 'bg-primary/10 text-primary', icon: 'i-lucide-truck', iconBg: 'bg-warning/10', iconColor: 'text-warning', hazard: 'Vehicle/Pedestrian Conflict', risk: 'High' },
  { id: 'NM-002', title: 'Scaffold section nearly collapsed — Bldg C', location: 'Construction Zone', reporter: 'B. Santos', date: 'Aug 26, 2026', status: 'in-review', statusBadge: 'bg-warning/10 text-warning', icon: 'i-lucide-construction', iconBg: 'bg-warning/10', iconColor: 'text-warning', hazard: 'Structural / Fall Risk', risk: 'Critical' },
  { id: 'NM-003', title: 'Chemical container tipped, no spill', location: 'Storage Room D', reporter: 'L. Garcia', date: 'Aug 24, 2026', status: 'resolved', statusBadge: 'bg-success/10 text-success', icon: 'i-lucide-flask-conical', iconBg: 'bg-success/10', iconColor: 'text-success', hazard: 'Chemical Hazard', risk: 'Medium' },
  { id: 'NM-004', title: 'Electrical panel door left open — Floor 2', location: 'Office Block B', reporter: 'R. Dela Cruz', date: 'Aug 22, 2026', status: 'resolved', statusBadge: 'bg-success/10 text-success', icon: 'i-lucide-zap', iconBg: 'bg-success/10', iconColor: 'text-success', hazard: 'Electrical Hazard', risk: 'High' },
  { id: 'NM-005', title: 'Slippery floor not signed — Kitchen', location: 'Canteen', reporter: 'C. Bautista', date: 'Aug 20, 2026', status: 'closed', statusBadge: 'bg-muted text-muted', icon: 'i-lucide-droplets', iconBg: 'bg-muted', iconColor: 'text-muted', hazard: 'Slip Hazard', risk: 'Low' },
]

const statCards = [
  { label: 'Total Near-Misses (30d)', value: '8', icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', change: '↓ 2 vs last month' },
  { label: 'Converted to Incidents', value: '2', icon: 'i-lucide-triangle-alert', color: 'text-error', bg: 'bg-error/10', change: 'Requires investigation' },
  { label: 'Avg Response Time', value: '4.2h', icon: 'i-lucide-clock', color: 'text-info', bg: 'bg-info/10', change: '↓ 1.1h vs last month' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Near-Misses</h1>
        <p class="text-muted text-sm mt-1">Track and investigate close-call hazard events before they become incidents</p>
      </div>
      <UButton label="Log Near-Miss" icon="i-lucide-plus-circle" color="primary" size="sm" to="/products/irs/dashboard/report" />
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard v-for="card in statCards" :key="card.label">
        <div class="flex items-center gap-3 mb-2">
          <div :class="['size-10 rounded-xl flex items-center justify-center', card.bg]">
            <UIcon :name="card.icon" :class="['size-5', card.color]" />
          </div>
        </div>
        <p class="text-2xl font-extrabold text-highlighted">{{ card.value }}</p>
        <p class="text-muted text-xs mt-1">{{ card.label }}</p>
        <p class="text-xs mt-1 text-muted font-medium">{{ card.change }}</p>
      </UCard>
    </div>

    <!-- Near-miss list -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Near-Miss Log</h2>
      </template>
      <div class="divide-y divide-default">
        <div v-for="nm in nearMisses" :key="nm.id" class="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
          <div :class="['size-10 rounded-xl flex items-center justify-center shrink-0', nm.iconBg]">
            <UIcon :name="nm.icon" :class="['size-5', nm.iconColor]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-xs text-dimmed font-mono">{{ nm.id }}</span>
              <UBadge :label="nm.risk" :color="nm.risk === 'Critical' ? 'error' : nm.risk === 'High' ? 'warning' : nm.risk === 'Medium' ? 'neutral' : 'neutral'" variant="subtle" size="xs" />
            </div>
            <p class="text-sm font-semibold text-highlighted mt-0.5">{{ nm.title }}</p>
            <p class="text-xs text-muted">{{ nm.location }} · {{ nm.reporter }} · {{ nm.date }}</p>
          </div>
          <span :class="['text-xs px-2.5 py-1 rounded-full font-semibold shrink-0', nm.statusBadge]">{{ nm.status }}</span>
          <UButton icon="i-lucide-arrow-right" color="neutral" variant="ghost" size="xs" />
        </div>
      </div>
    </UCard>
  </div>
</template>
