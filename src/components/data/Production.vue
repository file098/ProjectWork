<template>
  <div class="content">
    <Card
      title="Production Overview"
      :icon="Reports"
      :subtitle="'Agricultural production metrics and statistics'"
    >
      <div class="farm-stats">
        <div class="overview-group">
          <h3>Current Production Data</h3>
          <div class="metrics-layout">
            <StatCard
              title="Harvest Quantity"
              :value="currentProductionData.harvestQuantity + ' kg'"
              :icon="Packages"
              color="lightgreen"
            />
            <StatCard
              title="Cultivated Area"
              :value="currentProductionData.cultivatedArea + ' ha'"
              :icon="Agile"
              color="lightblue"
            />
            <StatCard
              title="Product Quality"
              :value="currentProductionData.productQuality + '/10'"
              :icon="Medal"
              color="lightyellow"
            />
            <StatCard
              title="Crop Type"
              :value="currentProductionData.cropType"
              :icon="Leaf"
              color="lightcyan"
            />
          </div>
        </div>

        <div class="overview-group">
          <h3>Resource Usage</h3>
          <div class="consumption-indicators">
            <ProgressBar
              label="Water Consumption"
              :value="currentProductionData.waterUsage"
              unit=" L"
              :max="50000"
            />
            <ProgressBar
              label="Fuel Consumption"
              :value="currentProductionData.fuelUsage"
              unit=" L"
              :max="2000"
            />
            <ProgressBar
              label="Labor Hours"
              :value="currentProductionData.laborHours"
              unit=" hrs"
              :max="500"
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
import { Reports, Packages, Agile, Medal, Leaf } from '@iconoir/vue'

const props = defineProps({
  dataset: {
    type: Object,
    required: false,
    default: () => null,
  },
})

const currentProductionData = computed(() => {
  if (!props.dataset || !Array.isArray(props.dataset) || props.dataset.length === 0) {
    return {
      harvestQuantity: 5000,
      cultivatedArea: 15.5,
      productQuality: 8.2,
      cropType: 'Vegetables',
      waterUsage: 25000,
      fuelUsage: 850,
      laborHours: 320,
    }
  }

  const latest = props.dataset[props.dataset.length - 1]
  return {
    harvestQuantity: Math.round(latest.harvestQuantity),
    cultivatedArea: Math.round(latest.cultivatedArea * 10) / 10,
    productQuality: Math.round(latest.productQuality * 10) / 10,
    cropType: latest.cropType
      ? latest.cropType.charAt(0).toUpperCase() + latest.cropType.slice(1)
      : 'Mixed',
    waterUsage: Math.round(latest.waterConsumption),
    fuelUsage: Math.round(latest.fuelConsumption),
    laborHours: Math.round(latest.laborHours),
  }
})
</script>

<style lang="scss" scoped>
.farm-stats {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.overview-group {
  h3 {
    margin: 0 0 $spacing-md 0;
    color: $text-color;
    font-size: 1.1rem;
    font-weight: 600;
  }
}

.metrics-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
}

.consumption-indicators {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $card-background;
  border-radius: $border-radius-md;
}
</style>
