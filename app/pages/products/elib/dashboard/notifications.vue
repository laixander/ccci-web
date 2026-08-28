<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type NotifCategory = 'all' | 'circulation' | 'catalog' | 'members' | 'alerts' | 'system'

const activeCategory = ref<NotifCategory>('all')

const categories = [
  { key: 'all' as NotifCategory, label: 'All', icon: 'i-lucide-bell' },
  { key: 'circulation' as NotifCategory, label: 'Circulation', icon: 'i-lucide-bookmark' },
  { key: 'catalog' as NotifCategory, label: 'Catalog', icon: 'i-lucide-book-open' },
  { key: 'members' as NotifCategory, label: 'Members', icon: 'i-lucide-users' },
  { key: 'alerts' as NotifCategory, label: 'Alerts', icon: 'i-lucide-alert-triangle' },
  { key: 'system' as NotifCategory, label: 'System', icon: 'i-lucide-settings-2' },
]

const notifications = ref([
  {
    id: 1, category: 'alerts' as NotifCategory,
    title: 'Overdue Escalation — 4 Patrons',
    description: 'Maria Santos (P-002), Carlo Bautista (P-004), Rosa Villanueva (P-018), and Jerome Tan (P-019) have items overdue by more than 7 days. Total outstanding fines: ₱250.',
    time: '15 minutes ago', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', unread: true,
    action: { label: 'View Fines', to: '/products/elib/dashboard/fines' },
  },
  {
    id: 2, category: 'members' as NotifCategory,
    title: 'Reservation Ready for Pickup',
    description: 'Pedro Reyes (P-012) has been notified that "The Alchemist" is now available for pickup at the circulation desk. Hold expires in 3 days.',
    time: '1 hour ago', icon: 'i-lucide-bell-ring', color: 'text-primary', bg: 'bg-primary/10', unread: true,
    action: { label: 'View Reservations', to: '/products/elib/dashboard/reservations' },
  },
  {
    id: 3, category: 'circulation' as NotifCategory,
    title: '24 Returns Due Today',
    description: 'Reminder: 24 borrowed items are scheduled for return today. 8 patrons have not yet responded to the automated reminder sent this morning.',
    time: '2 hours ago', icon: 'i-lucide-undo-2', color: 'text-warning', bg: 'bg-warning/10', unread: true,
    action: { label: 'View Overdue', to: '/products/elib/dashboard/returns' },
  },
  {
    id: 4, category: 'catalog' as NotifCategory,
    title: 'New Arrivals Cataloged',
    description: '8 new titles have been cataloged and added to the collection today, including "Deep Work" by Cal Newport and "Project Hail Mary" by Andy Weir.',
    time: '3 hours ago', icon: 'i-lucide-sparkles', color: 'text-success', bg: 'bg-success/10', unread: false,
    action: { label: 'View New Arrivals', to: '/products/elib/dashboard/new-arrivals' },
  },
  {
    id: 5, category: 'members' as NotifCategory,
    title: 'Membership Expiring Soon',
    description: '12 student memberships are expiring within the next 7 days. Automated renewal reminders have been sent. 3 patrons have not yet renewed.',
    time: '5 hours ago', icon: 'i-lucide-id-card', color: 'text-warning', bg: 'bg-warning/10', unread: false,
    action: { label: 'View Memberships', to: '/products/elib/dashboard/memberships' },
  },
  {
    id: 6, category: 'circulation' as NotifCategory,
    title: 'Monthly Circulation Report Ready',
    description: 'The August 2026 circulation report has been generated. Total checkouts: 1,248. Return rate: 96.2%. Available for download.',
    time: '8 hours ago', icon: 'i-lucide-file-bar-chart', color: 'text-primary', bg: 'bg-primary/10', unread: false,
    action: { label: 'Download Report', to: '/products/elib/dashboard/reports' },
  },
  {
    id: 7, category: 'catalog' as NotifCategory,
    title: 'Low Stock Alert — 3 Titles',
    description: '"Design Patterns", "The Martian", and "Thinking Fast and Slow" each have only 1 copy remaining in the collection. Consider ordering additional copies.',
    time: '1 day ago', icon: 'i-lucide-package-x', color: 'text-warning', bg: 'bg-warning/10', unread: false,
    action: null,
  },
  {
    id: 8, category: 'system' as NotifCategory,
    title: 'CHED Compliance Report Submitted',
    description: 'The Q2 2026 CHED library compliance report has been successfully submitted. Confirmation number: CHED-LIB-2026-Q2-0087. Status: Under Review.',
    time: '2 days ago', icon: 'i-lucide-file-check', color: 'text-success', bg: 'bg-success/10', unread: false,
    action: null,
  },
  {
    id: 9, category: 'system' as NotifCategory,
    title: 'System Maintenance Scheduled',
    description: 'BiblioCore will undergo routine maintenance on Aug 30, 2026 from 11:00 PM to 1:00 AM. The catalog and OPAC will be read-only during this period.',
    time: '3 days ago', icon: 'i-lucide-settings-2', color: 'text-muted', bg: 'bg-muted', unread: false,
    action: null,
  },
  {
    id: 10, category: 'system' as NotifCategory,
    title: 'New Feature: Digital Lending Module',
    description: 'E-books and digital resources can now be borrowed directly from the catalog. Set concurrent loan limits per title in Settings → Digital Lending.',
    time: '5 days ago', icon: 'i-lucide-tablet', color: 'text-primary', bg: 'bg-primary/10', unread: false,
    action: { label: 'Explore Feature', to: '/products/elib/dashboard/settings' },
  },
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
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Notifications</h1>
        <p class="text-muted text-sm mt-1">
          Stay on top of circulation, catalog updates, and member alerts
          <span v-if="unreadCount > 0" class="inline-flex items-center ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
            {{ unreadCount }} unread
          </span>
        </p>
      </div>
      <UButton label="Mark all as read" color="neutral" variant="ghost" size="sm" icon="i-lucide-check-check" :disabled="unreadCount === 0" @click="markAllRead" />
    </div>

    <!-- Category filters -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors', activeCategory === cat.key ? 'bg-primary text-white shadow-sm' : 'bg-muted text-muted hover:text-highlighted']"
        @click="activeCategory = cat.key"
      >
        <UIcon :name="cat.icon" class="size-3.5" />
        {{ cat.label }}
        <span v-if="cat.key !== 'all' && notifications.filter(n => n.category === cat.key && n.unread).length" class="size-4 rounded-full bg-white/30 text-[10px] flex items-center justify-center font-bold">
          {{ notifications.filter(n => n.category === cat.key && n.unread).length }}
        </span>
      </button>
    </div>

    <!-- Notification list -->
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
      <UEmpty icon="i-lucide-bell-off" title="No notifications" description="You're all caught up! Check back later for circulation alerts, catalog updates, and member notifications." />
    </div>
  </div>
</template>
