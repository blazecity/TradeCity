<template>
  <div class="grid grid-rows-fr-auto">
      <div>
          <slot></slot>
      </div>
      <div class="flex gap-2 w-full justify-end p-2">
          <tc-button @click="okClickHandler">
              Submit
          </tc-button>
          <tc-button @click="cancelClickHandler" dangerous>
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
function okClickHandler(): void {
    emits("ok");
}

function cancelClickHandler(): void {
    emits("cancel");
}
</script>
