<template>
  <MockupBrowserFrame
    url="dms.ccci.com.ph/workflow/4482"
    title="Purchase Order #4482"
    icon="i-lucide-workflow"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Purchase Order #4482</span>
          <p class="text-[10px] text-muted mt-0.5">Step 3 of 5 · Finance approval</p>
        </div>
        <UBadge label="Active" color="warning" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
      </div>

      <!-- Approval chain -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Approval chain</span>
        <UButton label="View all" color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-chevron-right" />
      </div>

      <div v-if="steps?.length" class="flex flex-col gap-2">
        <UCard
          v-for="step in steps"
          :key="step.step"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 rounded-full flex items-center justify-center shrink-0" :class="step.dotBg">
              <UIcon :name="step.icon" class="size-3.5" :class="step.iconColor" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ step.step }}</p>
              <p class="text-[10px] text-muted">{{ step.when }}</p>
            </div>
          </div>
          <UBadge :label="step.status" :color="step.color" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
        </UCard>
      </div>

      <!-- Progress bar -->
      <div class="flex items-center gap-2">
        <span class="text-[10px] text-muted font-mono w-10 shrink-0">60%</span>
        <UProgress :model-value="60" color="warning" size="md" class="flex-1" />
        <span class="text-[10px] text-muted font-mono w-10 text-right shrink-0">Step 3/5</span>
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'active-step',
    title: 'Finance Approval',
    subtitle: 'Awaiting M. Dela Cruz',
    icon: 'i-lucide-clock',
    color: 'warning',
    pulse: true,
  },
  {
    id: 'routing',
    title: 'Auto-Routing',
    subtitle: 'Rules-based escalation',
    icon: 'i-lucide-git-branch',
    color: 'primary',
    badge: { label: 'ON', color: 'primary' },
  },
  {
    id: 'duplicate',
    title: 'Duplicate Check',
    subtitle: 'No duplicate detected',
    icon: 'i-lucide-copy-check',
    color: 'success',
    badge: { label: 'CLEAR', color: 'success' },
  },
]

interface WorkflowStep {
  step: string
  when: string
  status: string
  icon: string
  dotBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const steps: WorkflowStep[] = [
  { step: 'Submitted by Requester', when: 'Monday', status: 'Done', icon: 'i-lucide-check', dotBg: 'bg-success/10', iconColor: 'text-success', color: 'success' },
  { step: 'Reviewed by Supervisor', when: 'Tuesday', status: 'Done', icon: 'i-lucide-check', dotBg: 'bg-success/10', iconColor: 'text-success', color: 'success' },
  { step: 'Finance approval', when: 'Now', status: 'Active', icon: 'i-lucide-loader', dotBg: 'bg-warning/10', iconColor: 'text-warning', color: 'warning' },
  { step: 'Final sign-off', when: '—', status: 'Waiting', icon: 'i-lucide-clock', dotBg: 'bg-neutral/10', iconColor: 'text-muted', color: 'neutral' },
]
</script>
