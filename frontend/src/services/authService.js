import axios from './axios';

const authService = {
    loginUser: async (credentials) => {
        const response = await axios.post('/auth/login', credentials);
        const { user, accessToken, refreshToken } = response.data;
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return user;
    },

    registerUser: async (userData) => {
        const response = await axios.post('/auth/register', userData);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },

    logoutUser: async () => {
        await axios.post('/auth/logout');
        
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getAccessToken: () => localStorage.getItem('accessToken'),

    getRefreshToken: () => localStorage.getItem('refreshToken')
};

export default authService;
export const { loginUser, logoutUser, getCurrentUser, getAccessToken, getRefreshToken } = authService;
