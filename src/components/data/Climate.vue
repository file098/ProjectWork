<template>
  <div class="content">
    <Card title="Team Climate" :icon="Globe" :subtitle="'This is a test subtitle'">
      <Line :data="chartData" :options="chartOptions" />
    </Card>
    <Card title="Soil Conditions" :icon="Leaf" :subtitle="'Current status of soil parameters'">
      <div class="environmental-conditions">
        <ProgressBar label="Humidity" :value="currentClimateData.humidity" unit="%" />
        <ProgressBar label="Rainfall" :value="currentClimateData.rainfall" unit="mm" :max="50" />
        <ProgressBar label="pH Level" :value="currentClimateData.soilPH" :max="14" />
      </div>
      <div class="environmental-stats">
        <StatCard
          title="Temperature"
          :value="currentClimateData.temperature"
          :icon="Globe"
          color="lightblue"
        />
        <StatCard
          title="Humidity"
          :value="currentClimateData.humidity"
          :icon="Globe"
          color="lightgreen"
        />
      </div>
    </Card>
  </div>
</template>

<script setup>
import { Card, ProgressBar } from '@/components/ui'
import StatCard from '@/components/ui/StatCard.vue'
import { Globe, Leaf } from '@iconoir/vue'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = defineProps({
  dataset: {
    type: Object,
    required: false,
    default: () => null,
  },
})

const chartData = computed(() => {
  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    return {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Temperature',
          data: [15, 20, 25, 30, 35],
          borderColor: '#90CAF9',
          backgroundColor: 'rgba(144, 202, 249, 0.2)',
          fill: false,
        },
        {
          label: 'Humidity',
          data: [30, 40, 50, 60, 70],
          borderColor: '#A5D6A7',
          backgroundColor: 'rgba(165, 214, 167, 0.2)',
          fill: false,
        },
      ],
    }
  }

  const labels = props.dataset.map((item, index) => `Day ${index + 1}`)
  const temperatures = props.dataset.map((item) => Math.round(item.temperature * 10) / 10)
  const humidity = props.dataset.map((item) => Math.round(item.humidity * 10) / 10)

  return {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: '#90CAF9',
        backgroundColor: 'rgba(144, 202, 249, 0.2)',
        fill: false,
      },
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: '#A5D6A7',
        backgroundColor: 'rgba(165, 214, 167, 0.2)',
        fill: false,
      },
    ],
  }
})

const currentClimateData = computed(() => {
  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    return {
      temperature: 22.5,
      humidity: 60,
      soilTemperature: 20.5,
      soilPH: 6.5,
      rainfall: 5.0,
    }
  }

  const latest = props.dataset[props.dataset.length - 1]
  return {
    temperature: Math.round(latest.temperature * 10) / 10,
    humidity: Math.round(latest.humidity),
    soilTemperature: Math.round((latest.temperature - 2) * 10) / 10,
    soilPH: 6.5,
    rainfall: latest.rainfall,
  }
})

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
.environmental-conditions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $card-background;
}

.environmental-stats {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: $card-background;
  margin: 1rem 0;
  gap: $spacing-md;
}
</style>
