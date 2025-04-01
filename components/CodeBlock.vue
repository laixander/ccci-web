<template>
<div class="relative"><pre><code :class="`language-${language}`" ref="codeRef">{{ code }}</code></pre><CopyToClipboard :pre-ref="codeRef" /></div>
</template>
<script setup>
import { onMounted, ref, nextTick } from "vue";
const { $prism } = useNuxtApp();

const props = defineProps({
  code: String, // Code content as a prop
  language: String, // Programming language (e.g., "javascript")
});

const codeRef = ref(null);

onMounted(() => {
  nextTick(() => {
    if (codeRef.value) {
      $prism.highlightElement(codeRef.value);
    }
  });
});
</script>