<template>
    <CWrapper>
        <UCard>
            <CListDefinition :definitionList="employeeDetails">
                <template #value-5>
                    <UBadge label="Online" :ui="{ rounded: 'rounded-full' }" color="lime" />
                </template>
            </CListDefinition>
        </UCard>

        <UCard>
            <CListProfile :profiles="profiles" :showCheckboxes="true" />
        </UCard>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Items'
});

const employeeDetails = [
    { label: 'Name', value: 'Lindsay Walton' },
    { label: 'Title', value: 'Front-end Developer' },
    { label: 'Email', value: 'lindsay.walton@example.com' },
    { label: 'Role', value: 'Member' },
    { label: 'Status', value: '' },
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