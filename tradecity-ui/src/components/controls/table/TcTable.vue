<template>
<div :class="['flex flex-col h-full text-xs bg-table-secondary rounded-sm overflow-hidden text-gray-400', styles]">
    <!-- table title -->
    <div class="px-3 py-1 font-bold text-sm text-gray-200">
        {{ tableConfiguration.label.toUpperCase() }}
    </div>
    <div class="overflow-auto scrollbar">
        <table class="border-separate border-spacing-0">
            <tr v-if="tableConfiguration.grouped">
                <th v-for="[key, group] of Object.entries(tableConfiguration.options)" :key="key" class="table-header-cell h-px" :colspan="Object.keys(group.elements).length">
                    <div class="flex justify-center h-full">
                        <span class="mx-1 flex-1">{{  group.isGrouped ? group.name : "" }}</span>
                        <span class="border-r border-r-gray-700 my-0.5"></span>
                    </div>
                </th>
            </tr>
            <tr>
                <th v-for="[index, [_, option]] of tableConfiguration.flatColumnOptions.entries()" @click="sortBy(index)" :key="index" class="table-header-cell">
                    <div class="flex justify-center">
                        <span class="mx-1 flex-1">{{ option.name }}</span>
                        <north-icon v-if="tableConfiguration.currentSortedField === index && tableConfiguration.currentSorting === 1" :width="16" :height="16" styles="fill-white" />
                        <south-icon v-if="tableConfiguration.currentSortedField === index && tableConfiguration.currentSorting === -1" :width="16" :height="16" styles="fill-white" />
                        <span class="border-r border-r-gray-700 my-0.5"></span>
                    </div>
                </th>
            </tr>
            <tr v-for="(dataObject, rowIndex) in tableConfiguration.data" :key="rowIndex" class="even:bg-table-primary text-gray-200">
                <td v-for="[colIndex, [colKey, option]] of tableConfiguration.flatColumnOptions.entries()" :key="colKey + colIndex + rowIndex" :class="['text-center', option.mutable ? 'bg-black bg-opacity-80 border-zinc-800 border-b border-x' : '', (rowIndex === 0 && option.mutable) ? 'border-t' : '']">
                    <input type="date" v-if="(dataObject[colKey] instanceof Date)" :value="formatDate(dataObject[colKey] as Date)" @focusout="event => assignDate(dataObject, colKey, event)" :disabled="!option.mutable" class="form-input py-0 pr-0 pl-1 w-[5.5rem] text-xs text-gray-200 bg-transparent border-0">
                    <input type="checkbox" v-if="typeof dataObject[colKey] === 'boolean'" v-model="dataObject[colKey]" @focusout="valueChanged(dataObject)" :disabled="!option.mutable" class="checkbox">
                    <input type="text" v-if="typeof dataObject[colKey] === 'number'" :value="formatNumber(dataObject[colKey] as number, option.decimalPoints)" @focusout="event => assignNumber(dataObject, colKey, event)" :disabled="!option.mutable" class="table-textfield">
                    <input type="text" v-if="typeof dataObject[colKey] === 'string'" v-model="dataObject[colKey]" @focusout="event => valueChanged(dataObject)" :disabled="!option.mutable" class="table-textfield">
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script setup lang="ts" generic="T extends TableData">
import { reactive } from 'vue';
import { TableData } from '../../../utils/types';
import { TcTableConfig } from './table';
import NorthIcon from '../../icons/NorthIcon.vue';
import SouthIcon from '../../icons/SouthIcon.vue';

const props = defineProps<{
    tableConfiguration: TcTableConfig<T>,
    styles?: string
}>();

const tableConfiguration = reactive(props.tableConfiguration) as TcTableConfig<T>;

// Date functions
function assignDate(dataObject: T, key: string, event: Event): void {
    const o: TableData = {};
    o[key] = (event.target as HTMLInputElement).valueAsDate ?? new Date();
    Object.assign(dataObject, o);
    valueChanged(dataObject);
}

const formatDate = (value: Date) => value.toISOString().split("T")[0];

// Number functions
function assignNumber(dataObject: T, key: string, event: Event): void {
    const input = (event.target as HTMLInputElement).value ?? "";
    const num = +input.replace(/[k]/g, "000").replace(/[m]/g, "000000").replace(/[^0-9.-]/g, "");
    const o: TableData = {};
    o[key] = num;
    Object.assign(dataObject, o);
    valueChanged(dataObject);
}

function formatNumber(value: number, decimalPoints?: number): string {
    const decimalPlaces = decimalPoints ?? 0;
    return Intl.NumberFormat("de-CH", {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces}).format(value);
}

const valueChanged = (dataObject: T) => tableConfiguration.onValueChanged(dataObject);
const sortBy = (index: number) => tableConfiguration.sortNext(index);
</script>

<style scoped>
.table-template {
    grid-template-rows: auto fr;
}

input {
    color-scheme: dark;
}
</style>
