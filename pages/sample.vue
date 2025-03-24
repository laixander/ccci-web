<template>
    <CPage>
        <CTabsContainer 
            title="Custom Tabs"
            :items="tabs"
        >
            <template #preview>
                <UCard>
                    Preview Here
                </UCard>
            </template>

            <template #code>
                <UCard>
                    Code Here
                </UCard>
            </template>
        </CTabsContainer>
    </CPage>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Sample Page'
});

const tabs = [{
  label: 'Preview',
  icon: 'i-lucide-eye',
  slot: 'preview',
}, {
  label: 'Code',
  icon: 'i-lucide-code',
  slot: 'code',
}]
</script>