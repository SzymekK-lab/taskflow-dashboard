<script setup>
import Sidebar from './components/Sidebar.vue'
import { useSettingsStore } from './stores/settingsStore'

useSettingsStore()
</script>

<template>
  <div class="app-layout">
    <Sidebar />

    <main class="main-content">


      <router-view />
    </main>
  </div>
</template>

<style>

:root {
  --bg-color: #020617;
  --sidebar-color: #081028;
  --card-color: #1e293b;
  --text-color: white;
  --secondary-text: #94a3b8;
}

[data-theme='light'] {
  --bg-color: #f1f5f9;
  --sidebar-color: white;
  --card-color: white;
  --text-color: #0f172a;
  --secondary-text: #64748b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-color);
  color: var(--text-color);

  font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 30px;
}

@media (max-width: 900px) {
  .app-layout {
    flex-direction: column;
  }

  .main-content {
    padding: 20px;
  }
}
</style>