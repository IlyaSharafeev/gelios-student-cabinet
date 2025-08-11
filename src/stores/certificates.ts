import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";
import { useAuthStore } from './auth';

const { notify } = useNotification();

const baseURL = 'https://gelios-teacher.ddns.net/api';

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
            const authStore = useAuthStore();

            if (!authStore.token) {
                const refreshed = await authStore.refreshToken();
                if (!refreshed) {
                    this.loading = false;
                    return;
                }
            }

            try {
                const response = await axios.get<StudentCertificatesData>(`${baseURL}/student/certificates`, {
                    headers: { 'Authorization': `Bearer ${authStore.token}` }
                });
                this.studentCertificates = response.data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    const refreshed = await authStore.refreshToken();
                    if (refreshed) {
                        try {
                            const response = await axios.get<StudentCertificatesData>(`${baseURL}/student/certificates`, {
                                headers: { 'Authorization': `Bearer ${authStore.token}` }
                            });
                            this.studentCertificates = response.data;
                        } catch (retryError: any) {
                            const errorMessage = retryError.response?.data?.message || 'Ошибка после обновления токена';
                            this.error = errorMessage;
                            notify({ title: errorMessage, type: "error" });
                        }
                    }
                } else {
                    const errorMessage = error.response?.data?.message || 'Ошибка при загрузке сертификатов';
                    this.error = errorMessage;
                    notify({ title: errorMessage, type: "error" });
                }
            } finally {
                this.loading = false;
            }
        },

        async fetchCertificateLanguages() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();

            if (!authStore.token) {
                const refreshed = await authStore.refreshToken();
                if (!refreshed) {
                    this.loading = false;
                    return;
                }
            }

            try {
                const response = await axios.get<CertificateLanguage[]>(`${baseURL}/get-language-directions`, {
                    headers: { 'Authorization': `Bearer ${authStore.token}` }
                });
                this.languages = response.data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    const refreshed = await authStore.refreshToken();
                    if (refreshed) {
                        try {
                            const response = await axios.get<CertificateLanguage[]>(`${baseURL}/get-language-directions`, {
                                headers: { 'Authorization': `Bearer ${authStore.token}` }
                            });
                            this.languages = response.data;
                        } catch (retryError: any) {
                            const errorMessage = retryError.response?.data?.message || 'Ошибка при загрузке языков';
                            this.error = errorMessage;
                            notify({ title: errorMessage, type: "error" });
                        }
                    }
                } else {
                    const errorMessage = error.response?.data?.message || 'Ошибка при загрузке языков';
                    this.error = errorMessage;
                    notify({ title: errorMessage, type: "error" });
                }
            } finally {
                this.loading = false;
            }
        },

        async fetchCertificateDirections() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            if (!authStore.token) {
                const refreshed = await authStore.refreshToken();
                if (!refreshed) {
                    this.loading = false;
                    return;
                }
            }

            try {
                const response = await axios.get<CertificateDirectionsResponse>(`${baseURL}/get-certificate-directions`, {
                    headers: { 'Authorization': `Bearer ${authStore.token}` }
                });
                this.directions = response.data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    const refreshed = await authStore.refreshToken();
                    if (refreshed) {
                        try {
                            const response = await axios.get<CertificateDirectionsResponse>(`${baseURL}/get-certificate-directions`, {
                                headers: { 'Authorization': `Bearer ${authStore.token}` }
                            });
                            this.directions = response.data;
                        } catch (retryError: any) {
                            const errorMessage = retryError.response?.data?.message || 'Ошибка при загрузке направлений';
                            this.error = errorMessage;
                            notify({ title: errorMessage, type: "error" });
                        }
                    }
                } else {
                    const errorMessage = error.response?.data?.message || 'Ошибка при загрузке направлений';
                    this.error = errorMessage;
                    notify({ title: errorMessage, type: "error" });
                }
            } finally {
                this.loading = false;
            }
        },

        async fetchStudents() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            if (!authStore.token) {
                const refreshed = await authStore.refreshToken();
                if (!refreshed) {
                    this.loading = false;
                    return;
                }
            }

            try {
                const response = await axios.get<Student[]>(`${baseURL}/get-students`, {
                    headers: { 'Authorization': `Bearer ${authStore.token}` }
                });
                this.students = response.data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    const refreshed = await authStore.refreshToken();
                    if (refreshed) {
                        try {
                            const response = await axios.get<Student[]>(`${baseURL}/get-students`, {
                                headers: { 'Authorization': `Bearer ${authStore.token}` }
                            });
                            this.students = response.data;
                        } catch (retryError: any) {
                            const errorMessage = retryError.response?.data?.message || 'Ошибка при загрузке студентов';
                            this.error = errorMessage;
                            notify({ title: errorMessage, type: "error" });
                        }
                    }
                } else {
                    const errorMessage = error.response?.data?.message || 'Ошибка при загрузке студентов';
                    this.error = errorMessage;
                    notify({ title: errorMessage, type: "error" });
                }
            } finally {
                this.loading = false;
            }
        },

        async assignCertificates(payload: { directionId: number; levelIds: number[]; languageCode: string; studentIds: number[] }) {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            if (!authStore.token) {
                const refreshed = await authStore.refreshToken();
                if (!refreshed) {
                    this.loading = false;
                    throw new Error("Сессия истекла");
                }
            }

            try {
                const response = await axios.post(`${baseURL}/assign-certificate`, payload, {
                    headers: { 'Authorization': `Bearer ${authStore.token}` }
                });
                notify({ title: 'Сертификаты успешно присвоены!', type: "success" });
                return response.data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    const refreshed = await authStore.refreshToken();
                    if (refreshed) {
                        try {
                            const response = await axios.post(`${baseURL}/assign-certificate`, payload, {
                                headers: { 'Authorization': `Bearer ${authStore.token}` }
                            });
                            notify({ title: 'Сертификаты успешно присвоены!', type: "success" });
                            return response.data;
                        } catch (retryError: any) {
                            const errorMessage = retryError.response?.data?.message || 'Ошибка при присвоении сертификатов';
                            this.error = errorMessage;
                            notify({ title: errorMessage, type: "error" });
                            throw retryError;
                        }
                    } else {
                        throw new Error("Сессия истекла");
                    }
                }
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