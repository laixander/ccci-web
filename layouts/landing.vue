<template>
    <CLayoutLanding logo="logo.png" name="UI Development" :links="links">
      <slot />
    </CLayoutLanding>
  </template>
  
  <script setup lang="ts">
  
  const links = [
  {
      label: 'Home',
      // icon: 'i-lucide-id-card',
      to: '/portal'
    },
    {
      label: 'Hero',
      // icon: 'i-lucide-id-card',
      to: '/hero'
    },
    {
      label: 'Feature',
      to: '/feature'
    },
    {
      label: 'Stats',
      to: '/stats'
    },
    {
      label: 'Footer',
      to: '/footer'
    },
    {
      label: 'Notifications',
      to: '/notifications'
    },
    {
      label: 'Settings',
      to: '/settings'
    }
  ]
  </script>