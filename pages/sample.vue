<template>
    <div class="flex h-screen">
        <aside class="w-80 bg-white border-r dark:border-gray-800 dark:bg-gray-950 shadow-md flex flex-col">
            <header
                class="flex justify-between items-center p-4 text-md font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-800">
                Messages
                <UButton color="gray" variant="ghost" square icon="i-lucide-message-square-plus" @click="isOpen = true" />
            </header>
            <UTabs :items="items" class="w-full"
                :ui="{ list: { background: 'bg-transparent dark:bg-tranparent border-b dark:border-gray-800', rounded: 'rounded-none', marker: { wrapper: 'top-[7px]', background: 'bg-transparent dark:bg-tranparent border-b-2 border-primary-400 dark:border-primary-600', shadow: 'shadow-none', rounded: 'rounded-none' }, tab: { height: 'h-9' } } }">
                <template #default="{ selected }">
                    <span class="truncate" :class="[selected && 'text-primary-500 dark:text-primary-400']"></span>
                </template>
                <template #icon="{ item, selected }">
                    <UTooltip :text="item.label" :popper="{ placement: 'top' }">
                        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" :class="[selected && 'text-primary-500 dark:text-primary-400']" />
                    </UTooltip>
                </template>
                <template #item="{ item }">
                    <ul v-if="item.key === 'chat'" class="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
                        <li v-for="user in users" :key="user.id"
                            class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div class="p-4 flex items-center gap-3">
                                <UChip size="md" position="bottom-right" color="green" inset
                                    :show="user.online === true">
                                    <UAvatar size="md" :src="user.avatar" :alt="user.name" />
                                </UChip>
                                <div class="flex-1">
                                    <div class="flex items-center">
                                        <h3
                                            class="text-sm font-semibold text-gray-800 dark:text-gray-100 flex-1 w-1 truncate">
                                            {{ user.name }}</h3>
                                        <div class="flex items-center gap-1">
                                            <UIcon name="i-lucide-check-check"
                                                :class="[ { 'text-primary-500 dark:text-primary-700' : user.newMessage }, 'text-gray-300 dark:text-gray-800' ]" />
                                            <p class="text-xs"
                                                :class="[ { 'text-gray-400 dark:text-gray-600' : user.newMessage }, 'text-gray-300 dark:text-gray-700' ]">2h ago</p>
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{ user.lastMessage
                                        }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul v-if="item.key === 'group'" class="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
                        <li v-for="group in groups" :key="group.id"
                            class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div class="p-4 flex items-center gap-3">
                                <UChip size="md" position="bottom-right" color="green" inset
                                    :show="group.online === true">
                                    <UAvatarGroup size="sm" :max="1">
                                        <UAvatar v-for="member in group.members" :key="member.id" :src="member.avatar"
                                            :alt="member.name" />
                                    </UAvatarGroup>
                                </UChip>
                                <div class="flex-1">
                                    <div class="flex items-center">
                                        <h3
                                            class="text-sm font-semibold text-gray-800 dark:text-gray-100 flex-1 w-1 truncate">
                                            {{ group.name }}
                                        </h3>
                                        <div class="flex items-center gap-1">
                                            <UIcon name="i-lucide-check-check" :class="[
                                                { 'text-primary-500 dark:text-primary-700': group.newMessage },
                                                'text-gray-300 dark:text-gray-800',
                                            ]" />
                                            <p class="text-xs text-gray-400 dark:text-gray-600">1h ago</p>
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{
                                        group.lastMessage }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul v-if="item.key === 'org'" class="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
                        <li v-for="group in groups" :key="group.id"
                            class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div class="p-4 flex items-center gap-3">
                                <UChip size="md" position="bottom-right" color="green" inset
                                    :show="group.online === true">
                                    <UAvatarGroup size="sm" :max="1">
                                        <UAvatar v-for="member in group.members" :key="member.id" :src="member.avatar"
                                            :alt="member.name" />
                                    </UAvatarGroup>
                                </UChip>
                                <div class="flex-1">
                                    <div class="flex items-center">
                                        <h3
                                            class="text-sm font-semibold text-gray-800 dark:text-gray-100 flex-1 w-1 truncate">
                                            {{ group.name }}
                                        </h3>
                                        <div class="flex items-center gap-1">
                                            <UIcon name="i-lucide-check-check" :class="[
                                                { 'text-primary-500 dark:text-primary-700': group.newMessage },
                                                'text-gray-300 dark:text-gray-800',
                                            ]" />
                                            <p class="text-xs text-gray-400 dark:text-gray-600">1h ago</p>
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{{
                                        group.lastMessage }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
            </UTabs>
        </aside>
        <main class="flex-grow flex flex-col">
            <CHeader class="py-3 bg-white" 
                :hasChat="false" 
                :hasLogo="false" 
                :hasMenu="false" 
                :hasMenuToggle="false" 
                :hasSearchInput="true" 
                :isSticky="false">
            </CHeader>

            <div class="flex-grow flex overflow-y-hidden">
                <div class="flex-grow flex flex-col bg-gray-50 dark:bg-gray-950 border-r dark:border-gray-800">
                    <div class="flex-grow p-4">
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
                    <div
                        class="p-4 border-t bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 flex items-center gap-2">
                        <UTextarea :rows="1" autoresize placeholder="Type a message..." size="md" class="w-full" />
                        <div class="flex items-center">
                            <UButton icon="i-lucide-paperclip" variant="ghost" square />
                            <UButton icon="i-lucide-send" variant="ghost" square />
                        </div>
                    </div>
                </div>

                <div class="w-80 bg-white dark:bg-gray-950 overflow-y-auto">
                    <header class="text-gray-700 dark:text-gray-200 text-center p-4 border-b dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-950">
                        <UAvatar size="3xl" src="https://avatar.iran.liara.run/public/100" alt="Jane Smith" />
                        <h2 class="font-bold">Jane Smith</h2>
                        <p class="text-xs text-gray-400 dark:text-gray-600">Last seen 2 hrs ago</p>
                    </header>
                        <UAccordion :items="details" :ui="{ wrapper: 'divide-y dark:divide-gray-800', item: { base: '' }, default: { color: 'gray', variant: 'soft', class: 'bg-white p-4 rounded-none' } }">
                            <template #user-details>
                                <div class="p-4">
                                    <CListDefinition :items="detialsList" />
                                </div>
                            </template>
                            <template #files>
                                <div class="p-4 space-y-2.5 flex-1 flex-grow overflow-y-auto">
                                    <CCardFile :items="files" />
                                </div>
                            </template>
                        </UAccordion>
                </div>

            </div>

        </main>
    </div>

    <UModal v-model="isOpen" :ui="{ container: 'sm:items-start' }">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between"> 
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        New Chat
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="closeModal()" />
                </div>
            </template>

        </UCard>
    </UModal>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'narrow',
    hasHeader: false,
    hasFooter: false,
})

// modal
const isOpen = ref(false);
function closeModal() {
    isOpen.value = false;
}

// sidebar dataset
const users = [
    { id: 1, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/24', lastMessage: 'Hey, how are you?', newMessage: true, online: true },
    { id: 2, name: 'Jane Smith', avatar: 'https://avatar.iran.liara.run/public/100', lastMessage: 'Can you send the file?', newMessage: true },
    { id: 3, name: 'Peter Pan', avatar: 'https://avatar.iran.liara.run/public/46', lastMessage: 'Hello World!', online: true },
    { id: 4, name: 'Captain Hook', avatar: 'https://avatar.iran.liara.run/public/32', lastMessage: 'Some where out there', online: true },
    { id: 5, name: 'Maria Hernandez', avatar: 'https://avatar.iran.liara.run/public/99', lastMessage: 'You say..' },
];
const groups = [
  {
    id: 1,
    name: 'Project Team',
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/24' },
      { id: 2, name: 'Jane Smith', avatar: 'https://avatar.iran.liara.run/public/100' },
    ],
    lastMessage: 'Let’s finalize the project plan.',
    newMessage: true,
    online: true
  },
  {
    id: 2,
    name: 'Study Group',
    members: [
      { id: 3, name: 'Peter Pan', avatar: 'https://avatar.iran.liara.run/public/46' },
      { id: 4, name: 'Captain Hook', avatar: 'https://avatar.iran.liara.run/public/32' },
      { id: 5, name: 'Maria Hernandez', avatar: 'https://avatar.iran.liara.run/public/99' },
    ],
    lastMessage: 'Don’t forget about tomorrow’s session!',
  },
];
const items = [{
    key: 'chat',
    label: 'Chat',
    icon: 'i-lucide-user-round',
}, {
    key: 'group',
    label: 'Group',
    icon: 'i-lucide-users-round',
}, {
    key: 'org',
    label: 'Organization',
    icon: 'i-lucide-library-big',
}]

// chatbox dataset
const messages = [
    { id: 1, from: 'me', text: 'Hi, Jane!' },
    { id: 2, from: 'Jane', text: 'Hey! How are you?' },
    { id: 3, from: 'me', text: 'I\'m good, you?' },
];

// accordion
const details = [{
  label: 'User Details',
  icon: 'i-lucide-info',
  defaultOpen: true,
  slot: 'user-details'
}, {
  label: 'Files',
  icon: 'i-lucide-file-text',
  defaultOpen: true,
  slot: 'files'
}]

// details dataset
const detialsList = [
    {
        item: 'Role',
        value: 'Student'
    }, {
        item: 'Course',
        value: 'BS Information Technology'
    }, {
        item: 'Year',
        value: '2nd Year'
    }
]
const files = [ 
    { file: 'Document.docx', name: 'Project Proposal', description: 'Shared by Alice on Jan 28, 2025' },
    { file: 'Spreadsheet.xlsx', name: 'Budget Report', description: 'Shared by Bob on Jan 27, 2025' },
    { file: 'Presentation.pptx', name: 'Team Meeting Slides', description: 'Shared by Carol on Jan 26, 2025' },
    { file: 'Picture.jpg', name: 'Vacation Photo', description: 'Shared by Dave on Jan 25, 2025' },
    { file: 'Archive.zip', name: 'Project Files', description: 'Shared by Eve on Jan 24, 2025' },
    { file: 'Video.mp4', name: 'Promotional Video', description: 'Shared by Frank on Jan 23, 2025' },
]
</script>