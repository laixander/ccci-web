<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const audits = [
  { id: 'AUD-001', title: 'Monthly Safety Walkthrough — Plant A', date: 'Aug 28, 2026', score: 94, maxScore: 100, findings: 2, status: 'completed', statusBadge: 'bg-success/10 text-success', auditor: 'Safety Officer Reyes' },
  { id: 'AUD-002', title: 'Fire Safety Inspection — All Buildings', date: 'Aug 15, 2026', score: 88, maxScore: 100, findings: 5, status: 'completed', statusBadge: 'bg-success/10 text-success', auditor: 'BFP Inspector Cruz' },
  { id: 'AUD-003', title: 'Chemical Storage Compliance Check — Lab Wing', date: 'Sep 5, 2026', score: null, maxScore: 100, findings: null, status: 'scheduled', statusBadge: 'bg-info/10 text-info', auditor: 'EHS Team' },
  { id: 'AUD-004', title: 'Quarterly DOLE OSH Audit — Full Site', date: 'Sep 15, 2026', score: null, maxScore: 100, findings: null, status: 'scheduled', statusBadge: 'bg-info/10 text-info', auditor: 'DOLE Inspector' },
  { id: 'AUD-005', title: 'PPE Compliance Spot Check — Warehouse', date: 'Aug 10, 2026', score: 76, maxScore: 100, findings: 8, status: 'in-review', statusBadge: 'bg-warning/10 text-warning', auditor: 'Safety Officer Reyes' },
]

const checklistItems = [
  { category: 'Emergency Preparedness', items: ['Fire extinguishers inspected and in date', 'Emergency exits clear and signposted', 'First aid kits stocked and accessible', 'Evacuation plan posted in all areas'] },
  { category: 'PPE Compliance', items: ['Hard hats worn in designated areas', 'Safety footwear in production zones', 'Eye protection available near chemical stations', 'Hearing protection in high-noise areas'] },
  { category: 'Housekeeping', items: ['Aisles and walkways clear of obstructions', 'No slip hazards (wet floors, cables)', 'Waste disposal containers in place', 'Storage areas organized and labeled'] },
]

const checkedItems = ref<Record<string, boolean>>({})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Safety Audits</h1>
        <p class="text-muted text-sm mt-1">Schedule, conduct, and track safety inspections and compliance audits</p>
      </div>
      <UButton label="Schedule Audit" icon="i-lucide-calendar-plus" color="primary" size="sm" />
    </div>

    <!-- Audit list -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Audit Schedule & History</h2>
      </template>
      <div class="divide-y divide-default">
        <div v-for="audit in audits" :key="audit.id" class="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
          <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-clipboard-check" class="size-5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-xs text-dimmed font-mono">{{ audit.id }}</span>
              <span :class="['text-xs px-2 py-0.5 rounded-full font-semibold', audit.statusBadge]">{{ audit.status }}</span>
            </div>
            <p class="text-sm font-semibold text-highlighted">{{ audit.title }}</p>
            <p class="text-xs text-muted">{{ audit.auditor }} · {{ audit.date }}</p>
          </div>
          <div v-if="audit.score !== null" class="text-right shrink-0">
            <p :class="['text-xl font-extrabold', audit.score >= 90 ? 'text-success' : audit.score >= 75 ? 'text-warning' : 'text-error']">{{ audit.score }}/{{ audit.maxScore }}</p>
            <p class="text-xs text-muted">{{ audit.findings }} findings</p>
          </div>
          <div v-else class="text-right shrink-0">
            <p class="text-xs text-dimmed">Pending</p>
          </div>
          <UButton icon="i-lucide-arrow-right" color="neutral" variant="ghost" size="xs" />
        </div>
      </div>
    </UCard>

    <!-- Quick checklist -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-list-checks" class="size-5 text-primary" />
          <h2 class="font-semibold text-highlighted">Quick Safety Checklist</h2>
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="cat in checklistItems" :key="cat.category">
          <p class="text-xs font-bold text-primary uppercase tracking-widest mb-3">{{ cat.category }}</p>
          <div class="space-y-2">
            <label v-for="item in cat.items" :key="item" class="flex items-start gap-2 cursor-pointer group">
              <UCheckbox v-model="checkedItems[item]" :label="item" color="primary" class="mt-0.5" />
            </label>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6 pt-4 border-t border-default gap-3">
        <UButton label="Save Checklist" icon="i-lucide-save" />
      </div>
    </UCard>
  </div>
</template>
