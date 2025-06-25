import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import App from './pages/App';
import BackButton from './components/BackButton.jsx';

function Layout() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className="app">
            <Header/>
            {!isHome && <BackButton />}
            <App />
            <Footer />
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
                <Layout />
        </BrowserRouter>
    </StrictMode>
);
