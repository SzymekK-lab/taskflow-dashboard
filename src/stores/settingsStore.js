import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore(
    'settingsStore',
    () => {
        const theme = ref(
            localStorage.getItem('theme') || 'dark'
        )

        const language = ref(
            localStorage.getItem('language') || 'en'
        )

        watch(theme, (newTheme) => {
            localStorage.setItem('theme', newTheme)

            document.documentElement.setAttribute(
                'data-theme',
                newTheme
            )
        })

        watch(language, (newLanguage) => {
            localStorage.setItem(
                'language',
                newLanguage
            )
        })

        document.documentElement.setAttribute(
            'data-theme',
            theme.value
        )

        return {
            theme,
            language
        }
    }
)