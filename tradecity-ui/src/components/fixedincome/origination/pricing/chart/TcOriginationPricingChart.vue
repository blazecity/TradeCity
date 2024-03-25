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
        type: 'line',
        data: {
            labels: ["2yr", "3yr", "4yr", "5yr", "6yr", "7yr", "8yr"],
            datasets: [
                {
                    label: "Curve",
                    pointRadius: 4,
                    pointStyle: "dot",
                    borderColor: "cornflowerblue",
                    backgroundColor: "cornflowerblue",
                    data: [10, 10, 11, 12, 10, 11, 11],
                    showLine: false
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                }
            },
            scales: {
                y: {
                    type: "linear",
                    beginAtZero: true,
                    max: 15
                }
            }
        }
    });
});
</script>
