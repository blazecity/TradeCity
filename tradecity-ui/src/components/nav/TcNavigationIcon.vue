<template>
<div class="flex mt-1.5 mb-2.5 mr-1 group">
    <div :class="['border-r-4 mr-1 rounded-r-sm duration-300', hasBorder ? 'border-white' : 'border-transparent', isSelected ? 'my-1.5' : 'my-3.5 group-hover:my-2.5']"></div>
    <div :class="['bg-tertiary ml-0.5  p-1.5 hover:rounded-xl duration-300 group flex items-center hover:cursor-pointer h-10 w-10', isSelected ? 'rounded-xl' : 'rounded-[22px]']">
        <slot></slot>
        <tc-arrow-box :text="text" />
    </div>
</div>
</template>

<script setup lang="ts">
import TcArrowBox from '../controls/box/TcArrowBox.vue';

interface TcNavigationIconProps {
    text: string,
    isSelected?: boolean,
    hasBorder?: boolean
}
withDefaults(defineProps<TcNavigationIconProps>(), { 
    isSelected: false,
    hasBorder: true
});
</script>

