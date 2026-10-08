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

        <!-- SVG connector lines + laser pulses -->
        <svg class="absolute inset-0 size-full text-muted z-0" viewBox="0 0 600 600" preserveAspectRatio="none">
            <defs>
                <!-- Glow filter for the laser dot -->
                <filter id="laser-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <!-- Radial gradient for the laser dot -->
                <radialGradient id="laser-dot-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="var(--ui-primary)" stop-opacity="1" />
                    <stop offset="60%" stop-color="var(--ui-primary)" stop-opacity="0.6" />
                    <stop offset="100%" stop-color="var(--ui-primary)" stop-opacity="0" />
                </radialGradient>
            </defs>

            <!-- Static connector lines -->
            <line
                v-for="(data, i) in layoutData"
                :key="`line-${i}`"
                x1="300" y1="300"
                :x2="data.line.x2" :y2="data.line.y2"
                stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5"
            />

            <!-- Laser pulse dots: travel from outer node → center hub -->
            <g v-for="(data, i) in layoutData" :key="`laser-${i}`" filter="url(#laser-glow)">
                <circle r="5" fill="url(#laser-dot-grad)">
                    <animateMotion
                        :dur="`${1.8 + i * 0.15}s`"
                        :begin="`${i * 0.4}s`"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;1"
                        keySplines="0.4 0 0.2 1"
                    >
                        <mpath :href="`#connector-path-${i}`" />
                    </animateMotion>
                </circle>
            </g>

            <!-- Hidden paths for animateMotion (outer → center direction) -->
            <path
                v-for="(data, i) in layoutData"
                :key="`path-${i}`"
                :id="`connector-path-${i}`"
                :d="`M ${data.line.x2} ${data.line.y2} L 300 300`"
                fill="none" stroke="none"
            />
        </svg>

        <!-- Center hub -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square z-10">
            <!-- Breathing glow ring -->
            <div class="hub-glow absolute inset-0 rounded-full" />
            <!-- Hub face -->
            <div
                class="relative w-full h-full rounded-full bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-700 dark:to-primary-500 flex flex-col items-center justify-center text-primary-900 dark:text-white text-center shadow-2xl shadow-primary/30">
                <b class="font-extrabold text-[clamp(.85rem,2vw,1.15rem)] leading-[1.1] tracking-tight">{{ centerLabel }}</b>
                <small v-if="centerSubLabel" class="text-[.68rem] opacity-85 mt-0.5 leading-tight">{{ centerSubLabel }}</small>
            </div>
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

<style scoped>
/* Light mode — bright vivid primary glow */
@keyframes hub-breathe-light {
    0%, 100% {
        box-shadow:
            0 0 0 0px transparent,
            0 0 18px 4px var(--ui-color-primary-200);
    }
    50% {
        box-shadow:
            0 0 0 12px transparent,
            0 0 52px 22px var(--ui-color-primary-200);
    }
}

/* Dark mode — subtler glow */
@keyframes hub-breathe-dark {
    0%, 100% {
        box-shadow:
            0 0 0 0px color-mix(in srgb, var(--ui-primary) 0%, transparent),
            0 0 18px 4px color-mix(in srgb, var(--ui-primary) 20%, transparent);
        opacity: 0.6;
    }
    50% {
        box-shadow:
            0 0 0 10px color-mix(in srgb, var(--ui-primary) 0%, transparent),
            0 0 40px 16px color-mix(in srgb, var(--ui-primary) 35%, transparent);
        opacity: 1;
    }
}

.hub-glow {
    animation: hub-breathe-dark 3s ease-in-out infinite;
    pointer-events: none;
}

:root:not(.dark) .hub-glow {
    animation-name: hub-breathe-light;
}
</style>
