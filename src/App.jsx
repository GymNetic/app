import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NutriAgendaPage from './pages/Profissionais/NutriAgendaPage';
// ...other page imports

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/NutriAgendaPage" element={<NutriAgendaPage />} />
        {/* ...other routes */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;