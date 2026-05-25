import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import TasksView from '../views/TasksView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
    {
        path: '/',
        component: DashboardView
    },

    {
        path: '/tasks',
        component: TasksView
    },

    {
        path: '/analytics',
        component: AnalyticsView
    },

    {
        path: '/settings',
        component: SettingsView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router