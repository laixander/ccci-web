<template>
    <CBanner user-name="Jane Copper"></CBanner>
    <CPage title="Dashboard" description="This is the Home Page">
        <div class="flex flex-wrap gap-4 justify-center">
            <CWidget class="grow" description="Total number of users" count="3,000.00" icon="lucide:user-round">
            </CWidget>
            <CWidget class="grow" description="Total number of users" count="4,000.00" icon="lucide:user-round">
            </CWidget>
            <CWidget class="grow" description="Total number of users" count="3" icon="lucide:user-round"></CWidget>
            <CWidget class="grow" description="Total number of users" count="3" icon="lucide:user-round"></CWidget>
            <CWidget class="grow" description="Total number of users" count="3" icon="lucide:user-round"></CWidget>
        </div>
    </CPage>
</template>
<script setup lang="ts">
</script>