import React, { createContext, useState, useContext, useEffect } from 'react';

// Criando o contexto de autenticação
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simula verificação de autenticação ao iniciar (poderia ser uma verificação de token)
  useEffect(() => {
    // Verificando se há um usuário no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Função para fazer login
  const login = async (email, password) => {
    try {
      setLoading(true);
      // Simulação de uma chamada de API de autenticação
      // Em um caso real, substituir por fetch/axios para sua API
      if (email && password) {
        const userData = { id: 1, email, name: 'Usuário Exemplo' };
        setCurrentUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setError('');
        return userData;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Função para registrar novo usuário
  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      // Simulação de registro - substituir por chamada real à API
      const userData = { id: Date.now(), email, name };
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setError('');
      return userData;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    signup,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
