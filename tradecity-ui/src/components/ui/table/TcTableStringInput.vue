<template>
  <div class="bg-dark">
      <tc-string-input v-model="model" placeholder="" table-input />
  </div>
</template>

<script setup lang="ts">
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import {defineModel} from "vue";

const model = defineModel();
</script>
