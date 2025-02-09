<template>
    <CPageKanban title="Kanban" :initialData="kanbanData" showAddButtons :assignee-options="assigneeOptions" />
</template>


<script setup lang="ts">

const kanbanData = [
  {
    title: 'Backlog',
    cards: [
      { 
        title: 'Research Nuxt 3', 
        description: 'Learn about new features in Nuxt 3', 
        label: 'Research',
        color: 'teal',
        assignees: [
          { src: 'https://avatar.iran.liara.run/public/43', alt: 'benjamincanac', label: "", value: "" },
          { src: 'https://avatar.iran.liara.run/public/51', alt: 'Atinux', label: "", value: "" },
        ],
      },
      { 
        title: 'Install TailwindCSS', 
        description: 'Set up TailwindCSS with Nuxt', 
        label: 'QA',
        color: 'rose',
        assignees: [
          { src: 'https://avatar.iran.liara.run/public/86', alt: 'smarroufin', label: "", value: "" }
        ],
      },
    ],
  },
  {
    title: 'In Progress',
    cards: [
      { 
        title: 'Build Kanban Component', 
        description: 'Create a dynamic Kanban UI', 
        label: 'Dev',
        color: 'violet',
        assignees: [
          { src: 'https://avatar.iran.liara.run/public/13', alt: 'smarroufin', label: "", value: "" }
        ],
      },
    ],
  },
  {
    title: 'Completed',
    cards: [
      { 
        title: 'Setup Nuxt Project', 
        description: 'Initialize Nuxt 3 application', 
        label: 'Admin',
        color: 'amber',
        assignees: [
          { src: 'https://avatar.iran.liara.run/public/67', alt: 'benjamincanac', label: "", value: "" },
          { src: 'https://avatar.iran.liara.run/public/7', alt: 'Atinux', label: "", value: "" },
        ],
      },
    ],
  },
];

const assigneeOptions = [
    { label: 'Benjamin Canac', value: 'benjamincanac', src: 'https://avatar.iran.liara.run/public/43', alt: 'Benjamin Canac' },
    { label: 'Atinux', value: 'atinux', src: 'https://avatar.iran.liara.run/public/51', alt: 'Atinux' },
    { label: 'Smarroufin', value: 'smarroufin', src: 'https://avatar.iran.liara.run/public/86', alt: 'Smarroufin' }
];
</script>