<template>
  <IconoirProvider>
    <RouterView />
  </IconoirProvider>
</template>

<script setup>
import { IconoirProvider } from '@iconoir/vue'
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: $font-primary;
  color: $text-color;
}
</style>
