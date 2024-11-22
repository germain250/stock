import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include access token
instance.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

            try {
                const response = await axios.post('http://localhost:3000/auth/refresh', {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Update tokens in localStorage
                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Handle refresh token failure (e.g., log the user out)
                localStorage.clear();
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
