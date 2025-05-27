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
import ThemeToggle from '../components/ThemeToggle.jsx';

function App() {
    const cardsData = [
        {
            id: 1,
            title: "EXERCÍCIOS",
            description: "Conheçe a nossa biblioteca cheia de exercícios com instruções detalhadas e dicas profissionais para maximizar os teus resultados.",
            buttonText: "EXPLORAR",
            videoLabel: "TÉCNICAS DE TREINO"
        },
        {
            id: 2,
            title: "NUTRIÇÃO",
            description: "Planos alimentares personalizados e dicas nutricionais para complementar o teu regime de treinamento e alcançar os objetivos.",
            buttonText: "SAIBA MAIS",
            videoLabel: "DICAS NUTRICIONAIS"
        },
        {
            id: 3,
            title: "INSTRUTORES",
            description: "A nossa equipa de profissionais certificados está pronta para guiar a tua jornada fitness com motivação.",
            buttonText: "CONHECER",
            videoLabel: "CONHEÇE A NOSSA EQUIPA"
        }
    ];

    const mensalidadesData = [
        {
            name: "Plano 1",
            price: "19,99€",
            description: "Horário Reduzido",
            features: [  
                "Sem fidelização",  
                "Acesso 7 dias por semana",  
                "Acesso a todos os clubes",  
                "Avaliações físicas e programas de treino trimestrais",  
                "Consulta de nutrição trimestral com aconselhamento alimentar",  
                "Acesso cardio-musculação",  
                "Banhos incluídos",  
                "Estacionamento",  
                "Horário de treino: segunda a sexta (8h-9h30 ou 14h-17h), sábado (14h-17h), domingo (9h-13h)",  
                "Aulas online"  
            ]  
        },
        {
            name: "Plano 2",
            price: "24,99€",
            description: "Horário Alargado",
            features: [  
                "Sem fidelização",  
                "Acesso 7 dias por semana",  
                "Acesso a todos os clubes",  
                "Aulas de grupo incluídas",  
                "Avaliações físicas e programas de treino trimestrais",  
                "Consulta de nutrição com aconselhamento alimentar trimestral",  
                "Acesso cardio-musculação",  
                "Banhos incluídos",  
                "Estacionamento gratuito",  
                "Horário de treino flexível: segunda a sexta (6h30-17h ou 21h-23h), sábado (9h-20h), domingo/feriado (9h-13h)",  
                "Aulas online disponíveis"  
            ]
        },
        {
            name: "Plano 3",
            price: "29,99€",
            description: "Horário Livre",
            features: [
                "Sem fidelização",
                "Acesso 7 dias por semana",
                "Acesso ilimitado a todos os clubes",
                "Participação em aulas de grupo",
                "Avaliações físicas e programas de treino trimestrais",
                "Consulta de nutrição com aconselhamento alimentar trimestral",
                "Acesso completo à área cardio-musculação",
                "Utilização de banhos incluída",
                "Estacionamento gratuito",
                "Horário de treino totalmente livre",
                "Acesso a aulas online",
                "Programas especiais online exclusivos"
            ]
        }
    ];

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
            <ClassSlider />
            <h2 className="mensalidades-main-title">MENSALIDADES</h2>
            <p className="mensalidades-main-description">Selecionar Plano</p>
            <div className="mensalidades-container">
                {mensalidadesData.map((mensalidade, idx) => (
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
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;