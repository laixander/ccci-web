<template>
    <CPage title="Notifications Page" sub-title="Display notification cards.">
        <div class="prose text-sm dark:text-gray-500">
            ...
            <div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm"></code>
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