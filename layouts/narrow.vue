<template>
    <CLayoutNarrow :menu="menu" title="Chat">
        <slot />
    </CLayoutNarrow>
</template>

<script setup lang="ts">

type MenuItem = {
    icon: string,
    title: string,
    path?: string
};
const menu = [
    { icon: 'i-lucide-message-square', title: 'Chat', path: '/chat' },
    { icon: 'i-lucide-user-round', title: 'Contacts', path: '/contact' },
    { icon: 'i-lucide-paperclip', title: 'Attachments', path: '/attachments' },
    { icon: 'i-lucide-settings', title: 'Settings', path: '/settings' },
]
</script>