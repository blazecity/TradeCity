<template>
  <tc-ok-cancel-container class="p-1 h-full bg-primary">
      <tc-collapsable-panel title="Basic Information">
          <div class="grid grid-cols-3">
              <tc-string-input v-model="clientName" placeholder="Client name" class="w-96" with-label />
              <tc-string-input v-model="internalCode" placeholder="Internal code" with-label />
              <tc-string-input v-model="bloombergCode" placeholder="Bloomberg code" with-label />
          </div>
      </tc-collapsable-panel>
      <tc-collapsable-panel title="Products">
          Select all modules for which the client is activated.
      </tc-collapsable-panel>
  </tc-ok-cancel-container>
</template>

<script setup lang="ts">
import TcCollapsablePanel from "@/components/ui/collapsablepanel/TcCollapsablePanel.vue";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import {ref} from "vue";
import TcOkCancelContainer from "@/components/ui/common/TcOkCancelContainer.vue";

const clientName = ref("");
const internalCode = ref("");
const bloombergCode = ref("");
</script>
