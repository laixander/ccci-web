<template>
  <CLayoutDashboard logo="/logo.png" name="UI Development" :links="links" isLoggedIn>
    <slot />
  </CLayoutDashboard>
</template>

<script setup lang="ts">

const links = [
  // [
  //   {
  //     label: 'Dashboard',
  //     icon: 'i-lucide-house',
  //     to: '/dashboard'
  //   },
  //   {
  //     label: 'Profile',
  //     icon: 'i-lucide-circle-user-round',
  //     to: '/profile'
  //   },
  //   {
  //     label: 'Wizard',
  //     icon: 'i-lucide-wand',
  //     to: '/wizard'
  //   },
  //   {
  //     label: 'List',
  //     icon: 'i-lucide-grid',
  //     to: '/list'
  //   },
  //   {
  //     label: 'Kanban',
  //     icon: 'i-lucide-square-kanban',
  //     to: '/kanban'
  //   },
  //   {
  //     label: 'Settings',
  //     icon: 'i-lucide-settings',
  //     to: '/settings'
  //   },
  // ],
  [
    {
      label: 'Get Started',
      icon: 'i-lucide-terminal',
      to: '/Installation'
    },
    {
      label: 'Layouts',
      icon: 'i-lucide-panels-top-left',
      to: '/layouts'
    },
    {
      label: 'Grid',
      icon: 'i-lucide-layout-dashboard',
      to: '/grid'
    },
    {
      label: 'Card',
      icon: 'i-lucide-lab-card-credit',
      to: '/card'
    },
    {
      label: 'List',
      icon: 'i-lucide-layout-list',
      to: '/item'
    },
    {
      label: 'Tabs',
      icon: 'i-lucide-toggle-left',
      to: '/tabs'
    },
    {
      label: 'Testing',
      icon: 'i-lucide-wand-sparkles',
      to: '/testing'
    }
  ]
]
</script>