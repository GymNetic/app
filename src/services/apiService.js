import { getToken, updateUserData } from './authService';

const API_URL = 'http://localhost:5005/api';

/**
 * Serviço para fazer chamadas à API com autenticação
 */
const apiService = {
  // Configurar headers com token de autenticação
  getHeaders() {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  },

  // Serviços de Autenticação
  auth: {
    login(credentials) {
      return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      }).then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || `Falha na autenticação: ${response.status}`);
          });
        }
        return response.json();
      });
    },

    register(userData) {
      return fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || `Falha no registro: ${response.status}`);
          });
        }
        return response.json();
      });
    }
  },

  // Serviço de Utilizadores
  user: {
    getProfile() {
      return fetch(`${API_URL}/auth/me`, {
        headers: apiService.getHeaders()
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao buscar perfil: ${response.status}`);
        }
        return response.json();
      }).then(data => {
        // Atualizar os dados do usuário no localStorage quando o perfil for carregado
        updateUserData({
          name: data.nome || data.name || "Nome não disponível",
          email: data.email,
          phone: data.telefone || data.phone || "",
          birthDate: data.dataNascimento || data.birthDate || "",
          memberSince: data.dataCriacao || data.memberSince || "",
          currentPlan: data.planoAtual || data.currentPlan || "Plano 1"
        });
        return data;
      });
    },

    // Corrigindo o endpoint para atualização de perfil
    updateProfile(userData) {
      // LOG para depuração
      console.log('Atualizando perfil:', userData);
      console.log('URL:', `${API_URL}/utilizadores/me`);
      console.log('Headers:', apiService.getHeaders());

      return fetch(`${API_URL}/utilizadores/me`, {
        method: 'PUT',
        headers: apiService.getHeaders(),
        body: JSON.stringify(userData)
      }).then(response => {
        if (!response.ok) {
          // Melhorar o tratamento de erro para ver detalhes do problema
          return response.text().then(text => {
            try {
              const json = JSON.parse(text);
              throw new Error(json.message || `Falha ao atualizar perfil: ${response.status}`);
            } catch (e) {
              throw new Error(`Falha ao atualizar perfil: ${response.status} - ${text || 'Sem detalhes'}`);
            }
          });
        }
        return response.json().then(data => {
          // Atualizar os dados do usuário no localStorage após a atualização bem-sucedida
          updateUserData({
            name: userData.nome,
            email: userData.email
          });
          return data;
        });
      });
    },

    changePassword(passwordData) {
      return fetch(`${API_URL}/utilizadores/alterar-password`, {
        method: 'PUT',
        headers: apiService.getHeaders(),
        body: JSON.stringify(passwordData)
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao alterar senha: ${response.status}`);
        }
        return response.json();
      });
    }
  },

  // Dashboard
  dashboard: {
    getSummary() {
      return fetch(`${API_URL}/dashboard`, {
        headers: apiService.getHeaders()
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao buscar resumo do dashboard: ${response.status}`);
        }
        return response.json();
      });
    }
  }
};

export default apiService;