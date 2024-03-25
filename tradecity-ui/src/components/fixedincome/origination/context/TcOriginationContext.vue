<template>
    <div class="flex items-center gap-3">
        <tc-client-lookup />
        <tc-badge class="bg-violet-400 text-black">S&P A+ / ZKB A / Fedafin A-</tc-badge>
    </div>
</template>

<script setup lang="ts">
import TcBadge from "@/components/ui/badge/TcBadge.vue";
import TcClientLookup from "@/components/common/lookup/TcClientLookup.vue";
</script>
