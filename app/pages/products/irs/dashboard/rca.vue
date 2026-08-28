<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const selectedIncident = ref('IRS-002 — Forklift Near-Miss, Warehouse Bay 3')
const incidents = [
  'IRS-001 — Chemical Spill, R&D Lab 2',
  'IRS-002 — Forklift Near-Miss, Warehouse Bay 3',
  'IRS-003 — Slip & Fall, Main Lobby',
]

const whySteps = [
  { step: 1, why: 'Why did the near-miss occur?', answer: 'The forklift operator did not see the pedestrian crossing the aisle.' },
  { step: 2, why: 'Why was the pedestrian not seen?', answer: 'The intersection at Bay 3 has poor sightlines due to stacked pallets.' },
  { step: 3, why: 'Why were pallets stacked there?', answer: 'No designated staging area is marked in Bay 3, so workers improvise storage.' },
  { step: 4, why: 'Why is there no designated staging area?', answer: 'The floor layout was never updated after warehouse expansion in 2024.' },
  { step: 5, why: 'Why was the layout not updated?', answer: 'No formal process exists for reviewing floor plans after facility changes.' },
]

const fishboneCategories = [
  { label: 'People', items: ['Insufficient forklift safety training', 'No spotter assigned to Bay 3'] },
  { label: 'Methods', items: ['No pedestrian crossing procedure', 'Informal traffic management'] },
  { label: 'Environment', items: ['Poor sightlines from stacked pallets', 'Inadequate aisle width'] },
  { label: 'Management', items: ['No post-expansion layout review', 'Incomplete hazard assessment'] },
]

const findings = [
  { label: 'Root Cause Identified', done: true },
  { label: 'Fishbone Diagram Completed', done: true },
  { label: '5 Whys Analysis Completed', done: true },
  { label: 'Corrective Actions Assigned', done: false },
  { label: 'RCA Report Approved', done: false },
]
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Root Cause Analysis</h1>
        <p class="text-muted text-sm mt-1">Identify systemic causes using 5 Whys and Fishbone methodology</p>
      </div>
      <UButton label="Export RCA Report" icon="i-lucide-download" color="neutral" variant="outline" size="sm" />
    </div>

    <!-- Incident selector -->
    <UCard>
      <UFormField label="Analyzing Incident">
        <USelect v-model="selectedIncident" :items="incidents" class="w-full mt-1" size="lg" />
      </UFormField>
    </UCard>

    <!-- 5 Whys -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <UIcon name="i-lucide-search" class="size-4 text-primary" />
          </div>
          <h2 class="font-semibold text-highlighted">5 Whys Analysis</h2>
        </div>
      </template>
      <div class="space-y-4">
        <div v-for="step in whySteps" :key="step.step" class="flex gap-4">
          <div class="flex flex-col items-center">
            <div class="size-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
              {{ step.step }}
            </div>
            <div v-if="step.step < 5" class="w-px flex-1 bg-default mt-2" />
          </div>
          <div class="pb-4 flex-1">
            <p class="text-xs font-semibold text-muted uppercase tracking-wide mb-1">{{ step.why }}</p>
            <div class="rounded-lg border border-default bg-muted/30 px-4 py-3">
              <p class="text-sm text-highlighted">{{ step.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-default rounded-xl bg-error/5 border border-error/20 p-4">
        <p class="text-xs font-semibold text-error uppercase tracking-wide mb-1">Root Cause</p>
        <p class="text-sm text-highlighted font-medium">No formal process exists for reviewing and updating floor layouts after facility changes, leading to unchecked hazards accumulating over time.</p>
      </div>
    </UCard>

    <!-- Fishbone diagram (text representation) -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <div class="size-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <UIcon name="i-lucide-git-branch" class="size-4 text-warning" />
          </div>
          <h2 class="font-semibold text-highlighted">Fishbone (Ishikawa) Analysis</h2>
        </div>
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="cat in fishboneCategories" :key="cat.label" class="rounded-xl border border-default bg-muted/20 p-4">
          <p class="text-xs font-bold text-primary uppercase tracking-widest mb-2">{{ cat.label }}</p>
          <ul class="space-y-1.5">
            <li v-for="item in cat.items" :key="item" class="flex items-start gap-2 text-sm text-muted">
              <UIcon name="i-lucide-arrow-right" class="size-3.5 text-primary shrink-0 mt-0.5" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </UCard>

    <!-- RCA Checklist -->
    <UCard title="RCA Progress">
      <div class="space-y-3">
        <div v-for="item in findings" :key="item.label" class="flex items-center gap-3">
          <div :class="['size-5 rounded-full flex items-center justify-center shrink-0', item.done ? 'bg-success' : 'border-2 border-default']">
            <UIcon v-if="item.done" name="i-lucide-check" class="size-3 text-white" />
          </div>
          <span :class="['text-sm', item.done ? 'text-highlighted' : 'text-muted']">{{ item.label }}</span>
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-default">
        <UButton label="Assign CAPA" icon="i-lucide-clipboard-check" to="/products/irs/dashboard/capa" />
      </div>
    </UCard>
  </div>
</template>
