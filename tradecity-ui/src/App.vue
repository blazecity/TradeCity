<template>
  <div>
    <tc-badge text="Hello" class="bg-green-500" />
    <tc-button text="Click Me Now" dangerous />
    <tc-number-input v-model="val" placeholder="Default" @focusout="fallthrough = 'After'" :validation="val => ({isValid: false, errorMessage: ''})" />
    <tc-string-input v-model="stringVal" placeholder="Hello" />
    <tc-date-input v-model="date" placeholder="Date" />
    <span>{{ val }}</span>
    <span>{{fallthrough}}</span>
    <span>{{stringVal}}</span>
    <span>{{date}}</span>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TcBadge from "@/components/ui/badge/TcBadge.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import {ref} from "vue";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import TcDateInput from "@/components/ui/input/TcDateInput.vue";

const val = ref(0);
const stringVal = ref("");
const date = ref(new Date());
const fallthrough = ref("Before");
</script>