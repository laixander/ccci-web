<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type NotifCategory = 'all' | 'incidents' | 'capa' | 'audits' | 'alerts' | 'system'

const activeCategory = ref<NotifCategory>('all')

const categories = [
  { key: 'all' as NotifCategory, label: 'All', icon: 'i-lucide-bell' },
  { key: 'incidents' as NotifCategory, label: 'Incidents', icon: 'i-lucide-triangle-alert' },
  { key: 'capa' as NotifCategory, label: 'CAPA', icon: 'i-lucide-clipboard-check' },
  { key: 'audits' as NotifCategory, label: 'Audits', icon: 'i-lucide-shield-check' },
  { key: 'alerts' as NotifCategory, label: 'Alerts', icon: 'i-lucide-alert-circle' },
  { key: 'system' as NotifCategory, label: 'System', icon: 'i-lucide-settings-2' },
]

const notifications = ref([
  { id: 1, category: 'alerts' as NotifCategory, title: 'Critical Incident — Chemical Spill, R&D Lab 2', description: 'A chemical spill has been reported by J. Santos in R&D Building, Lab 2. Severity: Critical. Immediate response required.', time: '5 minutes ago', icon: 'i-lucide-flame', color: 'text-error', bg: 'bg-error/10', unread: true, action: { label: 'View Incident', to: '/products/irs/dashboard/incidents' } },
  { id: 2, category: 'capa' as NotifCategory, title: 'CAPA-003 is Overdue — Chemical Spill Containment', description: 'CAPA-003 (Install chemical spill containment trays) assigned to EHS Team was due Aug 30. It is now 1 day overdue.', time: '1 hour ago', icon: 'i-lucide-clipboard-x', color: 'text-error', bg: 'bg-error/10', unread: true, action: { label: 'View CAPA', to: '/products/irs/dashboard/capa' } },
  { id: 3, category: 'incidents' as NotifCategory, title: 'Near-Miss Reported — Warehouse Bay 3', description: 'A forklift near-miss involving a pedestrian has been logged by A. Cruz. Priority: High. RCA assigned to Safety Officer Reyes.', time: '2 hours ago', icon: 'i-lucide-truck', color: 'text-warning', bg: 'bg-warning/10', unread: true, action: { label: 'View Near-Miss', to: '/products/irs/dashboard/near-misses' } },
  { id: 4, category: 'audits' as NotifCategory, title: 'Monthly Safety Walkthrough Completed — Plant A', description: 'Safety audit AUD-001 completed with a score of 94/100. 2 minor findings identified. Report is ready for review.', time: '5 hours ago', icon: 'i-lucide-clipboard-check', color: 'text-success', bg: 'bg-success/10', unread: false, action: { label: 'View Audit', to: '/products/irs/dashboard/audits' } },
  { id: 5, category: 'capa' as NotifCategory, title: 'CAPA-004 Marked Complete — Lab 2 Re-training', description: 'Chemical handling re-training CAPA for R&D Lab 2 staff has been completed and verified by HR/Training department.', time: '8 hours ago', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', unread: false, action: null },
  { id: 6, category: 'alerts' as NotifCategory, title: 'DOLE Q2 Report Ready for Submission', description: 'The Q2 2026 DOLE OSH annual report has been generated and is ready for submission. Deadline: Sep 15, 2026.', time: '1 day ago', icon: 'i-lucide-file-text', color: 'text-info', bg: 'bg-info/10', unread: false, action: { label: 'Download Report', to: '/products/irs/dashboard/compliance' } },
  { id: 7, category: 'audits' as NotifCategory, title: 'ISO 45001 Internal Audit Scheduled — Sep 15', description: 'An ISO 45001 internal audit has been scheduled for September 15, 2026. Ensure all documentation is up to date before then.', time: '2 days ago', icon: 'i-lucide-shield-check', color: 'text-primary', bg: 'bg-primary/10', unread: false, action: { label: 'View Audits', to: '/products/irs/dashboard/audits' } },
  { id: 8, category: 'system' as NotifCategory, title: 'System Maintenance Scheduled', description: 'SafeReport will undergo routine maintenance on Sep 1, 2026 from 11:00 PM to 1:00 AM. Incident submissions will be temporarily paused.', time: '3 days ago', icon: 'i-lucide-settings-2', color: 'text-muted', bg: 'bg-muted', unread: false, action: null },
  { id: 9, category: 'system' as NotifCategory, title: 'New Feature: Real-Time Heatmaps', description: 'Location-based incident heatmaps are now available in the Analytics section. Visualize your highest-risk areas at a glance.', time: '5 days ago', icon: 'i-lucide-sparkles', color: 'text-primary', bg: 'bg-primary/10', unread: false, action: { label: 'Explore Analytics', to: '/products/irs/dashboard/analytics' } },
])

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? notifications.value
    : notifications.value.filter(n => n.category === activeCategory.value)
)

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

function markAllRead() { notifications.value.forEach(n => { n.unread = false }) }
function markRead(id: number) { const n = notifications.value.find(n => n.id === id); if (n) n.unread = false }
function dismiss(id: number) { const idx = notifications.value.findIndex(n => n.id === id); if (idx !== -1) notifications.value.splice(idx, 1) }
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Notifications & Alerts</h1>
        <p class="text-muted text-sm mt-1">
          Stay on top of incidents, CAPAs, and safety alerts
          <span v-if="unreadCount > 0" class="inline-flex items-center ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
            {{ unreadCount }} unread
          </span>
        </p>
      </div>
      <UButton label="Mark all as read" color="neutral" variant="ghost" size="sm" icon="i-lucide-check-check" :disabled="unreadCount === 0" @click="markAllRead" />
    </div>

    <!-- Category filter pills -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors', activeCategory === cat.key ? 'bg-primary text-white shadow-sm' : 'bg-muted text-muted hover:text-highlighted']"
        @click="activeCategory = cat.key"
      >
        <UIcon :name="cat.icon" class="size-3.5" />
        {{ cat.label }}
        <span
          v-if="cat.key !== 'all' && notifications.filter(n => n.category === cat.key && n.unread).length"
          class="size-4 rounded-full bg-white/30 text-[10px] flex items-center justify-center font-bold"
        >
          {{ notifications.filter(n => n.category === cat.key && n.unread).length }}
        </span>
      </button>
    </div>

    <UCard v-if="filtered.length > 0" :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div
          v-for="notif in filtered"
          :key="notif.id"
          :class="['flex gap-4 p-4 sm:px-5 sm:py-4 transition-colors group relative', notif.unread ? 'bg-muted/40' : 'hover:bg-muted/20']"
        >
          <div :class="['size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5', notif.bg]">
            <UIcon :name="notif.icon" :class="['size-5', notif.color]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 :class="['text-sm font-semibold', notif.unread ? 'text-highlighted' : 'text-muted']">{{ notif.title }}</h3>
              <span class="text-xs text-dimmed whitespace-nowrap shrink-0">{{ notif.time }}</span>
            </div>
            <p class="text-sm text-muted leading-relaxed">{{ notif.description }}</p>
            <div class="flex items-center gap-3 mt-2.5">
              <NuxtLink v-if="notif.action" :to="notif.action.to" :class="['text-xs font-semibold flex items-center gap-1 hover:underline', notif.color]" @click="markRead(notif.id)">
                {{ notif.action.label }} <UIcon name="i-lucide-arrow-right" class="size-3" />
              </NuxtLink>
              <button v-if="notif.unread" class="text-xs text-dimmed hover:text-muted transition-colors" @click="markRead(notif.id)">Mark as read</button>
            </div>
          </div>
          <div class="flex flex-col items-center gap-2 shrink-0">
            <span v-if="notif.unread" class="size-2.5 rounded-full bg-primary mt-1" />
            <button class="opacity-0 group-hover:opacity-100 transition-opacity text-dimmed hover:text-muted" title="Dismiss" @click="dismiss(notif.id)">
              <UIcon name="i-lucide-x" class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </UCard>

    <div v-else class="py-20">
      <UEmpty icon="i-lucide-bell-off" title="No notifications" description="You're all caught up! Check back later for incident alerts, CAPA updates, and audit notifications." />
    </div>
  </div>
</template>
