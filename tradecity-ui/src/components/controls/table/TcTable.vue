<template>
<div class="bg-table-secondary m-0.5 rounded-sm">
    <div class="flex items-center px-3 py-1">
        <span class="font-bold text-base">TABLE TITLE</span>
    </div>
    <table class="border-collapse">
    <!-- table header -->
    <tr>
        <th v-for="option in Object.values(tableConfig.options)" class="font-normal p-0 bg-table-primary text-neutral-300">
            <div class="flex justify-between">
                <div class="px-1.5 py-1 text-center w-full font-bold">{{ option.name }}</div>
                <div class="border-r my-2 border-r-neutral-500"></div>
            </div>
        </th>
    </tr>
    <!-- table data -->
    <tr v-for="dataPoint in tableConfig.data" class="odd:bg-table-primary">
        <td v-for="property in Object.values(dataPoint)" class="text-center p-0 w-14">
            <tc-table-input></tc-table-input>
        </td>
    </tr>
</table>
</div>
</template>

<script setup lang="ts" generic="T extends TableData, U extends { [key in keyof T]: ColumnOptions; }">
import { TableData } from '../../../utils/types';
import { ColumnOptions, TcTableConfig } from './table';
import TcTableInput from "./TcTableInput.vue";

defineProps<{
    tableConfig: TcTableConfig<T, U>
}>();
</script>

<style scoped>

</style>
