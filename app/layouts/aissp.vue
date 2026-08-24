<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Features', to: '#features' },
  { label: 'Pricing', to: '#pricing' },
  { label: 'Testimonials', to: '#testimonials' },
])

const footerLinks = [
  {
    label: 'Product',
    children: [
      { label: 'Features', to: '#features' },
      { label: 'Pricing', to: '#pricing' },
      { label: 'Security', to: '#' },
      { label: 'Changelog', to: '#' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'Government', to: '#' },
      { label: 'Enterprise', to: '#' },
      { label: 'Healthcare', to: '#' },
      { label: 'Education', to: '#' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', to: '#' },
      { label: 'Webinars', to: '#' },
      { label: 'Community', to: '#' },
      { label: 'Support Center', to: '#' },
    ],
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Cookie Policy', to: '#' },
    ],
  },
]
</script>

<template>
  <div class="theme-aissp">
    <UHeader>
    <template #title>
      <div class="flex items-center gap-2.5">
        <div class="size-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
          <UIcon name="i-lucide-network" class="size-5 text-white" />
        </div>
        <span class="font-bold text-xl tracking-tight text-highlighted">
          AIS<span class="text-primary">SP</span>
        </span>
      </div>
    </template>

    <UNavigationMenu :items="navItems" />

    <template #right>
      <UColorModeButton />
      <UButton label="Sign in" color="neutral" variant="ghost" class="hidden sm:flex" to="/products/aissp/login" />
      <UButton label="Get started" trailing-icon="i-lucide-arrow-right" />
    </template>

    <!-- Mobile menu body -->
    <template #body>
      <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
      <div class="mt-4 flex flex-col gap-2">
        <UButton label="Sign in" color="neutral" variant="outline" block to="/products/aissp/login" />
        <UButton label="Get started" block />
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
                  <UIcon name="i-lucide-network" class="size-5 text-white" />
                </div>
                <span class="font-bold text-xl tracking-tight text-highlighted">
                  AIS<span class="text-primary">SP</span>
                </span>
              </div>
              <p class="text-muted text-sm leading-relaxed max-w-xs">
                Align ICT investments with strategic goals. Track systems, budgets, and compliance effortlessly.
              </p>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm flex items-center gap-2">
        <UIcon name="i-lucide-copyright" /> <span>{{ new Date().getFullYear() }} AISSP. All rights reserved.</span>
      </p>
    </template>

    <template #right>
      <div class="flex items-center gap-1">
        <UButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
        />
        <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://x.com"
          target="_blank"
          aria-label="X (Twitter)"
        />
        <UButton
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
