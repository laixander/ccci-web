<template>
  <CLayout full name="UI Development" :links="links">
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
    label: 'Grid',
    icon: 'i-lucide-circle-user-round',
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