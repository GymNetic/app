/**
 * Serviço para gerenciar autenticação com JWT
 */

// Obter token do armazenamento local
export const getToken = () => {
    return localStorage.getItem('token');
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

// Verificar se o token é válido (não expirado)
export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Verificar se o token expirou
        return payload.exp > Date.now() / 1000;
    } catch (e) {
        return false;
    }
};

// Decodificar token para obter informações do usuário
export const getDecodedToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Erro ao decodificar token:", e);
        return null;
    }
};

// Obter os dados do usuário do localStorage
export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

// Adicionar flag para evitar eventos duplicados
let isProcessingAuthChange = false;

export const login = async (email, password) => {
    try {
        // ...existing code...
        
        // Utilizar a flag para prevenir eventos duplicados
        if (!isProcessingAuthChange) {
            isProcessingAuthChange = true;
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Disparar o evento apenas uma vez
            window.dispatchEvent(new Event('auth-changed'));
            
            setTimeout(() => {
                isProcessingAuthChange = false;
            }, 100);
        }
        
        return true;
    } catch (error) {
        // ...existing code...
    }
};

export const logout = () => {
    // Utilizar a flag para prevenir eventos duplicados
    if (!isProcessingAuthChange) {
        isProcessingAuthChange = true;
        
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        // Disparar o evento apenas uma vez
        window.dispatchEvent(new Event('auth-changed'));
        
        setTimeout(() => {
            isProcessingAuthChange = false;
        }, 100);
    }
};

// Atualizar dados do usuário no localStorage
export const updateUserData = (newData) => {
    const currentData = getUserData() || {};
    const updatedData = { ...currentData, ...newData };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    // Disparar evento para notificar outros componentes
    window.dispatchEvent(new Event('profile-updated'));
    return updatedData;
};

// Configurar cabeçalhos de autenticação para requisições
export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};