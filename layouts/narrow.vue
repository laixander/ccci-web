<template>
    <CLayoutNarrow :menu="menu">
        <slot />
    </CLayoutNarrow>
</template>

<script setup lang="ts">
const menu = [
    { icon: 'i-lucide-message-square', title: 'Chat', path: '/chat' },
    { icon: 'i-lucide-user-round', title: 'Contacts', path: '/contact' },
    { icon: 'i-lucide-paperclip', title: 'Attachments', path: '/attachments' },
    { icon: 'i-lucide-settings', title: 'Settings', path: '/settings' },
]
</script>