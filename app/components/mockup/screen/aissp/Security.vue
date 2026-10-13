<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/platform">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Platform</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

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
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
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