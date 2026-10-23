<template>
  <MockupBrowserFrame
    url="hkas.ccci.com.ph/users"
    title="Roles & permissions · Access control"
    icon="i-lucide-shield-check"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">User Access & Security</span>
          <p class="text-[10px] text-muted mt-0.5">Granular role-based permissions and medical privacy safeguards</p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge label="DPA-2012 Encrypted" color="success" variant="subtle" size="xs" class="font-mono text-[9px] uppercase tracking-wider" />
          <UButton
            label="Invite User"
            icon="i-lucide-user-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- User Role Count Stats -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in userStats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-2.5 sm:p-3 flex flex-col gap-0.5' }"
          class="rounded-xl shadow-2xs"
        >
          <span class="text-[9.5px] font-mono uppercase tracking-wider text-muted">{{ stat.label }}</span>
          <span class="text-base font-bold font-mono text-highlighted tracking-tight leading-none">{{ stat.value }}</span>
          <span class="text-[9px] font-medium" :class="stat.subClass">{{ stat.sub }}</span>
        </UCard>
      </div>

      <!-- Roles Table Header -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[12px] text-highlighted">Configured Role Scopes</span>
          <span class="text-[10px] text-muted">Campus Security Policy</span>
        </div>
        <UButton
          label="Audit log"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Roles List -->
      <div v-if="roles?.length" class="flex flex-col gap-2">
        <UCard
          v-for="role in roles"
          :key="role.role"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', role.iconBg]">
              <UIcon :name="role.icon" :class="['size-4', role.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ role.role }}</p>
                <UBadge
                  :label="role.badge"
                  :color="role.badgeColor"
                  variant="subtle"
                  size="xs"
                  class="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0"
                />
              </div>
              <p class="text-[10px] text-muted truncate mt-0.5">{{ role.description }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <div class="text-right">
              <p class="text-[11px] font-mono text-muted">{{ role.scope }}</p>
            </div>
            <UBadge
              :label="role.access"
              :color="role.accessColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Security Status Bar -->
      <div class="flex items-center justify-between pt-1 border-t border-default/40">
        <div class="flex items-center gap-1.5 text-muted text-[10px]">
          <UIcon name="i-lucide-lock" class="size-3 text-primary" />
          <span>Single Sign-On (SSO) active via Google Workspace and Microsoft Entra</span>
        </div>
        <span class="text-[10px] text-dimmed font-mono">2FA Enforced</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'rbac-security',
    title: 'Role Governance',
    subtitle: 'Zero Unauthorized Leak',
    icon: 'i-lucide-shield-alert',
    color: 'success',
    pulse: true,
  },
  {
    id: 'sso-tag',
    title: 'Campus SSO',
    subtitle: 'Google & Microsoft Entra',
    icon: 'i-lucide-key-round',
    color: 'primary',
    badge: { label: 'CONNECTED', color: 'primary' },
  },
  {
    id: 'hipaa-tag',
    title: 'Health Privacy',
    subtitle: 'Audit Log 100% Tracked',
    icon: 'i-lucide-clipboard-check',
    color: 'info',
    badge: { label: 'ENCRYPTED', color: 'info' },
  },
]

interface UserStat {
  label: string
  value: string
  sub: string
  subClass: string
}

interface UserRoleItem {
  role: string
  badge: string
  badgeColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  scope: string
  access: string
  accessColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  description: string
  icon: string
  iconColor: string
  iconBg: string
}

const userStats: UserStat[] = [
  { label: 'Active Staff', value: '24', sub: 'Coaches & faculty', subClass: 'text-primary' },
  { label: 'Athletes & Students', value: '412', sub: 'View-only portal', subClass: 'text-success' },
  { label: 'Admin Accounts', value: '3', sub: 'Full access scope', subClass: 'text-info' },
  { label: 'Security Health', value: '100%', sub: '2FA enforced', subClass: 'text-highlighted' },
]

const roles: UserRoleItem[] = [
  {
    role: 'Administrator',
    badge: 'System Admin',
    badgeColor: 'primary',
    scope: 'All data',
    access: 'Full',
    accessColor: 'primary',
    description: 'Institution-wide data control, hardware calibration & user provisioning',
    icon: 'i-lucide-shield-check',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    role: 'Coach',
    badge: 'Varsity Staff',
    badgeColor: 'success',
    scope: 'Own athletes',
    access: 'Edit',
    accessColor: 'success',
    description: 'Assessment entry, training plan modifications & athlete evaluations',
    icon: 'i-lucide-whistle',
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
  },
  {
    role: 'Staff',
    badge: 'PE Faculty',
    badgeColor: 'info',
    scope: 'Assigned program',
    access: 'View',
    accessColor: 'info',
    description: 'Cohort fitness percentile review, attendance & class summary viewing',
    icon: 'i-lucide-users',
    iconColor: 'text-info',
    iconBg: 'bg-info/10',
  },
]
</script>
