<template>
  <div class="stat-card" :style="{ '--card-color': color }">
    <component :is="iconComponent" class="icon" v-if="icon" />
    <span class="stat-title">{{ title }}</span>
    <span class="stat-value">{{ value }}</span>
  </div>
</template>

<script setup>
import { Globe, Leaf } from '@iconoir/vue'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    validator: (value) => ['globe', 'leaf'].includes(value),
  },
  color: {
    type: String,
    default: 'red',
  },
})

const iconComponent = computed(() => {
  const iconMap = {
    globe: Globe,
    leaf: Leaf,
  }
  return iconMap[props.icon]
})
</script>

<style lang="scss" scoped>
.stat-card {
  background-color: var(--card-color, #f0f0f0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  border-radius: $border-radius-md;

  & .stat-title {
    font-size: 1rem;
    font-weight: bold;
  }

  & .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
