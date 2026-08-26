<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const currentProduct = computed(() => {
  const match = route.path.match(/^\/products\/(cms|lms|hris|dms|ams|ilsp|aissp|eis|fms|hkas)/)
  return match?.[1] || 'hris'
})

// Reuse dashboard configs for core branding
const dashboardConfig = computed(() => {
  switch (currentProduct.value) {
    case 'cms': return useCmsDashboard()
    case 'lms': return useLmsDashboard()
    case 'dms': return useDmsDashboard()
    case 'ams': return useAmsDashboard()
    case 'ilsp': return useIlspDashboard()
    case 'aissp': return useAisspDashboard()
    case 'eis': return useEisDashboard()
    case 'fms': return useFmsDashboard()
    case 'hkas': return useHkasDashboard()
    default: return useHrisDashboard()
  }
})

const landingConfig = computed(() => useProductLanding(currentProduct.value))

const themeClass = computed(() => dashboardConfig.value.themeClass)
const appIcon = computed(() => dashboardConfig.value.appIcon)
const appNamePrefix = computed(() => dashboardConfig.value.appNamePrefix)
const appNameHighlight = computed(() => dashboardConfig.value.appNameHighlight)

const description = computed(() => landingConfig.value.description)
const primaryButton = computed(() => landingConfig.value.primaryButton)
const footerLinks = computed(() => landingConfig.value.footerLinks)
const social = computed(() => landingConfig.value.social)

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Features', to: '#features' },
  { label: 'Pricing', to: '#pricing' },
  { label: 'Testimonials', to: '#testimonials' },
])
</script>

<template>
  <div :class="themeClass">
    <UHeader>
      <template #title>
        <div class="flex items-center gap-2.5">
          <div class="size-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <UIcon :name="appIcon" class="size-5 text-white" />
          </div>
          <span class="font-bold text-xl tracking-tight text-highlighted">
            {{ appNamePrefix }}<span class="text-primary">{{ appNameHighlight }}</span>
          </span>
        </div>
      </template>

      <UNavigationMenu :items="navItems" />

      <template #right>
        <UColorModeButton />
        <UButton label="Sign in" color="neutral" variant="ghost" class="hidden sm:flex" :to="`/products/${currentProduct}/login`" />
        <UButton :label="primaryButton.label" :trailing-icon="primaryButton.icon" />
      </template>

      <!-- Mobile menu body -->
      <template #body>
        <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
        <div class="mt-4 flex flex-col gap-2">
          <UButton label="Sign in" color="neutral" variant="outline" block :to="`/products/${currentProduct}/login`" />
          <UButton :label="primaryButton.label" block />
        </div>
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #top>
        <UContainer>
          <UFooterColumns :columns="footerLinks">
            <template #left>
              <div class="space-y-4">
                <div class="flex items-center gap-2.5">
                  <div class="size-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                    <UIcon :name="appIcon" class="size-5 text-white" />
                  </div>
                  <span class="font-bold text-xl tracking-tight text-highlighted">
                    {{ appNamePrefix }}<span class="text-primary">{{ appNameHighlight }}</span>
                  </span>
                </div>
                <p class="text-muted text-sm leading-relaxed max-w-xs">
                  {{ description }}
                </p>
              </div>
            </template>
          </UFooterColumns>
        </UContainer>
      </template>

      <template #left>
        <p class="text-muted text-sm flex items-center gap-2">
          <UIcon name="i-lucide-copyright" /> <span>{{ new Date().getFullYear() }} {{ appNamePrefix }}{{ appNameHighlight }}. All rights reserved.</span>
        </p>
      </template>

      <template #right>
        <div class="flex items-center gap-1">
          <UButton
            v-if="social.includes('linkedin')"
            icon="i-simple-icons-linkedin"
            color="neutral"
            variant="ghost"
            size="sm"
            to="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
          />
          <UButton
            v-if="social.includes('x')"
            icon="i-simple-icons-x"
            color="neutral"
            variant="ghost"
            size="sm"
            to="https://x.com"
            target="_blank"
            aria-label="X (Twitter)"
          />
          <UButton
            v-if="social.includes('facebook')"
            icon="i-simple-icons-facebook"
            color="neutral"
            variant="ghost"
            size="sm"
            to="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          />
          <UButton
            v-if="social.includes('youtube')"
            icon="i-simple-icons-youtube"
            color="neutral"
            variant="ghost"
            size="sm"
            to="https://youtube.com"
            target="_blank"
            aria-label="YouTube"
          />
        </div>
      </template>
    </UFooter>
  </div>
</template>
