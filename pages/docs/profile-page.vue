<template>
    <CPage title="Profile Page" sub-title="Display a profile details.">
        <div class="prose text-sm dark:text-gray-500">
            <p>
                <UBadge color="gray" size="md">&lt;CPageProfile /&gt;</UBadge> is a block level component
            </p>
            <!-- <h4 class="dark:text-gray-300">Usage</h4> -->
            <h4 class="dark:text-gray-300 mb-4">This page has the following props:</h4>
            <!-- <p>Pass an array to the <UBadge color="gray">:details</UBadge> and <UBadge color="gray">:tabItems</UBadge> prop of the CPageProfile component. Each prop can have the following:</p> -->
            <p><UBadge color="gray">avatarUrl</UBadge> is the avatar of the profile.</p>
            <p><UBadge color="gray">name</UBadge> is the name of the profile.</p>
            <p><UBadge color="gray">:details</UBadge> is the array of the details.</p>
            <ul>
                <li><UBadge color="gray">icon</UBadge> &ndash; The icon of the details.</li>
                <li><UBadge color="gray">label</UBadge> &ndash; The label of the icon details.</li>
                <li><UBadge color="gray">value</UBadge> &ndash; The value of the icon details.</li>
            </ul>
            <p><UBadge color="gray">:tabItems</UBadge> is the array of the tab.</p>
            <ul>
                <li><UBadge color="gray">key</UBadge> &ndash; The key of the tab.</li>
                <li><UBadge color="gray">label</UBadge> &ndash; The label of the tab.</li>
            </ul>

            <div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm">&lt;!-- page/profile.vue --&gt;
&lt;template&gt;
    &lt;CPageProfile 
        title="Profile" 
        avatarUrl="" 
        name="John Doe"
        :details="profileDetails"
        :tabItems="tabItems"
    &gt;
    &lt;template #recent&gt;
        &lt;!-- content goes here --&gt;
    &lt;/template&gt;
    &lt;/CPageProfile&gt;
&lt;/template&gt;
&lt;script setup lang="ts"&gt;
const profileDetails = [
    { 
        icon: 'i-lucide-mail', 
        label: '', 
        value: 'john.doe@example.com' 
    },
    //...
];
const tabItems = [
    { 
        key: 'recent', 
        label: 'Recent Activities' 
    },
    //...
];
&lt;/script&gt;</code>
</pre>
                <CopyToClipboard :pre-ref="codeRef" />
            </div>
        </div>
    </CPage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'docs',
})

const codeRef = ref<HTMLPreElement | null>(null);
</script>