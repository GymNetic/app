import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import App from './pages/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="app">
        <Header />
        <App />
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
)