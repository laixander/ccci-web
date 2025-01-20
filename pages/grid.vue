<template>
    <!-- <CGrid col-1>
        hey
    </CGrid> -->

    <CPage title="Grid" description="Something">

        <CListItem2 :entries="cardsData"></CListItem2>

    </CPage>
</template>

<script setup lang="ts">
const cardsData = [
    {
        title: "Card 1",
        list: [
            { item: "Item 1A", value: "Value 1A" },
            { item: "Item 1B", value: "Value 1B" },
        ],
    },
    {
        title: "Card 2",
        list: [
            { item: "Item 2A", value: "Value 2A" },
            { item: "Item 2B", value: "Value 2B" },
            { item: "Item 2C", value: "Value 2C" },
        ],
    },
    {
        title: "Card 3",
        list: [
            { item: "Item 3A", value: "Value 3A" },
        ],
    },
    {
        title: "Card 4",
        list: [
            { item: "Item 4A", value: "Value 4A" },
            { item: "Item 4B", value: "Value 4B" },
        ],
    },
];
</script>