<template>
<div :class="['flex flex-col h-full text-xs bg-table-secondary rounded-sm overflow-hidden text-gray-400', styles]">
    <!-- table title -->
    <div class="px-3 py-1 font-bold text-sm text-gray-200">
        {{ tableConfiguration.label.toUpperCase() }}
    </div>
    <div class="overflow-auto scrollbar">
        <table class="border-separate border-spacing-0">
            <tr v-if="tableConfiguration.grouping">
                Hihi
            </tr>
            <tr>
                <th v-for="[key, option] in Object.entries(tableConfiguration.options)" @click="sortBy(key)" :key="key" class="z-30 bg-table-primary sticky top-0 py-1 text-gray-400 hover:cursor-pointer">
                    <div class="flex justify-center">
                        <span class="mx-1 flex-1">{{ option.name }}</span>
                        <north-icon v-if="tableConfiguration.currentSortedField === key && tableConfiguration.currentSorting === 1" :width="16" :height="16" styles="fill-white" />
                        <south-icon v-if="tableConfiguration.currentSortedField === key && tableConfiguration.currentSorting === -1" :width="16" :height="16" styles="fill-white" />
                        <span class="border-r border-r-gray-700 my-0.5"></span>
                    </div>
                </th>
            </tr>
            <tr v-for="(dataObject, rowIndex) in tableConfiguration.data" :key="rowIndex" class="even:bg-table-primary text-gray-200">
                <td v-for="[key, value] in Object.entries(dataObject)" :key="key + rowIndex" :class="['text-center', tableConfiguration.options[key].mutable ? 'bg-black bg-opacity-80 border-zinc-800 border-b border-x' : '', (rowIndex === 0 && tableConfiguration.options[key].mutable) ? 'border-t' : '']">
                   <input type="date" v-if="(value instanceof Date)" :value="formatDate(value)" @focusout="event => assignDate(dataObject, key, event)" :disabled="!tableConfiguration.options[key].mutable" class="form-input py-0 pr-0 pl-1 w-[5.5rem] text-xs text-gray-200 bg-transparent border-0">
                   <input type="checkbox" v-if="typeof value === 'boolean'" v-model="dataObject[key]" @focusout="valueChanged(dataObject)" :disabled="!tableConfiguration.options[key].mutable" class="checkbox">
                   <input type="text" v-if="typeof value === 'number'" :value="formatNumber(value, key)" @focusout="event => assignNumber(dataObject, key, event)" :disabled="!tableConfiguration.options[key].mutable" class="table-textfield">
                   <input type="text" v-if="typeof value === 'string'" v-model="dataObject[key]" @focusout="event => valueChanged(dataObject)" :disabled="!tableConfiguration.options[key].mutable" class="table-textfield">
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script setup lang="ts" generic="T extends TableData, U extends { [key in keyof T]: ColumnOptions; }">
import { reactive } from 'vue';
import { TableData } from '../../../utils/types';
import { ColumnOptions, TcTableConfig } from './table';
import NorthIcon from '../../icons/NorthIcon.vue';
import SouthIcon from '../../icons/SouthIcon.vue';

const props = defineProps<{
    tableConfiguration: TcTableConfig<T, U>,
    styles?: string
}>();

const tableConfiguration = reactive(props.tableConfiguration) as TcTableConfig<T, U>;

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

function formatNumber(value: number, field: string): string {
    const decimalPlaces = props.tableConfiguration.options[field].decimalPoints ?? 0;
    return Intl.NumberFormat("de-CH", {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces}).format(value);
}

const valueChanged = (dataObject: T) => tableConfiguration.onValueChanged(dataObject);
const sortBy = (field: string) => tableConfiguration.sortNext(field);
</script>

<style scoped>
.table-template {
    grid-template-rows: auto fr;
}

input {
    color-scheme: dark;
}
</style>
