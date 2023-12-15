<template>
  <div>{{ text }}</div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

type TcTempProps = {
    text: string;
};
defineProps<TcTempProps>();

const r = useRouter();
</script>
