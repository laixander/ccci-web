<template>
    <CPageProfile 
        title="Profile" 
        avatarUrl="https://avatar.iran.liara.run/public/43" 
        name="John Doe"
        :details="profileDetails"
        :tabItems="tabItems">

        <template #team>
            <h2>Team Members</h2>
            <p>Details about the team...</p>
        </template>

        <template #projects>
            <h2>Projects</h2>
            <p>Ongoing and completed projects...</p>
        </template>

        <template #overview>
            <h2>Overview</h2>
            <p>A quick overview of all activities...</p>
        </template>
    </CPageProfile>
</template>

<!-- <script setup lang="ts">
definePageMeta({
  showHeader: false,
})
</script> -->

<script setup lang="ts">
definePageMeta({
  title: 'Profile'
});

const profileDetails = [
    { icon: 'i-lucide-mail', label: '', value: 'john.doe@example.com' },
    { icon: 'i-lucide-smartphone', label: '', value: '+123 456 7890' },
    { icon: 'i-lucide-map-pin', label: '', value: 'New York, USA' },
];
const tabItems = [
    { key: 'team', label: 'Team' },
    { key: 'projects', label: 'Projects' },
    { key: 'overview', label: 'Overview' },
];
</script>