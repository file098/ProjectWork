<template>
  <Header @start-simulation="handleStartSimulation" />

  <section>
    <div class="small-cards-container">
      <SmallCard
        v-for="card in farmMetrics"
        :key="card.title"
        :title="card.title"
        :icon="card.icon"
        :value="card.value"
        :unit="card.unit"
        :state="card.state"
      />
    </div>
    <Switcher v-model="activeOption" />
    <KeepAlive>
      <component :is="activeComponent" :dataset="dataset" />
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
import { GraphUp, Globe } from '@iconoir/vue'
import { computed, ref } from 'vue'

const activeOption = ref('Environmental Data')
const engine = useEngine()
const dataset = ref([])

const latestData = computed(() => {
  if (!dataset.value || dataset.value.length === 0) {
    return null
  }
  return dataset.value[dataset.value.length - 1]
})

const farmMetrics = computed(() => {
  const data = latestData.value

  return [
    {
      title: 'Latest Temperature',
      icon: GraphUp,
      value: data?.temperature?.toFixed() || '0',
      unit: '°C',
      state: getTemperatureState(data?.temperature || 0),
    },
    {
      title: 'Latest Harvest Quantity',
      icon: GraphUp,
      value: data?.harvestQuantity?.toFixed() || '0',
      unit: 'kg',
      state: getHarvestState(data?.harvestQuantity || 0),
    },
    {
      title: 'Latest Production Costs',
      icon: GraphUp,
      value: data?.productionCosts?.toFixed() || '0',
      unit: '€',
      state: getCostState(data?.productionCosts || 0),
    },
    {
      title: 'Latest Sustainability',
      icon: Globe,
      value: data?.sustainability?.toFixed() || '0',
      unit: '%',
      state: getSustainabilityState(data?.sustainability || 0),
    },
  ]
})

const getTemperatureState = (temp) => {
  if (temp >= 15 && temp <= 25) return 'good'
  if (temp >= 10 && temp <= 30) return 'average'
  return 'bad'
}

const getHarvestState = (quantity) => {
  if (quantity >= 500) return 'good'
  if (quantity >= 200) return 'average'
  return 'bad'
}

const getCostState = (costs) => {
  if (costs <= 1000) return 'good'
  if (costs <= 2000) return 'average'
  return 'bad'
}

const getSustainabilityState = (sustainability) => {
  if (sustainability >= 7) return 'good'
  if (sustainability >= 4) return 'average'
  return 'bad'
}

const activeComponent = computed(() => {
  switch (activeOption.value) {
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

const handleStartSimulation = (period) => {
  dataset.value = engine.createDataset(period)
  let currentDayOffset = period

  setInterval(() => {
    const newData = engine.createSingleDayDataset()
    dataset.value.push(...newData)
    dataset.value.shift()
    currentDayOffset++
  }, 3000)
}
</script>

<style lang="scss" scoped>
.small-cards-container {
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
