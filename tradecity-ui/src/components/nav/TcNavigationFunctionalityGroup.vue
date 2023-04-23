<template>
<div class="mx-3 mt-2 text-sm text-symbol-gray">{{ name.toUpperCase() }}</div>
<slot />
</template>

<script setup lang="ts">
interface TcNavgationFunctionalityGroupProps {
    name: string
}

defineProps<TcNavgationFunctionalityGroupProps>();
</script>