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
        activeHomeworkId: null as number | null,
    }),

    actions: {
        /**
         * Устанавливает ID активного домашнего задания.
         * @param {number | null} homeworkId - ID домашнего задания или null.
         */
        setActiveHomework(homeworkId: number | null) {
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
         * ✅ ДОБАВЛЕНО: Отправляет запрос о выполнении ДЗ.
         * @param {number} homeworkId - ID выполненного домашнего задания.
         */
        async markHomeworkAsDone(homeworkId: number) {
            console.log("req for done homework");
            try {
                await api.post('/api/student/homeworks/mark-done', { homework_id: homeworkId });
                notify({
                    title: "Домашнее задание выполнено!",
                    type: "success"
                });
                // После успешной отправки обновляем список ДЗ, чтобы видеть актуальный статус
                await this.fetchHomeworks();
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при отправке статуса ДЗ';
                notify({ title: errorMessage, type: "error" });
                throw error; // Пробрасываем ошибку дальше
            }
        },

        /**
         * Отправляет запрос на получение награды за выполненное задание.
         * @param {number} homeworkId - ID домашнего задания.
         */
        async claimReward(homeworkId: number) {
            try {
                await api.post('/api/student/homeworks/claim', { homework_id: homeworkId });
                const index = this.homeworks.findIndex(hw => hw.id === homeworkId);
                if (index !== -1) {
                    this.homeworks.splice(index, 1);
                }
                notify({
                    title: "Награда успешно получена!",
                    type: "success"
                });
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при получении награды';
                notify({ title: errorMessage, type: "error" });
                throw error;
            }
        },
    },

    getters: {
        isLoading: (state) => state.loading,
        getHomeworks: (state) => state.homeworks,
        // Геттер переименован для консистентности, но старый вариант тоже будет работать
        getActiveHomeworkId: (state) => state.activeHomeworkId,
    },
});