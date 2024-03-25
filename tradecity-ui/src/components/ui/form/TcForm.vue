<template>
  <div class="grid grid-cols rounded-sm">
      <div class="contents" v-for="(value, key, index) in data">
          <div class="text-small text-zinc-300 whitespace-nowrap py-0.5 border-t border-zinc-600 px-1">{{ value }}</div>
          <div :class="['text-[0.79rem] whitespace-nowrap border-t border-zinc-500 border-x', {'border-b': index === lastElementIndex}]">
              <slot :name="key"></slot>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

type TcFormProps = {
    data: {
        [key: string]: string
    }
}
const props = defineProps<TcFormProps>();
const lastElementIndex = computed(() => Object.keys(props.data).length - 1);
</script>

<style scoped>
.grid-cols {
    grid-template-columns: auto 1fr;
}
</style>