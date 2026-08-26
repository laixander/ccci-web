<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const emailNotifications = ref(true)
const pushNotifications = ref(true)
const atRiskAlerts = ref(true)
const weeklyFitnessReport = ref(false)
const assessmentReminders = ref(true)
const language = ref('English')
const defaultGradeLevel = ref('All')
const passingScore = ref('75')
const fitnessStandard = ref('DepEd Physical Fitness Test')
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
      <p class="text-muted text-sm mt-1">Manage your KineticsCore account preferences and assessment configurations.</p>
    </div>

    <!-- Notifications -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-highlighted">Notifications</h2>
        <p class="text-xs text-muted mt-1">Control how you receive alerts and fitness updates.</p>
      </template>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Email Notifications</p>
            <p class="text-xs text-muted">Receive assessment results and program updates via email.</p>
          </div>
          <USwitch v-model="emailNotifications" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Push Notifications</p>
            <p class="text-xs text-muted">Receive instant alerts in your browser for pending assessments.</p>
          </div>
          <USwitch v-model="pushNotifications" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">At-Risk Alerts</p>
            <p class="text-xs text-muted">Get notified immediately when an individual is flagged as at-risk.</p>
          </div>
          <USwitch v-model="atRiskAlerts" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Weekly Fitness Summary</p>
            <p class="text-xs text-muted">Receive a weekly email summarizing assessment activity and pass rates.</p>
          </div>
          <USwitch v-model="weeklyFitnessReport" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Assessment Reminders</p>
            <p class="text-xs text-muted">Get reminded before scheduled fitness testing sessions.</p>
          </div>
          <USwitch v-model="assessmentReminders" color="primary" />
        </div>
      </div>
    </UCard>

    <!-- Assessment Configuration -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-highlighted">Assessment Configuration</h2>
        <p class="text-xs text-muted mt-1">Set default parameters for fitness assessments and grading.</p>
      </template>
      <div class="space-y-5">
        <UFormField label="Fitness Standard" description="Select the national fitness test standard to use.">
          <USelect
            v-model="fitnessStandard"
            :items="['DepEd Physical Fitness Test', 'ACSM Standards', 'WHO Physical Activity Guidelines', 'Custom']"
            class="max-w-xs mt-2"
          />
        </UFormField>
        <UDivider />
        <UFormField label="Default Passing Score" description="Minimum score required to pass a fitness assessment (0–100).">
          <UInput v-model="passingScore" type="number" min="0" max="100" class="max-w-xs mt-2" />
        </UFormField>
        <UDivider />
        <UFormField label="Default Grade Level Filter" description="Set the default grade level shown when opening assessments.">
          <USelect
            v-model="defaultGradeLevel"
            :items="['All', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']"
            class="max-w-xs mt-2"
          />
        </UFormField>
      </div>
    </UCard>

    <!-- Regional -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-highlighted">Regional</h2>
        <p class="text-xs text-muted mt-1">Configure your language and localization preferences.</p>
      </template>
      <div class="space-y-4">
        <UFormField label="Language" description="Select your preferred interface language.">
          <USelect v-model="language" :items="['English', 'Filipino', 'Spanish']" class="max-w-xs mt-2" />
        </UFormField>
      </div>
    </UCard>

    <!-- Save -->
    <div class="flex justify-end gap-3">
      <UButton label="Reset to Defaults" color="neutral" variant="outline" />
      <UButton label="Save Settings" icon="i-lucide-save" />
    </div>
  </div>
</template>
