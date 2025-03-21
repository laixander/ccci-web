<template>
    <CPage title="Cards">
        <CGrid :columns="4">
            <CCardPost :posts="posts" :actions="actions" :dropdownItems="dropdownItems" />

            <div class="space-y-4">
                <CCardWidget :widgets="stats" />
                <CCardFile :files="files" :dropdownItems="dropdownItems" />
            </div>

            <div class="space-y-4">
                <CCardProfile :profiles="profiles" layoutType="vertical" :actions="actions" />
                <CCardProfile :profiles="profiles" layoutType="horizontal" />
            </div>

            <CCardDetail :details="details" :actions="actions" :dropdownItems="dropdownItems">
                <template #detailType>
                    <CListDefinition :definitionList="itemDetail" />
                </template>
            </CCardDetail>

            <CCardTask :tasks="tasks" :actions="actions" :dropdownItems="dropdownItems" :avatars="avatars" />
        </CGrid>
    </CPage>
</template>

<script setup lang="ts">

const itemDetail = [
  { label: 'Name', value: 'James Gunn' },
  { label: 'Age', value: '29' },
  { label: 'Location', value: 'Philippines' },
  { label: 'Role', value: 'Software Developer' },
];

const details = [
        { name: 'James Gunn', avatar: 'https://avatar.iran.liara.run/public/20' }
]

const avatars = [
    { src: 'https://avatar.iran.liara.run/public/47', alt: 'Alex Luthor' },
    { src: 'https://avatar.iran.liara.run/public/86', alt: 'Mary Jane' },
    { src: 'https://avatar.iran.liara.run/public/36', alt: 'Oto Octavius' },
    { src: 'https://avatar.iran.liara.run/public/77', alt: 'Aunt May' },
];

const stats = [
    { count: 45, description: "New Enrollments", icon: "i-lucide-graduation-cap", bgColor: "bg-green-500" },
]

const files = [
    { file: 'Presentation.pptx', name: 'Project Proposal', description: 'Shared by Alice on Jan 28, 2025' },
    { avatar: 'https://avatar.iran.liara.run/public/54', name: 'Jane Smith', description: 'Faculty' },
]

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
    { name: 'Jane Smith', description: 'Business Analysis Manager', photo: 'https://avatar.iran.liara.run/public/94' }
]

const actions = [
    { label: 'Call', icon: 'i-lucide-smartphone', click: () => console.log('View Clicked')  },
    { label: 'Email', icon: 'i-lucide-mail', click: () => console.log('Email Clicked')  },
]

const tasks = [
    { title: 'UI Development', description: 'Lorem ipsum dolor sit amet', label: 'Development', color: 'cyan', progress: '70' }
]

const posts = [
    { name: 'Jane Smith', avatar: 'https://avatar.iran.liara.run/public/49', timestamp: 'Feb 5, 2025 11:29 AM', content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet', figure: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b', caption: 'Figure caption goes here' }
]
</script>