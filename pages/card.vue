<template>
    <CWrapper>
        <div class="space-y-8">
            
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Card
                </div>
                <UBadge color="white" variant="solid" label="<CCard />" />
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Set up the
                    <UBadge color="white" variant="solid" label="cardDetails" /> prop.
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the
                    <UBadge color="white" variant="solid" label="avatar" /> <UBadge color="white" variant="solid" label="title" /> <UBadge color="white" variant="solid" label="subtitle" /> and <UBadge color="white" variant="solid" label="mainContent" /> slot to add basic items.
                </div>
            </div>

            <CGrid :columns="4">
                <CCard :cardDetails="card1">
                    <template #mainContent="{ cardDetail }">
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ cardDetail.description }}</div>
                        <CListItem :itemList="cardDetail.itemList">
                            <template #value-1="{ list }">
                                <UButton :label="list.value.email" variant="link" :padded="false" trailing :ui="{ font: 'font-normal' }">
                                    <template #trailing>
                                        <UIcon name="i-lucide-external-link" class="w-4 h-4" />
                                    </template>
                                </UButton>
                            </template>
                            <template #value-3="{ list }">
                                <UBadge :label="list.value.label" :color="list.value.color" :ui="{ rounded: 'rounded-full' }" />
                            </template>
                        </CListItem>
                    </template>
                </CCard>
            </CGrid>
  
            <UAccordion :items="items" color="gray" variant="soft">
                <template #code-block>
                    <CodeBlock :code="codeSnippets.card01" language="html" />
                </template>
            </UAccordion>


            <UDivider />

            
            <div class="space-y-2">
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="headerImg" /> <UBadge color="white" variant="solid" label="headerLogo" /> or <UBadge color="white" variant="solid" label="headerBgColor" /> to add cover photo. 
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="label" /> <UBadge color="white" variant="solid" label="icon" /> and <UBadge color="white" variant="solid" label="event" /> for <UBadge color="white" variant="solid" label="footerButtons" />
                </div>
            </div>

            <CGrid :columns="4">
                <CCard :cardDetails="card2" @like="handleLike" @share="handleShare" @edit="handleEdit" @delete="handleDelete">
                    <template #mainContent="{ cardDetail }">
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ cardDetail.description }}</div>
                    </template>
                </CCard>
            </CGrid>

            <UAccordion :items="items" color="gray" variant="soft">
                <template #code-block>
                    <CodeBlock :code="codeSnippets.card02" language="html" />
                </template>
            </UAccordion>


            <UDivider />
            

            <div class="space-y-2">
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="label" /> <UBadge color="white" variant="solid" label="icon" /> and <UBadge color="white" variant="solid" label="event" /> for <UBadge color="white" variant="solid" label="popoverButtons" />
                </div>
            </div>

            <CGrid :columns="4">
                <CCard :cardDetails="card3" @edit="handleEdit" @download="handleDownload" @delete="handleDelete" />
            </CGrid>

            <UAccordion :items="items" color="gray" variant="soft">
                <template #code-block>
                    <CodeBlock :code="codeSnippets.card03" language="html" />
                </template>
            </UAccordion>


            <UDivider />


            <div class="space-y-2">
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="badge" /> to add label
                </div>
            </div>

            <CGrid :columns="4">
                <CCard :cardDetails="card4" @like="handleLike" @share="handleShare" @edit="handleEdit" @delete="handleDelete">
                    <template #mainContent="{ cardDetail }">
                        <CAvatarGroup :counts="cardDetail.avatars" />
                        <CProgressBar v-if="cardDetail.progressBar"  :value="cardDetail.progressBar.value" />
                    </template>
                </CCard>
            </CGrid>

            <UAccordion :items="items" color="gray" variant="soft">
                <template #code-block>
                    <CodeBlock :code="codeSnippets.card04" language="html" />
                </template>
            </UAccordion>

        </div>
    </CWrapper>
</template>
<script setup lang="ts">
import codeSnippets from "@/data/codeSnippets.js";
import { onMounted } from "vue";

definePageMeta({
    title: 'Card'
});

const { $prism } = useNuxtApp();

onMounted(() => {
  $prism.highlightAll(); // Highlight code on mount
});

const codeRef = ref<HTMLPreElement | null>(null); // Reference for the <pre> element

const items = [{
  label: 'Code',
  icon: 'i-lucide-code-xml',
  slot: 'code-block'
},]

const card1 = [
    {
        avatar: 'https://avatar.iran.liara.run/public/47',
        title: 'James Smith',
        subtitle: 'Frontend Developer',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        itemList: [
            { label: 'Email', value: { email: 'james.smith@example.com' } },
            { label: 'Role', value: 'Member' },
            { label: 'Status', value: { label: 'Online', color: 'lime' } }
        ]
    },
    {
        avatar: 'https://avatar.iran.liara.run/public/78',
        title: 'Jane Smith',
        subtitle: 'Quality Assurance',
        description: 'Aspernatur explicabo recusandae atque.',
        itemList: [
            { label: 'Email', value: { email: 'jane.smith@example.com' } },
            { label: 'Role', value: 'Admin' },
            { label: 'Status', value: { label: 'Offline', color: 'rose' } }
        ]
    }
]

const card2 = [
    {
        headerLogo: '/logo.png',
        headerBgColor: 'bg-blue-100 dark:bg-blue-950',
        avatar: 'https://avatar.iran.liara.run/public/47',
        title: 'James Smith',
        subtitle: 'Posted March 31, 2025',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        footerButtons: [
            { label: 'Like', icon: 'i-lucide-thumbs-up', event: 'like' },
            { label: 'Share', icon: 'i-lucide-share', event: 'share' }
        ]
    },
    {
        headerImg: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b',
        avatar: 'https://avatar.iran.liara.run/public/78',
        title: 'Jane Smith',
        subtitle: 'Posted March 31, 2025',
        description: 'Aspernatur explicabo recusandae atque.',
        footerButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ]
    }
]

const card3 = [
    {
        avatar: 'https://avatar.iran.liara.run/public/47',
        title: 'James Smith',
        subtitle: 'Employee',
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Download', icon: 'i-lucide-download', event: 'download' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ]
    },
    {
        icon: 'i-lucide-file-spreadsheet',
        title: 'List of Employee',
        subtitle: 'Uploaded at March 31, 2025',
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Download', icon: 'i-lucide-download', event: 'download' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ]
    }
]

const card4 = [
    {
        badgeLabel: 'QA',
        badgeColor: 'purple',
        title: 'User flow for learning management',
        subtitle: 'Aspernatur explicabo recusandae.',
        progressBar: {
            value: 25,
        },
        avatars: [
            { src: "https://avatar.iran.liara.run/public/24", name: "Alice" },
            { src: "https://avatar.iran.liara.run/public/97", name: "Bob" }
        ],
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Download', icon: 'i-lucide-download', event: 'download' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ]
    },
    {
        badgeLabel: 'Design',
        badgeColor: 'teal',
        title: 'UI development',
        subtitle: 'Lorem ipsum dolor sit amet',
        progressBar: {
            value: 75,
        },
        avatars: [
            { src: "https://avatar.iran.liara.run/public/1", name: "Alice" },
            { src: "https://avatar.iran.liara.run/public/22", name: "Bob" },
            { src: "https://avatar.iran.liara.run/public/88", name: "Charlie" }
        ],
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Download', icon: 'i-lucide-download', event: 'download' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ]
    }
]

// Event Handlers
const handleEdit = (cardDetail: any) => {
    console.log("Edit clicked for:", cardDetail)
}
const handleDownload = (cardDetail: any) => {
    console.log("Download clicked for:", cardDetail)
}
const handleDelete = (cardDetail: any) => {
    console.log("Delete clicked for:", cardDetail)
}
const handleShare = (cardDetail: any) => {
    console.log("Share clicked for:", cardDetail)
}
const handleSave = (cardDetail: any) => {
    console.log("Save clicked for:", cardDetail)
}
const handleLike = (cardDetail: any) => {
    console.log("Like clicked for:", cardDetail)
}

</script>