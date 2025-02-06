<template>
    <CPage title="Kanban">
      <CKanban :initialData="kanbanData" showAddButtons />
    </CPage>
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
        avatars: [
          { src: 'https://avatar.iran.liara.run/public/43', alt: 'benjamincanac' },
          { src: 'https://avatar.iran.liara.run/public/51', alt: 'Atinux' },
        ],
      },
      { 
        title: 'Install TailwindCSS', 
        description: 'Set up TailwindCSS with Nuxt', 
        label: 'QA',
        color: 'rose',
        avatars: [
          { src: 'https://avatar.iran.liara.run/public/86', alt: 'smarroufin' }
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
        avatars: [
          { src: 'https://avatar.iran.liara.run/public/13', alt: 'smarroufin' }
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
        avatars: [
          { src: 'https://avatar.iran.liara.run/public/67', alt: 'benjamincanac' },
          { src: 'https://avatar.iran.liara.run/public/7', alt: 'Atinux' },
        ],
      },
    ],
  },
];
</script>