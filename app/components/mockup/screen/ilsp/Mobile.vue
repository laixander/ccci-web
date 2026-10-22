<template>
  <MockupMobileFrame :floating-tags="floatingTags">
    <div class="flex flex-col gap-3.5 h-full bg-default text-default select-none font-sans relative">
      <!-- App Header -->
      <div class="flex items-center justify-between pt-1">
        <div>
          <p class="text-[16px] font-bold text-highlighted leading-tight">
            ILSP Mobile
          </p>
          <p class="text-[10px] text-muted">
            Today · Real-time activity
          </p>
        </div>
        <div class="relative size-7 rounded-full bg-primary/10 flex items-center justify-center">
          <UIcon
            name="i-lucide-bell"
            class="size-3.5 text-primary"
          />
          <span class="absolute top-1 right-1 size-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      <!-- Quick KPI Strip -->
      <div class="grid grid-cols-2 gap-2">
        <UCard
          variant="outline"
          :ui="{ body: 'p-2 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs"
        >
          <div>
            <p class="text-[8.5px] text-muted font-mono uppercase">
              Pending Tasks
            </p>
            <p class="text-[14px] font-bold text-highlighted font-mono leading-none mt-0.5">
              3
            </p>
          </div>
          <UIcon
            name="i-lucide-clock"
            class="size-4 text-warning"
          />
        </UCard>

        <UCard
          variant="outline"
          :ui="{ body: 'p-2 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs"
        >
          <div>
            <p class="text-[8.5px] text-muted font-mono uppercase">
              Partners Sync
            </p>
            <p class="text-[14px] font-bold text-highlighted font-mono leading-none mt-0.5">
              100%
            </p>
          </div>
          <UIcon
            name="i-lucide-check-circle"
            class="size-4 text-success"
          />
        </UCard>
      </div>

      <!-- Alerts Section -->
      <div class="flex items-center justify-between pt-0.5">
        <span class="font-bold text-[12px] text-highlighted">Alerts</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
          class="text-[10px] p-0"
        />
      </div>

      <!-- Alerts List -->
      <div
        v-if="alerts?.length"
        class="flex flex-col gap-2"
      >
        <UCard
          v-for="alert in alerts"
          :key="alert.description"
          variant="outline"
          :ui="{ body: 'p-2.5 flex items-center justify-between gap-2' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <div
              class="size-7 rounded-lg flex items-center justify-center shrink-0"
              :class="alert.iconBg"
            >
              <UIcon
                :name="alert.icon"
                class="size-3.5"
                :class="alert.iconColor"
              />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <UBadge
                  :label="alert.tag"
                  :color="alert.badgeColor"
                  variant="subtle"
                  size="xs"
                  class="text-[7.5px] px-1 py-0 font-bold uppercase tracking-wider"
                />
                <span class="text-[8.5px] text-muted font-mono">{{ alert.time }}</span>
              </div>
              <p class="font-semibold text-[10.5px] text-highlighted truncate leading-tight mt-0.5">
                {{ alert.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Bottom Action Button -->
      <div class="pt-1">
        <UButton
          label="Open Mobile Dashboard"
          icon="i-lucide-smartphone"
          color="primary"
          block
          size="xs"
          class="py-2 text-[11px] font-semibold rounded-lg shadow-sm"
        />
      </div>
    </div>
  </MockupMobileFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'push-alerts',
    title: 'Push Alerts',
    subtitle: 'Instant Mobile Notification',
    icon: 'i-lucide-bell',
    color: 'primary',
    pulse: true
  },
  {
    id: 'mobile-onboarding',
    title: 'Mobile Onboarding',
    subtitle: 'Rapid Partner Registration',
    icon: 'i-lucide-smartphone',
    color: 'success',
    badge: { label: 'ONLINE', color: 'success' }
  },
  {
    id: 'task-mgmt',
    title: 'Task & Milestones',
    subtitle: 'Track Deliverables On The Go',
    icon: 'i-lucide-check-square',
    color: 'warning',
    badge: { label: 'PENDING', color: 'warning' }
  }
]

// ─── Alert Data ───────────────────────────────────────────────────────────────
interface MobileAlert {
  tag: string
  description: string
  time: string
  icon: string
  iconColor: string
  iconBg: string
  badgeColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const alerts: MobileAlert[] = [
  {
    tag: 'Approval',
    description: 'MOU renewal awaiting sign-off',
    time: 'Now',
    icon: 'i-lucide-file-signature',
    iconColor: 'text-error',
    iconBg: 'bg-error/10',
    badgeColor: 'error'
  },
  {
    tag: 'Deadline',
    description: 'Partner report due Friday',
    time: '2d',
    icon: 'i-lucide-clock',
    iconColor: 'text-warning',
    iconBg: 'bg-warning/10',
    badgeColor: 'warning'
  },
  {
    tag: 'Message',
    description: 'Feedback from Partner B',
    time: '3h',
    icon: 'i-lucide-message-square',
    iconColor: 'text-info',
    iconBg: 'bg-info/10',
    badgeColor: 'info'
  },
  {
    tag: 'Task',
    description: 'Orientation completed',
    time: 'Done',
    icon: 'i-lucide-check-circle',
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
    badgeColor: 'success'
  }
]
</script>
