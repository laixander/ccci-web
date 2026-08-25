<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Settings'
})

const tabs = [
  { id: 'profile', label: 'Executive Profile' },
  { id: 'users', label: 'User Management' },
  { id: 'notifications', label: 'Notification Prefs' },
  { id: 'api', label: 'Data Sources' }
]

const activeTab = ref('profile')

const users = [
  { id: 1, name: 'Chief Executive', email: 'ceo@organization.ph', role: 'CEO', status: 'Active' },
  { id: 2, name: 'Chief Financial Officer', email: 'cfo@organization.ph', role: 'CFO', status: 'Active' },
]

const userColumns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' }
]

const notificationSettings = ref({
  emailAlerts: true,
  smsAlerts: true,
  weeklyDigest: true,
  kpiAlerts: true,
  boardReportReminders: true
})

const connectedModules = [
  { name: 'HRIS', icon: 'i-lucide-users', synced: '30 min ago' },
  { name: 'CMS', icon: 'i-lucide-graduation-cap', synced: '1 hour ago' },
  { name: 'LMS', icon: 'i-lucide-book-open', synced: '2 hours ago' },
  { name: 'AMS', icon: 'i-lucide-boxes', synced: '1 hour ago' },
  { name: 'AISSP', icon: 'i-lucide-network', synced: '4 hours ago' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">System Settings</h1>
      <p class="text-muted mt-1">Configure your ExecIS preferences and connected data sources.</p>
    </div>

    <div class="grid lg:grid-cols-4 gap-6">
      <div class="lg:col-span-1 space-y-2">
        <UButton
          v-for="tab in tabs"
          :key="tab.id"
          :color="activeTab === tab.id ? 'primary' : 'neutral'"
          :variant="activeTab === tab.id ? 'soft' : 'ghost'"
          block
          class="justify-start"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </UButton>
      </div>

      <div class="lg:col-span-3">
        <!-- Profile Tab -->
        <UCard v-if="activeTab === 'profile'">
          <template #header>
            <h3 class="font-semibold text-highlighted">Executive Profile</h3>
          </template>
          <div class="space-y-4">
            <UFormField label="Organization Name">
              <UInput value="Demo Organization Inc." disabled />
            </UFormField>
            <UFormField label="Executive Title">
              <UInput value="Chief Executive Officer" />
            </UFormField>
            <UFormField label="Contact Email">
              <UInput value="ceo@organization.ph" />
            </UFormField>
            <UFormField label="Address">
              <UTextarea value="30F Ayala Tower One, Makati City" :rows="3" />
            </UFormField>
            <div class="pt-4 flex justify-end">
              <UButton color="primary">Save Changes</UButton>
            </div>
          </div>
        </UCard>

        <!-- Users Tab -->
        <UCard v-if="activeTab === 'users'" :ui="{ body: 'p-0 sm:p-0' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-highlighted">User Management</h3>
              <UButton icon="i-lucide-plus" size="sm" color="primary">Add User</UButton>
            </div>
          </template>
          <UTable class="scrollbar" :data="users" :columns="userColumns">
            <template #status-cell="{ row }">
              <UBadge color="success" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
            </template>
            <template #actions-cell>
              <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="ghost" icon="i-lucide-edit-2" />
                <UButton color="neutral" variant="ghost" icon="i-lucide-trash" />
              </div>
            </template>
          </UTable>
        </UCard>

        <!-- Notifications Tab -->
        <UCard v-if="activeTab === 'notifications'">
          <template #header>
            <h3 class="font-semibold text-highlighted">Notification Preferences</h3>
          </template>
          <div class="space-y-6">
            <div class="space-y-4">
              <h4 class="font-medium text-highlighted">Delivery Methods</h4>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Email Alerts</p>
                  <p class="text-sm text-muted">Receive notifications via email</p>
                </div>
                <USwitch v-model="notificationSettings.emailAlerts" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">SMS Alerts</p>
                  <p class="text-sm text-muted">Receive critical alerts via SMS</p>
                </div>
                <USwitch v-model="notificationSettings.smsAlerts" />
              </div>
            </div>
            <hr class="border-default" />
            <div class="space-y-4">
              <h4 class="font-medium text-highlighted">Alert Types</h4>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">KPI Threshold Alerts</p>
                  <p class="text-sm text-muted">Instant alerts when KPIs breach targets</p>
                </div>
                <USwitch v-model="notificationSettings.kpiAlerts" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Board Report Reminders</p>
                  <p class="text-sm text-muted">Reminders before board report deadlines</p>
                </div>
                <USwitch v-model="notificationSettings.boardReportReminders" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Weekly Digest</p>
                  <p class="text-sm text-muted">A weekly executive summary of all KPIs</p>
                </div>
                <USwitch v-model="notificationSettings.weeklyDigest" />
              </div>
            </div>
            <div class="pt-4 flex justify-end">
              <UButton color="primary">Save Preferences</UButton>
            </div>
          </div>
        </UCard>

        <!-- Data Sources Tab -->
        <UCard v-if="activeTab === 'api'">
          <template #header>
            <h3 class="font-semibold text-highlighted">Connected Data Sources</h3>
          </template>
          <div class="space-y-3">
            <div
              v-for="mod in connectedModules"
              :key="mod.name"
              class="flex items-center justify-between p-3 border border-default rounded-lg"
            >
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary/10 rounded-md text-primary">
                  <UIcon :name="mod.icon" class="size-5" />
                </div>
                <div>
                  <p class="font-medium text-highlighted text-sm">{{ mod.name }}</p>
                  <p class="text-xs text-muted">Last synced: {{ mod.synced }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UBadge color="success" variant="subtle" size="sm">Connected</UBadge>
                <UButton color="error" variant="ghost" size="sm">Disconnect</UButton>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
