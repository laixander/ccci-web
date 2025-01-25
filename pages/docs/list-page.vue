<template>
    <CPage title="List Page" sub-title="Display a card grid or table.">
        <div class="prose text-sm dark:text-gray-500">
            <p>
                <UBadge color="gray" size="md">&lt;CPageList /&gt;</UBadge> is a block level component
            </p>

            <h4 class="dark:text-gray-300">Usage</h4>

            <p>CPageList has the following props:</p>
            <p><UBadge color="gray">:entries</UBadge> is the array of the entries.</p>
            <ul>
                <li><UBadge color="gray">title</UBadge> &ndash; The title of the entry.</li>
                <li><UBadge color="gray">image</UBadge> &ndash; The image of the entry.</li>
                <li>
                    <UBadge color="gray">list</UBadge> &ndash; The details of the entry.
                    <ul>
                        <li><UBadge color="gray">item</UBadge> &ndash; The name of the item.</li>
                        <li><UBadge color="gray">value</UBadge> &ndash; The value of the item.</li>
                    </ul>
                </li>
            </ul>
            <p><UBadge color="gray">:columns</UBadge> is the columns of the list.</p>
            <div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm">&lt;!-- page/list.vue --&gt;
&lt;template&gt;
    &lt;CPageList 
        title="List" 
        :entries="entries" 
        :columns="4" 
    /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const entries = [
    {
        title: "Item Title",
        image: "image.jpg",
        list: [
            { item: "Name", value: "Value" },
            //...
        ],
    },
    //...
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