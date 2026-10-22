<template>
  <MockupBrowserFrame
    url="ams.ccci.com.ph/settings"
    title="System Settings"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header -->
      <!-- <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">General Configuration</h3>
          <p class="text-[11px] text-muted">Role permissions, sign-in security, and organization defaults</p>
        </div>
        <UButton
          label="Save Changes"
          color="primary"
          size="xs"
        />
      </div> -->

      <!-- Settings List -->
      <div class="flex flex-col gap-4">
        <!-- <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Core Parameters</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">All Preferences →</span>
        </div> -->
        <div
          v-if="settings?.length"
          class="flex flex-col gap-4"
        >
          <UCard
            v-for="item in settings"
            :key="item.setting"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UBadge
                :label="item.tag"
                :color="item.color"
                variant="subtle"
                size="xs"
                class="uppercase tracking-widest font-bold px-2"
              />
              <span class="font-medium text-[12.5px] text-highlighted">{{ item.setting }}</span>
            </div>
            <div class="flex items-center gap-2">
              <UBadge
                :label="item.status"
                :color="item.color"
                variant="soft"
                size="xs"
                class="uppercase tracking-widest font-bold px-2"
              />
              <UIcon
                name="i-lucide-chevron-right"
                class="size-3.5 text-dimmed"
              />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Security Notice -->
      <UAlert
        title="SSO & 2FA enabled across all accounts"
        icon="i-lucide-shield-check"
        color="primary"
        variant="soft"
        orientation="horizontal"
        class="rounded-xl"
      >
        <template #actions>
          <UBadge
            label="Security Policy"
            color="primary"
            size="sm"
            class="uppercase tracking-widest font-bold px-2"
          />
        </template>
      </UAlert>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

interface SettingItem {
  tag: string
  setting: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'sso-shield',
    title: 'SSO & 2FA Shield',
    subtitle: 'Zero-Trust Security',
    icon: 'i-lucide-shield-check',
    color: 'success',
    pulse: true
  },
  {
    id: 'rbac-rights',
    title: 'Granular RBAC',
    subtitle: 'Admin & Custodian Roles',
    icon: 'i-lucide-lock',
    color: 'primary',
    badge: { label: 'ENFORCED', color: 'primary' }
  },
  {
    id: 'branding-identity',
    title: 'Campus Identity',
    subtitle: 'Theme & Logo Applied',
    icon: 'i-lucide-palette',
    color: 'info',
    badge: { label: 'CUSTOM', color: 'info' }
  }
]

const settings: SettingItem[] = [
  { tag: 'Access', setting: 'Role-based permissions & departments', status: 'Active', color: 'success' },
  { tag: 'Sign-in', setting: 'Email/username + 2FA, Campus SSO', status: 'Enabled', color: 'success' },
  { tag: 'Branding', setting: 'Logo, color scheme & custom symbol', status: 'Updated', color: 'primary' },
  { tag: 'Alerts', setting: 'Email + in-app + chatbot notifications', status: 'On', color: 'info' }
]
</script>
