<template>
    <CPageProfile title="Profile" avatarUrl="" 
        name="John Doe"
        :details="profileDetails">
    </CPageProfile>
</template>

<!-- <script setup lang="ts">
definePageMeta({
  showHeader: false,
})
</script> -->

<script setup lang="ts">
const profileDetails = [
    { icon: 'i-lucide-mail', label: '', value: 'john.doe@example.com' },
    { icon: 'i-lucide-smartphone', label: '', value: '+123 456 7890' },
    { icon: 'i-lucide-map-pin', label: '', value: 'New York, USA' },
];
</script>