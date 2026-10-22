<template>
  <MockupMobileFrame :floating-tags="floatingTags">
    <div class="flex flex-col gap-4 h-full bg-default text-default select-none font-sans relative">
      
      <!-- App Header -->
      <div class="flex items-center justify-between p-2">
        <p class="text-[22px] font-bold text-highlighted">My Shelf</p>
        <UIcon name="i-lucide-search" class="size-5 text-muted" />
      </div>

      <!-- Borrowed Books List -->
      <div class="flex flex-col gap-3">
        <UCard
          v-for="book in books"
          :key="book.id"
          variant="outline"
          :ui="{ body: 'sm:p-3 p-3 flex items-center gap-4' }"
          class="rounded-xl shadow-sm"
        >
          <!-- Book cover color swatch -->
          <div
            class="w-12 h-16 rounded-md flex-shrink-0 bg-gradient-to-br"
            :class="book.gradient"
          />
          <div class="flex-1 min-w-0">
            <p class="text-base font-bold text-highlighted">{{ book.title }}</p>
            <p class="text-xs font-medium text-muted mt-0.5">
              Due&nbsp;<span class="text-muted">{{ book.due }}</span>
            </p>
          </div>
        </UCard>
        <!-- Scan to Reserve CTA -->
        <UButton
            icon="i-lucide-scan-qr-code"
            label="Scan to reserve"
            block
            color="primary"
            class="rounded-[14px] py-4 text-[15px] font-bold shadow-md"
        />
      </div>
    </div>
  </MockupMobileFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'due-today',
    title: 'Due Today!',
    subtitle: 'Deep Work · Return Now',
    icon: 'i-lucide-alarm-clock',
    color: 'error',
    badge: { label: 'TODAY', color: 'error' }
  },
  {
    id: 'books-borrowed',
    title: '4 Books Borrowed',
    subtitle: 'Sapiens · Atomic Habits…',
    icon: 'i-lucide-library',
    color: 'primary',
    pulse: true
  },
  {
    id: 'scan-reserve',
    title: 'Scan to Reserve',
    subtitle: 'QR · Instant Pickup',
    icon: 'i-lucide-scan-qr-code',
    color: 'success',
    badge: { label: 'QR', color: 'success' }
  }
]

const books = [
  { id: 1, title: 'Deep Work',                 due: 'Today', gradient: 'from-primary-300 to-primary-400 dark:from-primary-400 dark:to-primary-500' },
  { id: 2, title: 'Atomic Habits',             due: '3d',    gradient: 'from-primary-400 to-primary-500 dark:from-primary-500 dark:to-primary-600' },
  { id: 3, title: 'Thinking, Fast and Slow',   due: '7d',    gradient: 'from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700' },
  { id: 4, title: 'Sapiens',                   due: '12d',   gradient: 'from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800' },
//   { id: 5, title: 'Dune',                      due: '14d',   gradient: 'from-primary-700 to-primary-800 dark:from-primary-800 dark:to-primary-900' },
]
</script>