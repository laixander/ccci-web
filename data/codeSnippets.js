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
</script>`,

    list01:`<template>
    <CListItem :itemList="employeeDetails" />
</template>

<script setup lang="ts">
const employeeDetails = [
    { label: 'Name', value: 'Lindsay Walton' },
    { label: 'Title', value: 'Front-end Developer' },
    { label: 'Role', value: 'Member' },
    //...
];
</script>`,

    list02:`<template>
    <CListItem :itemList="employeeDetails">
        <template #value-3="{ list }">
            <UButton 
                :label="list.value.email" variant="link" 
                :padded="false" :ui="{ font: 'font-normal' }"
            >
                <template #trailing>
                    <UIcon name="i-lucide-external-link" class="w-4 h-4" />
                </template>
            </UButton>
        </template>
        <template #value-5="{ list }">
            <UBadge 
                :label="list.value.label" :color="list.value.color" 
                :ui="{ rounded: 'rounded-full' }" 
            />
        </template>
    </CListItem>
</template>

<script setup lang="ts">
const employeeDetails = [
    { label: 'Name', value: 'Lindsay Walton' },
    { label: 'Title', value: 'Front-end Developer' },
    { label: 'Email', value: { email: 'lindsay.walton@example.com' } },
    { label: 'Role', value: 'Member' },
    { label: 'Status', value: { label: 'Online', color: 'lime' } },
    //...
];
</script>`,

    list03:`<template>
    <CListProfile :profiles="profiles" />
</template>

<script setup lang="ts">
const profiles = [
    { id: 1, name: 'Tony Stark', role: 'Student', avatar: '/photo.jpg' },
    { id: 2, name: 'Jane Copper', role: 'Faculty', avatar: '/photo.jpg' },
    { id: 3, name: 'Curt Baker', role: 'Student', avatar: '/photo.jpg' },
    //...
];
</script>`,

    list04:`<template>
    <CListProfile :profiles="profiles" :checkbox="true" />
</template>

<script setup lang="ts">
const profiles = [
    { id: 1, name: 'Tony Stark', role: 'Student', avatar: '/photo.jpg' },
    { id: 2, name: 'Jane Copper', role: 'Faculty', avatar: '/photo.jpg' },
    { id: 3, name: 'Curt Baker', role: 'Student', avatar: '/photo.jpg' },
    //...
];
</script>`,

    tabs01:`<template>
    <CTabs :tabs="tabs">
        <template #tab1>
            Content 1
        </template>
        <template #tab2>
            Content 2
        </template>
        <!-- ... -->
    </CTabs>
</template>

<script setup lang="ts">
const tabs = [
    {
        label: 'Tab 1',
        icon: 'i-lucide-clipboard-pen',
        slot: 'tab1',
    }, 
    {
        label: 'Tab 2',
        icon: 'i-lucide-download',
        slot: 'tab2',
    },
    //...
]
</script>`,

    tabs02:`<template>
    <CTabs :tabs="tabs" variant="segmented">
        <template #tab1>
            Content 1
        </template>
        <template #tab2>
            Content 2
        </template>
        <!-- ... -->
    </CTabs>
</template>

<script setup lang="ts">
const tabs = [
    {
        label: 'Tab 1',
        icon: 'i-lucide-clipboard-pen',
        slot: 'tab1',
    }, 
    {
        label: 'Tab 2',
        icon: 'i-lucide-download',
        slot: 'tab2',
    },
    //...
]
</script>`,

    tabs03:`<template>
    <CTabs left :tabs="tabs">
        <template #tab1>
            Content 1
        </template>
        <template #tab2>
            Content 2
        </template>
        <!-- ... -->
    </CTabs>
</template>

<script setup lang="ts">
const tabs = [
    {
        label: 'Tab 1',
        icon: 'i-lucide-clipboard-pen',
        slot: 'tab1',
    }, 
    {
        label: 'Tab 2',
        icon: 'i-lucide-download',
        slot: 'tab2',
    },
    //...
]
</script>`,

    tabs04:`<template>
    <CTabs full :tabs="tabs">
        <template #tab1>
            Content 1
        </template>
        <template #tab2>
            Content 2
        </template>
        <!-- ... -->
    </CTabs>
</template>

<script setup lang="ts">
const tabs = [
    {
        label: 'Tab 1',
        icon: 'i-lucide-clipboard-pen',
        slot: 'tab1',
    }, 
    {
        label: 'Tab 2',
        icon: 'i-lucide-download',
        slot: 'tab2',
    },
    //...
]
</script>`,

    tabs05:`<template>
    <CTabs title="Tab with title" :tabs="tabs">
        <template #tab1>
            Content 1
        </template>
        <template #tab2>
            Content 2
        </template>
        <!-- ... -->
    </CTabs>
</template>

<script setup lang="ts">
const tabs = [
    {
        label: 'Tab 1',
        icon: 'i-lucide-clipboard-pen',
        slot: 'tab1',
    }, 
    {
        label: 'Tab 2',
        icon: 'i-lucide-download',
        slot: 'tab2',
    },
    //...
]
</script>`,

    tabs06:`<template>
    <CTabs title="Segmented with Search Input" :tabs="tabs" variant="segmented">
        <div class="grid grid-cols-1 w-2/3">
            <UInput
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
                placeholder="Search..."
            />
        </div>
        <template #tab1>
            Content 1
        </template>
        <template #tab2>
            Content 2
        </template>
        <!-- ... -->
    </CTabs>
</template>

<script setup lang="ts">
const tabs = [
    {
        label: 'Tab 1',
        icon: 'i-lucide-clipboard-pen',
        slot: 'tab1',
    }, 
    {
        label: 'Tab 2',
        icon: 'i-lucide-download',
        slot: 'tab2',
    },
    //...
]
</script>`,

    grid01:`<template>
    <CGrid>
        <!-- Content goes here -->
    </CGrid>
</template>`,

    grid02:`<template>
    <CGrid layout="left-wide">
        <!-- Content goes here -->
    </CGrid>

    <CGrid layout="left-wider">
        <!-- Content goes here -->
    </CGrid>

    <CGrid layout="left-widest">
        <!-- Content goes here -->
    </CGrid>

    <CGrid layout="right-wide">
        <!-- Content goes here -->
    </CGrid>

    <CGrid layout="right-wider">
        <!-- Content goes here -->
    </CGrid>
    
    <CGrid layout="right-widest">
        <!-- Content goes here -->
    </CGrid>
</template>`,

    grid03:`<template>
    <CGrid :columns="3" hasDivider>
        <div class="first:pl-0">
            <!-- Content goes here -->
        </div>
        <div>
            <!-- Content goes here -->
        </div>
        <div class="last:pr-0">
            <!-- Content goes here -->
        </div>
    </CGrid>
</template>`,

    grid04:`<template>
    <CGrid layout="left-widest" hasDivider>
        <CGrid :columns="2">
            <!-- Content goes here -->
        </CGrid>
        <div class="last:pr-0">
            <!-- Content goes here -->
        </div>
    <CGrid>
</template>`,

    dashboard: `<!-- layouts/default.vue -->
<template>
    <CLayoutDashboard logo="/logo.png" name="UI Development" :links="links" :is-logged-in="false">
        <slot />
    </CLayoutDashboard>
</template>

<script setup lang="ts">
const links = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-home',
      to: '/layouts'
    },
    {
      label: 'Teams',
      icon: 'i-heroicons-users',
      to: '/'
    },
    {
      label: 'Projects',
      icon: 'i-heroicons-folder',
      to: '/'
    },
    //...
  ]
]
</script>`,

    minimal: `<!-- layouts/minimal.vue -->
<template>
    <CLayoutMinimal logo="logo.png" name="UI Development" :is-logged-in="false" :has-menu="false">
        <slot />
    </CLayoutMinimal>
</template>

<!-- pages/portal.vue -->
<template>
    <CWrapper>
        Hello World
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'minimal'
})
</script>`,

    centered: `<!-- layouts/centered.vue -->
<template>
    <CLayoutCentered>
        <slot />
    </CLayoutCentered>
</template>

<!-- pages/login.vue -->
<template>
    Hello World
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'centered'
})
</script>`,

};
