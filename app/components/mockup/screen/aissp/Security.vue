<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/platform" title="Platform" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col justify-between gap-5">
      <!-- Platform Features Grid -->
      <div v-if="features?.length" class="grid grid-cols-2 gap-3.5">
        <UCard
          v-for="item in features"
          :key="item.title"
          variant="outline"
          :ui="{ body: 'px-4 py-3 sm:px-4 sm:py-3.5 flex items-center gap-3.5' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <UIcon :name="item.icon" class="size-4" />
          </div>
          <span class="font-bold text-[13px] text-highlighted">
            {{ item.title }}
          </span>
        </UCard>
      </div>

      <!-- Integration Callout Banner using UAlert -->
      <UAlert
        variant="subtle"
        title="FMS & Asset Mgmt integration"
        :ui="{
          root: 'rounded-xl',
          wrapper: 'flex-row items-center justify-between',
          title: 'font-mono text-xs font-semibold text-primary',
          actions: 'mt-0'
        }"
      >
        <template #actions>
          <UBadge
            label="OPEN API"
            color="primary"
            variant="subtle"
            size="sm"
            class="font-bold tracking-wider uppercase rounded-full"
          />
        </template>
      </UAlert>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'open-api',
    title: 'Open REST API',
    subtitle: 'FMS & AMS bi-directional',
    icon: 'i-lucide-plug',
    color: 'primary',
    badge: { label: 'OPEN API', color: 'primary' }
  },
  {
    id: 'sso-rbac',
    title: 'SSO & RBAC',
    subtitle: 'Zero-trust role mapping',
    icon: 'i-lucide-shield-check',
    color: 'success',
    badge: { label: 'ACTIVE', color: 'success' }
  },
  {
    id: 'containerized',
    title: 'Containerized',
    subtitle: '99.9% Uptime · Docker/K8s',
    icon: 'i-lucide-server',
    color: 'info',
    pulse: true
  }
]

interface PlatformFeature {
  title: string
  icon: string
}

const features: PlatformFeature[] = [
  { title: 'RBAC', icon: 'i-lucide-shield-check' },
  { title: 'Single Sign-On', icon: 'i-lucide-check' },
  { title: 'Offline sync', icon: 'i-lucide-qr-code' },
  { title: 'Microservices', icon: 'i-lucide-layers' },
  { title: 'Containerized', icon: 'i-lucide-monitor' },
  { title: 'Mobile-ready', icon: 'i-lucide-smartphone' },
]
</script>