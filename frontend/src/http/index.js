import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const sendOtp = (data) => api.post("/send-otp", data);
export const verifyOtp = (data) => api.post("/verify-otp", data);
export const activate = (data) => api.post('/activate', data);
export const logout = () => api.post("/logout");

// Interceptors : Sits b/w all the requests & responses for all the APIs
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);
export default api;
