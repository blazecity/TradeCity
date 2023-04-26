<template>
<div :class="['flex flex-col h-full bg-table-secondary rounded-sm overflow-hidden text-gray-400', styles]">
    <!-- table title -->
    <div class="px-3 py-1 font-bold text-sm text-gray-200">
        {{ tableConfig.label.toUpperCase() }}
    </div>
    <div class="overflow-auto scrollbar">
        <table class="border-collapse">
            <tr>
                <th v-for="option in Object.values(tableConfig.options)" class="bg-table-primary sticky top-0 py-1 text-gray-500">
                    <div class="flex justify-center">
                        <span class="mx-1 flex-1">{{ option.name }}</span>
                        <span class="border-r border-r-gray-500 my-1"></span>
                    </div>
                </th>
            </tr>
            <tr v-for="dataObject in tableConfig.data" class="odd:bg-table-primary">
                <td v-for="(value, key) in dataObject" :class="['text-center p-0.5', tableConfig.options[key].mutable ? 'border' : '']">
                   {{ (value instanceof Date) }} 
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script setup lang="ts" generic="T extends TableData, U extends { [key in keyof T]: ColumnOptions; }">
import { ref } from 'vue';
import { TableData } from '../../../utils/types';
import { ColumnOptions, TcTableConfig } from './table';
import TcTableInput from "./TcTableInput.vue";

const props = defineProps<{
    tableConfig: TcTableConfig<T, U>,
    styles?: string
}>();

</script>

<style scoped>
.table-template {
    grid-template-rows: auto fr;
}

.table-header-template {
    grid-template-rows: repeat(v-bind("tableConfig.numColumns"), auto);
    grid-template-columns: repeat(v-bind("tableConfig.numColumns"), 1fr) 10px;
}

.table-body-template {
    grid-template-rows: repeat(v-bind("tableConfig.data.size"), min-content);
    grid-template-columns: repeat(v-bind("tableConfig.numColumns"), 1fr);
}
</style>
