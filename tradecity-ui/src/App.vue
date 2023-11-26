<template>
  <div>
    <tc-badge text="Hello" class="bg-yellow-200 text-black" />
    <tc-button text="Click Me Now" dangerous />
    <tc-number-input v-model="val" placeholder="Default" @focusout="fallthrough = 'After'" :validation="val => ({isValid: false, errorMessage: ''})" />
    <tc-string-input v-model="stringVal" placeholder="Hello" />
    <tc-date-input v-model="date" placeholder="Date" />
    <tc-combo-box class="w-56" :items="cbItems">
      <template #default="props">
        {{ props.item.label }}
      </template>
      <template #selected-item="props">
        <span>{{ props.item.label }}</span>
      </template>
    </tc-combo-box>
    <tc-check-box v-model="checkbox" />
    <span>{{ val }}</span>
    <span>{{fallthrough}}</span>
    <span>{{stringVal}}</span>
    <span>{{date}}</span>
    <span>{{ checkbox }}</span>
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
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";

const val = ref(0);
const stringVal = ref("");
const date = ref(new Date());
const fallthrough = ref("Before");
const checkbox = ref(false);

setTimeout(() => checkbox.value = true, 3000);

const cbItems = [
  { label: 'Combo' },
  { label: 'Box' },
]
</script>