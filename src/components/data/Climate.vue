<template>
  <div class="climate-container">
    <Card title="Team Climate" :icon="Globe" :subtitle="'This is a test subtitle'">
      <Line :data="chartData" :options="chartOptions" />
    </Card>
    <Card
      title="Condizioni del suolo"
      :icon="Leaf"
      :subtitle="'Stato attuale dei parametri del suolo'"
    >
      <div class="soil-conditions">
        <ProgressBar label="Umidità" :value="75" unit="%" />
        <ProgressBar label="Temperatura" :value="20.5" unit="°C" :max="50" />
        <ProgressBar label="pH" :value="6.5" :max="14" />
      </div>
      <div class="stats">
        <StatCard title="Temperature" :value="22.5" :icon="'globe'" color="lightblue" />
        <StatCard title="Humidity" :value="60" :icon="'globe'" color="lightgreen" />
      </div>
    </Card>
  </div>
</template>

<script setup>
import { Card, ProgressBar } from '@/components/ui'
import { Globe, Leaf } from '@iconoir/vue'
import StatCard from '@/components/ui/StatCard.vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Temperature',
      data: [15, 20, 25, 30, 35],
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66, 165, 245, 0.1)',
      fill: false,
    },
    {
      label: 'Humidity',
      data: [30, 40, 50, 60, 70],
      borderColor: '#66BB6A',
      backgroundColor: 'rgba(102, 187, 106, 0.1)',
      fill: false,
    },
  ],
}

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Climate Data Over Time',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.climate-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: $spacing-md;
}

.soil-conditions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $card-background;
}

.stats {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: $card-background;
  margin: 1rem 0;
  gap: $spacing-md;
}
</style>
