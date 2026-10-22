<template>
  <MockupBrowserFrame url="app.learncore.edu/parent" title="Parent Dashboard" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex gap-4">
      <!-- Left Side: QR Code -->
      <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col items-center justify-center h-full gap-5' }" class="rounded-lg w-32 shrink-0">
        <div class="size-16 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <UIcon name="i-lucide-qr-code" class="size-8 text-primary" />
        </div>
        <span class="text-[10px] text-muted font-mono tracking-wide">Scan to link</span>
      </UCard>

      <!-- Right Side: Info & Actions -->
      <div class="flex-1 flex flex-col gap-4">
        <!-- Student Info -->
        <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-1.5' }" class="rounded-lg">
          <span class="font-bold text-[14px] text-highlighted">Liam Cruz · STU-10422</span>
          <span class="text-[10px] text-muted font-mono tracking-wide">Grade 11 · Section A</span>
        </UCard>

        <!-- Attendance -->
        <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3' }" class="rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-[12px] text-muted font-medium">Attendance</span>
            <span class="text-[12px] font-bold text-emerald-500">96%</span>
          </div>
          <UProgress :model-value="96" color="success" size="md" />
        </UCard>

        <!-- Tuition Action -->
        <UButton 
          color="primary"
          variant="solid" 
          class="w-full justify-between py-3.5 px-4 rounded-lg shadow-sm"
        >
          <span class="font-medium text-[13px]">Tuition · Term 2</span>
          <span class="font-mono tracking-wide text-[12px]">Pay ₱18,500</span>
        </UButton>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'attendance',
    title: 'Attendance 96%',
    subtitle: 'Liam Cruz · Grade 11-A',
    icon: 'i-lucide-calendar-check',
    color: 'success',
    badge: { label: '96%', color: 'success' }
  },
  {
    id: 'tuition-due',
    title: 'Tuition Due',
    subtitle: '₱18,500 · Term 2',
    icon: 'i-lucide-banknote',
    color: 'warning',
    pulse: true
  },
  {
    id: 'student-link',
    title: 'STU-10422 Linked',
    subtitle: 'Section A · QR Verified',
    icon: 'i-lucide-qr-code',
    color: 'primary',
    badge: { label: 'LINKED', color: 'primary' }
  }
]
// Component intentionally left bare as per mockup nature
</script>