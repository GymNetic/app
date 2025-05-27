import { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MensalidadeForms from '../components/MensalidadeForms';
import Mensalidades from '../components/Mensalidades';

function MensalidadeFormsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { planName, planPrice, planDescription } = location.state || {};
    const formsRef = useRef(null);

    // Handles the back navigation and scrolling
    const handleGoBack = () => {
        if (location.state) {
            // If we have form data, just scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // If no form data, navigate home
            navigate('/');
        }
    };

    // Scroll to form when plan is selected
    useEffect(() => {
        if (location.state) {
            setTimeout(() => {
                const targetPosition = document.documentElement.scrollHeight - window.innerHeight * 1.3;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [location.state]);

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

    return (
        <div className="mensalidade-forms-page">
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
            {location.state && (
                <div ref={formsRef} style={{ marginTop: '2rem' }}>
                    <MensalidadeForms 
                        planName={planName}
                        planPrice={planPrice}
                        planDescription={planDescription}
                        onGoBack={handleGoBack}
                    />
                </div>
            )}
        </div>
    );
}

export default MensalidadeFormsPage;