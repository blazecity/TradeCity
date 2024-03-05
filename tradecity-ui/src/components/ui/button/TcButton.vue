<template>
  <button
      :class="['text-normal font-bold outline-none min-w-fit rounded-sm', style(), {'px-2 py-0.5': styling !== 'plain'}]"
      :disabled="disabled"
  >
    <span class="flex items-center justify-center gap-x-0.5">
        <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface TcButtonProps {
  dangerous?: boolean;
  disabled?: boolean;
  styling?: "standard" | "plain" | "dark"
}
const props = withDefaults(defineProps<TcButtonProps>(), {
  styling: "standard"
});

function style(): string {
  if (props.dangerous) {
    switch (props.styling) {
      case "standard":
        return "dangerous-background hover:bg-red-700 border border-red-500";
      case "plain":
        return "text-red-500 hover:text-red-400";
      case "dark":
        return "dangerous-background hover:bg-red-700 border border-red-500";
    }
  }

  switch (props.styling) {
    case "standard":
      return "bg-neutral-950 hover:bg-zinc-800 border border-neutral-700";
    case "plain":
      return "text-neutral-400 hover:text-neutral-200";
    case "dark":
      return "bg-neutral-950 hover:bg-zinc-800 border border-neutral-700";
  }
}
</script>

<style scoped>
.dangerous-background {
  background-color: rgba(218, 96, 96, 0.7);
}

.dangerous-background:hover {
  background-color: rgb(194, 99, 99);
}
</style>