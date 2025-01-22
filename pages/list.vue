<template>
      <CPageList title="Grid" description="Something" :entries="entries">
      </CPageList>
</template>

<script setup lang="ts">
const entries = [
{
    title: "Card 1",
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b",
    list: [
      { item: "Status", value: "Online" },
      { item: "Health", value: "Good" },
    ],
  },
  {
    title: "Card 2",
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b",
    list: [
      { item: "Status", value: "Offline" },
      { item: "Health", value: "Critical" },
    ],
  },
];
</script>