<template>
  <header>
    <div class="page-header">
      <h1>Project Dashboard</h1>
      <p>Manage your projects efficiently</p>
    </div>
    <div class="header-actions">
      <div class="export-controls">
        <Button @click="handleExportJson" variant="outline" :disabled="!hasData">
          Export JSON
        </Button>
        <Button @click="handleExportCsv" variant="outline" :disabled="!hasData">
          Export CSV
        </Button>
      </div>
      <Select
        v-model="engine.timeframe.value"
        :options="timeframeOptions"
        name="period"
        id="period-select"
      />
      <div class="simulation-control">
        <Button
          @click="handleSimulationToggle"
          :variant="engine.running.value ? 'outline' : 'primary'"
          aria-label="Start or stop simulation for the selected time period"
        >
          {{ engine.running.value ? 'Stop Simulation' : 'Start Simulation' }}
        </Button>
        <div v-if="engine.running.value" class="simulation-status running">
          <div class="status-indicator"></div>
          <span class="status-text">Running</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/Select.vue'
import { useEngine } from '@/composables/useEngine'

const props = defineProps({
  engine: {
    type: Object,
    required: true,
  },
  hasData: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['start-simulation', 'stop-simulation', 'export-json', 'export-csv'])

const timeframeOptions = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
]

const handleSimulationToggle = () => {
  if (props.engine.running.value) {
    emit('stop-simulation')
  } else {
    emit('start-simulation', props.engine.timeframe.value)
  }
}

const handleExportJson = () => {
  emit('export-json')
}

const handleExportCsv = () => {
  emit('export-csv')
}
</script>

<style lang="scss" scoped>
header {
  padding: $spacing-md;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: $background-color;
  gap: $spacing-md;

  .page-header {
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

  .header-actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    flex-wrap: wrap;

    .export-controls {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
    }

    .simulation-control {
      display: flex;
      align-items: center;
      gap: $spacing-sm;

      .simulation-status {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        padding: $spacing-xs $spacing-sm;
        border-radius: $border-radius-sm;
        border: 1px solid;

        &.running {
          background-color: $light-green;
          border-color: $success;

          .status-indicator {
            background-color: $success;
          }

          .status-text {
            color: $success;
          }
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .status-text {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .header-actions {
      flex-direction: column;
      align-items: stretch;
      gap: $spacing-sm;

      .export-controls {
        justify-content: center;
        flex-wrap: wrap;
      }

      .simulation-control {
        flex-direction: column;
        align-items: stretch;
        gap: $spacing-sm;

        .simulation-status {
          justify-content: center;
        }
      }
    }
  }
}
</style>
