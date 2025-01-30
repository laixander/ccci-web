<!-- <template>
    <CLayout mode="full" logo="/logo.png" name="UI Development" :links="links">
        <slot />
    </CLayout>
  </template> -->

  <template>
    <CLayoutFull logo="/logo.png" name="UI Development" :links="links">
      <slot />
    </CLayoutFull>
  </template>
  
  <script setup lang="ts">
  
  const links = [
    {
      label: 'Layouts',
      icon: 'i-lucide-file-code-2',
      to: '/docs/'
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