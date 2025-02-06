<template>
  <CPageList
      title="List"
      :columns="5"
      :details="details"
      :dropdownItems="dropdownItems"
  />
</template>

<script setup lang="ts">
const details = [
  {
    name: 'James Gunn',
    avatar: 'https://avatar.iran.liara.run/public/20',
    itemDetail: [
      { item: 'Age', value: '29' },
      { item: 'Location', value: 'Philippines' },
      { item: 'Role', value: 'Software Developer' }
    ]
  }
];

// Dropdown action items
const dropdownItems = [
  [{
      label: 'Download',
      icon: 'i-lucide-cloud-download',
      click: () => console.log('Download'),
  }, {
      label: 'Share',
      icon: 'i-lucide-share-2',
      click: () => console.log('Share'),
  }, {
      label: 'View Details',
      icon: 'i-lucide-info',
      click: () => console.log('View'),
  }], [{
      label: 'Delete',
      icon: 'i-lucide-trash-2',
      click: () => console.log('Delete'),
  }]
];
</script>