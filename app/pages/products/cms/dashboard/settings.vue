<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const allowLateEnrollment = ref(false)
const notifyOnGradeSubmission = ref(true)
const autoApproveTranscripts = ref(false)
const academicYear = ref('2026-2027')
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
      <p class="text-muted text-sm mt-1">Manage your campus system preferences and academic configurations.</p>
    </div>
    
    <UCard :ui="{ root: 'shadow-sm' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Academic Configuration</h2>
        <p class="text-xs text-muted mt-1">Global settings for the current academic term.</p>
      </template>
      <div class="space-y-4">
        <UFormGroup label="Active Academic Year" description="Set the default academic year for queries and reports.">
          <USelect v-model="academicYear" :items="['2025-2026', '2026-2027', '2027-2028']" class="max-w-xs mt-2" />
        </UFormGroup>
      </div>
    </UCard>

    <UCard :ui="{ root: 'shadow-sm' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">System Preferences</h2>
        <p class="text-xs text-muted mt-1">Control automation and enrollment behaviors.</p>
      </template>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Allow Late Enrollments</p>
            <p class="text-xs text-muted">Permit students to enroll after the standard deadline with a penalty flag.</p>
          </div>
          <USwitch v-model="allowLateEnrollment" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Grade Submission Alerts</p>
            <p class="text-xs text-muted">Notify the registrar office when a faculty member submits final grades.</p>
          </div>
          <USwitch v-model="notifyOnGradeSubmission" color="primary" />
        </div>
        <UDivider />
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm text-highlighted">Auto-Approve Official Transcripts</p>
            <p class="text-xs text-muted">Automatically process standard transcript requests without manual review.</p>
          </div>
          <USwitch v-model="autoApproveTranscripts" color="primary" />
        </div>
      </div>
    </UCard>
  </div>
</template>
