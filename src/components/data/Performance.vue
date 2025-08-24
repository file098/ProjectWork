<template>
  <div class="content different-sizes">
    <Card title="Team Performance" icon="👥" :subtitle="'This is a test subtitle'" />
    <Card title="Individual Performance" icon="👤" :subtitle="'This is a test subtitle'"> </Card>
  </div>
</template>

<script setup>
import { Card } from '@/components/ui'
</script>
