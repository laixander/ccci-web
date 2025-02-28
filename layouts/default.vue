<!-- <template>
  <CLayout mode="full" logo="logo.png" name="UI Development" :links="links" :help="true">
      <slot />
  </CLayout>
</template> -->

<!-- <template>
  <CLayoutFull logo="logo.png" name="UI Development" :links="links" :help="true">
    <slot />
  </CLayoutFull>
</template> -->

<template>
  <CLayoutFull2 logo="logo.png" name="UI Development" :links="links">
    <slot />
  </CLayoutFull2>
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
  // {
  //   label: 'Notifications',
  //   icon: 'i-lucide-bell',
  //   to: '/notifications'
  // },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/settings'
  }
]
</script>