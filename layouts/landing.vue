<template>
    <CLayoutLanding logo="logo.png" name="UI Development" :links="links">
      <slot />
    </CLayoutLanding>
  </template>
  
  <script setup lang="ts">
  
  const links = [
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
      label: 'List',
      to: '/list'
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