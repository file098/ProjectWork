<template>
  <div class="content-panel">
    <div class="panel-header">
      <component :is="icon" class="header-icon" v-if="icon" />
      <h2>{{ title }}</h2>
    </div>
    <p>{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  icon: [String, Object],
})
</script>

<style lang="scss" scoped>
.content-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  padding: $spacing-md;
  background-color: $card-background;
  border: 1px solid $card-border;
  border-radius: $border-radius-md;

  .panel-header {
    display: flex;
    align-items: center;
    gap: $spacing-xs;

    .header-icon {
      width: 24px;
      height: 24px;
      color: $primary;
    }

    h2 {
      margin: 0;
      color: $text-color;
    }
  }

  p {
    margin: 0;
    color: $text-secondary-color;
    font-size: 0.875rem;
  }

  @include responsive(mobile) {
    width: auto;
  }
}
</style>
