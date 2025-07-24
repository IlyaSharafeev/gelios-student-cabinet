import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";
import { useAuthStore } from './auth';

const { notify } = useNotification();

const baseURL = 'https://gelios-teacher.ddns.net/api'; // Или 'https://gelios-teacher.ddns.net/api/student' если это кабинет ученика

// --- Типизация ---

export interface CertificateLanguage {
    id: string;
    name: string;
    direction: string;
}

export interface CertificateLevel {
    id: number;
    name: string;
    image: string;
}

export interface CertificateDirection {
    id: number;
    name: string;
    levels: CertificateLevel[];
}

export interface CertificateDirectionsResponse {
    [key: string]: CertificateDirection[];
}

export interface Certificate { // Добавлено для типизации студенческих сертификатов
    id: number;
    direction_name: string;
    level_name: string;
    image: string; // Путь к изображению
    created_at: string;
}

export interface StudentCertificatesData { // Изменено: это один объект, который приходит с бэкенда
    first_name: string;
    last_name: string;
    certificates: Certificate[];
}

/**
 * @interface Student
 * @description Определяет структуру объекта студента.
 */
export interface Student {
    first_name: string;
    last_name: string;
    student_id: string;
}

// --- Стор ---

export const useCertificatesStore = defineStore('certificates', {
    state: () => ({
        languages: [] as CertificateLanguage[],
        directions: null as CertificateDirectionsResponse | null,
        students: [] as Student[],
        // ИЗМЕНЕНИЕ ЗДЕСЬ: studentCertificates теперь ОДИН объект StudentCertificatesData, или null
        studentCertificates: null as StudentCertificatesData | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        // Добавлен fetchStudentCertificates
        async fetchStudentCertificates() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            console.log('certificates.ts: Запускаю fetchStudentCertificates');
            if (!token) {
                this.error = 'Токен аутентификации не найден для получения сертификатов студента.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                console.error('certificates.ts: Ошибка - Токен аутентификации не найден.');
                return;
            }

            try {
                // ИЗМЕНЕНИЕ ЗДЕСЬ: Ожидаем ОДИН объект StudentCertificatesData, а не массив
                const response = await axios.get<StudentCertificatesData>(`${baseURL}/student/certificates`, { // <--- Изменил на StudentCertificatesData
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.studentCertificates = response.data;
                console.log('certificates.ts: Сертификаты студента успешно загружены:', this.studentCertificates);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке сертификатов студента';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
                console.error('certificates.ts: Ошибка при загрузке сертификатов студента:', error);
            } finally {
                this.loading = false;
                console.log('certificates.ts: Завершено fetchStudentCertificates, loading = false.');
            }
        },

        // ... (остальные действия без изменений)
        async fetchCertificateLanguages() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            console.log('certificates.ts: Запускаю fetchCertificateLanguages');
            if (!token) {
                this.error = 'Токен аутентификации не найден.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                console.error('certificates.ts: Ошибка - Токен аутентификации не найден для языков.');
                return;
            }

            try {
                const response = await axios.get<CertificateLanguage[]>(`${baseURL}/get-language-directions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.languages = response.data;
                console.log('certificates.ts: Языки сертификатов успешно загружены:', this.languages);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке языков сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
                console.log('certificates.ts: Завершено fetchCertificateLanguages, loading = false.');
            }
        },

        async fetchCertificateDirections() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            console.log('certificates.ts: Запускаю fetchCertificateDirections');
            if (!token) {
                this.error = 'Токен аутентификации не найден.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                console.error('certificates.ts: Ошибка - Токен аутентификации не найден для направлений.');
                return;
            }

            try {
                const response = await axios.get<CertificateDirectionsResponse>(`${baseURL}/get-certificate-directions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.directions = response.data;
                console.log('certificates.ts: Направления сертификатов успешно загружены:', this.directions);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке направлений сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
                console.log('certificates.ts: Завершено fetchCertificateDirections, loading = false.');
            }
        },

        /**
         * @action fetchStudents
         * @description Асинхронно запрашивает и сохраняет список студентов.
         */
        async fetchStudents() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            console.log('certificates.ts: Запускаю fetchStudents');
            if (!token) {
                this.error = 'Токен аутентификации не найден для получения студентов.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                console.error('certificates.ts: Ошибка - Токен аутентификации не найден для студентов.');
                return;
            }

            try {
                const response = await axios.get<Student[]>(`${baseURL}/get-students`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.students = response.data;
                console.log('certificates.ts: Студенты успешно загружены:', this.students);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке студентов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
                console.log('certificates.ts: Завершено fetchStudents, loading = false.');
            }
        },

        /**
         * @action assignCertificates
         * @description Отправляет POST запрос для присвоения сертификатов.
         */
        async assignCertificates(payload: { directionId: number; levelIds: number[]; languageCode: string; studentIds: number[] }) {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            console.log('certificates.ts: Запускаю assignCertificates с payload:', payload);
            if (!token) {
                this.error = 'Токен аутентификации не найден для присвоения сертификатов.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                console.error('certificates.ts: Ошибка - Токен аутентификации не найден для присвоения.');
                return;
            }

            try {
                const response = await axios.post(`${baseURL}/assign-certificate`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                notify({ title: 'Сертификаты успешно присвоены!', type: "success" });
                console.log('certificates.ts: Ответ сервера на присвоение сертификатов:', response.data);
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при присвоении сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
                throw error; // Re-throw to allow component to handle
            } finally {
                this.loading = false;
                console.log('certificates.ts: Завершено assignCertificates, loading = false.');
            }
        },
    },

    getters: {
        isLoading: (state) => state.loading,
        getLanguages: (state) => state.languages,
        getDirections: (state) => state.directions,
        getStudents: (state) => state.students,
        // Getter теперь возвращает массив, даже если в store хранится один объект
        getStudentCertificates: (state) => state.studentCertificates ? [state.studentCertificates] : [],
    },
});