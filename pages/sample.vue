<template>
    <CPageChat :users="users" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
    layout: 'narrow',
    hasFooter: false,
});

interface Message {
    id: number;
    from: string;
    text: string;
}

interface User {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    newMessage?: boolean;
    online?: boolean;
    lastSeen: string;
    role: string;
    course: string;
    year: string;
}

// sidebar dataset
const users = ref<User[]>([
    { id: 1, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/24', lastMessage: 'Hey, how are you?', newMessage: true, online: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
    { id: 2, name: 'Jane Smith', avatar: 'https://avatar.iran.liara.run/public/100', lastMessage: 'Can you send the file?', newMessage: true, role: 'Professor', course: 'Computer Science', year: 'N/A', lastSeen: '2 hrs ago' },
    { id: 3, name: 'Peter Pan', avatar: 'https://avatar.iran.liara.run/public/46', lastMessage: 'Hello World!', newMessage: false, online: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
    { id: 4, name: 'Captain Hook', avatar: 'https://avatar.iran.liara.run/public/32', lastMessage: 'Some where out there', newMessage: false, online: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
    { id: 5, name: 'Maria Hernandez', avatar: 'https://avatar.iran.liara.run/public/99', lastMessage: 'You say..', newMessage: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
]);

</script>