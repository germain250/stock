import axios from 'axios';
import authService from './authService'; // Import for logout functionality

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach the access token
instance.interceptors.request.use(
    (config) => {
        const accessToken = authService.getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration and refresh logic
instance.interceptors.response.use(
    (response) => response, // Simply return the response if no error
    async (error) => {
        const originalRequest = error.config;

        // Handle 403 (Forbidden) errors due to expired tokens
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = authService.getRefreshToken();

            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:3000/auth/refresh', {
                        refreshToken,
                    });

                    const { accessToken, refreshToken: newRefreshToken } = response.data;

                    // Update tokens in sessionStorage
                    sessionStorage.setItem('accessToken', accessToken);
                    sessionStorage.setItem('refreshToken', newRefreshToken);

                    // Retry the original request with the new access token
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    authService.logoutUser(); // Log the user out
                    window.location.replace('/login'); // Redirect to login page
                }
            } else {
                console.warn('No refresh token available, logging out.');
                authService.logoutUser();
                window.location.replace('/login');
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
