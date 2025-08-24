<template>
  <div class="content">
    <Card title="Team Climate" :icon="Globe" :subtitle="'This is a test subtitle'">
      <Line :data="chartData" :options="chartOptions" />
    </Card>
    <Card title="Soil Conditions" :icon="Leaf" :subtitle="'Current status of soil parameters'">
      <div class="soil-conditions">
        <ProgressBar label="Humidity" :value="currentClimateData.soilHumidity" unit="%" />
        <ProgressBar
          label="Temperature"
          :value="currentClimateData.soilTemperature"
          unit="°C"
          :max="50"
        />
        <ProgressBar label="pH Level" :value="currentClimateData.soilPH" :max="14" />
      </div>
      <div class="stats">
        <StatCard
          title="Temperature"
          :value="currentClimateData.temperature"
          :icon="'globe'"
          color="lightblue"
        />
        <StatCard
          title="Humidity"
          :value="currentClimateData.humidity"
          :icon="'globe'"
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

// Computed chart data that uses the dataset when available
const chartData = computed(() => {
  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    // Default data when no dataset is provided
    return {
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
  }

  // Use actual dataset data
  const labels = props.dataset.map((item, index) => `Day ${index + 1}`)
  const temperatures = props.dataset.map((item) => Math.round(item.temperature * 10) / 10)
  const humidity = props.dataset.map((item) => Math.round(item.humidity * 10) / 10)

  return {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.1)',
        fill: false,
      },
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: '#66BB6A',
        backgroundColor: 'rgba(102, 187, 106, 0.1)',
        fill: false,
      },
    ],
  }
})

// Computed values for current climate data
const currentClimateData = computed(() => {
  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    return {
      temperature: 22.5,
      humidity: 60,
      soilHumidity: 75,
      soilTemperature: 20.5,
      soilPH: 6.5,
    }
  }

  const latest = props.dataset[props.dataset.length - 1]
  return {
    temperature: Math.round(latest.temperature * 10) / 10,
    humidity: Math.round(latest.humidity),
    soilHumidity: 75, // Default value as not in dataset
    soilTemperature: Math.round((latest.temperature - 2) * 10) / 10, // Soil temp is typically lower
    soilPH: 6.5, // Default value as not in dataset
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
