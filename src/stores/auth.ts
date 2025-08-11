import {defineStore} from 'pinia';
import axios from 'axios';
import {useNotification} from "@kyvg/vue3-notification";

const {notify} = useNotification()

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
    }),

    actions: {
        async refreshToken(): Promise<boolean> {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                this.logout();
                return false;
            }

            try {
                const response = await axios.post(`${baseURL}/api/auth/refresh`, {
                    refresh_token: refreshToken
                });

                const newAccessToken = response.data.access_token;
                console.log(newAccessToken);
                const newRefreshToken = response.data.refresh_token;

                if (!newAccessToken) {
                    console.log("refreshToken not found");
                    this.logout();
                    return false;
                }

                this.token = newAccessToken;
                localStorage.setItem('token', newAccessToken);
                if (newRefreshToken) {
                    localStorage.setItem('refreshToken', newRefreshToken);
                }
                return true;

            } catch (error) {
                this.logout();
                return false;
            }
        },

        async fetchProfile() {
            if (!this.token) {
                return;
            }
            try {
                const response = await axios.get(`${baseURL}/api/student/profile`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.user = response.data;
                this.isAuthenticated = true;
            } catch (error) {
                throw error;
            }
        },

        async login({email, password}) {
            try {
                const response = await axios.post(`${baseURL}/api/auth/student/sign-in`, {
                    email,
                    password,
                });
                this.token = response.data.access_token;
                if (this.token) {
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('refreshToken', response.data.refresh_token)
                    await this.fetchProfile();
                }
                this.error = null;
                return {success: true};
            } catch (error) {
                // @ts-ignore
                this.error = error.response?.data?.message || 'Ошибка входа';
                return {success: false, error: this.error};
            }
        },

        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        },

        async register({email, username, contactNumber, password}) {
            try {
                const response = await axios.post(`${baseURL}/api/auth/student/register`, {
                    email,
                    firstName: username,
                    lastName: username,
                    phone: Array.isArray(contactNumber) ? contactNumber : [contactNumber],
                    password,
                });
                this.token = response.data.token;
                if (this.token) {
                    localStorage.setItem('token', this.token);
                    await this.fetchProfile();
                }
                this.error = null;
                return {success: true};
            } catch (error) {
                // @ts-ignore
                this.error = error.response?.data?.message || 'Ошибка регистрации';
                if (this.error !== null) {
                    notify({
                        title: this.error,
                        type: "error"
                    });
                }
                return {success: false, error: this.error};
            }
        },

        async recoverPassword(email) {
            try {
                await axios.post(`${baseURL}/api/auth/forgot-password`, {email});
                this.error = null;
                return {success: true};
            } catch (error) {
                // @ts-ignore
                this.error = error.response?.data?.message || 'Ошибка восстановления пароля';
                if (this.error !== null) {
                    notify({
                        title: this.error,
                        type: "error"
                    });
                }
                return {success: false, error: this.error};
            }
        },

        async resetPassword({token, password}) {
            try {
                await axios.post(`${baseURL}/api/auth/reset-password`, {
                    token,
                    password
                });
                this.error = null;
                return {success: true};
            } catch (error) {
                // @ts-ignore
                this.error = error.response?.data?.message || 'Ошибка восстановления пароля'
                if (this.error !== null) {
                    notify({
                        title: this.error,
                        type: "error"
                    });
                }
                return {success: false, error: this.error};
            }
        },

        initializeAuth() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                this.fetchProfile();
            }
        },
    },

    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        currentUser: (state) => state.user,
        authError: (state) => state.error,
    },
});