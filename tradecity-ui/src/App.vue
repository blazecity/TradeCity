<template>
  <div class="flex items-center">
    <tc-badge text="Hello" class="bg-yellow-200 text-black" />
    <tc-button text="Click Me Now" dangerous />
    <tc-number-input v-model="val" placeholder="Default" @focusout="fallthrough = 'After'" :validation="() => ({isValid: false, errorMessage: ''})" />
    <tc-string-input v-model="stringVal" placeholder="Hello" />
    <tc-date-input v-model="date" placeholder="Date" />
    <tc-combo-box class="w-56" :items="cbItems"></tc-combo-box>
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
import {RouterView} from 'vue-router'
import TcBadge from "@/components/ui/badge/TcBadge.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import {ref} from "vue";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import TcDateInput from "@/components/ui/input/TcDateInput.vue";
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";
import {ClickType, Context, useClickContext} from "@/stores/clickcontext";

const val = ref(0);
const stringVal = ref("");
const date = ref(new Date());
const fallthrough = ref("Before");
const checkbox = ref(false);

setTimeout(() => checkbox.value = true, 3000);

const cbItems = [
  { label: 'A', id: "a", data: { something: "a" } },
  { label: 'B', id: "b", data: { something: "b" } },
  { label: 'C', id: "c", data: { something: "c" } },
  { label: 'D', id: "d", data: { something: "d" } },
  { label: 'E', id: "e", data: { something: "e" } },
  { label: 'F', id: "f", data: { something: "f" } },
  { label: 'G', id: "g", data: { something: "g" } },
  { label: 'H', id: "h", data: { something: "h" } },
  { label: 'I', id: "i", data: { something: "i" } },
  { label: 'J', id: "j", data: { something: "j" } },
  { label: 'K', id: "k", data: { something: "k" } },
  { label: 'L', id: "l", data: { something: "l" } },
  { label: 'M', id: "m", data: { something: "m" } },
  { label: 'N', id: "n", data: { something: "n" } },
  { label: 'O', id: "o", data: { something: "o" } },
  { label: 'P', id: "p", data: { something: "p" } },
  { label: 'Q', id: "q", data: { something: "q" } },
  { label: 'R', id: "r", data: { something: "r" } },
  { label: 'S', id: "s", data: { something: "s" } },
  { label: 'T', id: "t", data: { something: "t" } },
  { label: 'U', id: "u", data: { something: "u" } },
  { label: 'V', id: "v", data: { something: "v" } },
]

const { registerClick } = useClickContext();

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    registerClick(Context.BODY, ClickType.ESCAPE);
  }
});

document.addEventListener("mousedown", () => {
  registerClick(Context.BODY, ClickType.OUTSIDE)
});
</script>