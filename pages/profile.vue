<template>
    <CWrapper>
        <CProfile
            avatar="https://avatar.iran.liara.run/public/43" 
            name="John Doe"
            :details="profileDetails"
        />
        <CTabs full :tabs="profileTabs">
            <template #profile>
                <UCard>
                    Profile Content
                </UCard>
            </template>
            <template #projects>
                <UCard>
                    Projects Content
                </UCard>
            </template>
            <template #overview>
                <UCard>
                    Overview Content
                </UCard>
            </template>
        </CTabs>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Profile'
});

const profileDetails = [
    { icon: 'i-lucide-mail', label: '', value: 'john.doe@example.com' },
    { icon: 'i-lucide-smartphone', label: '', value: '+123 456 7890' },
    { icon: 'i-lucide-map-pin', label: '', value: 'New York, USA' },
];

const profileTabs = [
    { slot: 'profile', label: 'Profile' },
    { slot: 'projects', label: 'Projects' },
    { slot: 'overview', label: 'Overview' },    
]
</script>