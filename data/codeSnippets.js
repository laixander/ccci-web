export default {
    card01:`<template>
    <CCard :cardDetails="employee">
        <template #mainContent="{ cardDetail }">
            <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ cardDetail.description }}
            </div>
            <CListItem :itemList="cardDetail.itemList">
                <template #value-1="{ list }">
                    <UButton 
                        :label="list.value.email" 
                        :padded="false" 
                        :ui="{ font: 'font-normal' }"
                        variant="link" 
                        trailing 
                    >
                        <template #trailing>
                            <UIcon name="i-lucide-external-link" class="w-4 h-4" />
                        </template>
                    </UButton>
                </template>
                <template #value-3="{ list }">
                    <UBadge 
                        :label="list.value.label" 
                        :color="list.value.color" 
                        :ui="{ rounded: 'rounded-full' }" 
                    />
                </template>
            </CListItem>
        </template>
    </CCard>
</template>

<script setup lang="ts">
const employee = [
    {
        avatar: 'path/to/photo.jpg',
        title: 'James Smith',
        subtitle: 'Frontend Developer',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        itemList: [
            { label: 'Email', value: { email: 'james.smith@example.com' } },
            { label: 'Role', value: 'Member' },
            { label: 'Status', value: { label: 'Online', color: 'lime' } }
        ]
    },
    //...
]
</script>`,
    card02:`<template>
    <CCard :cardDetails="user" 
        @like="handleLike" 
        @share="handleShare" 
        @edit="handleEdit" 
        @delete="handleDelete"
    >
        <template #mainContent="{ cardDetail }">
            <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ cardDetail.description }}
            </div>
        </template>
    </CCard>
</template>

<script setup lang="ts">
const user = [
    {
        headerLogo: '/logo.png',
        headerBgColor: 'bg-blue-100 dark:bg-blue-950',
        avatar: 'path/to/photo.jpg',
        title: 'James Smith',
        subtitle: 'Posted March 31, 2025',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        footerButtons: [
            { label: 'Like', icon: 'i-lucide-thumbs-up', event: 'like' },
            { label: 'Share', icon: 'i-lucide-share', event: 'share' }
        ]
    },
    //...
]

// Event Handlers
const handleShare = (cardDetail: any) => {
    //...
}
const handleLike = (cardDetail: any) => {
    //...
}
</script>`,
    card03:`<template>
    <CCard :cardDetails="file" 
        @edit="handleEdit" 
        @download="handleDownload" 
        @delete="handleDelete" 
    />
</template>

<script setup lang="ts">
const file = [
    {
        icon: 'i-lucide-file-spreadsheet',
        title: 'List of Employee',
        subtitle: 'Uploaded at March 31, 2025',
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            //...
        ]
    },
    //...
]

// Event Handlers
const handleEdit = (cardDetail: any) => {
    //...
}
</script>`,
    card04:`<template>
    <CCard :cardDetails="task" 
        @like="handleLike" 
        @share="handleShare" 
        @edit="handleEdit" 
        @delete="handleDelete"
    >
        <template #mainContent="{ cardDetail }">
            <CAvatarGroup :counts="cardDetail.avatars" />
            <CProgressBar v-if="cardDetail.progressBar"  :value="cardDetail.progressBar.value" />
        </template>
    </CCard>
</template>

<script setup lang="ts">
const task = [
    {
        badgeLabel: 'Design',
        badgeColor: 'teal',
        title: 'UI development',
        subtitle: 'Lorem ipsum dolor sit amet',
        progressBar: {
            value: 75,
        },
        avatars: [
            { src: "path/to/photo.jpg", name: "Alice" },
            //...
        ],
        popoverButtons: [
            { label: 'Edit', icon: 'i-lucide-edit', event: 'edit' },
            //...
        ]
    },
    //...
]

// Event Handlers
const handleEdit = (cardDetail: any) => {
    //...
}
</script>`
};
