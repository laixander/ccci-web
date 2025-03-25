<template>
    <CPage title="Dashboard" description="This is the Home Page" :banner="true" userName="Jane Copper">
        <div class="flex flex-wrap gap-4 justify-center">
            <CCardWidget :widgets="stats" />
        </div>
    </CPage>
</template>
<script setup lang="ts">
definePageMeta({
  title: 'Dashboard'
});

const stats =[
    { count: 120, description: "Active Students", icon: "i-lucide-users", bgColor: "bg-blue-500" },
    { count: 45, description: "New Enrollments", icon: "i-lucide-graduation-cap", bgColor: "bg-green-500" },
    { count: 12, description: "Pending Requests", icon: "i-lucide-clock", bgColor: "bg-yellow-500" },
    { count: 8, description: "Faculty Members", icon: "i-lucide-user", bgColor: "bg-purple-500" }
]
</script>