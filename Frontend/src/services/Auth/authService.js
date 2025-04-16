import { dbServices } from "..";
import conf from "../../conf/conf";
import axios from "axios";

export class Auth {
    constructor() {
        this.auth = axios.create({ withCredentials: true });
    }

    async createAccount({ email, password, name, userName }) {
        try {
            const createdAccount = await this.auth.post(conf.AUTH_API_REGISTER_ENDPOINT, {
                userName: userName,
                email,
                password,
                fullName: name,
            });
            return createdAccount.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: ACCOUNT_CREATION_ERROR ");
            return error.response.data;
        }
    }

    async login(email, password) {
        try {
            const res = await this.auth.post(
                conf.AUTH_API_LOGIN_ENDPOINT,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: ACCOUNT_LOGIN_ERROR:", error);
            return error.response.data;
        }
    }

    async resetPassword(password) {
        try {
            const res = await this.auth.patch(conf.AUTH_API_RESET_PASSWORD_ENDPOINT, {
                password,
            });
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: RESET_PASSWORD_ERROR");
            return error.response.data;
        }
    }

    async logout() {
        try {
            const result = await this.auth.delete(conf.AUTH_API_LOGOUT_ENDPOINT);
            localStorage.removeItem("authObj");
            return result.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: LOGOUT_ERROR");
            return error.response.data;
        }
    }

    async getLoggedInUser() {
        try {
            const res = await this.auth.get(conf.AUTH_API_GET_USER_DATA);
            const token = res.headers["X-CSRF-Token"]
            this.auth.interceptors.request.use((config)=>{
                config.headers["X-CSRF-Token"] = token;
                return config;
            })
            dbServices.database.interceptors.request.use((config)=>{
                config.headers["X-CSRF-Token"] = token;
                return config;
            })
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: FAILED_TO_GET_USER_DATA");
            return error.response.data;
        }
    }

    async createEmailVerification() {
        try {
            const res = await this.auth.get(conf.AUTH_API_EMAIL_VERIFICATION_ENDPOINT);
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: FAILED_TO_CREATE_EMAIL_VERIFICATION");
            return error.response.data;
        }
    }

    async verifyEmailVerification(token) {
        try {
            const res = await this.auth.patch(conf.AUTH_API_EMAIL_VERIFICATION_ENDPOINT, {
                token,
            });
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: FAILED_TO_VERIFY_EMAIL");
            return error.response.data;
        }
    }

    async createMagicUrl(email) {
        try {
            const res = await this.auth.post(conf.AUTH_API_MAGIC_URL_ENDPOINT, {
                email,
            });
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: FAILED_TO_CREATE_MAGIC_URL");
            return error.response.data;
        }
    }

    async verifyMagicUrl(token) {
        try {
            const res = await this.auth.patch(conf.AUTH_API_MAGIC_URL_ENDPOINT, {
                token,
            });
            return res.data;
        } catch (error) {
            console.log("AUTH_SERVICE_ERROR :: FAILED_TO_VERIFY_MAGIC_URL");
            return error.response.data;
        }
    }
}

const authServices = new Auth();
export default authServices;
