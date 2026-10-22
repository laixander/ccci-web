<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/model"
    title="Enrollment model"
    icon="i-lucide-network"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Enrollment model</span>
          <p class="text-[10px] text-muted mt-0.5">4 tables linked · Visual relational data modeling without raw SQL</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Validate"
            icon="i-lucide-check-circle"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="Add Table"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Modeling Schema Quick Info -->
      <UCard
        variant="soft"
        :ui="{ body: 'p-3 flex items-center justify-between gap-3' }"
        class="bg-primary/5 border border-primary/20 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-git-fork" class="size-4 text-primary" />
          </div>
          <div>
            <p class="text-[11.5px] font-bold text-highlighted">Cross-System Joins Automated</p>
            <p class="text-[10px] text-muted">Primary keys auto-mapped between Registrar DB, Cloud ERP, and CSV files</p>
          </div>
        </div>
        <UBadge
          label="Valid"
          color="success"
          variant="subtle"
          size="xs"
          class="font-bold uppercase tracking-wider"
        />
      </UCard>

      <!-- Linked Tables Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[12px] text-highlighted">Linked tables (4 active)</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Linked Tables List -->
      <div v-if="tables?.length" class="flex flex-col gap-2">
        <UCard
          v-for="tbl in tables"
          :key="tbl.name"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', tbl.iconBg]">
              <UIcon :name="tbl.icon" :class="['size-4', tbl.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ tbl.name }}</p>
                <span class="text-[10px] text-muted font-mono">← {{ tbl.source }}</span>
              </div>
              <p class="text-[10.5px] text-muted truncate mt-0.5">
                Linked to <strong class="text-highlighted font-medium">{{ tbl.linkedTo }}</strong> · {{ tbl.keys }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <UBadge
              :label="tbl.status"
              :color="tbl.statusColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Footer Info Strip -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <span class="size-1.5 rounded-full bg-success" />
          Graphical relationship editor · Automatic cardinality detection
        </span>
        <span class="hidden sm:inline">1:N relationships active</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'schema',
    title: 'Foreign Keys Validated',
    subtitle: 'Zero Broken References',
    icon: 'i-lucide-check-check',
    color: 'success',
    pulse: true,
  },
  {
    id: 'model-rel',
    title: 'Visual Data Model',
    subtitle: '4 Tables Linked',
    icon: 'i-lucide-git-branch',
    color: 'primary',
    badge: { label: 'OPTIMIZED', color: 'primary' },
  },
  {
    id: 'query-builder',
    title: 'No SQL Required',
    subtitle: 'Graphical Join Builder',
    icon: 'i-lucide-mouse-pointer-click',
    color: 'info',
  },
]

// ─── Linked Tables Data ───────────────────────────────────────────────────────
interface TableItem {
  name: string
  source: string
  linkedTo: string
  keys: string
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconBg: string
  iconColor: string
}

const tables: TableItem[] = [
  {
    name: 'Students',
    source: 'Registrar DB',
    linkedTo: 'Enrollment',
    keys: 'PK: student_id · 18,240 rows',
    status: 'Synced',
    statusColor: 'success',
    icon: 'i-lucide-users',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    name: 'Enrollment',
    source: 'Registrar DB',
    linkedTo: 'Finance',
    keys: 'FK: student_id → PK: enroll_id',
    status: 'Synced',
    statusColor: 'success',
    icon: 'i-lucide-graduation-cap',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    name: 'Finance',
    source: 'Cloud ERP',
    linkedTo: 'Students',
    keys: 'FK: student_id → Tuition ledger',
    status: 'Synced',
    statusColor: 'success',
    icon: 'i-lucide-banknote',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    name: 'Scholarships',
    source: 'CSV upload',
    linkedTo: 'Students',
    keys: 'FK: student_id · Grant awards',
    status: 'Pending',
    statusColor: 'warning',
    icon: 'i-lucide-award',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
]
</script>
