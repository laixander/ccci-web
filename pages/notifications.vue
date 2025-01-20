<template>
    <CPageNotification title="Notifications" :notifications="notifications" @update-notifications="updateNotifications" />
</template>

<script setup lang="ts">
interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
}

const notifications = ref<Notification[]>([
  { id: 1, title: 'New Message', description: 'You have received a new message.', date: 'Jan 20', isRead: false },
  { id: 2, title: 'System Update', description: 'Your system will be updated soon.', date: 'Jan 20', isRead: false },
  { id: 3, title: 'Meeting Reminder', description: 'You have a meeting in 1 hour.', date: 'Jan 20', isRead: true }
]);

const updateNotifications = (updatedNotifications: Notification[]) => {
  notifications.value = updatedNotifications;
};
</script>