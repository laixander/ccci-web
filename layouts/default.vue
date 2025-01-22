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
    label: 'Profile',
    icon: 'i-lucide-circle-user-round',
    to: '/profile'
  },
  {
    label: 'Wizard',
    icon: 'i-lucide-wand',
    to: '/wizard'
  },
  {
    label: 'List',
    icon: 'i-lucide-grid',
    to: '/list'
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