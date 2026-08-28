<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const emailNotifs = ref(true)
const smsNotifs = ref(false)
const overdueAlerts = ref(true)
const reservationAlerts = ref(true)
const newArrivalAlerts = ref(false)
const loanPeriodStudent = ref(14)
const loanPeriodFaculty = ref(30)
const loanPeriodCommunity = ref(7)
const finePerDay = ref(5)
const maxFine = ref(500)
const gracePeriod = ref(1)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
      <p class="text-muted text-sm mt-1">Configure your library's loan policies, fine rates, and notification preferences.</p>
    </div>

    <!-- Library Profile -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-library" class="size-5 text-primary" />
          <h3 class="font-semibold text-highlighted">Library Profile</h3>
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="Library Name">
          <UInput model-value="CCCI University Library" class="w-full" />
        </UFormField>
        <UFormField label="Library Code">
          <UInput model-value="CCCI-LIB-001" class="w-full" />
        </UFormField>
        <UFormField label="Head Librarian">
          <UInput model-value="Maria Santos, MLIS" class="w-full" />
        </UFormField>
        <UFormField label="Library Email">
          <UInput model-value="library@ccci.edu.ph" type="email" class="w-full" />
        </UFormField>
      </div>
      <div class="flex justify-end mt-4">
        <UButton label="Save Profile" icon="i-lucide-save" color="primary" />
      </div>
    </UCard>

    <!-- Loan Policies -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-book-open" class="size-5 text-primary" />
          <h3 class="font-semibold text-highlighted">Loan Policies</h3>
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="Student Loan Period (days)">
          <UInput v-model="loanPeriodStudent" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Faculty Loan Period (days)">
          <UInput v-model="loanPeriodFaculty" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Community Loan Period (days)">
          <UInput v-model="loanPeriodCommunity" type="number" class="w-full" />
        </UFormField>
      </div>
      <div class="flex justify-end mt-4">
        <UButton label="Save Loan Policies" icon="i-lucide-save" color="primary" />
      </div>
    </UCard>

    <!-- Fine Settings -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-receipt" class="size-5 text-primary" />
          <h3 class="font-semibold text-highlighted">Fine Settings</h3>
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="Fine per Day (₱)">
          <UInput v-model="finePerDay" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Maximum Fine Cap (₱)">
          <UInput v-model="maxFine" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Grace Period (days)">
          <UInput v-model="gracePeriod" type="number" class="w-full" />
        </UFormField>
      </div>
      <div class="flex justify-end mt-4">
        <UButton label="Save Fine Settings" icon="i-lucide-save" color="primary" />
      </div>
    </UCard>

    <!-- Notification Preferences -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-bell" class="size-5 text-primary" />
          <h3 class="font-semibold text-highlighted">Notification Preferences</h3>
        </div>
      </template>
      <div class="space-y-4">
        <div class="flex items-center justify-between py-2 border-b border-default">
          <div>
            <p class="text-sm font-medium text-highlighted">Email Notifications</p>
            <p class="text-xs text-muted">Send due date reminders and overdue alerts via email.</p>
          </div>
          <UToggle v-model="emailNotifs" color="primary" />
        </div>
        <div class="flex items-center justify-between py-2 border-b border-default">
          <div>
            <p class="text-sm font-medium text-highlighted">SMS Notifications</p>
            <p class="text-xs text-muted">Send return reminders via SMS (requires Twilio integration).</p>
          </div>
          <UToggle v-model="smsNotifs" color="primary" />
        </div>
        <div class="flex items-center justify-between py-2 border-b border-default">
          <div>
            <p class="text-sm font-medium text-highlighted">Overdue Alerts</p>
            <p class="text-xs text-muted">Notify librarians when items become overdue.</p>
          </div>
          <UToggle v-model="overdueAlerts" color="primary" />
        </div>
        <div class="flex items-center justify-between py-2 border-b border-default">
          <div>
            <p class="text-sm font-medium text-highlighted">Reservation Ready Alerts</p>
            <p class="text-xs text-muted">Notify patrons when a reserved item is available for pickup.</p>
          </div>
          <UToggle v-model="reservationAlerts" color="primary" />
        </div>
        <div class="flex items-center justify-between py-2">
          <div>
            <p class="text-sm font-medium text-highlighted">New Arrival Announcements</p>
            <p class="text-xs text-muted">Notify all active members when new titles are added.</p>
          </div>
          <UToggle v-model="newArrivalAlerts" color="primary" />
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <UButton label="Save Preferences" icon="i-lucide-save" color="primary" />
      </div>
    </UCard>

    <!-- Danger zone -->
    <UCard class="border-error/30">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-alert-triangle" class="size-5 text-error" />
          <h3 class="font-semibold text-error">Danger Zone</h3>
        </div>
      </template>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-highlighted">Reset All Library Data</p>
          <p class="text-xs text-muted">Permanently delete all catalog entries, loans, and patron records. This cannot be undone.</p>
        </div>
        <UButton label="Reset Data" color="error" variant="outline" icon="i-lucide-trash-2" />
      </div>
    </UCard>
  </div>
</template>
