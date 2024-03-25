<template>
    <div class="grid grid-rows-fr-auto w-full h-full">
        <div :class="['overflow-auto scrollbar', {'w-fit rounded-xs': finite}]">
            <div :class="['table-grid min-w-fit table-font-size', excessColumn ? 'table-columns-excess' : 'table-columns', {'rounded-xs table-border': finite}]">
                <!-- header groups -->
                <div v-if="grouped && !noHeader" class="contents">
                    <!-- empty checkbox cell -->
                    <div v-if="selectable" class="table-cell table-header-cell"></div>
                    <tc-table-header-group v-for="(group, groupKey, index) in headers" :key="groupKey" :colspan="Object.keys(group.headers).length">
                        <div :class="['table-cell table-header-cell justify-between', {'table-column-divider': selectable}, {'table-column-divider': !selectable && index !== 0}]">
                            <slot :name="'group.' + groupKey" :group="groupKey" :label="group.label">
                                <span class="table-default-cell-content">{{ group.label ?? "" }}</span>
                            </slot>
                            <tc-table-resizer />
                        </div>
                    </tc-table-header-group>
                </div>

                <!-- headers -->
                <div v-if="!noHeader" class="contents">
                    <!-- checkbox column -->
                    <div v-if="selectable" :class="['table-cell table-selectable-cell table-header-cell z-10', {'table-header-divider': !subHeader}]">
                        <tc-check-box v-model="allSelected" />
                    </div>
                    <div v-for="([headerKey, header], index) in flatHeaders" :key="headerKey" :class="[
                        'table-cell table-header-cell w-full',
                        {'table-header-divider': !subHeader},
                        {'table-column-divider': selectable},
                        {'table-column-divider': !selectable && index !== 0},
                        {'table-column-divider': !selectable && index !== 0}
                    ]">
                        <slot :name="'header.' + headerKey" :header="headerKey" :label="header">
                            <span class="table-default-cell-content whitespace-nowrap">{{ header }}</span>
                        </slot>
                        <tc-table-resizer />
                    </div>
                    <!-- excess column -->
                    <div v-if="excessColumn" :class="['table-cell table-header-cell table-column-divider sticky w-full', {'border-t': grouped}, {'table-header-divider': !subHeader}]"></div>
                </div>

                <!-- subheaders -->

                <!-- data -->
                <div v-for="(entry, dataIndex) in data" :key="dataIndex" class="contents table-data-row">
                    <!-- checkbox column -->
                    <div v-if="selectable" :class="['table-cell table-selectable-cell sticky', isSelected(entry) ? 'selected-cell' : 'bg-transparent']">
                        <tc-check-box :model-value="isSelected(entry)" @update:model-value="() => handleToggleSelection(entry)" />
                    </div>
                    <div
                         v-for="([headerKey, ], index) in flatHeaders" :key="headerKey"
                         :class="['table-cell table-data-cell', {'border-l': selectable || index !== 0}, isSelected(entry) ? 'selected-cell' : 'bg-transparent']"
                         @click="() => handleToggleSelection(entry)"
                    >
                        <slot :name="'data.' + headerKey" :data="entry" :header="headerKey" :data-index="dataIndex">
                            <span class="table-default-cell-content">{{ entry[headerKey as keyof T] }}</span>
                        </slot>
                    </div>
                    <!-- excess column -->
                    <div v-if="excessColumn" :class="['table-cell table-data-cell border-l', {'selected-cell': isSelected(entry)}]"></div>
                </div>
            </div>
        </div>
        <div v-if="footer" class="bg-table-primary border-y table-border">
            <slot name="footer">
                <span class="text-gray-200 text-small px-1">{{ description }}</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import type {TableHeaderGroups} from "@/components/ui/table/index";
import {computed, reactive, ref, watch} from "vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";
import TcTableHeaderGroup from "@/components/ui/table/TcTableHeaderGroup.vue";
import TcTableResizer from "@/components/ui/table/TcTableResizer.vue";

type TcTableProps = {
    data: Array<T>;
    description: string;
    headers: TableHeaderGroups<T>;
    grouped?: boolean;
    selectable?: boolean;
    footer?: boolean;
    subHeader?: boolean;
    noHeader?: boolean;
    excessColumn?: boolean;
    finite?: boolean;
};
const props = defineProps<TcTableProps>();

type TcTableEmits = {
    selectionChanged: [selectedData: Array<T>];
};
const emits = defineEmits<TcTableEmits>();

const flatHeaders = computed(() => Object.values(props.headers).flatMap(group => Object.entries(group.headers)));
const headerSize = computed(() => flatHeaders.value.length + (props.selectable ? 1 : 0));
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

function handleToggleSelection(dataEntry: T): void {
    if (!props.selectable) return;

    if (isSelected(dataEntry)) {
        selectedData.delete(dataEntry);
    } else {
        selectedData.add(dataEntry);
    }
}
</script>

<style scoped lang="postcss">
.table-grid {
    display: grid;
}

.table-columns {
    grid-template-columns: repeat(v-bind('headerSize'), min-content);
}

.table-columns-excess {
    grid-template-columns: repeat(v-bind('headerSize'), min-content) 1fr;
}

.table-cell {
    @apply inline-flex w-full table-border;
}

.table-font-size {
  font-size: 0.7rem;
}

.table-border {
    @apply border-neutral-700;
}

.table-header-cell {
  @apply flex justify-between items-center overflow-x-hidden sticky top-0 font-bold border-b bg-table-primary text-zinc-400;
}

.table-column-divider:before {
    @apply content-empty h-1/2 w-px bg-neutral-600;
}

.table-header-divider {
    @apply border-b border-b-zinc-500;
}

.table-subheader-cell {
    @apply table-border bg-table-primary py-1 px-0;
}

.table-header-cell::-webkit-resizer {
    display: none;
}

.table-data-cell {
  @apply h-full w-full table-border text-xs;
}

.table-selectable-cell {
  @apply border-l left-0 p-1;
}

.table-default-cell-content {
  @apply p-1 whitespace-nowrap;
}

:nth-child(odd of .table-data-row) > div {
    @apply bg-table-primary;
}

:nth-child(even of .table-data-row) > div {
    @apply bg-table-secondary;
}

.table-data-row:hover > div {
    @apply bg-blue-400 cursor-pointer;
}

.selected-cell {
    background-color: rgba(59, 89, 201, 0.5);
}
</style>
