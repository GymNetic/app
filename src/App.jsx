import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NutriAgendaPage from './pages/Profissionais/NutriAgendaPage';
import PTAgendaPage from './pages/Profissionais/PTAgendaPage';
import login from './pages/User/Login.jsx';
import ExerciciosPage from './pages/exercicios/ExerciciosPage.jsx';
import AulasCatPage from './pages/aulas/AulasCatPage.jsx';
import TipoExPage from './exercicios/TipoExPage.jsx';


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/NutriAgenda" element={<NutriAgendaPage />} />
        <Route path="/PTAgenda" element={<PTAgendaPage />} />
        <Route path="/login" element={<login />} />
        <Route path="/Exercicios" element={<ExerciciosPage />} />
        <Route path="/AulasCatPage" element={<AulasCatPage />} />
        <Route path="/exercicios/:tipo" element={<TipoExPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;