import axios from './axios';

const authService = {
    loginUser: async (credentials) => {
        const response = await axios.post('/auth/login', credentials);
        const { user, accessToken, refreshToken } = response.data;

        // Use sessionStorage for less persistent storage
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('accessToken', accessToken); // No JSON.stringify for simple strings
        sessionStorage.setItem('refreshToken', refreshToken);

        return user;
    },

    registerUser: async (userData) => {
        const response = await axios.post('/auth/register', userData);
        const user = response.data;

        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
    },

    logoutUser: async () => {
        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            sessionStorage.clear();
        }
    },

    getCurrentUser: () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getAccessToken: () => sessionStorage.getItem('accessToken'),

    getRefreshToken: () => sessionStorage.getItem('refreshToken'),
};

export default authService;
export const {
    loginUser,
    logoutUser,
    getCurrentUser,
    getAccessToken,
    getRefreshToken,
} = authService;
