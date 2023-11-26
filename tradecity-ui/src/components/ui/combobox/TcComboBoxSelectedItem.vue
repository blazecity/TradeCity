<template>
  <div class="inline-block bg-base px-1 rounded-sm font-bold text-xs">
    <slot :item="item"></slot>
  </div>
</template>

<script setup lang="ts" generic="T">
type TcComboBoxSelectedItemProps = {
  item: T;
}
defineProps<TcComboBoxSelectedItemProps>();
</script>
