<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/approval-tracking">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col font-sans select-none">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Approval Tracking</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-center gap-3.5">
        <!-- Steps List -->
        <div v-if="steps?.length" class="flex flex-col gap-3">
          <UCard
            v-for="step in steps"
            :key="step.title"
            variant="outline"
            :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <!-- Left: Icon & Stage Name -->
            <div class="flex items-center gap-3.5">
              <div
                class="size-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-2xs"
                :class="step.iconBg"
              >
                <UIcon :name="step.icon" class="size-3.5" />
              </div>
              <span class="font-semibold text-sm text-highlighted">
                {{ step.title }}
              </span>
            </div>

            <!-- Right: Role/Department & Status Badge -->
            <div class="flex items-center gap-3">
              <span class="font-mono text-[11px] text-muted">
                {{ step.role }}
              </span>
              <UBadge
                :label="step.status"
                :color="step.badgeColor"
                variant="subtle"
                size="xs"
                class="font-bold tracking-wider"
              />
            </div>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface ApprovalStep {
  title: string
  role: string
  status: string
  icon: string
  iconBg: string
  badgeColor: 'success' | 'info' | 'warning' | 'error' | 'primary'
}

const steps: ApprovalStep[] = [
  {
    title: 'Prepared',
    role: 'IT Office',
    status: 'DONE',
    icon: 'i-lucide-check',
    iconBg: 'bg-emerald-500',
    badgeColor: 'success',
  },
  {
    title: 'Reviewed',
    role: 'Planning',
    status: 'DONE',
    icon: 'i-lucide-check',
    iconBg: 'bg-blue-500',
    badgeColor: 'info',
  },
  {
    title: 'Endorsed',
    role: 'VP Admin',
    status: 'DONE',
    icon: 'i-lucide-check',
    iconBg: 'bg-amber-500',
    badgeColor: 'warning',
  },
  {
    title: 'Approved',
    role: 'President',
    status: 'PENDING',
    icon: 'i-lucide-clock',
    iconBg: 'bg-rose-600',
    badgeColor: 'error',
  },
]
</script>