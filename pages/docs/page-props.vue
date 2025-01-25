<template>
    <CPage title="Pages Props" sub-title="Main wrapper of content">
        <div class="prose text-sm dark:text-gray-500">
            <p>
                <UBadge color="gray" size="md">&lt;CPage... /&gt;</UBadge> is a block level component
            </p>

            <h4 class="dark:text-gray-300">Usage</h4>

            <p>CPageList has the following props:</p>
            <p><UBadge color="gray">title</UBadge> is the title of the page.</p>
            <p><UBadge color="gray">sub-title</UBadge> is the description of the page.</p>
            <p><UBadge color="gray">:breadcrumbs</UBadge> is the breadcrumbs of the page. (Optional)</p>
            <p><UBadge color="gray">&lt;template #action /&gt;</UBadge> is for action buttons. (Optional)</p>
            <div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm">&lt;!-- page/somepage.vue --&gt;
&lt;template&gt;
    &lt;CPageSomePage 
        title="..."
        sub-title="..."
        :breadcrumbs="breadcrumbs"
    &gt;
        &lt;template #actions&gt;
            ...
        &lt;/template&gt;
    &lt;/CPageSomePage&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const breadcrumbs = [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    }, 
    //...
]
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