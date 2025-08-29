<template>
  <div class="content">
    <Card
      title="Financial Performance"
      icon="💰"
      :subtitle="'Revenue, costs, and profitability analysis'"
    >
      <div class="financial-overview">
        <div class="revenue-stats">
          <StatCard
            title="Total Revenue"
            :value="'€' + currentFinancialData.revenue.toLocaleString()"
            :icon="Euro"
            color="lightgreen"
          />
          <StatCard
            title="Production Costs"
            :value="'€' + currentFinancialData.productionCosts.toLocaleString()"
            :icon="StatDown"
            color="lightcoral"
          />
          <StatCard
            title="Efficiency"
            :value="currentFinancialData.efficiency + ' kg/ha'"
            :icon="StatUp"
            color="lightblue"
          />
        </div>

        <div class="business-indicators">
          <h3>Key Performance Indicators</h3>
          <div class="metrics-section">
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
      <div class="visualization-controls">
        <div class="chart-selection-buttons">
          <Button
            v-for="chartType in visualizationTypes"
            :key="chartType.value"
            :variant="activeChartType === chartType.value ? 'primary' : 'outline'"
            size="small"
            @click="activeChartType = chartType.value"
          >
            {{ chartType.icon }} {{ chartType.label }}
          </Button>
        </div>
      </div>

      <component
        :is="currentVisualization"
        :data="financialChartData"
        :options="visualizationOptions"
      />
    </Card>
  </div>
</template>

<script setup>
import { Card, ProgressBar, Button } from '@/components/ui'
import StatCard from '@/components/ui/StatCard.vue'
import { Euro, StatDown, StatUp } from '@iconoir/vue'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  BarElement,
  ArcElement,
  Filler,
} from 'chart.js'
import { computed, ref } from 'vue'
import { Line, Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
)

const props = defineProps({
  dataset: {
    type: Object,
    required: false,
    default: () => null,
  },
})

const activeChartType = ref('line')

const visualizationTypes = [
  { value: 'line', label: 'Line', icon: '📈' },
  { value: 'bar', label: 'Bar', icon: '📊' },
  { value: 'area', label: 'Area', icon: '📉' },
]

const currentVisualization = computed(() => {
  switch (activeChartType.value) {
    case 'bar':
      return Bar
    case 'doughnut':
      return Doughnut
    case 'area':
    case 'line':
    default:
      return Line
  }
})

const financialChartData = computed(() => {
  if (activeChartType.value === 'doughnut') {
    const current = currentFinancialData.value
    const profit = current.revenue - current.productionCosts

    return {
      labels: ['Revenue', 'Production Costs', 'Profit'],
      datasets: [
        {
          data: [current.revenue, current.productionCosts, Math.max(0, profit)],
          backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
          borderColor: ['#4CAF50', '#F44336', '#2196F3'],
          borderWidth: 2,
        },
      ],
    }
  }

  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    const defaultData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
      datasets: [
        {
          label: 'Revenue (€)',
          data: [35000, 38000, 42000, 45000, 48000],
          borderColor: '#4CAF50',
          backgroundColor:
            activeChartType.value === 'area' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)',
          fill: activeChartType.value === 'area',
        },
        {
          label: 'Production Costs (€)',
          data: [28000, 29000, 30000, 32000, 34000],
          borderColor: '#F44336',
          backgroundColor:
            activeChartType.value === 'area' ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.2)',
          fill: activeChartType.value === 'area',
        },
      ],
    }
    return defaultData
  }

  const timeLabels = props.dataset.map((item, index) => `Period ${index + 1}`)
  const revenueData = props.dataset.map((item) => Math.round(item.revenue))
  const costData = props.dataset.map((item) => Math.round(item.productionCosts))

  return {
    labels: timeLabels,
    datasets: [
      {
        label: 'Revenue (€)',
        data: revenueData,
        borderColor: '#4CAF50',
        backgroundColor:
          activeChartType.value === 'area' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)',
        fill: activeChartType.value === 'area',
      },
      {
        label: 'Production Costs (€)',
        data: costData,
        borderColor: '#F44336',
        backgroundColor:
          activeChartType.value === 'area' ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.2)',
        fill: activeChartType.value === 'area',
      },
    ],
  }
})

const visualizationOptions = computed(() => {
  if (activeChartType.value === 'doughnut') {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Current Financial Breakdown',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ': €' + context.parsed.toLocaleString()
            },
          },
        },
      },
      maintainAspectRatio: false,
    }
  }

  const configOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:
          activeChartType.value === 'area'
            ? 'Financial Performance Trends (Area View)'
            : activeChartType.value === 'bar'
              ? 'Financial Performance Comparison'
              : 'Financial Performance Over Time',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time Period',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount (€)',
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '€' + value.toLocaleString()
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  }

  if (activeChartType.value === 'area') {
    configOptions.elements = {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    }
  }

  if (activeChartType.value === 'bar') {
    configOptions.plugins.tooltip.mode = 'index'
    configOptions.scales.x.grid = {
      display: false,
    }
  }

  return configOptions
})

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

  const latestEntry = props.dataset[props.dataset.length - 1]
  const productionEfficiency = latestEntry.harvestQuantity / latestEntry.cultivatedArea
  const operationalEfficiency = Math.min(
    100,
    (latestEntry.revenue / latestEntry.productionCosts) * 20,
  )

  return {
    revenue: Math.round(latestEntry.revenue),
    productionCosts: Math.round(latestEntry.productionCosts),
    profitMargin: Math.round(latestEntry.profitMargin * 10) / 10,
    efficiency: Math.round(productionEfficiency),
    costEfficiency: Math.round(operationalEfficiency),
    sustainability: Math.round(latestEntry.sustainability * 10) / 10,
  }
})
</script>

<style lang="scss" scoped>
.financial-overview {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.revenue-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
}

.business-indicators {
  h3 {
    margin: 0 0 $spacing-md 0;
    color: $text-color;
    font-size: 1.1rem;
    font-weight: 600;
  }
}

.metrics-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $card-background;
  border-radius: $border-radius-md;
}

.visualization-controls {
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-color;
}

.chart-selection-buttons {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;
  align-items: center;

  @include responsive(mobile) {
    gap: $spacing-xs;
  }
}
</style>
