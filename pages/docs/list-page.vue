<template>
    <CPage title="List Page" sub-title="Display a card grid or table.">
        <div class="prose text-sm dark:text-gray-500">
            <p>
                <UBadge color="gray" size="md">&lt;CPageList /&gt;</UBadge> is a block level component
            </p>

            <!-- <h4 class="dark:text-gray-300">Usage</h4> -->

            <h4 class="dark:text-gray-300 mb-4">This page has the following props:</h4>

            <p><UBadge color="gray">:details</UBadge> is the array of the details.</p>
            <ul>
                <li><UBadge color="gray">name</UBadge> &ndash; The name of the entry.</li>
                <li><UBadge color="gray">avatar</UBadge> &ndash; The image of the entry.</li>
                <li>
                    <UBadge color="gray">itemDetail</UBadge> &ndash; The details of the entry.
                    <ul>
                        <li><UBadge color="gray">item</UBadge> &ndash; The name of the item.</li>
                        <li><UBadge color="gray">value</UBadge> &ndash; The value of the item.</li>
                    </ul>
                </li>
            </ul>
            <p><UBadge color="gray">:dropdownItems</UBadge> is the actions.</p>
            <p><UBadge color="gray">:columns</UBadge> is the columns of the list.</p>
            <div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm">&lt;!-- page/list.vue --&gt;
&lt;template&gt;
    &lt;CPageList 
        title="List"
        :columns="5"
        :details="details"
        :dropdownItems="dropdownItems"
    /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const details = [
    {
        name: 'James Gunn',
        avatar: 'https://avatar.iran.liara.run/public/20',
        itemDetail: [
            { item: 'Age', value: '29' },
            { item: 'Location', value: 'Philippines' },
            { item: 'Role', value: 'Software Developer' }
        ]
    },
    //...
];

const dropdownItems = [
    {
        label: 'Download',
        icon: 'i-lucide-cloud-download',
        click: () => console.log('Download'),
    },
    //..
];
&lt;/script&gt;</code>
</pre>
            <CopyToClipboard :pre-ref="codeRef" />
            </div>
        </div>
    </CPage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'docs',
})

const codeRef = ref<HTMLPreElement | null>(null); // Reference for the <pre> element
</script>