<template>
  <div :id="uuid" v-show="visible || rootVisible" class="absolute border-8 border-transparent text-xs min-w-[15rem]">
    <div class="grid grid-cols-auto-fr items-center border-4 border-tertiary rounded-sm bg-tertiary">
      <template v-for="rootItem in contextMenu" :key="rootItem.id">
        <tc-icon :icon="rootItem.icon ?? ''" class="large-icon mx-1" />
        <div class="flex flex-col relative border-l border-l-zinc-600" @click="() => handleClick(rootItem.action)" @mouseenter="() => showSubMenu(rootItem.id)" @mouseleave="hideSubMenu">
          <div class="flex justify-between items-center hover:cursor-pointer hover:bg-base rounded-sm py-0.5 px-2 ml-0.5">
            <div class="inline-block">{{ rootItem.label }}</div>
            <tc-icon v-if="rootItem.contextMenuItems" class="large-icon" icon="east" />
          </div>
          <tc-context-menu
              v-if="rootItem.contextMenuItems"
              :is-root="false"
              :visible="subMenuId === rootItem.id"
              :context-menu="rootItem.contextMenuItems"
              class="left-full -top-3"
              @action-click="handleSubMenuActionClick"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {onMounted, ref} from "vue";
import {useClickContext} from "@/stores/clickcontext";

type TcContextMenuProps = {
  contextMenu: ContextMenu;
  contextItemId?: string;
  visible?: boolean;
  isRoot?: boolean;
}
const props = withDefaults(defineProps<TcContextMenuProps>(), {
  isRoot: true
});

type TcContextMenuEmits = {
  (e: "actionClick"): void;
}
const emits = defineEmits<TcContextMenuEmits>();

const { registerHandler } = useClickContext();

const uuid = crypto.randomUUID();
const subMenuId = ref("");
const rootVisible = ref(false);

registerHandler(uuid, 1, () => rootVisible.value ??= false);

// ========== EVENT HANDLERS ==========
function showSubMenu(id: string): void {
  subMenuId.value = id;
}

function hideSubMenu(): void {
  subMenuId.value = "";
}

function handleClick(action?: ContextMenuAction): void {
  if (action) {
    action();
    rootVisible.value = false;
    emits("actionClick");
  }
}

function show(): void {
  rootVisible.value = true;
}

function handleSubMenuActionClick(): void {
  if (!props.isRoot) {
    emits("actionClick");
  } else {
    rootVisible.value = false;
  }
}

// ========= LIFECYLCE =========

onMounted(() => {
  if (props.contextItemId && props.isRoot) {
    document.getElementById(props.contextItemId)?.addEventListener("contextmenu", event => {
      event.preventDefault();
      console.log(event);
      show();
    });
  }
})

</script>
