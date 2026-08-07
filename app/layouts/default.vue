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
    label: 'Company',
    children: [
      { label: 'About', to: '#' },
      { label: 'Blog', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', to: '#' },
      { label: 'API Reference', to: '#' },
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
  <UHeader>
    <template #title>
      <AppLogo />
    </template>

    <UNavigationMenu :items="navItems" />

    <template #right>
      <UColorModeButton />
      <UButton label="Sign in" color="neutral" variant="ghost" class="hidden sm:flex" />
      <UButton label="Get started" trailing-icon="i-lucide-arrow-right" />
    </template>

    <!-- Mobile menu body -->
    <template #body>
      <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
      <div class="mt-4 flex flex-col gap-2">
        <UButton label="Sign in" color="neutral" variant="outline" block />
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
              <AppLogo />
              <p class="text-muted text-sm leading-relaxed max-w-xs">
                The modern HR platform helping growing teams manage their entire workforce lifecycle with confidence.
              </p>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm flex items-center gap-2">
        <UIcon name="i-lucide-copyright" /> <span>{{ new Date().getFullYear() }} PeopleCore. All rights reserved.</span>
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
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://github.com"
          target="_blank"
          aria-label="GitHub"
        />
      </div>
    </template>
  </UFooter>
</template>
