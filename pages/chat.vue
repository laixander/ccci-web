<template>
    <div class="flex h-full">
        <aside class="min-w-auto w-72 border-r dark:border-gray-800 dark:bg-gray-950 flex flex-col">
            <header
                class="flex justify-between items-center p-4 text-md font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-800">
                Messages
                <UButton color="gray" variant="ghost" square icon="i-lucide-message-square-plus"
                    @click="isOpen = true" />
            </header>
            <UTabs :items="items" class="w-full"
                :ui="{ wrapper: 'space-y-0', list: { background: 'bg-transparent dark:bg-tranparent border-b dark:border-gray-800', rounded: 'rounded-none', marker: { wrapper: 'top-[7px]', background: 'bg-transparent dark:bg-tranparent border-b-2 border-primary-400 dark:border-primary-600', shadow: 'shadow-none', rounded: 'rounded-none' }, tab: { height: 'h-9' } } }">
                <template #default="{ selected }">
                    <span class="truncate" :class="[selected && 'text-primary-500 dark:text-primary-400']"></span>
                </template>
                <template #icon="{ item, selected }">
                    <UTooltip :text="item.label" :popper="{ placement: 'top' }">
                        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0"
                            :class="[selected && 'text-primary-500 dark:text-primary-400']" />
                    </UTooltip>
                </template>
                <template #item="{ item }">
                    <ul v-if="item.key === 'chat'" class="flex-1 overflow-y-auto divide-y dark:divide-gray-800">
                        <li v-for="user in users" :key="user.id" :class="{
                            'cursor-default bg-gray-100 dark:bg-gray-900': selectedUser && selectedUser.id === user.id,
                            'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900': !(selectedUser && selectedUser.id === user.id)
                        }" @click="selectUser(user)">
                            <div class="p-4 flex items-center gap-3">
                                <UChip size="md" position="bottom-right" color="green" inset
                                    :show="user.online === true">
                                    <UAvatar size="md" :src="user.avatar" :alt="user.name" />
                                </UChip>
                                <div class="flex-1">
                                    <div class="flex items-center">
                                        <h3
                                            class="text-sm font-semibold text-gray-800 dark:text-gray-100 flex-1 w-1 truncate">
                                            {{ user.name }}
                                        </h3>
                                        <div class="flex items-center gap-1">
                                            <UIcon name="i-lucide-check-check"
                                                :class="[{ 'text-primary-500 dark:text-primary-700': user.newMessage }, { 'text-gray-300 dark:text-gray-700': !user.newMessage }]" />
                                            <p class="text-xs"
                                                :class="[{ 'text-gray-400 dark:text-gray-600': user.newMessage }, 'text-gray-300 dark:text-gray-700']">
                                                {{ user.lastSeen }}
                                            </p>
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

        <!-- Empty Pane -->
        <main v-if="!name"
            class="flex flex-col items-center justify-center flex-grow gap-4 font-light text-sm text-gray-300 dark:text-gray-700">
            <UIcon name="i-carbon-chat" class="w-32 h-32 text-gray-200 dark:text-gray-900" />
            Select a message from the sidebar or start a new chat.
            <UButton size="md" @click="isOpen = true">New Chat</UButton>
        </main>
        <!-- Message Pane -->
        <main v-if="name" class="flex-grow flex flex-col">
            <div class="flex-grow flex overflow-y-hidden">
                <div class="flex-grow flex flex-col bg-gray-50 dark:bg-gray-950 border-r dark:border-gray-800">
                    <header
                        class="flex justify-between items-center p-4 text-md font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-800">
                        Chat with {{ name }}
                        <UButton color="gray" variant="ghost" square icon="i-lucide-info"
                            @click="showDetails = !showDetails" :class="showDetails ? 'hidden' : 'inline-flex'" />
                        <UButton @click="showDetails = false" color="gray" variant="ghost" square
                            icon="i-heroicons-x-mark-20-solid" :class="showDetails ? 'inline-flex' : 'hidden'" />
                    </header>
                    <div class="flex-grow p-4">
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
                        class="p-4 border-t dark:bg-gray-950 border-gray-200 dark:border-gray-800 flex items-center gap-2">
                        <UTextarea v-model="messageText" :rows="1" autoresize placeholder="Type a message..." size="md"
                            class="w-full" @keydown.enter.prevent="sendMessage" />
                        <!-- File Preview -->
                        <div v-if="selectedFile"
                            class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 ps-4 pe-2 h-full rounded-lg">
                            <p class="text-xs text-gray-700 dark:text-gray-300 truncate">{{ selectedFile.name }}</p>
                            <UButton icon="i-lucide-x" variant="ghost" size="xs" square @click="removeFile" />
                        </div>

                        <div class="flex items-center">
                            <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
                            <UButton icon="i-lucide-paperclip" variant="ghost" square @click="openFilePicker" />
                            <UButton icon="i-lucide-send" variant="ghost" square @click="sendMessage" />
                        </div>


                    </div>
                </div>
                <div v-if="showDetails && selectedUser" class="min-w-64 w-auto dark:bg-gray-950 overflow-y-auto">
                    <header
                        class="text-gray-700 dark:text-gray-200 text-center p-4 border-b dark:border-gray-800 sticky top-0 z-50 dark:bg-gray-950">
                        <UAvatar size="3xl" :src="selectedUser.avatar" :alt="selectedUser.name" />
                        <h2 class="font-bold">{{ selectedUser.name }}</h2>
                        <p class="text-xs text-gray-400 dark:text-gray-600">Last seen {{ selectedUser.lastSeen }}</p>
                    </header>
                    <UAccordion :items="details"
                        :ui="{ wrapper: 'divide-y dark:divide-gray-800', item: { base: '' }, default: { color: 'gray', variant: 'soft', class: 'p-4 rounded-none' } }">
                        <template #user-details>
                            <div class="p-4">
                                <CListDefinition :definitionList="[
                                    { item: 'Role', value: selectedUser.role },
                                    { item: 'Course', value: selectedUser.course },
                                    { item: 'Year', value: selectedUser.year }
                                ]" />
                            </div>
                        </template>
                        <template #files>
                            <div class="p-4 space-y-2.5 flex-1 flex-grow overflow-y-auto">
                                <CCardFile :files="filesData[selectedUser.id] || []" isDropdownVisible :dropdownItems="dropdownItems" />
                            </div>
                        </template>
                    </UAccordion>
                </div>
            </div>

        </main>
    </div>

    <UModal v-model="isOpen" :ui="{ container: 'sm:items-start' }">
        <UCard :ui="{ body: { padding: 'sm:p-0' } }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        New Chat
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="closeModal()" />
                </div>
            </template>
            <div class="max-h-80 overflow-y-auto">
                <CListProfile :profiles="profiles" :showCheckboxes="true" />
            </div>
            <template #footer>
                <UButton label="Message" />
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
    layout: 'narrow',
    hasFooter: false,
});

const showDetails = ref(false);

// modal
const isOpen = ref(false);
function closeModal() {
    isOpen.value = false;
}


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

// Selected user state
const selectedUser = ref<User | null>(null);

// Messages to be displayed
const messages = ref<Message[]>([]);

// Method to mark a message as read
const markMessageAsRead = (user: User) => {
    user.newMessage = false;
};

// Function to update selected user and load messages
const selectUser = (user: User) => {
    selectedUser.value = user;
    messages.value = chatHistory.value[user.id] || [];
    markMessageAsRead(user);
};

// Watch for selectedUser change and update name accordingly
const name = computed(() => selectedUser.value?.name || ''); // Fallback to empty if no user is selected

// sidebar dataset
const users = ref<User[]>([
    { id: 1, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/24', lastMessage: 'Hey, how are you?', newMessage: true, online: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
    { id: 2, name: 'Jane Smith', avatar: 'https://avatar.iran.liara.run/public/100', lastMessage: 'Can you send the file?', newMessage: true, role: 'Professor', course: 'Computer Science', year: 'N/A', lastSeen: '2 hrs ago' },
    { id: 3, name: 'Peter Pan', avatar: 'https://avatar.iran.liara.run/public/46', lastMessage: 'Hello World!', newMessage: false, online: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
    { id: 4, name: 'Captain Hook', avatar: 'https://avatar.iran.liara.run/public/32', lastMessage: 'Some where out there', newMessage: false, online: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
    { id: 5, name: 'Maria Hernandez', avatar: 'https://avatar.iran.liara.run/public/99', lastMessage: 'You say..', newMessage: true, role: 'Student', course: 'BS Information Technology', year: '2nd Year', lastSeen: '1 hr ago' },
]);
// Dummy chat history (simulating database messages per user)
const chatHistory = ref<Record<number, Message[]>>({
    1: [
        { id: 1, from: 'me', text: 'Hi, John!' },
        { id: 2, from: 'John', text: 'Hey! How are you?' },
        { id: 3, from: 'me', text: 'I\'m good, you?' },
    ],
    2: [
        { id: 4, from: 'me', text: 'Hi, Jane!' },
        { id: 5, from: 'Jane', text: 'Hey! How are you?' },
        { id: 6, from: 'me', text: 'I\'m good, you?' },
    ],
    3: [
        { id: 7, from: 'me', text: 'Hello Peter!' },
        { id: 8, from: 'Peter', text: 'Hi there!' },
    ],
    4: [
        { id: 9, from: 'me', text: 'Hey Captain!' },
        { id: 10, from: 'Captain Hook', text: 'Arrr, matey!' },
    ],
    5: [
        { id: 11, from: 'me', text: 'Hola Maria!' },
        { id: 12, from: 'Maria', text: 'Hello!' },
    ],
});

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

const messageText = ref('');

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

// Open file picker
const openFilePicker = () => {
    fileInput.value?.click();
};

// Handle file selection
const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
    }
};

// Remove selected file
const removeFile = () => {
    selectedFile.value = null;
};

const sendMessage = () => {
    if (!messageText.value.trim()) return; // Prevent empty messages

    messages.value.push({
        id: messages.value.length + 1,
        from: 'me',
        text: messageText.value
    });

    messageText.value = ''; // Clear input after sending

    if (selectedFile.value) {
        console.log('Sending file:', selectedFile.value.name);
        // Here you can handle file upload (e.g., send to server)
        selectedFile.value = null; // Clear after sending
    }
};

// accordion
const details = [{
    label: 'User Details',
    defaultOpen: true,
    slot: 'user-details'
}, {
    label: 'Files',
    defaultOpen: false,
    slot: 'files'
}]

const filesData: Record<number, Array<{ file: string; name: string; description: string }>> = {
    1: [
        { file: 'Document.docx', name: 'Project Proposal', description: 'Shared by Alice on Jan 28, 2025' },
        { file: 'Spreadsheet.xlsx', name: 'Budget Report', description: 'Shared by Bob on Jan 27, 2025' }
    ],
    2: [
        { file: 'Presentation.pptx', name: 'Lecture Notes', description: 'Shared by Prof. Jane on Jan 26, 2025' }
    ]
};

// Dropdown actions
const dropdownItems = [
    [{
        label: 'Download',
        icon: 'i-lucide-cloud-download',
        click: () => console.log('Download'),
    }, {
        label: 'Share',
        icon: 'i-lucide-share-2',
        click: () => console.log('Share'),
    }, {
        label: 'View Details',
        icon: 'i-lucide-info',
        click: () => console.log('View'),
    }], [{
        label: 'Delete',
        icon: 'i-lucide-trash-2',
        click: () => console.log('Delete'),
    }]
];

const profiles = [
    { id: 1, name: 'Tony Stark', designation: 'Student', photo: 'https://avatar.iran.liara.run/public/24' },
    { id: 2, name: 'Jane Copper', designation: 'Faculty', photo: 'https://avatar.iran.liara.run/public/54' },
    { id: 3, name: 'Curt Baker', designation: 'Student', photo: 'https://avatar.iran.liara.run/public/39' },
    { id: 4, name: 'Anna Smith', designation: 'Accounting', photo: 'https://avatar.iran.liara.run/public/87' },
    { id: 5, name: 'Jullie Middle', designation: 'Faculty', photo: 'https://avatar.iran.liara.run/public/65' },
    { id: 6, name: 'Jake Thomas', designation: 'Student', photo: 'https://avatar.iran.liara.run/public/3' },
]
</script>