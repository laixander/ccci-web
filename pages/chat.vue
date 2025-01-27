<template>
    <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
        <!-- sidebar -->
        <CSidebarNarrow :items="menu" title="UI Development" />
        <aside class="w-64 bg-white border-r dark:border-gray-800 dark:bg-gray-950 shadow-md flex flex-col">
            <header class="p-4 text-md font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-800">
                Messages
            </header>

            <div class="p-4 border-b dark:border-gray-800">
                <UInput
                    icon="i-lucide-search"
                    size="sm"
                    color="white"
                    :trailing="false"
                    placeholder="Search..."
                />
            </div>
            
            <ul class="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
                <li v-for="user in users" :key="user.id"
                    class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div class="p-4 flex items-center gap-3">
                        <UChip size="md" position="bottom-right" color="green" inset :show="user.online === true">
                            <UAvatar
                                size="md"
                                :src="user.avatar"
                                :alt="user.name"
                            />
                        </UChip>
                        <div class="flex-1">
                            <div class="flex items-center">
                                <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100 flex-1 w-1 truncate">{{ user.name }}</h3>
                                <div class="flex items-center gap-1">
                                    <UIcon 
                                        name="i-lucide-check-check"
                                        :class="[ { 'text-primary-500 dark:text-primary-700' : user.newMessage }, 'text-gray-300 dark:text-gray-800' ]" 
                                    />
                                    <p class="text-xs text-gray-400 dark:text-gray-600">2h ago</p>
                                </div>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.lastMessage }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </aside>

        <main class="flex-1 flex flex-col">

            <!-- chatbox -->
            <div class="flex-1 flex">
                <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950 border-r dark:border-gray-800">
                    <div class="flex-1 p-4">
                        <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">Chat with Jane</h2>
                        <ul class="space-y-4 mt-4">
                            <li v-for="message in messages" :key="message.id"
                                :class="{ 'text-right': message.from === 'me' }" class="text-sm">
                                <p
                                    class="inline-block max-w-xs px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg">
                                    {{ message.text }}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="p-4 border-t bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 flex items-center gap-2">
                        <UTextarea :rows="1" autoresize placeholder="Type a message..." size="md" class="w-full" />
                        <div class="flex items-center">
                            <label for="file-upload" class="cursor-pointer">
                                <UButton icon="i-lucide-paperclip" variant="ghost" square />
                                <input 
                                    id="file-upload" 
                                    type="file" 
                                    class="hidden" 
                                    @change="handleFileUpload"
                                />
                            </label>
                            <UButton icon="i-lucide-send" variant="ghost" square />
                        </div>
                    </div>
                </div>
                <div class="w-1/5 bg-white dark:bg-gray-950 p-4">
                    <header class="p-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md">
                        <h2 class="text-lg font-bold">Jane Smith</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Online</p>
                    </header>
                    <div class="flex-1 overflow-y-auto p-4">
                        <p class="text-gray-600 dark:text-gray-400">This is where the user details will go...</p>
                    </div>
                </div>
            </div>


        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'clean',
})

// sidebar logic
const users = [
    { id: 1, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/24', lastMessage: 'Hey, how are you?', newMessage: true, online: true },
    { id: 2, name: 'Jane Smith', avatar: 'https://avatar.iran.liara.run/public/100', lastMessage: 'Can you send the file?', newMessage: true },
    { id: 3, name: 'Peter Pan', avatar: 'https://avatar.iran.liara.run/public/46', lastMessage: 'Hello World!', online: true },
    { id: 4, name: 'Captain Hook', avatar: 'https://avatar.iran.liara.run/public/32', lastMessage: 'Some where out there', online: true },
    { id: 5, name: 'Maria Hernandez', avatar: 'https://avatar.iran.liara.run/public/99', lastMessage: 'You say..' },
];

// chatbox logic
const messages = [
    { id: 1, from: 'me', text: 'Hi, Jane!' },
    { id: 2, from: 'Jane', text: 'Hey! How are you?' },
    { id: 3, from: 'me', text: 'I\'m good, you?' },
];


type MenuItem = {
    icon: string,
    title: string,
    path?: string
};

// Define props
const menu = [
    { icon: 'i-lucide-message-square', title: 'Chat', path: '/chat' },
    { icon: 'i-lucide-user-round', title: 'Contacts', path: '/contact' },
    { icon: 'i-lucide-paperclip', title: 'Attachments', path: '/attachments' },
    { icon: 'i-lucide-settings', title: 'Settings', path: '/settings' },
]



const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Selected file:', file);
    // Add your upload logic here, e.g., send the file to a server
  }
};
</script>