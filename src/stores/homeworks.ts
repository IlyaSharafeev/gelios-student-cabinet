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
    trainerId: number; // ID для связи с тренажером
    deadline: string; // Крайний срок выполнения (ISO-строка)
    homeWorksSettings: HomeWorksSettings;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue'; // Статус задания
    statusDate: string; // Дата последнего изменения статуса (ISO-строка)
    createDate: string; // Дата создания (ISO-строка)
}

export const useHomeworksStore = defineStore('homeworks', {
    state: () => ({
        homeworks: [] as ApiHomework[],
        loading: false,
        error: null as string | null,
    }),

    actions: {
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
         * Отправляет запрос на принятие домашнего задания.
         * @param {number} homeworkId - ID домашнего задания для принятия.
         */
        async acceptHomework(homeworkId: number) {
            this.loading = true;
            try {
                // ПРИМЕЧАНИЕ: Здесь должен быть реальный эндпоинт для принятия задания, например:
                // await api.post(`/api/students/homeworks/${homeworkId}/accept`);

                console.log(`Принятие задания с ID: ${homeworkId}. (Имитация API вызова)`);
                notify({ title: 'Домашнее задание принято!', type: "success" });

                // После успешного принятия обновляем список, чтобы получить актуальный статус и дедлайн.
                await this.fetchHomeworks();
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Не удалось принять задание';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        isLoading: (state) => state.loading,
        getHomeworks: (state) => state.homeworks,
    },
});