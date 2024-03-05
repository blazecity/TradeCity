<template>
  <div class="h-full w-full">
      <canvas :id="chartId"></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {Chart, registerables} from "chart.js";

const chartId = "pricing-comparison-chart"

onMounted(() => {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement;

    Chart.register(...registerables);
    new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    data: [65, 59, 80, 81, 56, 55, 40],
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
</script>
