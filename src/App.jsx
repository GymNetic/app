import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NutriAgendaPage from './pages/Profissionais/NutriAgendaPage';
import PTAgendaPage from './pages/Profissionais/PTAgendaPage';
import Login from './pages/User/Login.jsx';
import ExerciciosPage from './pages/exercicios/ExerciciosPage.jsx';
import AulasCatPage from './pages/aulas/AulasCatPage.jsx';
import TipoExPage from './exercicios/TipoExPage.jsx';
import AulaDetalhePage from "./pages/aulas/AulaDetalhePage.jsx";
import PlanoNutricionalPage from "./pages/PlanoNutricionalPage.jsx";
import PlanoTreinoPage from './pages/PlanoTreinoPage';
import NotificacoesPage from './pages/NotificacoesPage';
import AreaCliente from './pages/User/AreaCliente.jsx';

function App() {
  return (
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/NutriAgenda" element={<NutriAgendaPage />} />
            <Route path="/PTAgenda" element={<PTAgendaPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Exercicios" element={<ExerciciosPage />} />
            <Route path="/AulasCatPage" element={<AulasCatPage />} />
            <Route path="/exercicios/:tipo" element={<TipoExPage />} />
            <Route path="/aulas/:tipo/:index" element={<AulaDetalhePage />} />
            <Route path="/notificacoesPage" element={<NotificacoesPage />} />
              <Route path="/PlanoTreinoPage" element={<PlanoTreinoPage />} />
              <Route path="/PlanoNutricionalPage" element={<PlanoNutricionalPage />} />
              <Route path="/area-cliente" element={<AreaCliente />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;