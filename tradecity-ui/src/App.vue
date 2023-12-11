<template>
    <tc-panel-view class="grid-cols-6 grid-rows-6 h-full" #default="{ expansionHandler }">
        <tc-panel title="Panel 1" :cols="3" :rows="3" :expansion-handler="expansionHandler">
            <div class="h-[1000px] w-full">
                <div>a</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
                <div>s</div>
            </div>
        </tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="3" :expansion-handler="expansionHandler">
            b
        </tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="3" :expansion-handler="expansionHandler">
            c
        </tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="3" :expansion-handler="expansionHandler">
            d
        </tc-panel>
    </tc-panel-view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ClickType, Context, useClickContext} from "@/stores/clickcontext";
import TcPanelView from "@/components/ui/panelview/TcPanelView.vue";
import TcPanel from "@/components/ui/panelview/TcPanel.vue";

const contextMenu: ContextMenu = [
  {
    id: "entry_1",
    label: "Entry 1",
    contextMenuItems: [
      {
        id: "subentry_1",
        label: "Subentry 1",
        action: () => console.log("Subentry 1")
      }
    ]
  },
  {
    id: "entry_2",
    label: "Entry 2",
    icon: "globe",
    action: () => console.log("Entry 2")
  },
  {
    id: "entry_3",
    label: "Entry 3",
    contextMenuItems: [
      {
        id: "subentry_3",
        label: "Subentry 3",
        action: () => console.log("Subentry 3")
      }
    ]
  }
];

function p(): void {
    console.log(tableData);
}

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

type SampleData = {
    id: number;
    name: string;
    birthday: Date;
    isMember: boolean;
}

const tableData = ref([
    { id: 1, name: "Jan Baumann", birthday: new Date(), isMember: true },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 2, name: "Hanslig", birthday: new Date(), isMember: false },
    { id: 3, name: "UUUUUUU", birthday: new Date(), isMember: false },
]);

setTimeout(() => {
    tableData.value.push({ id: 4, name: "HHHHHHHHHH", birthday: new Date(), isMember: true });
}, 3000);

const tableHeaders = {
    group1: {
        label: "Group 1",
        headers: {
            id: "ID",
            name: "Name",
            birthday: "Birthday",
        }
    },
    group2: {
        headers: {
            isMember: "Member"
        }
    }
}

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