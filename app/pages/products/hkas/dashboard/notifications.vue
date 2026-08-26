<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type NotifCategory = 'all' | 'assessments' | 'programs' | 'wellness' | 'alerts' | 'system'

const activeCategory = ref<NotifCategory>('all')

const categories = [
  { key: 'all' as NotifCategory, label: 'All', icon: 'i-lucide-bell' },
  { key: 'assessments' as NotifCategory, label: 'Assessments', icon: 'i-lucide-clipboard-list' },
  { key: 'programs' as NotifCategory, label: 'Programs', icon: 'i-lucide-dumbbell' },
  { key: 'wellness' as NotifCategory, label: 'Wellness', icon: 'i-lucide-heart-pulse' },
  { key: 'alerts' as NotifCategory, label: 'Alerts', icon: 'i-lucide-alert-triangle' },
  { key: 'system' as NotifCategory, label: 'System', icon: 'i-lucide-settings-2' },
]

const notifications = ref([
  {
    id: 1,
    category: 'alerts' as NotifCategory,
    title: 'At-Risk Student Flagged',
    description: 'Pedro Garcia (Grade 9) has been automatically flagged as at-risk after failing 3 consecutive fitness assessments. BMI: 30.1 — Cardio: 29%.',
    time: '5 minutes ago',
    icon: 'i-lucide-alert-triangle',
    color: 'text-error',
    bg: 'bg-error/10',
    unread: true,
    action: { label: 'View Record', to: '/products/hkas/dashboard/records' },
  },
  {
    id: 2,
    category: 'assessments' as NotifCategory,
    title: 'Grade 10-A Assessment Completed',
    description: '38 students completed the Q2 fitness battery. Average score: 82% — Pass rate: 94%. 2 students require follow-up.',
    time: '42 minutes ago',
    icon: 'i-lucide-clipboard-check',
    color: 'text-primary',
    bg: 'bg-primary/10',
    unread: true,
    action: { label: 'View Results', to: '/products/hkas/dashboard/fitness-tests' },
  },
  {
    id: 3,
    category: 'alerts' as NotifCategory,
    title: 'High Training Load Warning',
    description: 'Paolo Santos (Basketball, Point Guard) has reached 92% training load this week. Consider scheduling a rest day to prevent overtraining.',
    time: '1 hour ago',
    icon: 'i-lucide-zap',
    color: 'text-warning',
    bg: 'bg-warning/10',
    unread: true,
    action: { label: 'View Athlete', to: '/products/hkas/dashboard/sports' },
  },
  {
    id: 4,
    category: 'programs' as NotifCategory,
    title: 'Training Plan Session Logged',
    description: 'Session 9 of 12 completed for "Grade 10 Cardio Foundation". On track for completion by Sept 12, 2026.',
    time: '3 hours ago',
    icon: 'i-lucide-check-circle',
    color: 'text-success',
    bg: 'bg-success/10',
    unread: false,
    action: null,
  },
  {
    id: 5,
    category: 'wellness' as NotifCategory,
    title: '10,000 Steps Challenge — Week 3',
    description: '1,240 of 3,000 enrolled employees have hit their weekly step target. Engagement rate: 72%. Send a motivational reminder?',
    time: '5 hours ago',
    icon: 'i-lucide-footprints',
    color: 'text-info',
    bg: 'bg-info/10',
    unread: false,
    action: { label: 'View Challenge', to: '/products/hkas/dashboard/wellness' },
  },
  {
    id: 6,
    category: 'assessments' as NotifCategory,
    title: 'Q2 CHED PE Report Ready',
    description: 'The Q2 2026 CHED Physical Education compliance report has been generated and is ready for submission. 3,842 student records included.',
    time: '8 hours ago',
    icon: 'i-lucide-file-bar-chart',
    color: 'text-primary',
    bg: 'bg-primary/10',
    unread: false,
    action: { label: 'Download Report', to: '/products/hkas/dashboard/reports' },
  },
  {
    id: 7,
    category: 'programs' as NotifCategory,
    title: 'New Training Plan Scheduled',
    description: '"Senior Athletic Conditioning" has been scheduled to start Sep 1, 2026. 28 participants enrolled. Trainer: Coach M. Reyes.',
    time: '1 day ago',
    icon: 'i-lucide-calendar-plus',
    color: 'text-success',
    bg: 'bg-success/10',
    unread: false,
    action: { label: 'View Plan', to: '/products/hkas/dashboard/training' },
  },
  {
    id: 8,
    category: 'wellness' as NotifCategory,
    title: 'Corporate Wellness Assessment Completed',
    description: 'The Q2 Fitness Assessment Drive achieved 100% employee participation (3,000/3,000). Program report is now available.',
    time: '2 days ago',
    icon: 'i-lucide-party-popper',
    color: 'text-success',
    bg: 'bg-success/10',
    unread: false,
    action: null,
  },
  {
    id: 9,
    category: 'system' as NotifCategory,
    title: 'System Maintenance Scheduled',
    description: 'KineticsCore will undergo routine maintenance on Aug 30, 2026 from 11:00 PM to 1:00 AM. Assessment submissions will be temporarily paused.',
    time: '3 days ago',
    icon: 'i-lucide-settings-2',
    color: 'text-muted',
    bg: 'bg-muted',
    unread: false,
    action: null,
  },
  {
    id: 10,
    category: 'system' as NotifCategory,
    title: 'New Feature: Body Composition Analytics',
    description: 'Longitudinal body composition tracking is now available. View BMI trends, muscle mass progression, and body fat history per student.',
    time: '5 days ago',
    icon: 'i-lucide-sparkles',
    color: 'text-primary',
    bg: 'bg-primary/10',
    unread: false,
    action: { label: 'Explore Feature', to: '/products/hkas/dashboard/body-composition' },
  },
])

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? notifications.value
    : notifications.value.filter(n => n.category === activeCategory.value)
)

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

function markAllRead() {
  notifications.value.forEach(n => { n.unread = false })
}

function markRead(id: number) {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.unread = false
}

function dismiss(id: number) {
  const idx = notifications.value.findIndex(n => n.id === id)
  if (idx !== -1) notifications.value.splice(idx, 1)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Notifications</h1>
        <p class="text-muted text-sm mt-1">
          Stay on top of assessments, alerts, and program updates
          <span v-if="unreadCount > 0" class="inline-flex items-center ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
            {{ unreadCount }} unread
          </span>
        </p>
      </div>
      <UButton
        label="Mark all as read"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-check-check"
        :disabled="unreadCount === 0"
        @click="markAllRead"
      />
    </div>

    <!-- Category filter pills -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="[
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
          activeCategory === cat.key
            ? 'bg-primary text-white shadow-sm'
            : 'bg-muted text-muted hover:text-highlighted'
        ]"
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

    <!-- Notification list -->
    <UCard v-if="filtered.length > 0" :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div
          v-for="notif in filtered"
          :key="notif.id"
          :class="[
            'flex gap-4 p-4 sm:px-5 sm:py-4 transition-colors group relative',
            notif.unread ? 'bg-muted/40' : 'hover:bg-muted/20'
          ]"
        >
          <!-- Icon -->
          <div :class="['size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5', notif.bg]">
            <UIcon :name="notif.icon" :class="['size-5', notif.color]" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 :class="['text-sm font-semibold', notif.unread ? 'text-highlighted' : 'text-muted']">
                {{ notif.title }}
              </h3>
              <span class="text-xs text-dimmed whitespace-nowrap shrink-0">{{ notif.time }}</span>
            </div>
            <p class="text-sm text-muted leading-relaxed">{{ notif.description }}</p>

            <!-- Action link + mark read -->
            <div class="flex items-center gap-3 mt-2.5">
              <NuxtLink
                v-if="notif.action"
                :to="notif.action.to"
                :class="['text-xs font-semibold flex items-center gap-1 hover:underline', notif.color]"
                @click="markRead(notif.id)"
              >
                {{ notif.action.label }}
                <UIcon name="i-lucide-arrow-right" class="size-3" />
              </NuxtLink>
              <button
                v-if="notif.unread"
                class="text-xs text-dimmed hover:text-muted transition-colors"
                @click="markRead(notif.id)"
              >
                Mark as read
              </button>
            </div>
          </div>

          <!-- Unread dot + dismiss -->
          <div class="flex flex-col items-center gap-2 shrink-0">
            <span v-if="notif.unread" class="size-2.5 rounded-full bg-primary mt-1" />
            <button
              class="opacity-0 group-hover:opacity-100 transition-opacity text-dimmed hover:text-muted"
              title="Dismiss"
              @click="dismiss(notif.id)"
            >
              <UIcon name="i-lucide-x" class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Empty state -->
    <div v-else class="py-20">
      <UEmpty
        icon="i-lucide-bell-off"
        title="No notifications"
        description="You're all caught up! Check back later for assessment results, program updates, and alerts."
      />
    </div>
  </div>
</template>
