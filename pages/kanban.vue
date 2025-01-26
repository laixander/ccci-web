<template>
    <CPage title="Kanban">
      <CKanban :initialData="kanbanData" :showAddButtons="true" />
    </CPage>
</template>


<script setup lang="ts">

interface KanbanCard {
  title: string;
  description: string;
  label: string;
  avatars?: { src: string; alt: string }[];
}

interface KanbanColumn {
  title: string;
  cards: KanbanCard[];
}

const kanbanData: KanbanColumn[] = [
  {
    title: 'Backlog',
    cards: [
      { 
        title: 'Research Nuxt 3', 
        description: 'Learn about new features in Nuxt 3', 
        label: 'Sample',
        avatars: [
          { src: 'https://avatars.githubusercontent.com/u/739984?v=4', alt: 'benjamincanac' },
          { src: 'https://avatars.githubusercontent.com/u/904724?v=4', alt: 'Atinux' },
        ],
      },
      { 
        title: 'Install TailwindCSS', 
        description: 'Set up TailwindCSS with Nuxt', 
        label: 'Sample',
        avatars: [
          { src: 'https://avatars.githubusercontent.com/u/7547335?v=4', alt: 'smarroufin' }
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
        label: 'Sample',
        avatars: [
          { src: 'https://avatars.githubusercontent.com/u/7547335?v=4', alt: 'smarroufin' }
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
        label: 'Sample',
        avatars: [
          { src: 'https://avatars.githubusercontent.com/u/739984?v=4', alt: 'benjamincanac' },
          { src: 'https://avatars.githubusercontent.com/u/904724?v=4', alt: 'Atinux' },
        ],
      },
    ],
  },
];
</script>