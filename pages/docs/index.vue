<template>
    <CPage title="Layout Mode" sub-title="Page layout mode.">
        <div class="prose text-sm dark:text-gray-500">
            <!-- <p>
                <UBadge color="gray" size="md">&lt;CLayout /&gt;</UBadge> is the layout of the page.
            </p> -->

            <h4 class="dark:text-gray-300 mb-4">Type:</h4>

            <p><UBadge color="gray">&lt;CLayoutClean /&gt;</UBadge> &ndash; Blank.</p>
            <p><UBadge color="gray">&lt;CLayoutSimple /&gt;</UBadge> &ndash; Header and Footer.</p>
            <p><UBadge color="gray">&lt;CLayoutFull /&gt;</UBadge> &ndash; Header, Sidebar, and Footer.</p>
            <p><UBadge color="gray">&lt;CLayoutNarrow /&gt;</UBadge> &ndash; Narrow Sidebar.</p>

            <!-- <p><UBadge color="gray">mode</UBadge> is mode of layout.</p>
            <ul>
                <li><strong class="dark:text-gray-300">Clean</strong> - Blank.</li>
                <li><strong class="dark:text-gray-300">Simple</strong> - Header and Footer.</li>
                <li><strong class="dark:text-gray-300">Full</strong> - Header, Sidebar, and Footer.</li>
            </ul> -->

            <h4 class="dark:text-gray-300 mb-4">Layouts has the following props:</h4>

            <p><UBadge color="gray">logo</UBadge> is logo of the application.</p>
            <p><UBadge color="gray">name</UBadge> is name of the application.</p>
            <p><UBadge color="gray">:links</UBadge> is the array of the links.</p>
            <ul>
                <li><UBadge color="gray">label</UBadge> &ndash; The label of the links.</li>
                <li><UBadge color="gray">icon</UBadge> &ndash; The icon of the links.</li>
                <li><UBadge color="gray">to</UBadge> &ndash; The path of the links.</li>
            </ul>
        </div>
        <div class="prose">
            <div class="relative">
<pre ref="codeRef" class="language-html prose-pre">
<code class="text-sm">&lt;!-- page/dashboard.vue --&gt;
&lt;CLayoutFull
    logo="logo.png" 
    name="UI Development" 
    :links="links"
&gt;
    &lt;slot /&gt;
&lt;/CLayoutFull&gt;

&lt;script setup lang="ts"&gt;
const links = [
    {
        label: 'Dashboard',
        icon: 'i-lucide-house',
        to: '/dashboard'
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