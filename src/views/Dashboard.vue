<template>
  <Header @start-simulation="handleStartSimulation" />

  <section>
    <div class="metrics-grid">
      <SmallCard
        v-for="metric in dashboardMetrics"
        :key="metric.title"
        :title="metric.title"
        :icon="metric.icon"
        :value="metric.value"
        :unit="metric.unit"
        :state="metric.state"
      />
    </div>
    <Switcher v-model="currentView" />
    <KeepAlive>
      <component :is="selectedComponent" :dataset="simulationData" />
    </KeepAlive>
  </section>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Climate from '@/components/data/Climate.vue'
import Performance from '@/components/data/Performance.vue'
import Production from '@/components/data/Production.vue'
import { SmallCard, Switcher } from '@/components/ui'
import { useEngine } from '@/composables/useEngine'
import { GraphUp, Globe, TemperatureHigh, Consumable } from '@iconoir/vue'
import { computed, ref } from 'vue'

const currentView = ref('Environmental Data')
const dataEngine = useEngine()
const simulationData = ref([])

const latestMetrics = computed(() => {
  if (!simulationData.value || simulationData.value.length === 0) {
    return null
  }
  return simulationData.value[simulationData.value.length - 1]
})

const dashboardMetrics = computed(() => {
  const data = latestMetrics.value

  return [
    {
      title: 'Latest Temperature',
      icon: TemperatureHigh,
      value: data?.temperature?.toFixed() || '0',
      unit: '°C',
      state: evaluateTemperatureStatus(data?.temperature || 0),
    },
    {
      title: 'Latest Harvest Quantity',
      icon: Consumable,
      value: data?.harvestQuantity?.toFixed() || '0',
      unit: 'kg',
      state: evaluateHarvestStatus(data?.harvestQuantity || 0),
    },
    {
      title: 'Latest Production Costs',
      icon: GraphUp,
      value: data?.productionCosts?.toFixed() || '0',
      unit: '€',
      state: evaluateCostStatus(data?.productionCosts || 0),
    },
    {
      title: 'Latest Sustainability',
      icon: Globe,
      value: data?.sustainability?.toFixed() || '0',
      unit: '%',
      state: evaluateSustainabilityStatus(data?.sustainability || 0),
    },
  ]
})

const evaluateTemperatureStatus = (temp) => {
  if (temp >= 15 && temp <= 25) return 'good'
  if (temp >= 10 && temp <= 30) return 'average'
  return 'bad'
}

const evaluateHarvestStatus = (quantity) => {
  if (quantity >= 500) return 'good'
  if (quantity >= 200) return 'average'
  return 'bad'
}

const evaluateCostStatus = (costs) => {
  if (costs <= 1000) return 'good'
  if (costs <= 2000) return 'average'
  return 'bad'
}

const evaluateSustainabilityStatus = (sustainability) => {
  if (sustainability >= 7) return 'good'
  if (sustainability >= 4) return 'average'
  return 'bad'
}

const selectedComponent = computed(() => {
  switch (currentView.value) {
    case 'Environmental Data':
      return Climate
    case 'Production':
      return Production
    case 'Financial Performance':
      return Performance
    default:
      return Climate
  }
})

const handleStartSimulation = (timespan) => {
  simulationData.value = dataEngine.createDataset(timespan)
  let currentPeriod = timespan

  setInterval(() => {
    const freshData = dataEngine.createSingleDayDataset()
    simulationData.value.push(...freshData)
    simulationData.value.shift()
    currentPeriod++
  }, 3000)
}
</script>

<style lang="scss" scoped>
.metrics-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
</style>
