<template>
  <MockupBrowserFrame
    url="dms.ccci.com.ph/settings/access"
    title="Access log"
    icon="i-lucide-shield-check"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Access log</span>
          <p class="text-[10px] text-muted mt-0.5">Last 24 hours</p>
        </div>
        <UButton label="Export" color="neutral" variant="outline" size="xs" icon="i-lucide-download" class="font-mono" />
      </div>

      <!-- Audit trail -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Audit trail</span>
        <UButton label="View all" color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-chevron-right" />
      </div>

      <div v-if="auditLog?.length" class="flex flex-col gap-2">
        <UCard
          v-for="entry in auditLog"
          :key="entry.event"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 rounded-md flex items-center justify-center shrink-0" :class="entry.iconBg">
              <UIcon :name="entry.icon" class="size-3.5" :class="entry.iconColor" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ entry.event }}</p>
              <p class="text-[10px] text-muted font-mono">{{ entry.time }}</p>
            </div>
          </div>
          <UBadge :label="entry.action" :color="entry.color" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
        </UCard>
      </div>

      <!-- SSO/LDAP badge -->
      <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-key-round" class="size-3.5 text-primary" />
          <span class="font-mono text-xs font-semibold text-primary tracking-wide">SSO / LDAP active</span>
        </div>
        <UBadge label="SECURE" color="success" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'audit',
    title: 'Audit Trail',
    subtitle: '247 events today',
    icon: 'i-lucide-activity',
    color: 'success',
    pulse: true,
  },
  {
    id: 'rbac',
    title: 'Role-Based Access',
    subtitle: 'Granular permissions on',
    icon: 'i-lucide-shield-check',
    color: 'primary',
    badge: { label: 'ENFORCED', color: 'primary' },
  },
  {
    id: 'redact',
    title: 'Redaction',
    subtitle: '2 sensitive docs masked',
    icon: 'i-lucide-eye-off',
    color: 'warning',
    badge: { label: 'ACTIVE', color: 'warning' },
  },
]

interface AuditEntry {
  event: string
  action: string
  time: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const auditLog: AuditEntry[] = [
  { event: 'Contract_2026_v3.pdf — R. Santos', action: 'Viewed', time: '14:02', icon: 'i-lucide-eye', iconBg: 'bg-info/10', iconColor: 'text-info', color: 'info' },
  { event: 'NDA — L. Santiago', action: 'Signed', time: '13:40', icon: 'i-lucide-pen-tool', iconBg: 'bg-success/10', iconColor: 'text-success', color: 'success' },
  { event: 'Payroll_Q3.xlsx — Guest', action: 'Denied', time: '11:15', icon: 'i-lucide-ban', iconBg: 'bg-error/10', iconColor: 'text-error', color: 'error' },
  { event: 'Employee_Record_009 — Admin', action: 'Redacted', time: '09:47', icon: 'i-lucide-eye-off', iconBg: 'bg-warning/10', iconColor: 'text-warning', color: 'warning' },
]
</script>
