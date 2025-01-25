<template>
  <div>
    <UButton 
      square 
      icon="i-lucide-clipboard" 
      color="gray" 
      variant="link" 
      @click="copyPreContent" 
      class="absolute top-2 right-2"
    />
    <div 
      v-if="isCopied"
      class="absolute inset-0 bg-slate-700/50 dark:bg-slate-900/50 text-gray-100 dark:text-gray-200 flex flex-col justify-center items-center gap-4 font-light text-lg transition-opacity duration-1000 opacity-0 rounded-lg backdrop-blur-sm" 
      :class="{'opacity-100': isCopied}"
    >
      <UIcon name="i-lucide-clipboard-check" class="w-12 h-12 text-green-500" />
      Copied to clipboard!
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  preRef: HTMLPreElement | null; // Define type for the preRef prop
}

// Define props with TypeScript
const props = defineProps<Props>();

// Reactive state
const isCopied = ref(false);

// Copy function
function copyPreContent() {
  if (props.preRef) {
    const textToCopy = props.preRef.innerText; // Extract text inside <pre>
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        isCopied.value = true; // Set copied state to true
        setTimeout(() => {
          isCopied.value = false; // Reset after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}
</script>
