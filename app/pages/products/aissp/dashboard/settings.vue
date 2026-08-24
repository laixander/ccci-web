<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Settings'
})

const tabs = [
  { id: 'profile', label: 'Agency Profile' },
  { id: 'users', label: 'User Management' },
  { id: 'notifications', label: 'Notification Prefs' },
  { id: 'api', label: 'API & Integrations' }
]

const activeTab = ref('profile')

const users = [
  { id: 1, name: 'Admin User', email: 'admin@agency.gov.ph', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'John Doe', email: 'johndoe@agency.gov.ph', role: 'IT Manager', status: 'Active' },
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
  smsAlerts: false,
  weeklyDigest: true,
  budgetAlerts: true,
  complianceDeadlines: true
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">System Settings</h1>
      <p class="text-muted mt-1">Configure your AISSP preferences and agency profile.</p>
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
            <h3 class="font-semibold text-highlighted">Agency Profile</h3>
          </template>
          <div class="space-y-4">
            <UFormField label="Agency Name">
              <UInput value="Demo Government Agency" disabled />
            </UFormField>
            <UFormField label="Contact Email">
              <UInput value="it.admin@agency.gov.ph" />
            </UFormField>
            <UFormField label="Website">
              <UInput value="https://agency.gov.ph" />
            </UFormField>
            <UFormField label="Address">
              <UTextarea value="National Government Center, Quezon City" :rows="3" />
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
          <UTable :data="users" :columns="userColumns">
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
                  <p class="font-medium">Compliance Deadlines</p>
                  <p class="text-sm text-muted">Alerts when audit or submission deadlines are approaching</p>
                </div>
                <USwitch v-model="notificationSettings.complianceDeadlines" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Budget Thresholds</p>
                  <p class="text-sm text-muted">Reminders when IT project budgets are near capacity</p>
                </div>
                <USwitch v-model="notificationSettings.budgetAlerts" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Weekly Digest</p>
                  <p class="text-sm text-muted">A summary of the week's ICT activities</p>
                </div>
                <USwitch v-model="notificationSettings.weeklyDigest" />
              </div>
            </div>
            <div class="pt-4 flex justify-end">
              <UButton color="primary">Save Preferences</UButton>
            </div>
          </div>
        </UCard>

        <!-- API Tab -->
        <UCard v-if="activeTab === 'api'">
          <template #header>
            <h3 class="font-semibold text-highlighted">API & Integrations</h3>
          </template>
          <div class="space-y-4">
            <div class="p-4 rounded-lg border border-default bg-muted/30">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-highlighted">REST API Key</h4>
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-copy">Copy</UButton>
              </div>
              <p class="font-mono text-sm break-all text-muted">sk_live_51Mxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <div class="mt-4">
                <UButton color="neutral" variant="outline" size="sm">Regenerate Key</UButton>
              </div>
            </div>

            <div class="pt-2">
              <h4 class="font-medium text-highlighted mb-3">Connected Systems</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 border border-default rounded-lg">
                  <div class="flex items-center gap-3">
                     <div class="p-2 bg-primary/10 rounded-md text-primary">
                      <UIcon name="i-lucide-users" class="size-5" />
                    </div>
                    <div>
                      <p class="font-medium text-highlighted text-sm">Human Resource Information System (HRIS)</p>
                      <p class="text-xs text-muted">Last synced: 2 hours ago</p>
                    </div>
                  </div>
                  <UButton color="error" variant="ghost" size="sm">Disconnect</UButton>
                </div>
                <div class="flex items-center justify-between p-3 border border-default rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-primary/10 rounded-md text-primary">
                      <UIcon name="i-lucide-wallet" class="size-5" />
                    </div>
                    <div>
                      <p class="font-medium text-highlighted text-sm">Financial Management System (FMS)</p>
                      <p class="text-xs text-muted">Last synced: 1 day ago</p>
                    </div>
                  </div>
                  <UButton color="error" variant="ghost" size="sm">Disconnect</UButton>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
