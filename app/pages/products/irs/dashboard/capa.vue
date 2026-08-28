<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type CapaStatus = 'open' | 'in-progress' | 'overdue' | 'completed'

const capas = ref([
  { id: 'CAPA-001', incident: 'IRS-002 — Forklift Near-Miss', action: 'Repaint pedestrian crossing lines in all warehouse bays', assignee: 'Facilities Team', due: 'Sep 5, 2026', priority: 'High', status: 'in-progress' as CapaStatus, pct: 60 },
  { id: 'CAPA-002', incident: 'IRS-002 — Forklift Near-Miss', action: 'Designate and mark official staging areas in Warehouse A', assignee: 'Safety Officer Reyes', due: 'Sep 10, 2026', priority: 'High', status: 'open' as CapaStatus, pct: 0 },
  { id: 'CAPA-003', incident: 'IRS-001 — Chemical Spill', action: 'Install chemical spill containment trays under all storage shelves', assignee: 'EHS Team', due: 'Aug 30, 2026', priority: 'Critical', status: 'overdue' as CapaStatus, pct: 40 },
  { id: 'CAPA-004', incident: 'IRS-001 — Chemical Spill', action: 'Conduct emergency chemical handling re-training for Lab 2 staff', assignee: 'HR / Training', due: 'Sep 3, 2026', priority: 'Critical', status: 'completed' as CapaStatus, pct: 100 },
  { id: 'CAPA-005', incident: 'IRS-004 — Electrical Hazard', action: 'Replace faulty circuit breaker panel — Floor 4 Room 401', assignee: 'Electrical Contractor', due: 'Aug 25, 2026', priority: 'Medium', status: 'completed' as CapaStatus, pct: 100 },
])

const statusConfig: Record<CapaStatus, { label: string, badge: string, bar: string }> = {
  open: { label: 'Open', badge: 'bg-primary/10 text-primary', bar: 'bg-primary' },
  'in-progress': { label: 'In Progress', badge: 'bg-info/10 text-info', bar: 'bg-info' },
  overdue: { label: 'Overdue', badge: 'bg-error/10 text-error', bar: 'bg-error' },
  completed: { label: 'Completed', badge: 'bg-success/10 text-success', bar: 'bg-success' },
}

const priorityBadge: Record<string, string> = {
  Critical: 'bg-error/10 text-error',
  High: 'bg-warning/10 text-warning',
  Medium: 'bg-orange-500/10 text-orange-500',
  Low: 'bg-muted text-muted',
}

const summary = computed(() => ({
  open: capas.value.filter(c => c.status === 'open').length,
  inProgress: capas.value.filter(c => c.status === 'in-progress').length,
  overdue: capas.value.filter(c => c.status === 'overdue').length,
  completed: capas.value.filter(c => c.status === 'completed').length,
}))
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">CAPA Tracking</h1>
        <p class="text-muted text-sm mt-1">Corrective and Preventive Actions — track progress and verify effectiveness</p>
      </div>
      <UButton label="Add CAPA" icon="i-lucide-plus-circle" color="primary" size="sm" />
    </div>

    <!-- Summary strip -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="(count, key) in summary" :key="key">
        <p class="text-2xl font-extrabold text-highlighted">{{ count }}</p>
        <p class="text-muted text-xs mt-1 capitalize">{{ key === 'inProgress' ? 'In Progress' : key }}</p>
      </UCard>
    </div>

    <!-- CAPA list -->
    <div class="space-y-4">
      <UCard v-for="capa in capas" :key="capa.id">
        <div class="flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-xs text-dimmed font-mono">{{ capa.id }}</span>
              <span :class="['text-xs px-2 py-0.5 rounded-full font-semibold', priorityBadge[capa.priority]]">{{ capa.priority }}</span>
              <span :class="['text-xs px-2 py-0.5 rounded-full font-semibold', statusConfig[capa.status].badge]">{{ statusConfig[capa.status].label }}</span>
            </div>
            <p class="text-sm font-semibold text-highlighted">{{ capa.action }}</p>
            <p class="text-xs text-muted mt-1">From: {{ capa.incident }}</p>
            <div class="flex items-center gap-4 mt-2 text-xs text-muted">
              <span class="flex items-center gap-1"><UIcon name="i-lucide-user" class="size-3" /> {{ capa.assignee }}</span>
              <span :class="['flex items-center gap-1', capa.status === 'overdue' ? 'text-error font-semibold' : '']">
                <UIcon name="i-lucide-calendar" class="size-3" /> Due {{ capa.due }}
              </span>
            </div>
            <!-- Progress bar -->
            <div class="mt-3">
              <div class="flex justify-between text-xs text-muted mb-1">
                <span>Progress</span>
                <span class="font-semibold text-highlighted">{{ capa.pct }}%</span>
              </div>
              <div class="bg-muted rounded-full h-1.5">
                <div :class="['h-1.5 rounded-full transition-all', statusConfig[capa.status].bar]" :style="{ width: capa.pct + '%' }" />
              </div>
            </div>
          </div>
          <div class="flex flex-row sm:flex-col gap-2 shrink-0">
            <UButton label="Update" size="xs" color="neutral" variant="outline" />
            <UButton v-if="capa.status !== 'completed'" label="Mark Done" size="xs" color="primary" @click="capas.find(c => c.id === capa.id)!.status = 'completed'; capas.find(c => c.id === capa.id)!.pct = 100" />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
