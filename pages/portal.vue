<template>
    <CBannerWeb 
        start
        title="Welcome to Your Portal"
        description="Your central hub for seamless access to essential resources, tools, and updates. Stay connected, manage your tasks efficiently, and navigate your digital space with ease. Whether you’re here for work, learning, or collaboration, everything you need is just a click away."
        :rounded="false" 
        button="Documentation" icon="i-lucide-book-open-text" color="amber" @cta="handleCTA"
    />
    <div class="mt-4">
        <UContainer>
            <CGrid :columns="4">
                <CCardApp :apps="apps" :actions="actions" />
            </CGrid>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'minimal'
})

import { useRouter } from 'vue-router'

const apps = ref([
    {
        name: "HRIS",
        description: "Human Resource Information System",
        headerBgColor: "bg-purple-500",
    },
    {
        name: "LMS",
        description: "Learning Management System",
        headerBgColor: "bg-green-500",
    },
    {
        name: "DMS",
        description: "Document Management System",
        headerBgColor: "bg-cyan-500",
    },
    {
        name: "AMS",
        description: "Asset Management System",
        headerBgColor: "bg-rose-500",
    },
]);

const actions = ref([
    {
        label: "Open",
        icon: "lucide:external-link",
        to: "dashboard",
        click: (app: any) => {
            console.log(`Opening ${app.name}`);
            alert(`Opening ${app.name}`);
        },
    },
    {
        label: "Settings",
        icon: "lucide:settings",
        click: (app: any) => {
            console.log(`Opening settings for ${app.name}`);
            alert(`Opening settings for ${app.name}`);
        },
    },
]);

const router = useRouter()

const handleCTA = () => {
    router.push('/dashboard')
}
</script>