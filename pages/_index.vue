<template>
  <CPage title="Dashboard" description="This is the Home Page" >
    
    <div class="flex flex-wrap gap-4 justify-center mb-4">
      <CWidget class="grow" description="Total number of users" count="3,000.00" icon="lucide:user-round"></CWidget>
      <CWidget class="grow" description="Total number of users" count="4,000.00" icon="lucide:user-round"></CWidget>
      <CWidget class="grow" description="Total number of users" count="3" icon="lucide:user-round"></CWidget>
      <CWidget class="grow" description="Total number of users" count="3" icon="lucide:user-round"></CWidget>
      <CWidget class="grow" description="Total number of users" count="3" icon="lucide:user-round"></CWidget>
    </div>

    <CChartArea :x-show="false" :y-show="false" class="grow"></CChartArea>
    
  </CPage>
</template>

<script setup lang="ts">

const breadcrumbs = 
  [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d'
  }, {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link'
  }]

</script>
