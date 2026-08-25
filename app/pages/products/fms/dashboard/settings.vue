<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Settings'
})

const tabs = [
  { id: 'profile', label: 'Financial Profile' },
  { id: 'users', label: 'User Management' },
  { id: 'notifications', label: 'Notification Prefs' },
  { id: 'api', label: 'Banking & API' }
]

const activeTab = ref('profile')

const users = [
  { id: 1, name: 'Chief Financial Officer', email: 'cfo@organization.ph', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jsmith@organization.ph', role: 'Accountant', status: 'Active' },
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
  budgetOverruns: true,
  pendingApprovals: true,
  bankSyncIssues: true
})

const connectedBanks = [
  { name: 'BDO Unibank', account: '**** 1234', synced: '1 hour ago', status: 'Connected' },
  { name: 'Bank of the Philippine Islands (BPI)', account: '**** 5678', synced: '1 day ago', status: 'Error' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">System Settings</h1>
      <p class="text-muted mt-1">Configure your FMS preferences, users, and bank feeds.</p>
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
            <h3 class="font-semibold text-highlighted">Financial Profile</h3>
          </template>
          <div class="space-y-4">
            <UFormField label="Company Name">
              <UInput value="Demo Organization Inc." />
            </UFormField>
            <UFormField label="Tax Identification Number (TIN)">
              <UInput value="000-123-456-000" />
            </UFormField>
            <UFormField label="Fiscal Year Start">
              <USelect :items="['January', 'April', 'July', 'October']" value="January" />
            </UFormField>
            <UFormField label="Base Currency">
              <UInput value="PHP (₱)" disabled />
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
                  <p class="font-medium">Budget Overruns</p>
                  <p class="text-sm text-muted">Alerts when a department exceeds their budget</p>
                </div>
                <USwitch v-model="notificationSettings.budgetOverruns" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Pending Approvals</p>
                  <p class="text-sm text-muted">Reminders for POs or invoices needing approval</p>
                </div>
                <USwitch v-model="notificationSettings.pendingApprovals" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Bank Sync Issues</p>
                  <p class="text-sm text-muted">Alerts when bank feeds fail to synchronize</p>
                </div>
                <USwitch v-model="notificationSettings.bankSyncIssues" />
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
            <h3 class="font-semibold text-highlighted">Banking & API Integrations</h3>
          </template>
          <div class="space-y-4">
            <div class="pt-2">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-medium text-highlighted">Connected Bank Feeds</h4>
                <UButton size="sm" color="neutral" variant="outline" icon="i-lucide-plus">Add Bank Account</UButton>
              </div>
              <div class="space-y-3">
                <div
                  v-for="bank in connectedBanks"
                  :key="bank.account"
                  class="flex items-center justify-between p-3 border border-default rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-primary/10 rounded-md text-primary">
                      <UIcon name="i-lucide-building-2" class="size-5" />
                    </div>
                    <div>
                      <p class="font-medium text-highlighted text-sm">{{ bank.name }} ({{ bank.account }})</p>
                      <p class="text-xs text-muted">Last synced: {{ bank.synced }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <UBadge :color="bank.status === 'Connected' ? 'success' : 'error'" variant="subtle" size="sm">{{ bank.status }}</UBadge>
                    <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-more-horizontal" />
                  </div>
                </div>
              </div>
            </div>
            
            <hr class="border-default my-4" />

            <div class="p-4 rounded-lg border border-default bg-muted/30">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-highlighted">REST API Key</h4>
                <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-copy">Copy</UButton>
              </div>
              <p class="text-xs text-muted mb-2">Use this key to integrate external ERPs or custom applications with the FMS.</p>
              <p class="font-mono text-sm break-all text-muted">sk_live_51Mxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <div class="mt-4">
                <UButton color="neutral" variant="outline" size="sm">Regenerate Key</UButton>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
