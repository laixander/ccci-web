<template>
    <CWrapper>
        <div class="space-y-2">
            <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                Installation
            </div>
            <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                Learn how to install and configure UI Layers in your application.
            </div>
        </div>
        <div class="relative">
<pre><code class="language-html" ref="codeRef">npm i @ccci/ui-layer</code></pre>
            <!-- <CopyToClipboard :pre-ref="codeRef" /> -->
        </div>
    </CWrapper>
</template>

<script setup>
definePageMeta({
    title: 'Get Started'
});

import codeSnippets from "@/data/codeSnippets.js";
import { ref, computed, onMounted, nextTick } from "vue";
const { $prism } = useNuxtApp();

// Props to receive code dynamically
const props = defineProps({
  code: String, // Example: "item04"
  language: String, // Example: "html"
});

// Get the correct code snippet dynamically
const codeSnippet = computed(() => codeSnippets[props.code] || "Code not found");

const codeRef = ref(null);

onMounted(() => {
  nextTick(() => {
    if (codeRef.value) {
      $prism.highlightElement(codeRef.value);
    }
  });
});
</script>