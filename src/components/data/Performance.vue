<template>
  <div class="content">
    <Card
      title="Financial Performance"
      icon="💰"
      :subtitle="'Revenue, costs, and profitability analysis'"
    >
      <div class="performance-overview">
        <div class="financial-stats">
          <StatCard
            title="Total Revenue"
            :value="'€' + currentFinancialData.revenue.toLocaleString()"
            :icon="'revenue'"
            color="green"
          />
          <StatCard
            title="Production Costs"
            :value="'€' + currentFinancialData.productionCosts.toLocaleString()"
            :icon="'costs'"
            color="red"
          />
          <StatCard
            title="Profit Margin"
            :value="currentFinancialData.profitMargin + '%'"
            :icon="'profit'"
            :color="currentFinancialData.profitMargin > 0 ? 'green' : 'red'"
          />
          <StatCard
            title="Efficiency"
            :value="currentFinancialData.efficiency + ' kg/ha'"
            :icon="'efficiency'"
            color="blue"
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
  </div>
</template>

<script setup>
import { Card, ProgressBar } from '@/components/ui'
import StatCard from '@/components/ui/StatCard.vue'
import { computed } from 'vue'

const props = defineProps({
  dataset: {
    type: Object,
    required: false,
    default: () => null,
  },
})

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
