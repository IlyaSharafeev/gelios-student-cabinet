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
        async register({email, username, contactNumber, password}) {
            console.log({email, username, contactNumber, password});
            try {
                const response = await axios.post(`${baseURL}/api/auth/student/register`, {
                        email,
                        firstName: username,
                        lastName: username,
                        phone: Array.isArray(contactNumber) ? contactNumber : [contactNumber],
                        password,
                });
                this.token = response.data.token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                if (this.token) {
                    localStorage.setItem('token', this.token);
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

        async login({email, password}) {
            try {
                const response = await axios.post(`${baseURL}/api/auth/student/sign-in`, {
                    email,
                    password,
                });
                console.log(response);
                this.token = response.data.access_token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                if (this.token) {
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('refreshToken', response.data.refreshToken)
                }
                this.error = null;
                return {success: true};
            } catch (error) {
                // @ts-ignore
                this.error = error.response?.data?.message || 'Ошибка входа';
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

        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },

        initializeAuth() {
            if (this.token) {
                this.isAuthenticated = true;
                // Можно добавить запрос для проверки токена и получения данных пользователя
            }
        },
    },

    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        currentUser: (state) => state.user,
        authError: (state) => state.error,
    },
});