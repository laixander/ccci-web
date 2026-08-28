<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ layout: 'dashboard' })

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  type: z.string().min(1, 'Please select an incident type'),
  severity: z.string().min(1, 'Please select severity'),
  location: z.string().min(1, 'Location is required'),
  date: z.string().min(1, 'Date and time is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: '',
  type: '',
  severity: '',
  location: '',
  date: '',
  description: '',
})

const incidentTypes = ['Slip & Fall', 'Near-Miss', 'Equipment Malfunction', 'Chemical Spill', 'Fire / Explosion', 'Electrical Hazard', 'Ergonomic Injury', 'Vehicle / Forklift', 'Other']
const severities = ['Critical', 'High', 'Medium', 'Low']
const loading = ref(false)
const toast = useToast()

const handleSubmit = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  loading.value = false
  toast.add({ title: 'Incident Reported', description: 'IRS-009 has been created and assigned for review.', color: 'success', icon: 'i-lucide-check-circle' })
  navigateTo('/products/irs/dashboard/incidents')
}
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <div>
      <h1 class="text-2xl font-bold text-highlighted">Report New Incident</h1>
      <p class="text-muted text-sm mt-1">Log a workplace accident, near-miss, or safety hazard. All fields marked * are required.</p>
    </div>

    <UCard>
      <UForm :schema="schema" :state="state" class="space-y-6" @submit="handleSubmit">
        <UFormField label="Incident Title *" name="title" description="A short, clear description of what happened.">
          <UInput v-model="state.title" placeholder="e.g. Forklift near-miss at Warehouse Bay 3" class="w-full mt-1" size="lg" />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <UFormField label="Incident Type *" name="type">
            <USelect v-model="state.type" :items="incidentTypes" placeholder="Select type" class="w-full mt-1" size="lg" />
          </UFormField>
          <UFormField label="Severity *" name="severity">
            <USelect v-model="state.severity" :items="severities" placeholder="Select severity" class="w-full mt-1" size="lg" />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <UFormField label="Location *" name="location" description="Building, floor, or area where incident occurred.">
            <UInput v-model="state.location" placeholder="e.g. Warehouse A, Bay 3" class="w-full mt-1" size="lg" />
          </UFormField>
          <UFormField label="Date & Time *" name="date">
            <UInput v-model="state.date" type="datetime-local" class="w-full mt-1" size="lg" />
          </UFormField>
        </div>

        <UFormField label="Detailed Description *" name="description" description="Describe what happened, what injuries or damage occurred, and any immediate actions taken.">
          <UTextarea v-model="state.description" placeholder="Describe the incident in detail..." :rows="5" class="w-full mt-1" size="lg" />
        </UFormField>

        <!-- Tips panel -->
        <div class="rounded-xl bg-primary/5 border border-primary/10 p-4 flex gap-3">
          <UIcon name="i-lucide-info" class="size-5 text-primary shrink-0 mt-0.5" />
          <div class="text-sm text-muted space-y-1">
            <p class="font-semibold text-highlighted">Before submitting</p>
            <p>Ensure the area is safe and any injured individuals have received first aid. Preserve the scene if possible for investigation.</p>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <UButton label="Cancel" color="neutral" variant="outline" to="/products/irs/dashboard/incidents" />
          <UButton type="submit" label="Submit Report" icon="i-lucide-send" :loading="loading" />
        </div>
      </UForm>
    </UCard>
  </div>
</template>
