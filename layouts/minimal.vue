<template>
    <CLayoutMinimal logo="logo.png" name="UI Development" :links="links" :is-logged-in="false" :has-menu="false">
      <slot />
    </CLayoutMinimal>
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
  ]
  </script>