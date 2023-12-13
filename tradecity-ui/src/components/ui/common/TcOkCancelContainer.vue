<template>
  <div class="grid grid-rows-fr-auto">
      <div>
          <slot></slot>
      </div>
      <div class="flex w-full justify-end">
          <tc-button text="Submit" @click="okClickHandler" />
          <tc-button text="Cancel" @click="cancelClickHandler" />
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
