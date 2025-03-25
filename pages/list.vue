<template>
    <CWrapper>
        <CTabs title="List of Employee" :tabs="employeeTabs" variant="segmented">
            <UInput
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
                placeholder="Search..."
                :ui="{ base: 'w-80' }"
            />
            <template #card>
                <CGrid :columns="4">
                    <CCardDetail :details="employee" :dropdownItems="dropdownItems(employee[0])" v-for="n in 7">
                        <template #detailType>
                            <CListDefinition :definitionList="employeeDetails" />
                        </template>
                    </CCardDetail>
                </CGrid>
            </template>
            <template #table>
                <UCard :ui="uiCardConfig">
                    <UTable :rows="employeeList" :columns="columns">
                        <template #actions-data="{ row }">
                            <div class="text-right">
                                <UDropdown :items="dropdownItems(row)">
                                    <UButton color="gray" variant="ghost"
                                        icon="i-heroicons-ellipsis-horizontal-20-solid" />
                                </UDropdown>
                            </div>
                        </template>
                    </UTable>
                </UCard>
            </template>
        </CTabs>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'List'
});

const employeeTabs = [{
    label: 'Card',
    icon: 'i-lucide-credit-card',
    slot: 'card',
}, {
    label: 'Table',
    icon: 'i-lucide-table',
    slot: 'table',
}];

const employee = [
    { title: 'James Gunn', subtitle: 'Front-end Developer', avatar: 'https://avatar.iran.liara.run/public/20' }
];

const employeeDetails = [
    { label: 'Email', value: 'james.gunn@example.com' },
    { label: 'Role', value: 'Member' },
];

const employeeList = [{
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
}, {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
}, {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
}, {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
}, {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
}, {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
}]

const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'name',
    label: 'Name'
}, {
    key: 'title',
    label: 'Title'
}, {
    key: 'email',
    label: 'Email'
}, {
    key: 'role',
    label: 'Role'
}, {
    key: 'actions'
}]

const dropdownItems = row => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }, {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid'
    }], [{
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid'
    }, {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]

// card custom style
const uiCardConfig = { body: { padding: 'p-0 sm:p-0' } }
</script>