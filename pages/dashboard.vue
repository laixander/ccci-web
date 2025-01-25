<template>
    <CPage title="Dashboard" description="This is the Home Page" :banner="true" userName="Jane Copper" :breadcrumbs="breadcrumbs">
        <div class="flex flex-wrap gap-4 justify-center">
            <CWidget description="Total number of users" count="3,000.00" icon="lucide:user-round" bgColor="bg-amber-500"></CWidget>
            <CWidget description="Total number of users" count="4,000.00" icon="lucide:user-round" bgColor="bg-teal-500"></CWidget>
            <CWidget description="Total number of users" count="3,000.00" icon="lucide:user-round"></CWidget>
            <CWidget description="Total number of users" count="4,000.00" icon="lucide:user-round" bgColor="bg-rose-500"></CWidget>
            <CWidget description="Total number of users" count="3,000.00" icon="lucide:user-round" bgColor="bg-violet-500"></CWidget>
        </div>
    </CPage>
</template>
<script setup lang="ts">
const breadcrumbs = [
    {
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
    }
]
// definePageMeta({
//   layout: 'simple',
// })
</script>