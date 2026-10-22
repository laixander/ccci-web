<template>
  <MockupBrowserFrame url="library.ccci.io/catalog" title="Borrow · Clean Code" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Book detail card -->
      <div class="flex items-center gap-4">
        <!-- Book cover -->
        <div class="w-20 h-28 rounded-xl bg-gradient-to-b from-primary-400 to-primary-800 shrink-0 flex items-end justify-center pb-2" />
        <!-- Book info -->
        <div class="flex flex-col gap-1.5 flex-1">
          <p class="text-[15px] font-black text-highlighted leading-tight">Clean Code</p>
          <p class="text-[11px] text-muted">Robert C. Martin · 2008</p>
          <p class="text-[11px] text-muted">Subject: Software Eng.</p>
          <div class="mt-1">
            <span class="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md">
              {{ copies }} copies available
            </span>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2 mt-auto">
        <UButton block label="Issue book" color="primary" class="flex-1 py-2 rounded-lg" />
        <UButton block label="Reserve" color="neutral" variant="outline" class="flex-1 py-2 rounded-lg" />
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'available',
    title: '3 Copies Available',
    subtitle: 'Clean Code · Robert C. Martin',
    icon: 'i-lucide-book-open',
    color: 'success',
    badge: { label: '3 COPIES', color: 'success' }
  },
  {
    id: 'subject',
    title: 'Software Eng.',
    subtitle: '2008 · Ready to Issue',
    icon: 'i-lucide-code-2',
    color: 'primary',
    pulse: true
  },
  {
    id: 'reserve',
    title: 'Reserve Available',
    subtitle: 'Scan QR or Walk-in',
    icon: 'i-lucide-bookmark',
    color: 'info',
    badge: { label: 'READY', color: 'info' }
  }
]

const copies = 3
</script>
