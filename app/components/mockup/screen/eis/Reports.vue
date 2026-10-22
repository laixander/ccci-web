<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/reports"
    title="Dashboards"
    icon="i-lucide-file-bar-chart"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Dashboards</span>
          <p class="text-[10px] text-muted mt-0.5">By role · Granular role-based access & action control</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Schedule"
            icon="i-lucide-calendar"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="New Report"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Role Filter Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5">
        <UBadge
          v-for="role in roleFilters"
          :key="role.name"
          :label="role.name"
          :color="role.active ? 'primary' : 'neutral'"
          :variant="role.active ? 'solid' : 'subtle'"
          size="xs"
          class="cursor-default font-medium px-2.5 py-1"
        />
      </div>

      <!-- Report List Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[12px] text-highlighted">Available to you</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Report Rows (v-for) -->
      <div v-if="reports?.length" class="flex flex-col gap-2">
        <UCard
          v-for="rep in reports"
          :key="rep.title"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', rep.iconBg]">
              <UIcon :name="rep.icon" :class="['size-4', rep.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ rep.title }}</p>
                <UBadge
                  :label="rep.audience"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                  class="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0"
                />
              </div>
              <p class="text-[10.5px] text-muted truncate mt-0.5">{{ rep.description }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="hidden sm:inline-block font-mono text-[10px] text-dimmed">{{ rep.lastUpdated }}</span>
            <UBadge
              :label="rep.status"
              :color="rep.statusColor"
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
          Strict row-level & column-level security enforced
        </span>
        <span class="hidden sm:inline">User role: Executive Board</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'rbac',
    title: 'Role Security',
    subtitle: 'RBAC Enforced · Active',
    icon: 'i-lucide-shield-check',
    color: 'success',
    pulse: true,
  },
  {
    id: 'board-ready',
    title: 'Board-Ready Reports',
    subtitle: 'Multi-Tier Permissions',
    icon: 'i-lucide-file-text',
    color: 'primary',
    badge: { label: 'CONFIDENTIAL', color: 'primary' },
  },
  {
    id: 'delivery',
    title: 'Scheduled Delivery',
    subtitle: 'PDF & Excel Digests',
    icon: 'i-lucide-send',
    color: 'info',
  },
]

// ─── Role Filters ─────────────────────────────────────────────────────────────
interface RoleFilter {
  name: string
  active: boolean
}

const roleFilters: RoleFilter[] = [
  { name: 'All Roles', active: false },
  { name: 'Executives', active: true },
  { name: 'Registrar', active: false },
  { name: 'Finance', active: false },
  { name: 'HR Only', active: false },
]

// ─── Report Items Data ────────────────────────────────────────────────────────
interface ReportItem {
  title: string
  audience: string
  description: string
  lastUpdated: string
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconBg: string
  iconColor: string
}

const reports: ReportItem[] = [
  {
    title: 'Board Summary',
    audience: 'Executives',
    description: 'Consolidated performance overview, revenue, headcount & retention',
    lastUpdated: 'Updated 10m ago',
    status: 'Live',
    statusColor: 'success',
    icon: 'i-lucide-pie-chart',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Enrollment Trends',
    audience: 'Registrar',
    description: 'Semester-by-semester applicant intake, drop rates & section loads',
    lastUpdated: 'Updated 1h ago',
    status: 'Live',
    statusColor: 'success',
    icon: 'i-lucide-trending-up',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    title: 'Budget vs. Actual',
    audience: 'Finance',
    description: 'Departmental expenditure variance and capital appropriation review',
    lastUpdated: 'Drafted 3h ago',
    status: 'Draft',
    statusColor: 'neutral',
    icon: 'i-lucide-calculator',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  {
    title: 'HR Compensation',
    audience: 'HR only',
    description: 'Executive salary band analysis, tenure, and benefits allocation',
    lastUpdated: 'Access restricted',
    status: 'Restricted',
    statusColor: 'error',
    icon: 'i-lucide-lock',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
  },
]
</script>
