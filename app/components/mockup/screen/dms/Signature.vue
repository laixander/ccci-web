<template>
  <MockupBrowserFrame
    url="dms.ccci.com.ph/signatures"
    title="Signature status"
    icon="i-lucide-pen-tool"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Signature status</span>
          <p class="text-[10px] text-muted mt-0.5">Contracts this week</p>
        </div>
        <UButton label="View all" color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-chevron-right" />
      </div>

      <!-- Documents list -->
      <div v-if="documents?.length" class="flex flex-col gap-2">
        <UCard
          v-for="doc in documents"
          :key="doc.name"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-file-signature" class="size-3.5 text-primary" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ doc.name }}</p>
              <p class="text-[10px] text-muted">{{ doc.detail }}</p>
            </div>
          </div>
          <UBadge :label="doc.status" :color="doc.color" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
        </UCard>
      </div>

      <!-- Summary bar -->
      <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-center justify-between">
        <span class="font-mono text-xs font-semibold text-primary tracking-wide">This Week</span>
        <div class="flex items-center gap-3">
          <span class="text-[10px] text-muted font-mono">Verified: <span class="text-success font-bold">1</span></span>
          <span class="text-[10px] text-muted font-mono">Pending: <span class="text-warning font-bold">1</span></span>
          <span class="text-[10px] text-muted font-mono">Signed: <span class="text-primary font-bold">2</span></span>
        </div>
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'verified',
    title: 'Cryptographic Sig',
    subtitle: 'PKI Chain Verified',
    icon: 'i-lucide-shield-check',
    color: 'success',
    pulse: true,
  },
  {
    id: 'remote',
    title: 'Remote Signing',
    subtitle: 'Secure link active',
    icon: 'i-lucide-link',
    color: 'primary',
    badge: { label: 'LIVE', color: 'primary' },
  },
  {
    id: 'handwritten',
    title: 'Handwritten Sig',
    subtitle: 'Digitization enabled',
    icon: 'i-lucide-pen-line',
    color: 'info',
    badge: { label: 'ON', color: 'info' },
  },
]

interface SignatureDoc {
  name: string
  detail: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const documents: SignatureDoc[] = [
  { name: 'NDA — Vendor Corp', detail: 'Valid · Cryptographic', status: 'Verified', color: 'success' },
  { name: 'Service agreement #118', detail: 'Remote signing', status: 'Signed', color: 'primary' },
  { name: 'Lease renewal', detail: 'Awaiting 1 signatory', status: 'Pending', color: 'warning' },
  { name: 'Signed MOU copy', detail: 'Post-storage upload', status: 'Uploaded', color: 'info' },
]
</script>
