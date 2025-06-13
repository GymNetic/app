// aplicacao-web/src/api/client.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7094',
    withCredentials: true, // Permite enviar/receber cookies
});

export const login = async (email, password, rememberMe) => {
    const response = await api.post('/api/Auth/login', {
        email,
        password,
        rememberMe,
    });
    return response;
};

export default api;