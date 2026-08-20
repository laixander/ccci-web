<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const emailNotifications = ref(true)
const pushNotifications = ref(true)
const weeklySummary = ref(false)
const language = ref('English')
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
      <p class="text-muted text-sm mt-1">Manage your HRIS account preferences and configurations.</p>
    </div>
    
    <UCard :ui="{ root: 'shadow-sm' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Notifications</h2>
        <p class="text-xs text-muted mt-1">Control how you receive updates and alerts.</p>
      </template>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Email Notifications</p>
            <p class="text-xs text-muted">Receive updates about your leaves, payroll, and tasks via email.</p>
          </div>
          <USwitch v-model="emailNotifications" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Push Notifications</p>
            <p class="text-xs text-muted">Receive instant alerts in your browser.</p>
          </div>
          <USwitch v-model="pushNotifications" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Weekly Summary</p>
            <p class="text-xs text-muted">Get a weekly email summary of your pending HR tasks.</p>
          </div>
          <USwitch v-model="weeklySummary" color="primary" />
        </div>
      </div>
    </UCard>

    <UCard :ui="{ root: 'shadow-sm' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Regional</h2>
        <p class="text-xs text-muted mt-1">Configure your language and timezone preferences.</p>
      </template>
      <div class="space-y-4">
        <UFormGroup label="Language" description="Select your preferred language for the interface.">
          <USelect v-model="language" :items="['English', 'Spanish', 'French']" class="max-w-xs mt-2" />
        </UFormGroup>
      </div>
    </UCard>
  </div>
</template>
