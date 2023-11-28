<template>
  <div class="flex items-center">
    <tc-tab-view>
      <tc-tab id="a" label="AAA">
        A
      </tc-tab>
      <tc-tab id="b" label="BBB">
        B
      </tc-tab>
    </tc-tab-view>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {ref} from "vue";
import {ClickType, Context, useClickContext} from "@/stores/clickcontext";
import TcTabView from "@/components/ui/tabview/TcTabView.vue";
import TcTab from "@/components/ui/tabview/TcTab.vue";

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