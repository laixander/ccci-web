<script setup lang="ts">
interface HubNode {
    label: string
    icon: string
}

withDefaults(defineProps<{
    centerLabel: string
    centerSubLabel?: string
    nodes: HubNode[]
}>(), {
    centerSubLabel: '',
})

// Fixed 8-node positions (clockwise from top), matching SVG line endpoints
const positions = [
    { left: '50%', top: '13.3%' }, // top
    { left: '75.9%', top: '24.1%' }, // top-right
    { left: '86.7%', top: '50%' }, // right
    { left: '75.9%', top: '75.9%' }, // bottom-right
    { left: '50%', top: '86.7%' }, // bottom
    { left: '24.1%', top: '75.9%' }, // bottom-left
    { left: '13.3%', top: '50%' }, // left
    { left: '24.1%', top: '24.1%' }, // top-left
]
</script>

<template>
    <div class="relative w-full max-w-[520px] aspect-square mx-auto select-none" aria-hidden="true">

        <!-- SVG connector lines -->
        <svg class="absolute inset-0 size-full text-muted z-0" viewBox="0 0 600 600" preserveAspectRatio="none">
            <line x1="300" y1="300" x2="300" y2="80" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5" />
            <line x1="300" y1="300" x2="455.6" y2="144.4" stroke="currentColor" stroke-opacity="0.35"
                stroke-width="1.5" />
            <line x1="300" y1="300" x2="520" y2="300" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5" />
            <line x1="300" y1="300" x2="455.6" y2="455.6" stroke="currentColor" stroke-opacity="0.35"
                stroke-width="1.5" />
            <line x1="300" y1="300" x2="300" y2="520" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5" />
            <line x1="300" y1="300" x2="144.4" y2="455.6" stroke="currentColor" stroke-opacity="0.35"
                stroke-width="1.5" />
            <line x1="300" y1="300" x2="80" y2="300" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5" />
            <line x1="300" y1="300" x2="144.4" y2="144.4" stroke="currentColor" stroke-opacity="0.35"
                stroke-width="1.5" />
        </svg>

        <!-- Center hub -->
        <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-gradient-to-br from-primary to-primary-400 flex flex-col items-center justify-center text-white text-center z-10 shadow-2xl shadow-primary/30">
            <b class="font-extrabold text-[clamp(.85rem,2vw,1.15rem)] leading-[1.1] tracking-tight">{{ centerLabel
                }}</b>
            <small v-if="centerSubLabel" class="text-[.68rem] opacity-85 mt-0.5 leading-tight">{{ centerSubLabel
                }}</small>
        </div>

        <!-- Module nodes: outer div = position + width; inner div = appearance + hover -->
        <div v-for="(node, i) in nodes.slice(0, 8)" :key="node.label" :style="positions[i]"
            class="absolute w-[22%] -translate-x-1/2 -translate-y-1/2 z-[1]">
            <div
                class="w-full aspect-square rounded-full bg-default border border-default shadow-md flex flex-col items-center justify-center gap-[5px] text-center p-1.5 transition-all duration-200 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-default">
                <UIcon :name="node.icon" class="size-6 text-primary shrink-0 flex" />
                <span class="text-[clamp(.62rem,1.5vw,.82rem)] font-semibold text-highlighted leading-tight px-1">{{
                    node.label }}</span>
            </div>
        </div>

    </div>
</template>
