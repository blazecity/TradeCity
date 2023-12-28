<template>
  <div class="p-1 w-full h-full bg-primary">
      <tc-table :headers="tableHeaders" :data="tableData" description="System Overview" class="w-full" selectable>

      </tc-table>
  </div>
</template>

<script setup lang="ts">
import TcTable from "@/components/ui/table/TcTable.vue";
import {reactive} from "vue";

enum SystemStatus {
    UP,
    UNHEALTHY,
    DOWN,
    UNKNOWN
}

type SystemStatusEntry = {
    system: string;
    version: string;
    description: string;
    status: SystemStatus;
    lastUpdated: Date
};

const tableHeaders = {
    defaultGroup: {
        headers: {
            system: "System",
            version: "Version",
            description: "Description",
            status: "Status",
            lastUpdated: "Last Updated"
        }
    }
};

const tableData = reactive([
    {
        system: "System Service",
        version: "0.0.1",
        description: "General System Service",
        status: SystemStatus.UP,
        lastUpdated: new Date()
    }
]);
</script>
