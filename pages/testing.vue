<template>
    <CWrapper>
        <div class="space-y-2">
            <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                Card
            </div>
            <UBadge color="white" variant="solid" label="<CCard />" />
            <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                Set up the
                <UBadge color="white" variant="solid" label="cardDetails" /> prop
            </div>
            <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                Use the
                <UBadge color="white" variant="solid" label="avatar" /> <UBadge color="white" variant="solid" label="title" /> <UBadge color="white" variant="solid" label="subtitle" /> and <UBadge color="white" variant="solid" label="mainContent" /> slot to add basic items
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
    </CWrapper>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Testing'
});

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

const cards = [
    {
        headerLogo: '/logo.png',
        headerBgColor: 'bg-blue-100 dark:bg-blue-950',
        badgeLabel: 'New',
        badgeColor: 'blue',
        avatar: 'https://avatar.iran.liara.run/public/47',
        title: 'Card Title 1',
        subtitle: 'Some description here',
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Download', icon: 'i-lucide-download', event: 'download' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ],
        footerButtons: [
            { label: 'Share', icon: 'i-lucide-share', event: 'share' },
            { label: 'Save', icon: 'i-lucide-bookmark', event: 'save' }
        ]
    },
    {
        headerImg: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b',
        badgeLabel: 'In Progress',
        badgeColor: 'yellow',
        avatar: 'https://avatar.iran.liara.run/public/48',
        title: 'Card Title 2',
        subtitle: 'Another description here',
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            { label: 'Download', icon: 'i-lucide-download', event: 'download' },
            { label: 'Delete', icon: 'i-lucide-trash', event: 'delete' }
        ],
        footerButtons: [
            { label: 'Share', icon: 'i-lucide-share', event: 'share' },
            { label: 'Save', icon: 'i-lucide-bookmark', event: 'save' }
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

</script>