<template>
  <dialog :id="id" ref="dialogElement" class="min-w-[400px] bg-tertiary text-white p-1 rounded-sm">
      <tc-title-bar :title="title" icon="close" @icon-click="closeClickHandler" />
      <div>
          <slot></slot>
      </div>
  </dialog>
</template>

<script setup lang="ts">
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";
import {ref, watch} from "vue";
import {Context, useClickContext} from "@/stores/clickcontext";

type TcDialogProps = {
    title: string;
    open?: boolean;
};
const props = defineProps<TcDialogProps>();

type TcDialogEmits = {
    "update:open": [isOpen: boolean];
};
const emits = defineEmits<TcDialogEmits>();

const { registerHandler } = useClickContext();

const id = crypto.randomUUID();
registerHandler(id, Context.BODY, closeClickHandler);
const dialogElement = ref<HTMLDialogElement>();
watch(() => props.open, isOpen => {
    if (isOpen) {
        dialogElement.value?.showModal();
    } else {
        dialogElement.value?.close();
    }
});

// ============= EVENT HANDLERS =============
function closeClickHandler(): void {
    console.log("Closing")
    emits("update:open", false);
}
</script>