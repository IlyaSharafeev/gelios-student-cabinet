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
    status: 'pending' | 'in-progress' | 'completed' | 'overdue';
    statusDate: string;
    createDate: string;
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
    },

    getters: {
        isLoading: (state) => state.loading,
        getHomeworks: (state) => state.homeworks,
    },
});