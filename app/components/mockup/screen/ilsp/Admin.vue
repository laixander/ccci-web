<template>
  <MockupBrowserFrame
    url="ilsp.ccci.com.ph/partners"
    title="Partner Institutions"
    icon="i-lucide-shield-check"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Top header bar -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Partner Institutions</span>
          <p class="text-[11px] text-muted">
            128 active partnerships · Real-time MOU oversight
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="New Partner"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
          />
        </div>
      </div>

      <!-- Search & Filter bar -->
      <div class="flex items-center gap-2 rounded-lg border border-default bg-elevated px-3 py-1.5">
        <UIcon
          name="i-lucide-search"
          class="size-3.5 text-muted shrink-0"
        />
        <span class="text-[11px] text-muted flex-1">Search by institution name, category, or country…</span>
        <UBadge
          label="128 active"
          color="primary"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider"
        />
      </div>

      <!-- Partner directory table -->
      <div
        v-if="partners?.length"
        class="flex flex-col gap-2"
      >
        <UCard
          v-for="partner in partners"
          :key="partner.name"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon
                :name="partner.icon"
                class="size-4 text-primary"
              />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">
                {{ partner.name }}
              </p>
              <p class="text-[10px] text-muted">
                {{ partner.category }} · {{ partner.focal }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <UBadge
              :label="partner.mouStatus"
              :color="partner.mouColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase"
            />
            <UBadge
              :label="partner.stage"
              :color="partner.stageColor"
              variant="soft"
              size="xs"
              class="font-bold tracking-wider uppercase"
            />
          </div>
        </UCard>
      </div>

      <!-- Footer action info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/60">
        <div class="flex items-center gap-2 text-[10px] text-muted font-mono">
          <UIcon
            name="i-lucide-refresh-cw"
            class="size-3 text-success"
          />
          <span>Automated MOU renewal alerts active</span>
        </div>
        <UButton
          label="View Full Directory"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'compliance',
    title: 'MOU Compliance',
    subtitle: '94% On Track · Verified',
    icon: 'i-lucide-shield-check',
    color: 'success',
    pulse: true
  },
  {
    id: 'active-partners',
    title: '128 Active Partners',
    subtitle: '+9 New This Year',
    icon: 'i-lucide-building-2',
    color: 'primary',
    badge: { label: 'VERIFIED', color: 'primary' }
  },
  {
    id: 'expiring',
    title: 'MOU Oversight',
    subtitle: '3 Expiring in 30 Days',
    icon: 'i-lucide-clock',
    color: 'warning',
    badge: { label: 'REVIEW', color: 'warning' }
  }
]

// ─── Partner Data ─────────────────────────────────────────────────────────────
interface PartnerRecord {
  name: string
  category: string
  focal: string
  icon: string
  mouStatus: string
  mouColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  stage: string
  stageColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const partners: PartnerRecord[] = [
  {
    name: 'Partner University A',
    category: 'State Academic Institution',
    focal: 'Dr. M. Santos',
    icon: 'i-lucide-graduation-cap',
    mouStatus: 'Active',
    mouColor: 'success',
    stage: 'Compliant',
    stageColor: 'success'
  },
  {
    name: 'Partner Institute B',
    category: 'Regional Research Council',
    focal: 'Engr. R. Reyes',
    icon: 'i-lucide-flask-conical',
    mouStatus: 'Active',
    mouColor: 'success',
    stage: 'Compliant',
    stageColor: 'success'
  },
  {
    name: 'Partner Agency C',
    category: 'Government Development Bureau',
    focal: 'Atty. L. Diaz',
    icon: 'i-lucide-landmark',
    mouStatus: 'Expiring',
    mouColor: 'warning',
    stage: 'Review',
    stageColor: 'warning'
  },
  {
    name: 'Partner Org D',
    category: 'Industry Consortium',
    focal: 'Ms. C. Torres',
    icon: 'i-lucide-briefcase',
    mouStatus: 'Draft',
    mouColor: 'neutral',
    stage: 'Pending',
    stageColor: 'info'
  }
]
</script>
