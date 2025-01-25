<template>
  <CPageNotification title="Notifications" :items="notifications" :openTo="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Notification {
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  to: string;
}

const notifications = ref<Notification[]>([
  { title: 'New Assignment', description: 'You have a new assignment in Math.', date: '2025-01-19', isRead: false, to: '/assignments' },
  { title: 'Exam Schedule', description: 'Check your updated exam schedule.', date: '2025-01-18', isRead: false, to: '/exams' },
  { title: 'Holiday Notice', description: 'School is closed on Friday.', date: '2025-01-17', isRead: false, to: '' },
  { title: 'New Assignment', description: 'You have a new assignment in Math.', date: '2025-01-19', isRead: false, to: '/assignments' },
  { title: 'Exam Schedule', description: 'Check your updated exam schedule.', date: '2025-01-18', isRead: false, to: '/exams' },
  { title: 'Holiday Notice', description: 'School is closed on Friday.', date: '2025-01-17', isRead: false, to: '' },
]);
</script>
