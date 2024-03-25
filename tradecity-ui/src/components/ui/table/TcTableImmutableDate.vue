<template>
  <span class="p-1 whitespace-nowrap">{{ value.toDateString() }}</span>
</template>

<script setup lang="ts">
type TcTableImmutableDateProps = {
    value: Date
}
defineProps<TcTableImmutableDateProps>();
</script>
