import { defineStore } from 'pinia';
import api from '@/api/api.ts';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

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

export interface Certificate {
    id: number;
    direction_name: string;
    level_name: string;
    image: string;
    created_at: string;
}

export interface StudentCertificatesData {
    first_name: string;
    last_name: string;
    certificates: Certificate[];
}

export interface Student {
    first_name: string;
    last_name: string;
    student_id: string;
}

export const useCertificatesStore = defineStore('certificates', {
    state: () => ({
        languages: [] as CertificateLanguage[],
        directions: null as CertificateDirectionsResponse | null,
        students: [] as Student[],
        studentCertificates: null as StudentCertificatesData | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchStudentCertificates() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get<StudentCertificatesData>('/api/student/certificates');
                this.studentCertificates = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке сертификатов студента';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        async fetchCertificateLanguages() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get<CertificateLanguage[]>('/api/get-language-directions');
                this.languages = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке языков сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        async fetchCertificateDirections() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get<CertificateDirectionsResponse>('/api/get-certificate-directions');
                this.directions = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке направлений сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        async fetchStudents() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get<Student[]>('/api/get-students');
                this.students = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке студентов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        async assignCertificates(payload: { directionId: number; levelIds: number[]; languageCode: string; studentIds: number[] }) {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.post('/api/assign-certificate', payload);
                notify({ title: 'Сертификаты успешно присвоены!', type: "success" });
                return response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при присвоении сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        isLoading: (state) => state.loading,
        getLanguages: (state) => state.languages,
        getDirections: (state) => state.directions,
        getStudents: (state) => state.students,
        getStudentCertificates: (state) => state.studentCertificates ? [state.studentCertificates] : [],
    },
});