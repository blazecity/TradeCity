<template>
    <div class="grid grid-rows-fr-auto overflow-hidden w-fit h-full">
        <div class="overflow-auto scrollbar">
            <table class="bg-table-primary border-separate border-spacing-0 w-full">
                <thead class="sticky top-0 text-zinc-400 z-10">
                    <!-- group row -->
                    <tr v-if="grouped">
                        <th v-if="selectable" class="table-selectable-cell"></th>
                        <th
                            v-for="(group, groupKey, index) in headers" :key="groupKey" :colspan="Object.keys(group.headers).length"
                            :class="['table-header-cell']"
                        >
                            <div class="flex items-center">
                                <div v-if="index !== 0" class="inline-block h-[12px] bg-zinc-700 w-px justify-self-start"></div>
                                <div class="w-full">
                                    <slot :name="'group.' + groupKey" :group="groupKey" :label="group.label">
                                        <span class="whitespace-nowrap">{{ group.label ?? "" }}</span>
                                    </slot>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <!-- header row -->
                    <tr>
                        <th v-if="selectable" :class="['table-selectable-cell', {'border-t': !grouped}]">
                            <tc-check-box v-model="allSelected" />
                        </th>
                        <th
                            v-for="([headerKey, header], index) in flatHeaders" :key="headerKey"
                            :class="['table-header-cell', {'border-t': !grouped}]"
                        >
                            <div class="flex justify-between items-center">
                                <div v-if="index !== 0" class="inline-block h-[12px] bg-zinc-700 w-px justify-self-start"></div>
                                <div class="w-full mx-0.5">
                                    <slot :name="'header.' + headerKey" :header="headerKey" :label="header">
                                        <span class="border-white table-default-cell-content whitespace-nowrap">{{ header }}</span>
                                    </slot>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr v-if="subHeader">
                        <th v-if="selectable" class="table-selectable-cell"></th>
                        <th
                            v-for="([headerKey, header], index) in flatHeaders" :key="headerKey"
                            :class="['table-subheader-cell']"
                        >
                            <div class="flex justify-between items-center">
                                <div v-if="index !== 0" class="inline-block h-[12px] bg-zinc-700 w-px justify-self-start"></div>
                                <div class="w-full mx-0.5">
                                    <slot :name="'subheader.' + headerKey" :header="headerKey" :label="header">
                                    </slot>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- data row -->
                    <tr v-for="(entry, dataIndex) in data" :key="dataIndex"
                        :class="['table-data-row', isSelected(entry) ? 'bg-gray-500' : 'bg-table-primary']"
                    >
                        <td v-if="selectable" class="table-selectable-cell">
                            <tc-check-box :model-value="isSelected(entry)" @update:model-value="() => handleToggleSelection(entry)" />
                        </td>
                        <td v-for="([headerKey, ], index) in flatHeaders" :key="headerKey"
                            :class="['table-data-cell']"
                            @click="() => handleToggleSelection(entry)"
                        >
                            <div class="flex items-center justify-center">
                                <slot :name="'data.' + headerKey" :data="entry" :header="headerKey" :data-index="dataIndex">
                                    <span class="table-default-cell-content">{{ entry[headerKey as keyof T] }}</span>
                                </slot>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="footer" class="bg-tertiary px-1 border-t border-zinc-800">
            <slot name="footer">
                <span class="text-gray-200 text-xs">{{ description }}</span>
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
    footer?: boolean;
    subHeader?: boolean;
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
const lengthHeaderGroups = computed(() => Object.keys(props.headers).length);
const lengthHeaders = computed(() => flatHeaders.value.length);

// ========== HELPER FUNCTIONS ==========
function isSelected(dataEntry: T): boolean {
    return selectedData.has(dataEntry);
}

// ========== EVENT HANDLERS ==========

function handleToggleSelection(dataEntry: T): void {
    if (!props.selectable) return;

    if (isSelected(dataEntry)) {
        selectedData.delete(dataEntry);
    } else {
        selectedData.add(dataEntry);
    }
}
</script>
