<template>
  <tc-lookup :displayed-value="displayedValue" placeholder="Client" @search-enter="handleSearchEnter" dark>
      <div class="client-lookup-grid container">
          <div class="client-lookup-form-grid">
              <tc-string-input v-model="nameSearch" placeholder="Client Name" with-label class="col-span-full" />
              <tc-string-input v-model="keySearch" placeholder="Client Key" with-label />
              <tc-string-input v-model="bloombergCodeSearch" placeholder="Bloomberg Code" with-label />
              <tc-combo-box placeholder="State" :items="clientStates" with-label />
          </div>
          <div>
              <tc-button>
                  Search
              </tc-button>
              <tc-button>
                  Clear
              </tc-button>
          </div>
          <div>
              <tc-table :headers="clientTableHeaders" :data="clientTableData" description="Clients" />
          </div>
      </div>
  </tc-lookup>
</template>

<script setup lang="ts">
import TcLookup from "@/components/ui/lookup/TcLookup.vue";
import {ref} from "vue";
import type {SearchCallback} from "@/components/common/lookup/index";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import TcTable from "@/components/ui/table/TcTable.vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import {TcBroadcastChannel} from "@/utilities/window";

const displayedValue = ref("");
const nameSearch = ref("");
const keySearch = ref("");
const bloombergCodeSearch = ref("");

const clientStates = [
    {
        id: "active",
        label: "Active",
        data: {}
    },
    {
        id: "inactive",
        label: "Inactive",
        data: {},
    },
    {
        id: "all_states",
        label: "All States",
        data: {}
    }
];

const clientTableHeaders = {
    defaultGroup: {
        headers: {
            id: {
                name: "ID",
            }
        }
    }
};

type LookupClient = {
    id: string,
    name: string,
    key: string,
    bloombergCode: string,

}

const clientTableData = [];

// ========= EVENT HANDLERS =========

function handleSearchEnter(searchValue: string, searchCallback: SearchCallback): void {
    searchCallback(2, () => "Hello");
}
</script>

<style scoped>
.container {
    width: 50vw;
}

.client-lookup-grid {
    display: grid;
    grid-template-rows: auto auto 20vh;
    gap: 5px;
}

.client-lookup-form-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 3px;
    column-gap: 6px;
}
</style>