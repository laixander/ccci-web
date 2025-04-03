<template>
  <UAccordion :items="items" color="primary" variant="soft">
    <template #code-block>
      <div class="relative">
        <pre><code :class="`language-${language}`" ref="codeRef">{{ codeSnippet }}</code></pre>
        <CopyToClipboard :pre-ref="codeRef" />
      </div>
    </template>
  </UAccordion>
</template>

<script setup>
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

// Accordion items
const items = [{
  label: 'Code',
  icon: 'i-lucide-code-xml',
  slot: 'code-block'
}];
</script>