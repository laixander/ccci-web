<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/share"
    title="Board Summary"
    icon="i-lucide-share-2"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Board Summary</span>
          <p class="text-[10px] text-muted mt-0.5">Shared report · Secure permission tiers & scheduled dispatch</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Copy Link"
            icon="i-lucide-link"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="Share Access"
            icon="i-lucide-user-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Security Callout Banner -->
      <UCard
        variant="soft"
        :ui="{ body: 'p-3 flex items-center justify-between gap-3' }"
        class="bg-success/5 border border-success/20 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <div class="size-8 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-shield-check" class="size-4 text-success" />
          </div>
          <div>
            <p class="text-[11.5px] font-bold text-highlighted">Audit Logging & Watermarking Enabled</p>
            <p class="text-[10px] text-muted">All views, downloads, and exports are tracked with user timestamp metadata</p>
          </div>
        </div>
        <UBadge
          label="Encrypted"
          color="success"
          variant="subtle"
          size="xs"
          class="font-bold uppercase tracking-wider"
        />
      </UCard>

      <!-- Shared With Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[12px] text-highlighted">Shared with (4 access rules)</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Sharing Rows -->
      <div v-if="shares?.length" class="flex flex-col gap-2">
        <UCard
          v-for="s in shares"
          :key="s.recipient"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', s.iconBg]">
              <UIcon :name="s.icon" :class="['size-4', s.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ s.recipient }}</p>
                <span class="text-[10px] text-muted font-mono">{{ s.detail }}</span>
              </div>
              <p class="text-[10.5px] text-muted truncate mt-0.5">{{ s.scope }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <UBadge
              :label="s.permission"
              :color="s.permissionColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Footer Info Strip -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <span class="size-1.5 rounded-full bg-success" />
          Share the insight, never expose raw underlying credentials
        </span>
        <span class="hidden sm:inline">SSO & MFA enforced</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'sec-share',
    title: 'Zero Trust Sharing',
    subtitle: 'Encrypted Distribution',
    icon: 'i-lucide-lock',
    color: 'success',
    pulse: true,
  },
  {
    id: 'board-members',
    title: '6 Board Trustees',
    subtitle: 'Audited View-Only Access',
    icon: 'i-lucide-users',
    color: 'primary',
    badge: { label: 'CONFIDENTIAL', color: 'primary' },
  },
  {
    id: 'digest',
    title: 'Automated Digest',
    subtitle: 'Every Monday 07:30',
    icon: 'i-lucide-mail',
    color: 'info',
  },
]

// ─── Shared Access Data ───────────────────────────────────────────────────────
interface ShareItem {
  permission: string
  permissionColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  recipient: string
  detail: string
  scope: string
  icon: string
  iconBg: string
  iconColor: string
}

const shares: ShareItem[] = [
  {
    permission: 'View only',
    permissionColor: 'info',
    recipient: 'Board of Trustees',
    detail: '6 people',
    scope: 'Executive KPI cards, enrollment trends, and financial summaries',
    icon: 'i-lucide-eye',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    permission: 'Edit',
    permissionColor: 'primary',
    recipient: 'Office of the President',
    detail: '2 people',
    scope: 'Full dashboard customization, narrative annotations & threshold alerts',
    icon: 'i-lucide-edit-3',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    permission: 'No access',
    permissionColor: 'error',
    recipient: 'General staff',
    detail: 'Restricted',
    scope: 'Salary bands, sensitive endowments, and board deliberations hidden',
    icon: 'i-lucide-shield-ban',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
  },
  {
    permission: 'Scheduled',
    permissionColor: 'success',
    recipient: 'Weekly email digest',
    detail: 'Mondays',
    scope: 'Automated executive PDF summary delivered at 07:30 AM weekly',
    icon: 'i-lucide-calendar-clock',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
]
</script>
