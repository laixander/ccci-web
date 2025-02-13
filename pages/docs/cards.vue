<template>
    <CPage title="Cards" sub-title="Contain most of the important details.">
        <CTabsContainer 
            title="Custom Tabs"
            :items="tabs"
        >
            <template #preview>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CCardApp :apps="apps" :actions="actions" />
                </div>
            </template>

            <template #code>
<div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm">&lt;template&gt;
    &lt;CCardApp 
        :apps="apps" 
        :actions="actions"
    /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const apps = ref([
  {
    name: "HRIS",
    description: "Human Resource Information System",
    logo: "/images/hris-logo.png",
    headerBgColor: "bg-blue-100",
  },
  {
    name: "LMS",
    description: "Learning Management System",
    logo: "/images/lms-logo.png",
    headerBgColor: "bg-green-100",
  },
  {
    name: "DMS",
    description: "Document Management System",
    logo: "/images/dms-logo.png",
    headerBgColor: "bg-yellow-100",
  },
  {
    name: "AMS",
    description: "Asset Management System",
    logo: "/images/ams-logo.png",
    headerBgColor: "bg-red-100",
  },
]);

const actions = ref([
  {
    label: "Open",
    icon: "lucide:external-link",
    click: (app: any) => {
      console.log(`Opening ${app.name}`);
      alert(`Opening ${app.name}`);
    },
  },
  {
    label: "Settings",
    icon: "lucide:settings",
    click: (app: any) => {
      console.log(`Opening settings for ${app.name}`);
      alert(`Opening settings for ${app.name}`);
    },
  },
]);
&lt;/script&gt;</code>
</pre>
<CopyToClipboard :pre-ref="codeRef" />
</div>
            </template>
        </CTabsContainer>
    </CPage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'docs',
})

const codeRef = ref<HTMLPreElement | null>(null);

const tabs = [{
  label: 'Preview',
  icon: 'i-lucide-eye',
  slot: 'preview',
}, {
  label: 'Code',
  icon: 'i-lucide-code',
  slot: 'code',
}]

const apps = ref([
  {
    name: "HRIS",
    description: "Human Resource Information System",
    logo: "/images/hris-logo.png",
    headerBgColor: "bg-blue-100",
  },
  {
    name: "LMS",
    description: "Learning Management System",
    logo: "/images/lms-logo.png",
    headerBgColor: "bg-green-100",
  },
  {
    name: "DMS",
    description: "Document Management System",
    logo: "/images/dms-logo.png",
    headerBgColor: "bg-yellow-100",
  },
  {
    name: "AMS",
    description: "Asset Management System",
    logo: "/images/ams-logo.png",
    headerBgColor: "bg-red-100",
  },
]);

const actions = ref([
  {
    label: "Open",
    icon: "lucide:external-link",
    click: (app: any) => {
      console.log(`Opening ${app.name}`);
      alert(`Opening ${app.name}`);
    },
  },
  {
    label: "Settings",
    icon: "lucide:settings",
    click: (app: any) => {
      console.log(`Opening settings for ${app.name}`);
      alert(`Opening settings for ${app.name}`);
    },
  },
]);
</script>