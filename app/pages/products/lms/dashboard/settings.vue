<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const deadlineReminders = ref(true)
const newCourseAlerts = ref(true)
const certificateAlerts = ref(true)
const autoplayVideos = ref(false)
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
      <p class="text-muted text-sm mt-1">Manage your learning preferences and alerts.</p>
    </div>
    
    <UCard :ui="{ root: 'shadow-sm' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Learning Preferences</h2>
        <p class="text-xs text-muted mt-1">Control your training and course settings.</p>
      </template>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Autoplay Videos</p>
            <p class="text-xs text-muted">Automatically play course videos when navigating to a new lesson.</p>
          </div>
          <USwitch v-model="autoplayVideos" color="primary" />
        </div>
      </div>
    </UCard>

    <UCard :ui="{ root: 'shadow-sm' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Notifications</h2>
        <p class="text-xs text-muted mt-1">Stay on top of your learning goals.</p>
      </template>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Deadline Reminders</p>
            <p class="text-xs text-muted">Get alerted when a course deadline is approaching.</p>
          </div>
          <USwitch v-model="deadlineReminders" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">New Course Assignments</p>
            <p class="text-xs text-muted">Be notified immediately when you are enrolled in a new course.</p>
          </div>
          <USwitch v-model="newCourseAlerts" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Certificates</p>
            <p class="text-xs text-muted">Receive an alert when you earn a new certification.</p>
          </div>
          <USwitch v-model="certificateAlerts" color="primary" />
        </div>
      </div>
    </UCard>
  </div>
</template>
