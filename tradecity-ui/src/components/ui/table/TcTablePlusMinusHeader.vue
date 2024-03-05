<template>
  <div class="flex items-center justify-center w-full whitespace-nowrap px-1.5">
    <tc-table-icon-button icon="remove" @click.stop="handleDecrease" />
    <span class="px-1">
    <slot></slot>
  </span>
    <tc-table-icon-button icon="add" @click.stop="handleIncrease" />
  </div>
</template>

<script setup lang="ts">
import TcTableIconButton from "@/components/ui/table/TcTableIconButton.vue";

type TcTablePlusMinusHeaderEmits = {
  increase: [],
  decrease: []
}

const emits = defineEmits<TcTablePlusMinusHeaderEmits>();

// ============= EVENT HANDLERS =============

const handleIncrease = () => emits("increase");
const handleDecrease = () => emits("decrease");
</script>
