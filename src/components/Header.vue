<template>
  <header>
    <div class="title-container">
      <h1>Project Dashboard</h1>
      <p>Manage your projects efficiently</p>
    </div>
    <div class="actions">
      <select name="period" id="period-select" v-model="selectedPeriod">
        <option value="daily">7 Days</option>
        <option value="weekly">30 Days</option>
        <option value="monthly">90 Days</option>
      </select>
      <button class="start-simulation btn btn-primary">Action</button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const selectedPeriod = ref('daily')
</script>
<style lang="scss" scoped>
header {
  padding: $spacing-md;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: $background-color;

  .title-container {
    display: flex;
    flex-flow: column;
    gap: $spacing-xs;

    h1 {
      margin: 0;
      color: $text-color;
    }

    p {
      margin: 0;
      color: $text-secondary-color;
      font-size: 0.875rem;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  @include responsive(mobile) {
    flex-direction: column;
    gap: $spacing-md;
    text-align: center;
  }
}
</style>
