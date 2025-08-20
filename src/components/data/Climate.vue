<template>
  <Card title="Team Climate" :icon="Globe" :subtitle="'This is a test subtitle'" />
  <Card
    title="Condizioni del suolo"
    :icon="Leaf"
    :subtitle="'Stato attuale dei parametri del suolo'"
  >
    <div class="soil-conditions">
      <ProgressBar label="Umidità" :value="75" unit="%" />
      <ProgressBar label="Temperatura" :value="20.5" unit="°C" :max="50" />
      <ProgressBar label="pH" :value="6.5" :max="14" />
    </div>
  </Card>
</template>

<script setup>
import { Card, ProgressBar } from '@/components/ui'
import { Globe, Leaf } from '@iconoir/vue'
</script>

<style lang="scss" scoped>
.soil-conditions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
  background-color: $card-background;
}
</style>
