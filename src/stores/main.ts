import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useMainStore = defineStore('main', {
    state: () => ({
        appName: 'teachers cabinet',
        isInitialized: false,
    }),
    actions: {
        initializeApp() {
            const authStore = useAuthStore();
            this.isInitialized = true;
            if (authStore.isAuthenticated) {
                console.log('Пользователь авторизован, загружаем данные...');
            } else {
                console.log('Пользователь не авторизован');
            }
        },
        setAppName(name) {
            this.appName = name;
        },
    },
    getters: {
        appStatus: (state) => (state.isInitialized ? 'Инициализировано' : 'Не инициализировано'),
    },
});