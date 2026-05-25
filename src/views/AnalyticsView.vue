<script setup>
import { computed } from 'vue'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'

import { Doughnut, Bar } from 'vue-chartjs'

import { useTaskStore } from '../stores/taskStore'
import { useSettingsStore } from '../stores/settingsStore'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
)

const taskStore = useTaskStore()
const settingsStore = useSettingsStore()

const translations = {
  en: {
    analytics: 'Analytics',
    distribution: 'Task Distribution',
    productivity: 'Productivity',
    deadlines: 'Deadlines Overview',
    completed: 'Completed',
    active: 'Active',
    upcoming: 'Upcoming'
  },

  pl: {
    analytics: 'Analityka',
    distribution: 'Podział zadań',
    productivity: 'Produktywność',
    deadlines: 'Terminy',
    completed: 'Ukończone',
    active: 'Aktywne',
    upcoming: 'Nadchodzące'
  }
}

const t = computed(() => {
  return translations[settingsStore.language]
})

const todoCount = computed(() => {
  return taskStore.columns[0].tasks.length
})

const progressCount = computed(() => {
  return taskStore.columns[1].tasks.length
})

const doneCount = computed(() => {
  return taskStore.columns[2].tasks.length
})

const totalTasks = computed(() => {
  return (
      todoCount.value +
      progressCount.value +
      doneCount.value
  )
})

const productivity = computed(() => {
  if (totalTasks.value === 0) return 0

  return Math.round(
      (doneCount.value / totalTasks.value) * 100
  )
})

const upcomingDeadlines = computed(() => {
  let count = 0

  taskStore.columns.forEach(column => {
    column.tasks.forEach(task => {
      if (task.dueDate) {
        count++
      }
    })
  })

  return count
})

const doughnutData = computed(() => ({
  labels: [
    'TODO',
    'IN PROGRESS',
    'DONE'
  ],

  datasets: [
    {
      data: [
        todoCount.value,
        progressCount.value,
        doneCount.value
      ],

      backgroundColor: [
        '#6366f1',
        '#f59e0b',
        '#22c55e'
      ],

      borderWidth: 0
    }
  ]
}))

const barData = computed(() => ({
  labels: [
    t.value.completed,
    t.value.active,
    t.value.upcoming
  ],

  datasets: [
    {
      label: 'Tasks',

      data: [
        doneCount.value,
        totalTasks.value - doneCount.value,
        upcomingDeadlines.value
      ],

      backgroundColor: [
        '#22c55e',
        '#6366f1',
        '#f59e0b'
      ],

      borderRadius: 14
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,

  plugins: {
    legend: {
      labels: {
        color:
            settingsStore.theme === 'dark'
                ? 'white'
                : '#0f172a'
      }
    }
  },

  scales: {
    x: {
      ticks: {
        color:
            settingsStore.theme === 'dark'
                ? 'white'
                : '#0f172a'
      },

      grid: {
        color:
            settingsStore.theme === 'dark'
                ? '#1e293b'
                : '#cbd5e1'
      }
    },

    y: {
      ticks: {
        color:
            settingsStore.theme === 'dark'
                ? 'white'
                : '#0f172a'
      },

      grid: {
        color:
            settingsStore.theme === 'dark'
                ? '#1e293b'
                : '#cbd5e1'
      }
    }
  }
}))
</script>

<template>
  <section class="analytics-page">
    <h1>{{ t.analytics }}</h1>

    <div class="analytics-stats">
      <div class="analytics-card">
        <span>📈</span>

        <h2>{{ productivity }}%</h2>

        <p>{{ t.productivity }}</p>
      </div>

      <div class="analytics-card">
        <span>✅</span>

        <h2>{{ doneCount }}</h2>

        <p>{{ t.completed }}</p>
      </div>

      <div class="analytics-card">
        <span>⏰</span>

        <h2>{{ upcomingDeadlines }}</h2>

        <p>{{ t.upcoming }}</p>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h2>{{ t.distribution }}</h2>

        <Doughnut
            :data="doughnutData"
            :options="chartOptions"
        />
      </div>

      <div class="chart-card">
        <h2>{{ t.deadlines }}</h2>

        <Bar
            :data="barData"
            :options="chartOptions"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.analytics-page h1 {
  font-size: 52px;

  margin-bottom: 40px;
}

.analytics-stats {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 25px;

  margin-bottom: 40px;
}

.analytics-card {
  background: var(--card-color);

  border-radius: 28px;

  padding: 30px;

  text-align: center;
}

.analytics-card span {
  font-size: 42px;

  display: block;

  margin-bottom: 20px;
}

.analytics-card h2 {
  font-size: 48px;

  margin-bottom: 10px;
}

.analytics-card p {
  color: var(--secondary-text);
}

.charts-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 30px;
}

.chart-card {
  background: var(--card-color);

  border-radius: 28px;

  padding: 30px;

  min-height: 500px;
}

.chart-card h2 {
  margin-bottom: 30px;
}

@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .analytics-stats {
    grid-template-columns: 1fr;
  }
}
</style>