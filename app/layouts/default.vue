<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems: NavigationMenuItem[] = [
  { label: 'About', to: '#about' },
  { label: 'Contact', to: '#contact' },
  {
    label: 'Products',
    icon: 'i-lucide-layout-grid',
    children: [
      {
        label: 'HRIS',
        description: 'Human Resource Information System',
        icon: 'i-lucide-users',
        to: '/products/hris',
      },
      {
        label: 'LMS',
        description: 'Learning Management System',
        icon: 'i-lucide-book-open',
        to: '/products/lms',
      },
      {
        label: 'CMS',
        description: 'Campus Management System',
        icon: 'i-lucide-graduation-cap',
        to: '/products/cms',
      },
    ],
  },
]

const footerLinks = [
  {
    label: 'Products',
    children: [
      { label: 'HRIS', to: '/products/hris' },
      { label: 'LMS', to: '/products/lms' },
      { label: 'CMS', to: '/products/cms' },
      { label: 'Pricing', to: '#' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', to: '#about' },
      { label: 'Blog', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#contact' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', to: '#' },
      { label: 'API Reference', to: '#' },
      { label: 'Implementation Guide', to: '#' },
      { label: 'Support Center', to: '#' },
    ],
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Data Protection', to: '#' },
    ],
  },
]
</script>

<template>
  <UHeader>
    <template #title>
      <AppLogo />
    </template>

    <UNavigationMenu arrow content-orientation="vertical" :items="navItems" class="w-full justify-center" />

    <template #right>
      <UColorModeButton />
      <UButton label="Contact Sales" color="neutral" variant="ghost" class="hidden sm:flex" />
      <UButton label="Book a Demo" trailing-icon="i-lucide-calendar" @click="useDemoModal().open()" />
    </template>

    <!-- Mobile menu body -->
    <template #body>
      <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
      <div class="mt-4 flex flex-col gap-2">
        <UButton label="Contact Sales" color="neutral" variant="outline" block />
        <UButton label="Book a Demo" block @click="useDemoModal().open()" />
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
                Centralized Cloud Computing International Inc. — building enterprise cloud software for Philippine organizations since 2020.
              </p>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm flex items-center gap-2">
        <UIcon name="i-lucide-copyright" />
        <span>{{ new Date().getFullYear() }} Centralized Cloud Computing International Inc. All rights reserved.</span>
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
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://facebook.com"
          target="_blank"
          aria-label="Facebook"
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
      </div>
    </template>
  </UFooter>
</template>
