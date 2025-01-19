<template>
    <CPage title="Projects" description="This is the Projects Page">
        <CKanban :initialData="kanbanData" :showAddButtons="false" />
    </CPage>
</template>

<script setup lang="ts">

interface KanbanCard {
  title: string;
  description: string;
  label: string;
}

interface KanbanColumn {
  title: string;
  cards: KanbanCard[];
}

const kanbanData: KanbanColumn[] = [
  {
    title: 'Backlog',
    cards: [
      { title: 'Research Nuxt 3', description: 'Learn about new features in Nuxt 3', label: 'Sample' },
      { title: 'Install TailwindCSS', description: 'Set up TailwindCSS with Nuxt', label: 'Sample' },
    ],
  },
  {
    title: 'In Progress',
    cards: [
      { title: 'Build Kanban Component', description: 'Create a dynamic Kanban UI', label: 'Sample' },
    ],
  },
  {
    title: 'Completed',
    cards: [
      { title: 'Setup Nuxt Project', description: 'Initialize Nuxt 3 application', label: 'Sample' },
    ],
  },
];
</script>