import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const token = authStore.token;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore();

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshTokenExists = localStorage.getItem('refreshToken');
            if (!refreshTokenExists) {
                authStore.logout();
                return Promise.reject(error);
            }

            try {
                const refreshed = await authStore.refreshToken();
                if (refreshed) {
                    return api(originalRequest);
                } else {
                    throw new Error('Failed to refresh token');
                }
            } catch (refreshError) {
                authStore.logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;