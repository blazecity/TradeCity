<template>
  <div class="grid grid-rows-fr-auto h-full">
      <div>
          <slot></slot>
      </div>
      <div class="flex gap-2 w-full justify-end p-2">
          <tc-button @click="handleOkClick">
              Submit
          </tc-button>
          <tc-button @click="handleCancelClick" dangerous>
              Cancel
          </tc-button>
      </div>
  </div>
</template>

<script setup lang="ts">
import TcButton from "@/components/ui/button/TcButton.vue";

type TcOkCancelContainerEmits = {
    ok: [];
    cancel: [];
};
const emits = defineEmits<TcOkCancelContainerEmits>();

// ============ EVENT HANDLERS ============
function handleOkClick(): void {
    emits("ok");
}

function handleCancelClick(): void {
    emits("cancel");
}
</script>
