<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const emailNotifications = ref(true)
const pushNotifications = ref(true)
const criticalAlerts = ref(true)
const capaReminders = ref(true)
const weeklyReport = ref(false)
const language = ref('English')
const defaultSeverity = ref('All')
const defaultSite = ref('All Sites')
const incidentAutoEscalate = ref('High')
const reportingStandard = ref('DOLE OSH Standards (RA 11058)')

const toast = useToast()
const handleSave = () => {
  toast.add({ title: 'Settings Saved', description: 'Your SafeReport preferences have been updated.', color: 'success', icon: 'i-lucide-check-circle' })
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
      <p class="text-muted text-sm mt-1">Manage your SafeReport account preferences and incident configuration.</p>
    </div>

    <!-- Notifications -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-highlighted">Notifications</h2>
        <p class="text-xs text-muted mt-1">Control how you receive incident alerts and safety updates.</p>
      </template>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Email Notifications</p>
            <p class="text-xs text-muted">Receive incident reports and CAPA updates via email.</p>
          </div>
          <USwitch v-model="emailNotifications" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Push Notifications</p>
            <p class="text-xs text-muted">Receive instant alerts in your browser for new incidents.</p>
          </div>
          <USwitch v-model="pushNotifications" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Critical Incident Alerts</p>
            <p class="text-xs text-muted">Get notified immediately when a critical incident is reported.</p>
          </div>
          <USwitch v-model="criticalAlerts" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">CAPA Due Reminders</p>
            <p class="text-xs text-muted">Get reminded 48 hours before a CAPA action is due.</p>
          </div>
          <USwitch v-model="capaReminders" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Weekly Safety Summary</p>
            <p class="text-xs text-muted">Receive a weekly email with incident counts, trends, and CAPA status.</p>
          </div>
          <USwitch v-model="weeklyReport" color="primary" />
        </div>
      </div>
    </UCard>

    <!-- Incident Configuration -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-highlighted">Incident Configuration</h2>
        <p class="text-xs text-muted mt-1">Set default parameters for incident reporting and escalation.</p>
      </template>
      <div class="space-y-5">
        <UFormField label="Reporting Standard" description="Select the regulatory compliance standard used for report generation.">
          <USelect v-model="reportingStandard" :items="['DOLE OSH Standards (RA 11058)', 'ISO 45001:2018', 'OSHA Standards', 'Custom']" class="max-w-xs mt-2" />
        </UFormField>
        <UDivider />
        <UFormField label="Auto-Escalation Threshold" description="Incidents at this severity or higher will automatically alert management.">
          <USelect v-model="incidentAutoEscalate" :items="['Critical', 'High', 'Medium', 'All']" class="max-w-xs mt-2" />
        </UFormField>
        <UDivider />
        <UFormField label="Default Severity Filter" description="Set the default severity shown when opening the incident list.">
          <USelect v-model="defaultSeverity" :items="['All', 'Critical', 'High', 'Medium', 'Low']" class="max-w-xs mt-2" />
        </UFormField>
        <UDivider />
        <UFormField label="Default Site" description="Set the default site/location shown on the dashboard and reports.">
          <USelect v-model="defaultSite" :items="['All Sites', 'Main Plant', 'Warehouse A', 'R&D Building', 'Office Block B']" class="max-w-xs mt-2" />
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
      <UButton label="Save Settings" icon="i-lucide-save" @click="handleSave" />
    </div>
  </div>
</template>
