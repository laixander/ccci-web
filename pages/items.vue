<template>
    <CWrapper>
        <div class="space-y-8">
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Item List
                </div>
                <UBadge color="white" variant="solid" label="<CListItem />" />
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Set up the <UBadge color="white" variant="solid" label="itemList" /> prop
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="label" /> and <UBadge color="white" variant="solid" label="value" /> to add item
                </div>
            </div>

            <UCard>
                <CListItem :itemList="employeeDetails">
                    <template #value-3>
                        <UButton label="lindsay.walton@example.com" variant="link" :padded="false" icon="i-lucide-external-link" trailing :ui="{ font: 'font-normal' }" />
                    </template>
                    <template #value-5>
                        <UBadge label="Online" color="lime" :ui="{ rounded: 'rounded-full' }" />
                    </template>
                </CListItem>
            </UCard>

            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Profile List
                </div>
                <UBadge color="white" variant="solid" label="<CListProfile />" />
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Set up the <UBadge color="white" variant="solid" label="profiles" /> prop
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="name" /> <UBadge color="white" variant="solid" label="role" /> and <UBadge color="white" variant="solid" label="avatar" /> to add profile
                </div>
            </div>

            <UCard :ui="uiCardConfig">
                <CListProfile :profiles="profiles" />
            </UCard>

            <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                Set the <UBadge color="white" variant="solid" label="checkbox" /> prop to true to add checkbox in each profile
            </div>

            <UCard :ui="uiCardConfig">
                <CListProfile :profiles="profiles" :checkbox="true" />
            </UCard>
        </div>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Items'
});

const uiCardConfig = { body: { padding: 'p-0 sm:p-0' } }

const employeeDetails = [
    { label: 'Name', value: 'Lindsay Walton' },
    { label: 'Title', value: 'Front-end Developer' },
    { label: 'Email', value: '' },
    { label: 'Role', value: 'Member' },
    { label: 'Status', value: '' },
];

const profiles = [
    { id: 1, name: 'Tony Stark', role: 'Student', avatar: 'https://avatar.iran.liara.run/public/24' },
    { id: 2, name: 'Jane Copper', role: 'Faculty', avatar: 'https://avatar.iran.liara.run/public/54' },
    { id: 3, name: 'Curt Baker', role: 'Student', avatar: 'https://avatar.iran.liara.run/public/39' },
    { id: 4, name: 'Anna Smith', role: 'Accounting', avatar: 'https://avatar.iran.liara.run/public/87' },
    { id: 5, name: 'Jullie Middle', role: 'Faculty', avatar: 'https://avatar.iran.liara.run/public/65' },
    { id: 6, name: 'Jake Thomas', role: 'Student', avatar: 'https://avatar.iran.liara.run/public/3' },
]
</script>