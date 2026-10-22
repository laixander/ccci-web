<template>
  <MockupBrowserFrame
    url="irs.ccci.com.ph/report/new"
    title="New report"
    icon="i-lucide-file-text"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">New report</span>
          <p class="text-[10px] text-muted mt-0.5">Choose a template · Fast Dispatch</p>
        </div>
        <UBadge
          label="1-Tap SOS"
          color="primary"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider uppercase"
        />
      </div>

      <!-- Instruction callout -->
      <UAlert
        variant="subtle"
        title="Zero-typing emergency trigger"
        description="Select a template below to auto-package your GPS location, timestamp, and incident type."
        icon="i-lucide-zap"
        :ui="{
          root: 'rounded-xl',
          wrapper: 'gap-2',
          title: 'font-mono text-xs font-semibold text-primary',
          description: 'text-[11px] text-muted',
        }"
      />

      <!-- Templates list header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Templates</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Template options -->
      <div v-if="templateList?.length" class="flex flex-col gap-2">
        <UCard
          v-for="tpl in templateList"
          :key="tpl.tag"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center shrink-0', tpl.iconBg]">
              <UIcon :name="tpl.icon" :class="['size-3.5', tpl.iconColor]" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ tpl.template }}</p>
              <p class="text-[10px] text-muted uppercase tracking-wider font-mono">{{ tpl.tag }}</p>
            </div>
          </div>
          <UBadge
            :label="tpl.meta"
            :color="tpl.color"
            variant="subtle"
            size="xs"
            class="font-bold tracking-wider"
          />
        </UCard>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-check-circle" class="size-3.5 text-success" />
          Auto-routes to Security, Clinic, or Facilities
        </span>
        <span>Instant Triage</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'quick-triage',
    title: 'Zero Typing SOS',
    subtitle: 'Pre-configured protocols',
    icon: 'i-lucide-zap',
    color: 'primary',
    pulse: true,
  },
  {
    id: 'auto-triage',
    title: 'Auto-Triage',
    subtitle: 'Clinic & Security Routed',
    icon: 'i-lucide-shield-alert',
    color: 'success',
    badge: { label: 'TRIAGED', color: 'success' },
  },
  {
    id: 'template-ready',
    title: 'Incident Templates',
    subtitle: '4 Standard Protocols',
    icon: 'i-lucide-file-text',
    color: 'warning',
    badge: { label: 'READY', color: 'warning' },
  },
]

// ─── Data Interface ───────────────────────────────────────────────────────────
interface TemplateItem {
  tag: string
  template: string
  meta: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const templateList: TemplateItem[] = [
  {
    tag: 'Medical',
    template: 'Injury or medical emergency',
    meta: '1 tap',
    icon: 'i-lucide-heart-pulse',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    color: 'error',
  },
  {
    tag: 'Security',
    template: 'Suspicious activity',
    meta: '1 tap',
    icon: 'i-lucide-shield-alert',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    color: 'warning',
  },
  {
    tag: 'Safety',
    template: 'Fire or hazard',
    meta: '1 tap',
    icon: 'i-lucide-flame',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    color: 'primary',
  },
  {
    tag: 'Other',
    template: 'Custom report',
    meta: 'Free text',
    icon: 'i-lucide-pen-line',
    iconBg: 'bg-neutral/10',
    iconColor: 'text-muted',
    color: 'neutral',
  },
]
</script>
