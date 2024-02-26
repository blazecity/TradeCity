<template>
  <dialog :id="id" ref="dialogElement" class="min-w-[400px] bg-tertiary text-white p-1 rounded-sm outline-none">
      <tc-title-bar :title="title" icon="close" @icon-click="handleCloseClick" />
      <div>
          <slot></slot>
      </div>
  </dialog>
</template>

<script setup lang="ts">
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";
import {ref, watch} from "vue";
import {useClickContext} from "@/stores/clickcontext";

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
registerHandler(id, 0, () => {
    if (props.open) {
        handleCloseClick();
        return true;
    }

    return false;
});
const dialogElement = ref<HTMLDialogElement>();
watch(dialogElement, element => {
    if (element) {
        element.addEventListener("cancel", event => event.preventDefault());
    }
});
watch(() => props.open, isOpen => {
    if (isOpen) {
        dialogElement.value?.showModal();
    } else {
        dialogElement.value?.close();
    }
});

// ============= EVENT HANDLERS =============
function handleCloseClick(): void {
    emits("update:open", false);
}
</script>