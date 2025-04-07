<template>
    <CWrapper>
        <div class="divide-y dark:divide-gray-800 *:pt-8 *:pb-6">
            <div class="space-y-8 first:pt-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Grid
                    </div>
                    <UBadge color="white" variant="solid" label="<CGrid />" />
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        CGrid has a default of 1 column
                    </div>
                </div>
                <CGrid>
                    <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        default
                    </div>
                </CGrid>
                <CodeBlock :code="codes.grid01" language="html" />
            </div>

            <div class="space-y-8">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Layout
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Use the <UBadge color="white" variant="solid" label="layout" /> prop to set to <UBadge color="white" variant="solid" label="left-wide" /> <UBadge color="white" variant="solid" label="left-wider" /> <UBadge color="white" variant="solid" label="left-widest" /> or <UBadge color="white" variant="solid" label="right-wide" /> <UBadge color="white" variant="solid" label="right-wider" /> <UBadge color="white" variant="solid" label="right-widest" />
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Layout only have 2 columns
                    </div>
                </div>
                <div class="space-y-4">
                    <CGrid layout="left-wide">
                        <div class="bg-green-100 dark:bg-green-950 text-gray-500 dark:text-gray-400 text-sm p-4">
                            left-wide
                        </div>
                        <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        </div>
                    </CGrid>
                    <CGrid layout="left-wider">
                        <div class="bg-green-100 dark:bg-green-950 text-gray-500 dark:text-gray-400 text-sm p-4">
                            left-wider
                        </div>
                        <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        </div>
                    </CGrid>
                    <CGrid layout="left-widest">
                        <div class="bg-green-100 dark:bg-green-950 text-gray-500 dark:text-gray-400 text-sm p-4">
                            left-widest
                        </div>
                        <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        </div>
                    </CGrid>
                    <CGrid layout="right-wide">
                        <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        </div>
                        <div class="bg-green-100 dark:bg-green-950 text-gray-500 dark:text-gray-400 text-sm p-4">
                            right-wide
                        </div>
                    </CGrid>
                    <CGrid layout="right-wider">
                        <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        </div>
                        <div class="bg-green-100 dark:bg-green-950 text-gray-500 dark:text-gray-400 text-sm p-4">
                            right-wider
                        </div>
                    </CGrid>
                    <CGrid layout="right-widest">
                        <div class="bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm p-4">
                        </div>
                        <div class="bg-green-100 dark:bg-green-950 text-gray-500 dark:text-gray-400 text-sm p-4">
                            right-widest
                        </div>
                    </CGrid>
                </div>
                <CodeBlock :code="codes.grid02" language="html" />
            </div>

            <div class="space-y-8">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Columns and Divider
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Use the <UBadge color="white" variant="solid" label=":columns" /> prop to set the number of columns.
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Use the <UBadge color="white" variant="solid" label="hasDivider" /> prop to add vertical divider.
                    </div>
                </div>
                <CGrid :columns="3" hasDivider>
                    <div class="first:pl-0 text-gray-500 dark:text-gray-400 text-sm font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error beatae quae tempore alias harum non? Unde blanditiis laboriosam beatae excepturi earum, maxime doloremque deserunt. Dignissimos nostrum in consequatur consequuntur neque obcaecati!
                    </div>
                    <div class="text-gray-500 dark:text-gray-400 text-sm font-light">
                        Error beatae quae tempore alias harum non? Unde blanditiis laboriosam beatae excepturi earum, maxime doloremque deserunt. Dignissimos nostrum in consequatur consequuntur neque obcaecati voluptates maiores modi quod! Lorem ipsum dolor sit amet consectetur.
                    </div>
                    <div class="last:pr-0 text-gray-500 dark:text-gray-400 text-sm font-light">
                        Unde blanditiis laboriosam beatae excepturi earum, maxime doloremque deserunt. Dignissimos nostrum in consequatur consequuntur neque obcaecati voluptates maiores modi quod! Lorem ipsum dolor sit amet consectetur adipisicing elit?
                    </div>
                </CGrid>
                <CodeBlock :code="codes.grid03" language="html" />
            </div>

            <div class="space-y-8 last:pb-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Nested Grid
                    </div>
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        Nested grid works with <UBadge color="white" variant="solid" label=":columns" /> and <UBadge color="white" variant="solid" label="layout" /> prop for more complex layout.
                    </div>
                </div>
                <CGrid layout="left-widest" hasDivider>
                    <CGrid :columns="2">
                        <UCard :ui="{base: 'text-gray-500 dark:text-gray-400 text-sm font-light'}">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error beatae quae tempore alias harum non? Unde blanditiis laboriosam beatae excepturi earum, maxime doloremque deserunt. Dignissimos nostrum in consequatur consequuntur neque obcaecati!
                        </UCard>
                        <UCard :ui="{base: 'text-gray-500 dark:text-gray-400 text-sm font-light'}">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error beatae quae tempore alias harum non? Unde blanditiis laboriosam beatae excepturi earum, maxime doloremque deserunt. Dignissimos nostrum in consequatur consequuntur neque obcaecati!
                        </UCard>
                    </CGrid>
                    <div class="last:pr-0 text-gray-500 dark:text-gray-400 text-sm font-light">
                        Unde blanditiis laboriosam beatae excepturi earum, maxime doloremque deserunt. Dignissimos nostrum in consequatur consequuntur neque obcaecati!
                    </div>
                </CGrid>
                <CodeBlock :code="codes.grid04" language="html" />
            </div>
        </div>
    </CWrapper>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Grid'
});

const codes = {
  grid01: "grid01",
  grid02: "grid02",
  grid03: "grid03",
  grid04: "grid04",
};
</script>