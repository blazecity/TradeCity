<template>
    <div class="grid grid-rows-fr-auto overflow-hidden w-fit bg-secondary border border-zinc-700">
        <div class="overflow-auto scrollbar">
            <table class="bg-secondary border-separate border-spacing-0">
                <thead class="text-gray-400 sticky top-0 z-10">
                <!-- group row -->
                    <tr v-if="grouped">
                        <th v-if="selectable" class="table-selectable-cell"></th>
                        <th
                            v-for="(group, groupKey, index) in headers" :key="groupKey" :colspan="Object.keys(group.headers).length"
                            :class="['table-header-cell', {'border-l': index !== 0}]"
                        >
                            <slot :name="'group.' + groupKey" :group="groupKey" :label="group.label">
                                <span>{{ group.label ?? "" }}</span>
                            </slot>
                        </th>
                    </tr>
                    <!-- header row -->
                    <tr>
                        <th v-if="selectable" class="table-selectable-cell">
                            <tc-check-box v-model="allSelected" />
                        </th>
                        <th
                            v-for="([headerKey, header], index) in flatHeaders" :key="headerKey"
                            :class="['table-header-cell border-b', {'border-l': index !== 0}]"
                        >
                            <slot :name="'header.' + headerKey" :header="headerKey" :label="header">
                                <span class="table-default-cell-content">{{ header }}</span>
                            </slot>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- data row -->
                    <tr v-for="entry in data" :class="['table-data-row', isSelected(entry) ? 'bg-gray-500' : 'bg-secondary']">
                        <td v-if="selectable" class="table-selectable-cell">
                            <tc-check-box :model-value="isSelected(entry)" @update:model-value="() => toggleSelectionHandler(entry)" />
                        </td>
                        <td v-for="([headerKey, ], index) in flatHeaders" :key="headerKey"
                            :class="['table-data-cell', {'border-l': index !== 0}]" @click="() => toggleSelectionHandler(entry)"
                        >
                            <slot :name="'data.' + headerKey" :data="entry" :header="headerKey">
                                <span class="table-default-cell-content">{{ entry[headerKey as keyof T] }}</span>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bg-tertiary px-1 border-t border-zinc-800">
            <slot name="footer">
                <span class="text-gray-200">{{ description }}</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import type {TableHeaderGroups} from "@/components/ui/table/index";
import {computed, reactive, ref, watch} from "vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";

type TcTableProps = {
    data: Array<T>;
    description: string;
    headers: TableHeaderGroups<T>;
    grouped?: boolean;
    selectable?: boolean;
};
const props = defineProps<TcTableProps>();

type TcTableEmits = {
    selectionChanged: [selectedData: Array<T>];
};
const emits = defineEmits<TcTableEmits>();

const flatHeaders = computed(() => Object.values(props.headers).flatMap(group => Object.entries(group.headers)));
const selectedData = reactive(new Set<T>());
watch(selectedData, data => emits("selectionChanged", Array.from(data)));
const allSelected = ref(false);
watch(allSelected, isSelected => {
    if (isSelected) {
        props.data.forEach(entry => selectedData.add(entry));
    } else {
        selectedData.clear();
    }
});

// ========== HELPER FUNCTIONS ==========
function isSelected(dataEntry: T): boolean {
    return selectedData.has(dataEntry);
}

// ========== EVENT HANDLERS ==========
function toggleSelectionHandler(dataEntry: T): void {
    if (isSelected(dataEntry)) {
        selectedData.delete(dataEntry);
    } else {
        selectedData.add(dataEntry);
    }


}
</script>
