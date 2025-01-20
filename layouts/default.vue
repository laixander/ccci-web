<template>
  <CLayout mode="full" name="UI Development" :links="links">
      <slot />
  </CLayout>
</template>

<script setup lang="ts">

const links = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-house',
    to: '/dashboard'
  },
  {
    label: 'Wizard',
    icon: 'i-lucide-wand',
    to: '/wizard'
  },
  {
    label: 'Grid',
    icon: 'i-lucide-grid',
    to: '/grid'
  },
  {
    label: 'Notifications',
    icon: 'i-lucide-bell',
    to: '/notifications'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/settings'
  }
]
</script>