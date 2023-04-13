<template>
<div class="flex mt-1.5 mb-2.5 mr-1 group">
    <div :class="['border-r-4 mr-1 rounded-r-sm duration-300', hasBorder ? 'border-white' : 'border-transparent', isSelected ? 'my-1.5' : 'my-3.5 group-hover:my-2.5']"></div>
    <div :class="['bg-tertiary ml-0.5  p-1.5 hover:rounded-xl duration-300 group flex items-center hover:cursor-pointer h-10 w-10', isSelected ? 'rounded-xl' : 'rounded-[22px]']">
        <img :src="getImageUrl()" alt="Image">
        <span class="arrow-box absolute w-auto py-2 px-3 m-2 min-w-max left-14 rounded-md text-white text-sm bg-dark font-bold duration-100 scale-0 origin-left group-hover:scale-100">{{ text }}</span>
    </div>
</div>
</template>

<script setup lang="ts">
interface TcNavigationIconProps {
    iconUrl: string,
    text: string,
    isSelected?: boolean,
    hasBorder?: boolean
}
const props = withDefaults(defineProps<TcNavigationIconProps>(), { 
    isSelected: false,
    hasBorder: true
});

const getImageUrl = () => new URL(props.iconUrl, import.meta.url).href;
</script>

<style scoped>
.arrow-box:before {
    content: " ";
    position: absolute;
    top: 12px;
    left: -6px;
    border-top: 5px solid transparent;
    border-right: 6px solid var(--dark);
    border-left: none;
    border-bottom: 5px solid transparent;
}
</style>