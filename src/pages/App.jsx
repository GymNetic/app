import '../App.css';
import Slider from '../components/Slider/Slider.jsx';
import Cards from '../components/Cards.jsx';
import HorizontalCard from '../components/HorizontalCard.jsx';
import Mensalidades from '../components/Mensalidades.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import MensalidadeFormsPage from './MensalidadeFormsPage.jsx';
import ScheduleGrid from '../components/ScheduleGrid.jsx';
import ClassSlider from '../components/ClassSlider/ClassSlider.jsx';
import NutriAgendaPage from './Profissionais/NutriAgendaPage.jsx';
import PTAgendaPage from './Profissionais/PTAgendaPage.jsx';
import Login from './User/Login.jsx';
import ExerciciosPage from "./exercicios/ExerciciosPage.jsx";
import ThemeToggle from '../components/ThemeToggle.jsx';
import classData from '../data/classData.js'; // Importa os dados das aulas
import PlanosData from '../data/PlanosData.js'; // Importa os dados das mensalidades
import cardsData from '../data/cardsData.js'; // Importa os dados dos cartões horizontais

function App() {
    const HomePage = () => (
        <main>
            <ThemeToggle/>
            <Slider/>
            <Cards/>
            <div className="app-container">
                {cardsData.map((card, index) => (
                    <HorizontalCard 
                        key={index}
                        index={card.id}
                        title={card.title}
                        description={card.description}
                        buttonText={card.buttonText}
                        videoLabel={card.videoLabel}
                    />
                ))}
            </div> 
            <h2 className="aulas-main-title">AS NOSSAS AULAS</h2>
            <p className="aulas-main-description">É fundamental que todos aproveitem ao máximo o tempo dedicado ao exercício, <br/> de forma a garantir os melhores resultados possíveis.</p>
            <ClassSlider
                data={classData}
                classesPerSlide={3}
            />
            <h2 className="mensalidades-main-title">MENSALIDADES</h2>
            <p className="mensalidades-main-description">Selecionar Plano</p>
            <div className="mensalidades-container">
                {PlanosData.map((mensalidade, idx) => (
                    <Mensalidades
                        key={idx}
                        name={mensalidade.name}
                        price={mensalidade.price}
                        description={mensalidade.description}
                        features={mensalidade.features}
                    />
                ))} 
            </div>
            <ScheduleGrid />
        </main>
    );

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mensalidade-forms" element={<MensalidadeFormsPage />} />
            <Route path="/NutriAgendaPage" element={<NutriAgendaPage />} />
            <Route path="/PTAgendaPage" element={<PTAgendaPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/ExerciciosPage" element={<ExerciciosPage />} />
        </Routes>
    );
}

export default App;