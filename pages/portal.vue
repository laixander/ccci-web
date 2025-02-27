<template>
    <CPagePortal :apps="apps" :actions="actions" @signUp="handleSignUp" @logIn="handleLogin" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})

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

const handleSignUp = () => {
  console.log("Sign Up button clicked");
};

const handleLogin = () => {
  console.log("Log In button clicked");
};
</script>