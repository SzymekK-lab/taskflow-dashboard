<script setup>
import { useSettingsStore } from '../stores/settingsStore'

const settingsStore = useSettingsStore()
</script>

<template>
  <section class="settings-page">
    <h1>Settings</h1>

    <div class="settings-card">
      <div class="setting-item">
        <div>
          <h3>Theme</h3>
          <p>Choose application theme</p>
        </div>

        <select v-model="settingsStore.theme">
          <option value="dark">
            Dark
          </option>

          <option value="light">
            Light
          </option>
        </select>
      </div>

      <div class="setting-item">
        <div>
          <h3>Language</h3>
          <p>Select application language</p>
        </div>

        <select v-model="settingsStore.language">
          <option value="en">
            English
          </option>

          <option value="pl">
            Polski
          </option>
        </select>
      </div>
    </div>
  </section>
</template>

<style scoped>
.settings-page h1 {
  font-size: 32px;
  margin-bottom: 30px;
}

.settings-card {
  background: var(--card-color);

  border-radius: 24px;

  padding: 30px;

  max-width: 700px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 0;

  border-bottom: 1px solid #1e293b;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item h3 {
  margin-bottom: 5px;
}

.setting-item p {
  color: var(--secondary-text);
}

.setting-item select {
  background: #1e293b;

  border: none;

  color: white;

  padding: 12px;

  border-radius: 12px;
}
</style>