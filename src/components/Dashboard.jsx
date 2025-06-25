import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="user-info">
        <p>Bem-vindo, {currentUser?.name || 'Usuário'}!</p>
        <p>Email: {currentUser?.email}</p>
      </div>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Dashboard;
