<template>
  <Header />

  <section>
    <div class="small-cards-container">
      <SmallCard
        title="Project Overview"
        :icon="GraphUp"
        value="150 Projects"
        status="active"
        v-for="value in 4"
      />
    </div>
    <Switcher @option-changed="activeOption = $event" />

    <KeepAlive>
      <component :is="activeComponent" />
    </KeepAlive>
  </section>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Climate from '@/components/data/Climate.vue'
import Performance from '@/components/data/Performance.vue'
import Production from '@/components/data/Production.vue'
import { SmallCard, Switcher } from '@/components/ui'
import { computed, ref } from 'vue'
import { GraphUp } from '@iconoir/vue'

const activeOption = ref('Dati Ambientali')

const activeComponent = computed(() => {
  switch (activeOption.value) {
    case 'Dati Ambientali':
      return Climate
    case 'Produzione':
      return Production
    case 'Performance Finanziaria':
      return Performance
    default:
      return Climate
  }
})
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
