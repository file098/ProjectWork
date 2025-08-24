<template>
  <Header @start-simulation="handleStartSimulation" />

  <section>
    <div class="small-cards-container">
      <SmallCard
        title="Latest Temperature"
        :icon="GraphUp"
        :value="latestTemperature"
        state="good"
      />
      <SmallCard
        title="Latest Harvest Quantity"
        :icon="GraphUp"
        :value="latestHarvestQuantity"
        state="good"
      />
      <SmallCard
        title="Latest Production Costs"
        :icon="GraphUp"
        :value="latestProductionCosts"
        state="average"
      />
      <SmallCard
        title="Latest Sustainability"
        :icon="Globe"
        :value="latestSustainability"
        state="bad"
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

const latestTemperature = computed(() => {
  return latestData.value?.temperature?.toFixed() || '0'
})

const latestHarvestQuantity = computed(() => {
  return latestData.value?.harvestQuantity?.toFixed() || '0'
})

const latestProductionCosts = computed(() => {
  return latestData.value?.productionCosts?.toFixed() || '0'
})

const latestSustainability = computed(() => {
  return latestData.value?.sustainability?.toFixed() || '0'
})

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
  let currentDayOffset = period // Start from the next day after the initial dataset

  setInterval(() => {
    const newData = engine.createSingleDayDataset()
    dataset.value.push(...newData)
    dataset.value.shift()

    currentDayOffset++ // Increment to the next day
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
