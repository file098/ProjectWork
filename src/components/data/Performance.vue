<template>
  <div class="content">
    <Card
      title="Financial Performance"
      icon="💰"
      :subtitle="'Revenue, costs, and profitability analysis'"
    >
      <div class="performance-overview">
        ``
        <div class="financial-stats">
          <StatCard
            title="Total Revenue"
            :value="'€' + currentFinancialData.revenue.toLocaleString()"
            :icon="'revenue'"
            color="lightgreen"
          />
          <StatCard
            title="Production Costs"
            :value="'€' + currentFinancialData.productionCosts.toLocaleString()"
            :icon="'costs'"
            color="lightcoral"
          />
          <!-- <StatCard
            title="Profit Margin"
            :value="currentFinancialData.profitMargin + '%'"
            :icon="'profit'"
            :color="currentFinancialData.profitMargin > 0 ? 'lightgreen' : 'lightcoral'"
          /> -->
          <StatCard
            title="Efficiency"
            :value="currentFinancialData.efficiency + ' kg/ha'"
            :icon="'efficiency'"
            color="lightblue"
          />
        </div>

        <div class="performance-indicators">
          <h3>Key Performance Indicators</h3>
          <div class="kpi-section">
            <ProgressBar
              label="Profitability Score"
              :value="Math.max(0, currentFinancialData.profitMargin)"
              unit="%"
              :max="100"
            />
            <ProgressBar
              label="Cost Efficiency"
              :value="currentFinancialData.costEfficiency"
              unit="%"
              :max="100"
            />
            <ProgressBar
              label="Sustainability Rating"
              :value="currentFinancialData.sustainability"
              unit="/10"
              :max="10"
            />
          </div>
        </div>
      </div>
    </Card>

    <Card title="Financial Trends" icon="📈" :subtitle="'Revenue and cost analysis over time'">
      <Line :data="chartData" :options="chartOptions" />
    </Card>
  </div>
</template>

<script setup>
import { Card, ProgressBar } from '@/components/ui'
import StatCard from '@/components/ui/StatCard.vue'
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
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
      datasets: [
        {
          label: 'Revenue (€)',
          data: [35000, 38000, 42000, 45000, 48000],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: false,
        },
        {
          label: 'Production Costs (€)',
          data: [28000, 29000, 30000, 32000, 34000],
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
          fill: false,
        },
      ],
    }
  }

  // Use actual dataset data
  const labels = props.dataset.map((item, index) => `Period ${index + 1}`)
  const revenues = props.dataset.map((item) => Math.round(item.revenue))
  const costs = props.dataset.map((item) => Math.round(item.productionCosts))

  return {
    labels,
    datasets: [
      {
        label: 'Revenue (€)',
        data: revenues,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: false,
      },
      {
        label: 'Production Costs (€)',
        data: costs,
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: false,
      },
    ],
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
      text: 'Financial Performance Over Time',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return '€' + value.toLocaleString()
        },
      },
    },
  },
}

// Computed values for current financial performance data
const currentFinancialData = computed(() => {
  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    return {
      revenue: 45000,
      productionCosts: 32000,
      profitMargin: 28.9,
      efficiency: 3200,
      costEfficiency: 75,
      sustainability: 8.5,
    }
  }

  const latest = props.dataset[props.dataset.length - 1]
  const efficiency = latest.harvestQuantity / latest.cultivatedArea
  const costEfficiency = Math.min(100, (latest.revenue / latest.productionCosts) * 20) // Scaled for visualization

  return {
    revenue: Math.round(latest.revenue),
    productionCosts: Math.round(latest.productionCosts),
    profitMargin: Math.round(latest.profitMargin * 10) / 10,
    efficiency: Math.round(efficiency),
    costEfficiency: Math.round(costEfficiency),
    sustainability: Math.round(latest.sustainability * 10) / 10,
  }
})
</script>

<style lang="scss" scoped>
.performance-overview {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.financial-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
}

.performance-indicators {
  h3 {
    margin: 0 0 $spacing-md 0;
    color: $text-color;
    font-size: 1.1rem;
    font-weight: 600;
  }
}

.kpi-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $card-background;
  border-radius: $border-radius-md;
}
</style>
