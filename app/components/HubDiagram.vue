<script setup lang="ts">
import { computed } from 'vue'

interface HubNode {
    title: string
    icon: string
    to?: string
}

const props = withDefaults(defineProps<{
    centerLabel: string
    centerSubLabel?: string
    nodes: HubNode[]
}>(), {
    centerSubLabel: '',
})

// Calculate positions and connector lines dynamically based on number of nodes
const layoutData = computed(() => {
    const n = props.nodes.length
    const radius = 220
    const center = 300
    
    return props.nodes.map((_, i) => {
        // Start from top (-90 degrees or -PI/2 radians)
        const angle = -Math.PI / 2 + (i * 2 * Math.PI / n)
        
        const x = center + radius * Math.cos(angle)
        const y = center + radius * Math.sin(angle)
        
        return {
            line: { x2: x, y2: y },
            style: { 
                left: `${(x / 600) * 100}%`, 
                top: `${(y / 600) * 100}%` 
            }
        }
    })
})
</script>

<template>
    <div class="relative w-full max-w-[520px] aspect-square mx-auto select-none" aria-hidden="true">

        <!-- SVG connector lines -->
        <svg class="absolute inset-0 size-full text-muted z-0" viewBox="0 0 600 600" preserveAspectRatio="none">
            <line v-for="(data, i) in layoutData" :key="`line-${i}`" x1="300" y1="300" :x2="data.line.x2" :y2="data.line.y2" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5" />
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
        <div v-for="(node, i) in nodes" :key="node.title" :style="layoutData[i]?.style"
            class="absolute w-[22%] -translate-x-1/2 -translate-y-1/2 z-[1]">
            <NuxtLink v-if="node.to" :to="node.to"
                class="w-full aspect-square rounded-full bg-default border border-default shadow-md flex flex-col items-center justify-center gap-[5px] text-center p-1.5 transition-all duration-200 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer">
                <UIcon :name="node.icon" class="size-6 text-primary shrink-0 flex" />
                <span class="text-[clamp(.62rem,1.5vw,.82rem)] font-semibold text-highlighted leading-tight px-1">{{
                    node.title }}</span>
            </NuxtLink>
            <div v-else
                class="w-full aspect-square rounded-full bg-default border border-default shadow-md flex flex-col items-center justify-center gap-[5px] text-center p-1.5 transition-all duration-200 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-default">
                <UIcon :name="node.icon" class="size-6 text-primary shrink-0 flex" />
                <span class="text-[clamp(.62rem,1.5vw,.82rem)] font-semibold text-highlighted leading-tight px-1">{{
                    node.title }}</span>
            </div>
        </div>

    </div>
</template>
