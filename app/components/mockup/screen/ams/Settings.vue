<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/settings" title="System Settings">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">General Configuration</h3>
          <p class="text-[11px] text-muted">Role permissions, sign-in security, and organization defaults</p>
        </div>
        <UButton
          label="Save Changes"
          color="primary"
          size="xs"
        />
      </div>

      <!-- Settings List -->
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Core Parameters</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">All Preferences →</span>
        </div>
        <div v-if="settings?.length" class="flex flex-col gap-2">
          <UCard
            v-for="item in settings"
            :key="item.setting"
            variant="outline"
            :ui="{ body: 'px-3.5 py-3 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UBadge
                :label="item.tag"
                :color="item.color"
                variant="subtle"
                size="xs"
                class="font-mono font-bold tracking-wider"
              />
              <span class="font-medium text-[12.5px] text-highlighted">{{ item.setting }}</span>
            </div>
            <div class="flex items-center gap-2">
              <UBadge
                :label="item.status"
                :color="item.color"
                variant="soft"
                size="xs"
                class="font-mono font-bold"
              />
              <UIcon name="i-lucide-chevron-right" class="size-3.5 text-dimmed" />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-shield-check" class="size-4 text-primary shrink-0" />
          <span class="text-[11px] font-medium text-highlighted">SSO & 2FA enforcement active across all campus accounts</span>
        </div>
        <span class="text-[11px] font-mono font-semibold text-primary cursor-default">Security Policy</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface SettingItem {
  tag: string
  setting: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const settings: SettingItem[] = [
  { tag: 'Access', setting: 'Role-based permissions & departments', status: 'Active', color: 'success' },
  { tag: 'Sign-in', setting: 'Email/username + 2FA, Campus SSO', status: 'Enabled', color: 'success' },
  { tag: 'Branding', setting: 'Logo, color scheme & custom symbol', status: 'Updated', color: 'primary' },
  { tag: 'Alerts', setting: 'Email + in-app + chatbot notifications', status: 'On', color: 'info' },
]
</script>
