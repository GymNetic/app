import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function ExampleComponent() {
  const { isLoggedIn, setIsLoggedIn, user, login, logout } = useContext(AuthContext);

  const handleLogin = async () => {
    const credentials = {
      email: 'usuario@example.com',
      password: 'senha123'
    };
    const result = await login(credentials);
    if (result.success) {
      console.log('Login bem-sucedido!');
    } else {
      console.error('Falha no login:', result.error);
    }
  };

  const handleLogout = () => {
    logout();
    console.log('Logout realizado');
  };

  return (
    <div>
      <h2>Status de Autenticação</h2>
      {isLoggedIn ? (
        <>
          <p>Usuário está logado</p>
          <button onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <>
          <p>Usuário não está logado</p>
          <button onClick={handleLogin}>Entrar</button>
        </>
      )}
    </div>
  );
}

export default ExampleComponent;
