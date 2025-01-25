<template>
    <CLayout mode="full" logo="/logo.png" name="UI Development" :links="links">
        <slot />
    </CLayout>
  </template>
  
  <script setup lang="ts">
  
  const links = [
    {
      label: 'Layout Mode',
      icon: 'i-lucide-file-code-2',
      to: '/docs/layout-mode'
    },
    {
      label: 'Page',
      icon: 'i-lucide-file-code-2',
      to: '/docs/page-props'
    },
  {
      label: 'List Page',
      icon: 'i-lucide-file-code-2',
      to: '/docs/list-page'
    },
    {
      label: 'Notifications Page',
      icon: 'i-lucide-file-code-2',
      to: '/docs/notifications-page'
    },
    {
      label: 'Profile Page',
      icon: 'i-lucide-file-code-2',
      to: '/docs/profile-page'
    },
  ]
  </script>