<template>
  <!-- Browser chrome frame -->
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.learncore.edu/builder</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-book-open" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="DS" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Course outline panel -->
      <div class="w-36 flex-shrink-0 border-r border-default bg-elevated flex flex-col">
        <div class="px-3 py-2 border-b border-default flex items-center justify-between">
          <span class="text-[10px] font-semibold text-highlighted">Outline</span>
          <UIcon name="i-lucide-plus" class="size-3.5 text-muted" />
        </div>
        <div class="flex-1 overflow-y-auto scrollbar p-1.5 space-y-1">
          <div v-for="(module, mIdx) in modules" :key="mIdx" class="mb-1.5">
            <div class="flex items-center gap-1 px-2 py-1.5 text-[9.5px] font-semibold text-highlighted bg-muted/50 rounded-md">
              <UIcon name="i-lucide-chevron-down" class="size-2.5 text-muted" />
              {{ module.title }}
            </div>
            <div class="pl-4 mt-0.5 space-y-0.5">
              <div
                v-for="(lesson, lIdx) in module.lessons"
                :key="lIdx"
                class="flex items-center gap-1.5 px-2 py-1 text-[9px] rounded-md cursor-default"
                :class="{ 'bg-primary/10 text-primary font-medium': lesson.active, 'text-muted hover:bg-muted/30': !lesson.active }"
              >
                <UIcon :name="lesson.icon" class="size-3 flex-shrink-0" :class="lesson.active ? 'text-primary' : 'text-dimmed'" />
                <span class="truncate">{{ lesson.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Editor -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Editor top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <span class="text-[9px] text-primary font-medium uppercase tracking-wide">Editing Lesson</span>
            <p class="text-[11px] font-bold text-highlighted mt-0.5">Introduction to Variables</p>
          </div>
          <div class="flex items-center gap-2">
            <UButton size="xs" color="neutral" variant="outline" label="Preview" icon="i-lucide-eye" />
            <UButton size="xs" label="Publish" color="primary" icon="i-lucide-upload" />
          </div>
        </div>

        <!-- Content blocks -->
        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- Video block -->
          <div class="rounded-lg border border-dashed border-default overflow-hidden group cursor-default hover:border-primary/50 transition-colors">
            <div class="flex items-center justify-between px-3 py-1.5 bg-muted/30 border-b border-default">
              <span class="flex items-center gap-1.5 text-[9px] font-medium text-muted">
                <UIcon name="i-lucide-video" class="size-3" /> Video Lecture
              </span>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="size-5 rounded bg-elevated shadow border border-default flex items-center justify-center">
                  <UIcon name="i-lucide-edit" class="size-2.5 text-muted" />
                </div>
                <div class="size-5 rounded bg-elevated shadow border border-default flex items-center justify-center">
                  <UIcon name="i-lucide-trash-2" class="size-2.5 text-danger" />
                </div>
              </div>
            </div>
            <div class="bg-muted/20 flex items-center justify-center py-4 gap-3">
              <UIcon name="i-lucide-play-circle" class="size-8 text-muted" />
              <div>
                <p class="text-[10px] font-medium text-highlighted">intro-to-variables.mp4</p>
                <p class="text-[9px] text-dimmed mt-0.5">12:45 · 1080p HD</p>
              </div>
            </div>
          </div>

          <!-- Text block -->
          <div class="rounded-lg border border-dashed border-default p-3 group cursor-default hover:border-primary/50 transition-colors">
            <div class="flex items-center justify-between mb-2">
              <span class="flex items-center gap-1.5 text-[9px] font-medium text-muted">
                <UIcon name="i-lucide-type" class="size-3" /> Text Block
              </span>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="size-5 rounded bg-elevated shadow border border-default flex items-center justify-center">
                  <UIcon name="i-lucide-edit" class="size-2.5 text-muted" />
                </div>
              </div>
            </div>
            <p class="text-[10px] text-muted leading-relaxed">
              A variable is a container for storing data values. In programming, variables are used to hold information that can be referenced and manipulated throughout a program...
            </p>
          </div>

          <!-- Quiz block -->
          <div class="rounded-lg border border-dashed border-default p-3 group cursor-default hover:border-primary/50 transition-colors">
            <div class="flex items-center justify-between mb-2">
              <span class="flex items-center gap-1.5 text-[9px] font-medium text-muted">
                <UIcon name="i-lucide-help-circle" class="size-3" /> Knowledge Check
              </span>
              <span class="text-[8px] font-medium px-1.5 py-0.5 rounded bg-info/10 text-info">3 questions</span>
            </div>
            <div class="space-y-1">
              <div v-for="q in quizQuestions" :key="q" class="flex items-center gap-2 text-[9px] text-muted">
                <UIcon name="i-lucide-circle-dot" class="size-3 text-dimmed flex-shrink-0" />
                {{ q }}
              </div>
            </div>
          </div>

          <!-- Add block -->
          <div class="flex items-center justify-center py-2">
            <div class="h-px bg-default flex-1" />
            <UButton size="xs" color="neutral" variant="outline" icon="i-lucide-plus" label="Add Block" class="mx-3 rounded-full" />
            <div class="h-px bg-default flex-1" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Courses', icon: 'i-lucide-book-open', active: true },
  { label: 'Students', icon: 'i-lucide-users', active: false },
  { label: 'Assignments', icon: 'i-lucide-file-text', active: false },
  { label: 'Grades', icon: 'i-lucide-award', active: false },
  { label: 'Live Class', icon: 'i-lucide-video', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const modules = [
  {
    title: 'Module 1: Basics',
    lessons: [
      { title: 'Welcome', icon: 'i-lucide-file-text', active: false },
      { title: 'Variables', icon: 'i-lucide-video', active: true },
      { title: 'Quiz', icon: 'i-lucide-help-circle', active: false },
    ]
  },
  {
    title: 'Module 2: Control',
    lessons: [
      { title: 'If/Else', icon: 'i-lucide-video', active: false },
      { title: 'Loops', icon: 'i-lucide-video', active: false },
      { title: 'Assignment', icon: 'i-lucide-edit-3', active: false },
    ]
  }
]

const quizQuestions = [
  'What is a variable in programming?',
  'Name two common data types.',
  'How do you declare a variable in JavaScript?',
]
</script>
