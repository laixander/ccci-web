<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const stats = [
  { label: 'Live Sessions Today', value: '3', icon: 'i-lucide-video', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Total Attendees', value: '156', icon: 'i-lucide-users', color: 'text-info', bg: 'bg-info/10' },
  { label: 'Upcoming This Week', value: '9', icon: 'i-lucide-calendar', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Recordings Available', value: '42', icon: 'i-lucide-play-circle', color: 'text-warning', bg: 'bg-warning/10' },
]

const sessions = ref([
  { id: 'S001', title: 'Data Literacy Bootcamp – Live Q&A', host: 'James Reyes', platform: 'Zoom', course: 'Data Literacy Bootcamp', date: 'Aug 14, 2026', time: '10:00 AM', duration: '90 min', attendees: 45, maxAttendees: 50, status: 'Upcoming' },
  { id: 'S002', title: 'JavaScript Deep Dive – Module 8', host: 'Alex Rivera', platform: 'Google Meet', course: 'JavaScript Fundamentals', date: 'Aug 13, 2026', time: '2:00 PM', duration: '60 min', attendees: 34, maxAttendees: 40, status: 'Live' },
  { id: 'S003', title: 'Leadership Coaching Session', host: 'Mark Torres', platform: 'Microsoft Teams', course: 'Leadership Essentials', date: 'Aug 13, 2026', time: '11:00 AM', duration: '45 min', attendees: 22, maxAttendees: 25, status: 'Completed' },
  { id: 'S004', title: 'Excel Masterclass – Pivot Tables', host: 'Carlos Wu', platform: 'Zoom', course: 'Excel Advanced Techniques', date: 'Aug 12, 2026', time: '3:00 PM', duration: '120 min', attendees: 38, maxAttendees: 50, status: 'Completed' },
  { id: 'S005', title: 'AI for Business – Intro Session', host: 'Alex Rivera', platform: 'Zoom', course: 'AI for Business', date: 'Aug 16, 2026', time: '9:00 AM', duration: '60 min', attendees: 0, maxAttendees: 60, status: 'Upcoming' },
])

const statusConfig: Record<string, string> = {
  'Live': 'bg-error/10 text-error',
  'Upcoming': 'bg-primary/10 text-primary',
  'Completed': 'bg-muted/30 text-muted',
}

const platformIcons: Record<string, string> = {
  'Zoom': 'i-simple-icons-zoom',
  'Google Meet': 'i-simple-icons-googlemeet',
  'Microsoft Teams': 'i-simple-icons-microsoftteams',
}

const showScheduleModal = ref(false)
const platforms = ['Zoom', 'Google Meet', 'Microsoft Teams']
const courseOptions = ['JavaScript Fundamentals', 'Leadership Essentials', 'Data Literacy Bootcamp', 'AI for Business']

const sessionColumns = [
  { id: 'session', header: 'Session' },
  { id: 'platform', header: 'Platform' },
  { id: 'dateTime', header: 'Date & Time' },
  { id: 'attendees', header: 'Attendees' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', meta: { class: { th: 'text-right', td: 'text-right' } } },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Live Classrooms</h1>
        <p class="text-muted text-sm mt-1">Seamless integration with Zoom, Teams, and Google Meet for hybrid learning</p>
      </div>
      <UButton icon="i-lucide-calendar-plus" label="Schedule Session" @click="showScheduleModal = true" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
            <p class="text-xs text-muted">{{ stat.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Live Now Banner -->
    <UCard v-if="sessions.some(s => s.status === 'Live')" :ui="{ root: 'shadow-sm ring-error/30 bg-error/5' }">
      <div class="flex items-center gap-4">
        <div class="size-3 rounded-full bg-error animate-pulse" />
        <div class="flex-1">
          <div v-for="s in sessions.filter(s => s.status === 'Live')" :key="s.id" class="flex items-center justify-between">
            <div>
              <p class="font-bold text-highlighted">{{ s.title }}</p>
              <p class="text-sm text-muted">Hosted by {{ s.host }} · {{ s.attendees }} attendees live</p>
            </div>
            <UButton label="Join Session" icon="i-lucide-video" color="error" />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Sessions Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="flex items-center justify-between px-5 py-4 border-b border-default">
        <h2 class="font-semibold text-highlighted">All Sessions</h2>
        <span class="text-sm text-muted">{{ sessions.length }} sessions</span>
      </div>
      <div class="overflow-x-auto">
        <UTable :data="sessions" :columns="sessionColumns" class="w-full">
          <template #session-cell="{ row }">
            <p class="font-medium text-highlighted">{{ row.original.title }}</p>
            <p class="text-xs text-dimmed">{{ row.original.host }} · {{ row.original.duration }}</p>
          </template>
          <template #platform-cell="{ row }">
            <div class="flex items-center gap-2">
              <UIcon :name="platformIcons[row.original.platform] || 'i-lucide-video'" class="size-4 text-muted" />
              <span class="text-muted text-xs">{{ row.original.platform }}</span>
            </div>
          </template>
          <template #dateTime-cell="{ row }">
            <p class="text-muted text-xs">{{ row.original.date }}</p>
            <p class="text-muted text-xs">{{ row.original.time }}</p>
          </template>
          <template #attendees-cell="{ row }">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-highlighted">{{ row.original.attendees }}</span>
              <span class="text-xs text-dimmed">/ {{ row.original.maxAttendees }}</span>
            </div>
          </template>
          <template #status-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]">{{ row.original.status }}</span>
          </template>
          <template #actions-cell="{ row }">
            <div class="flex items-center gap-1 justify-end">
              <UButton
                v-if="row.original.status === 'Live' || row.original.status === 'Upcoming'"
                :icon="row.original.status === 'Live' ? 'i-lucide-video' : 'i-lucide-link'"
                size="xs"
                :color="row.original.status === 'Live' ? 'error' : 'primary'"
                variant="soft"
                :label="row.original.status === 'Live' ? 'Join' : 'Copy Link'"
              />
              <UButton v-if="row.original.status === 'Completed'" icon="i-lucide-play-circle" size="xs" color="neutral" variant="ghost" label="Recording" />
            </div>
          </template>
          <template #empty>
            <UEmpty icon="i-lucide-video" title="No sessions found" />
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Schedule Session Modal -->
    <UModal v-model:open="showScheduleModal" title="Schedule Live Session" description="Set up a new synchronous learning session">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Session Title">
            <UInput placeholder="e.g. Module 5 Live Q&A" class="w-full" />
          </UFormField>
          <UFormField label="Course">
            <USelect :items="courseOptions" class="w-full" />
          </UFormField>
          <UFormField label="Platform">
            <USelect :items="platforms" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Date">
              <UInput type="date" class="w-full" />
            </UFormField>
            <UFormField label="Time">
              <UInput type="time" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Duration">
            <UInput placeholder="e.g. 60 min" class="w-full" />
          </UFormField>
          <UFormField label="Max Attendees">
            <UInput type="number" placeholder="50" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showScheduleModal = false" />
        <UButton label="Schedule Session" icon="i-lucide-calendar-plus" @click="showScheduleModal = false" />
      </template>
    </UModal>
  </div>
</template>
