<template>
    <CWrapper>
        <div class="divide-y *:pt-8 *:pb-6">
            <div class="space-y-8 first:pt-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Item List
                    </div>
                    <UBadge color="white" variant="solid" label="<CListItem />" />
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Set up the <UBadge color="white" variant="solid" label="itemList" /> prop
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Use the <UBadge color="white" variant="solid" label="label" /> and <UBadge color="white" variant="solid" label="value" /> to add basic items
                    </div>
                </div>

                <UCard>
                    <CListItem :itemList="employeeDetails" />
                </UCard>

                <CodeBlock :code="codes.list01" language="html" />
            </div>
            
            <div class="space-y-8">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Custom Value
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Use the <UBadge color="white" variant="solid" label="slot" /> for custom <UBadge color="white" variant="solid" label="value" />
                    </div>
                </div>

                <UCard>
                    <CListItem :itemList="employeeDetails2">
                        <template #value-3="{ list }">
                            <UButton :label="list.value.email" variant="link" :padded="false" :ui="{ font: 'font-normal' }">
                                <template #trailing>
                                    <UIcon name="i-lucide-external-link" class="w-4 h-4" />
                                </template>
                            </UButton>
                        </template>
                        <template #value-5="{ list }">
                            <UBadge :label="list.value.label" :color="list.value.color" :ui="{ rounded: 'rounded-full' }" />
                        </template>
                    </CListItem>
                </UCard>

                <CodeBlock :code="codes.list02" language="html" />
            </div>

            <div class="space-y-8">
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

                <CodeBlock :code="codes.list03" language="html" />
            </div>

            <div class="space-y-8 last:pb-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        With Checkbox
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Set the <UBadge color="white" variant="solid" label="checkbox" /> prop to true to add checkbox in each profile
                    </div>
                </div>

                <UCard :ui="uiCardConfig">
                    <CListProfile :profiles="profiles" :checkbox="true" />
                </UCard>

                <CodeBlock :code="codes.list04" language="html" />
            </div>
        </div>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'List'
});

const codes = {
  list01: "list01",
  list02: "list02",
  list03: "list03",
  list04: "list04",
};

const uiCardConfig = { body: { padding: 'p-0 sm:p-0' } }

const employeeDetails = [
    { label: 'Name', value: 'Lindsay Walton' },
    { label: 'Title', value: 'Front-end Developer' },
    { label: 'Role', value: 'Member' },
];

const employeeDetails2 = [
    { label: 'Name', value: 'Lindsay Walton' },
    { label: 'Title', value: 'Front-end Developer' },
    { label: 'Email', value: { email: 'lindsay.walton@example.com' } },
    { label: 'Role', value: 'Member' },
    { label: 'Status', value: { label: 'Online', color: 'lime' } },
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