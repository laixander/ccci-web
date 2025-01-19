<template>
  <CPageTable title="Tickets" sub-title="This is the Tickets Page" :breadcrumbs="breadcrumbs">
    
  </CPageTable>
</template>

<script setup lang="ts">

const breadcrumbs = 
  [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/'
  }, {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link'
  }]

</script>
