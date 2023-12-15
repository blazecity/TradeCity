<template>
  <div class="relative tooltip inline-block">
      <slot></slot>
      <div :class="[
          'tooltip-content inline-block z-50 bg-black h-fit w-fit px-1.5 pt-0.5 pb-1 font-bold rounded-sm',
          { 'my-auto mr-0 ml-2.5 top-0 bottom-0 tooltip-content-right': direction === 'right' },
          { 'my-auto ml-0 mr-2.5 top-0 bottom-0 right-full tooltip-content-left': direction === 'left' },
          { 'mx-auto mt-0 mb-2.5 left-0 right-0 bottom-full tooltip-content-top': direction === 'top' },
          { 'mx-auto mb-0 mt-2.5 left-0 right-0 top-full tooltip-content-bottom': direction === 'bottom' },
      ]">
          {{ text }}
      </div>
  </div>
</template>

<script setup lang="ts">
type TcTooltipProps = {
    text: string;
    direction: "right" | "left" | "top" | "bottom";
};
withDefaults(defineProps<TcTooltipProps>(), {
    direction: "right"
});
</script>

<style scoped>
.tooltip .tooltip-content {
    visibility: hidden;
}

.tooltip:hover .tooltip-content {
    visibility: visible;
}

.tooltip-content {
    position: absolute;
    box-shadow: 0 2px 8px -3px rgb(0, 0, 0);
}

.tooltip-content-right::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
}

.tooltip-content-top::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

.tooltip-content-left::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent black;
}

.tooltip-content-bottom::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
}
</style>