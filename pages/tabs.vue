<template>
    <CWrapper>
        <div class="space-y-8">
            
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Basic Usage
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Set up the  <UBadge color="white" variant="solid" label="tabs" />
                </div>
            </div>
            <UCard>
                <CTabs :tabs="tabs">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Variant
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    <UBadge color="white" variant="solid" label="variant" /> can be <UBadge color="white" variant="solid" label="default" /> or <UBadge color="white" variant="solid" label="segmented" />
                </div>
            </div>
            <UCard>
                <CTabs :tabs="tabs" variant="segmented">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Position
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Position can be <UBadge color="white" variant="solid" label="left" />
                </div>
            </div>
            <UCard>
                <CTabs left :tabs="tabs">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <UCard>
                <CTabs left :tabs="tabs" variant="segmented">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Width
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Tab width can be <UBadge color="white" variant="solid" label="full" />
                </div>
            </div>
            <UCard>
                <CTabs full :tabs="tabs">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <UCard>
                <CTabs full :tabs="tabs" variant="segmented">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Title
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="title" /> prop to set the title
                </div>
            </div>
            <UCard>
                <CTabs title="Tab with title" :tabs="tabs">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <UCard>
                <CTabs title="Segmented with title" :tabs="tabs" variant="segmented">
                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
            <div class="space-y-2">
                <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                    Slot
                </div>
                <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                    Use the <UBadge color="white" variant="solid" label="slot" /> to add additional components
                </div>
            </div>
            <UCard>
                <CTabs title="Segmented with Search Input" :tabs="tabs" variant="segmented">
                    <UInput
                        icon="i-heroicons-magnifying-glass-20-solid"
                        size="sm"
                        color="white"
                        :trailing="false"
                        placeholder="Search..."
                        :ui="{ base: 'w-80' }"
                    />

                    <template #tab1>
                        <UAlert color="primary" variant="soft" description="Tab 1 content" />
                    </template>
                    <template #tab2>
                        <UAlert color="primary" variant="soft" description="Tab 2 content" />
                    </template>
                    <template #tab3>
                        <UAlert color="primary" variant="soft" description="Tab 3 content" />
                    </template>
                    <template #tab4>
                        <UAlert color="primary" variant="soft" description="Tab 4 content" />
                    </template>
                </CTabs>
            </UCard>
        
        </div>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Tabs'
});

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
    {
        label: 'Tab 3',
        icon: 'i-lucide-printer',
        slot: 'tab3',
    },
    {
        label: 'Tab 4',
        icon: 'i-lucide-copy',
        slot: 'tab4',
    },
]
</script>