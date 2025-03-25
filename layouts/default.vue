<template>
  <CLayoutDashboard logo="/logo.png" name="UI Development" :links="links" :is-logged-in="true">
    <slot />
  </CLayoutDashboard>
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
    label: 'Cards',
    icon: 'i-lucide-lab-card-credit',
    to: '/cards'
  },
  {
    label: 'Kanban',
    icon: 'i-lucide-square-kanban',
    to: '/kanban'
  },
  {
    label: 'Tabs',
    icon: 'i-lucide-toggle-left',
    to: '/tabs'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/settings'
  }
]
</script>