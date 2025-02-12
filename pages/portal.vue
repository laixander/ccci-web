<template>
    <CPagePortal :apps="apps" :actions="actions" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'simple'
})

const apps = [
    {
        name: "Human Resource Information System",
        description: "It's a software program that helps businesses manage employee data and HR processes.",
        logo: "",
        headerBgColor: "bg-blue-500"
    },
    {
        name: "Campus Management System",
        description: "a software platform designed to automate and streamline various administrative and academic tasks within an educational institution like a school, college, or university",
        logo: "",
        headerBgColor: "bg-green-500"
    }
];

const actions = [
    {
        label: "Open",
        icon: "i-lucide-folder-open",
        click: (app: any) => console.log(`Opening ${app.name}`)
    },
    {
        label: "Delete",
        icon: "i-lucide-trash-2",
        click: (app: any) => console.log(`Deleting ${app.name}`)
    }
];
</script>