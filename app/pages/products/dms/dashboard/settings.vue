<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const activeTab = ref(0)

const tabs = [
  { label: 'Storage & Retention', icon: 'i-lucide-hard-drive' },
  { label: 'Security & Watermarks', icon: 'i-lucide-shield' },
  { label: 'Integrations', icon: 'i-lucide-plug' },
]

// Storage Settings State
const storageSettings = reactive({
  defaultQuota: 50,
  enableVersioning: true,
  maxVersions: 10,
  retentionPeriod: '7 Years',
  autoArchive: true,
  archiveAfterDays: 365
})

// Security Settings State
const securitySettings = reactive({
  forceWatermark: true,
  watermarkText: 'CONFIDENTIAL - DOCUCORE',
  preventDownloads: false,
  requireMFA: true,
  sessionTimeoutMinutes: 30
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">DMS Settings</h1>
        <p class="text-muted text-sm mt-1">Configure storage policies, security features, and system integrations</p>
      </div>
      <UButton label="Save Changes" size="sm" />
    </div>

    <!-- Tabs Layout -->
    <div class="flex flex-col md:flex-row gap-6">
      
      <!-- Side Tabs Navigation -->
      <div class="w-full md:w-64 shrink-0">
        <UCard :ui="{ root: 'shadow-sm', body: 'p-2' }">
          <nav class="space-y-1">
            <button
              v-for="(tab, index) in tabs"
              :key="tab.label"
              @click="activeTab = index"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
              :class="activeTab === index ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-muted/30 hover:text-highlighted'"
            >
              <UIcon :name="tab.icon" class="size-4 shrink-0" />
              {{ tab.label }}
            </button>
          </nav>
        </UCard>
      </div>

      <!-- Settings Content Area -->
      <div class="flex-1">
        
        <!-- Storage & Retention Tab -->
        <div v-show="activeTab === 0" class="space-y-6">
          <UCard :ui="{ root: 'shadow-sm' }">
            <template #header>
              <h2 class="font-semibold text-highlighted">Storage Policies</h2>
              <p class="text-xs text-muted mt-1">Manage how documents are stored and versioned</p>
            </template>
            
            <div class="space-y-6">
              <UFormField label="Default User Storage Quota (GB)" description="The maximum storage space allocated to new users by default.">
                <div class="max-w-xs">
                  <UInput v-model="storageSettings.defaultQuota" type="number" />
                </div>
              </UFormField>

              <UFormField label="Document Versioning">
                <div class="flex flex-col gap-4">
                  <UCheckbox v-model="storageSettings.enableVersioning" label="Enable automatic version history for all documents" />
                  
                  <div v-if="storageSettings.enableVersioning" class="pl-7 max-w-xs space-y-2">
                    <label class="text-xs text-muted">Maximum versions to keep per document</label>
                    <UInput v-model="storageSettings.maxVersions" type="number" />
                  </div>
                </div>
              </UFormField>
            </div>
          </UCard>

          <UCard :ui="{ root: 'shadow-sm' }">
            <template #header>
              <h2 class="font-semibold text-highlighted">Data Retention</h2>
              <p class="text-xs text-muted mt-1">Configure compliance and archiving rules</p>
            </template>
            
            <div class="space-y-6">
              <UFormField label="Global Retention Period" description="How long deleted documents are kept in the system before permanent deletion.">
                <div class="max-w-xs">
                  <USelect v-model="storageSettings.retentionPeriod" :items="['30 Days', '1 Year', '3 Years', '7 Years', 'Indefinite']" />
                </div>
              </UFormField>

              <UFormField label="Auto-Archiving">
                <div class="flex flex-col gap-4">
                  <UCheckbox v-model="storageSettings.autoArchive" label="Automatically move inactive documents to cold storage" />
                  
                  <div v-if="storageSettings.autoArchive" class="pl-7 max-w-xs space-y-2">
                    <label class="text-xs text-muted">Days of inactivity before archiving</label>
                    <UInput v-model="storageSettings.archiveAfterDays" type="number" />
                  </div>
                </div>
              </UFormField>
            </div>
          </UCard>
        </div>

        <!-- Security & Watermarks Tab -->
        <div v-show="activeTab === 1" class="space-y-6">
          <UCard :ui="{ root: 'shadow-sm' }">
            <template #header>
              <h2 class="font-semibold text-highlighted">Watermarking</h2>
              <p class="text-xs text-muted mt-1">Protect document confidentiality</p>
            </template>
            
            <div class="space-y-6">
              <UFormField label="Dynamic Watermarks">
                <div class="flex flex-col gap-4">
                  <UCheckbox v-model="securitySettings.forceWatermark" label="Force watermarks on all viewed and printed documents" />
                  
                  <div v-if="securitySettings.forceWatermark" class="pl-7 max-w-md space-y-2">
                    <label class="text-xs text-muted">Custom Watermark Text (Variables allowed: {User}, {Date})</label>
                    <UInput v-model="securitySettings.watermarkText" type="text" />
                  </div>
                </div>
              </UFormField>

              <UFormField label="Download Restrictions">
                <UCheckbox v-model="securitySettings.preventDownloads" label="Prevent downloading of documents marked as 'Highly Confidential'" />
              </UFormField>
            </div>
          </UCard>
          
          <UCard :ui="{ root: 'shadow-sm' }">
            <template #header>
              <h2 class="font-semibold text-highlighted">Access Security</h2>
            </template>
            
            <div class="space-y-6">
              <UFormField label="Multi-Factor Authentication">
                <UCheckbox v-model="securitySettings.requireMFA" label="Require MFA for accessing sensitive document folders" />
              </UFormField>
              
              <UFormField label="Session Timeout (Minutes)" description="Automatically log users out of DocuCore after a period of inactivity.">
                <div class="max-w-xs">
                  <UInput v-model="securitySettings.sessionTimeoutMinutes" type="number" />
                </div>
              </UFormField>
            </div>
          </UCard>
        </div>

        <!-- Integrations Tab -->
        <div v-show="activeTab === 2" class="space-y-6">
          <UCard :ui="{ root: 'shadow-sm' }">
            <template #header>
              <h2 class="font-semibold text-highlighted">Connected Apps</h2>
              <p class="text-xs text-muted mt-1">Manage external integrations and API keys</p>
            </template>
            
            <div class="flex items-center justify-between py-4 border-b border-default">
              <div class="flex items-center gap-3">
                <UIcon name="i-simple-icons-microsoft" class="size-6 text-[#00a4ef]" />
                <div>
                  <p class="font-medium text-sm text-highlighted">Microsoft Office 365</p>
                  <p class="text-xs text-muted">Edit documents directly in Word, Excel, and PowerPoint Online.</p>
                </div>
              </div>
              <UButton label="Disconnect" color="error" variant="ghost" size="xs" />
            </div>
            
            <div class="flex items-center justify-between py-4 border-b border-default">
              <div class="flex items-center gap-3">
                <UIcon name="i-simple-icons-docusign" class="size-6 text-[#000000] dark:text-white" />
                <div>
                  <p class="font-medium text-sm text-highlighted">DocuSign</p>
                  <p class="text-xs text-muted">Advanced e-signature routing and legal compliance.</p>
                </div>
              </div>
              <UButton label="Connect" color="neutral" variant="outline" size="xs" />
            </div>
          </UCard>
        </div>

      </div>
    </div>
  </div>
</template>
