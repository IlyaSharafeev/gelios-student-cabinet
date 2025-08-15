import { defineStore } from 'pinia';
import api from '@/api/api.ts';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

/**
 * @interface HomeWorksSettings
 * @description Описывает настройки конкретного домашнего задания.
 */
interface HomeWorksSettings {
    mode: string;
    speed: number;
    frequency: number;
    height: number;
    offset: number;
    LETTER_REPLACEMENTS: any[];
    isTimerDisabled: boolean;
}

/**
 * @interface ApiHomework
 * @description Описывает структуру объекта домашнего задания, получаемого с API.
 */
export interface ApiHomework {
    id: number;
    trainerId: number;
    deadline: string;
    startDate: string;
    homeWorksSettings: HomeWorksSettings;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'done';
    statusDate: string;
    createDate: string;
}

export const useHomeworksStore = defineStore('homeworks', {
    state: () => ({
        homeworks: [] as ApiHomework[],
        loading: false,
        error: null as string | null,
        activeHomeworkId: null as number | null, // <-- ДОБАВЛЕНО: ID активной домашки
    }),

    actions: {
        /**
         * ДОБАВЛЕНО: Устанавливает ID активного домашнего задания.
         * @param {number | null} homeworkId - ID домашнего задания или null.
         */
        setActiveHomework(homeworkId: number | null) {
            console.log('setActiveHomework', homeworkId);
            this.activeHomeworkId = homeworkId;
        },

        /**
         * Загружает список домашних заданий студента с сервера.
         */
        async fetchHomeworks() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get<ApiHomework[]>('/api/student/homeworks');
                this.homeworks = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке домашних заданий';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        /**
         * ДОБАВЛЕНО: Отправляет запрос на получение награды за выполненное задание.
         * @param {number} homeworkId - ID домашнего задания.
         */
        async claimReward(homeworkId: number) {
            try {
                // Отправляем запрос с нужным payload
                await api.post('/api/student/homeworks/claim', { homework_id: homeworkId });

                // В случае успеха, удаляем домашку из локального состояния
                const index = this.homeworks.findIndex(hw => hw.id === homeworkId);
                if (index !== -1) {
                    this.homeworks.splice(index, 1);
                }

                // Показываем уведомление об успехе
                notify({
                    title: "Награда успешно получена!", // Рекомендуется вынести в переводы
                    type: "success"
                });

            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при получении награды';
                notify({ title: errorMessage, type: "error" });
                // Пробрасываем ошибку дальше, чтобы компонент мог её обработать
                throw error;
            }
        },
    },

    getters: {
        isLoading: (state) => state.loading,
        getHomeworks: (state) => state.homeworks,
        getActiveHomeworkId: (state) => state.activeHomeworkId, // <-- ДОБАВЛЕНО: Геттер для ID
    },
});