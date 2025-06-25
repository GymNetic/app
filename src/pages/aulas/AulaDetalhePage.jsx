import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TipoAulaData from "../../data/TipoAulaData";
import  "./AulaDetalhePage.css";
import ScheduleGrid from "../../components/ScheduleGrid.jsx";

function AulaDetalhePage() {
    const { tipo, idx } = useParams();

    // Estados para controlar o pop-up
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [selectedClass, setSelectedClass] = useState(null);


    const aulas = TipoAulaData[tipo];

    // encontra aula pelo nome
    const aula = aulas.find(aula => aula.slug.replace("/", "") === idx);

    if (!aula) {
        return <div>Aula não encontrada</div>;
    }

    // Função para inscrição na aula
    const handleSubscribe = (horario) => {
        // Simulando verificação de vagas disponíveis (você deve implementar sua lógica real aqui)
        const disponivel = Math.random() > 0.3; // 70% de chance de ter vaga disponível

        setSelectedClass(horario);

        if (disponivel) {
            setPopupMessage(`Deseja confirmar sua inscrição para ${aula.name} na ${horario.dia} às ${horario.hora}?`);
        } else {
            setPopupMessage(`Esta turma está cheia. Deseja entrar na lista de espera?`);
        }

        setShowPopup(true);
    };

    // Confirmar inscrição
    const confirmSubscription = () => {
        // Implementar a lógica de inscrição aqui
        setPopupMessage("Inscrição realizada com sucesso!");

        // Fecha o pop-up após 2 segundos
        setTimeout(() => {
            setShowPopup(false);
            setPopupMessage("");
            setSelectedClass(null);
        }, 2000);
    };

    // Cancelar inscrição
    const cancelSubscription = () => {
        setShowPopup(false);
        setPopupMessage("");
        setSelectedClass(null);
    };

    return (
        <div>
            <div className="bck-space">
            </div>
            <div className="aula-detalhe-header">
                <h1>{aula.name}</h1>
                <p>{aula.desc}</p>
            </div>
            <div className="aula-detalhe-info">
                <p><strong>Duração:</strong> {aula.duracao}</p>
                <p><strong>Intensidade:</strong> {aula.intensidade}</p>
                <p><strong>Professor:</strong> {aula.professor}</p>
                <p><strong>Necessário trazer:</strong> {aula.necessarioTrazer}</p>
            </div>
            <div className="aula-detalhe-horarios">
                <h3>Horários:</h3>
                <ul>
                    {aula.horarios.map((h, idx) => (
                        <li key={idx}>
                            <div className="horario-info">
                                {h.dia} - {h.hora} ({h.sala}) - {h.professor}
                            </div>
                            <button
                                className="inscrever-btn"
                                onClick={() => handleSubscribe(h)}
                            >
                                Inscrever-se
                            </button>                        </li>
                    ))}
                </ul>

            </div>

            {/* Pop-up de confirmação */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                        {popupMessage.includes("Deseja confirmar") || popupMessage.includes("lista de espera") ? (
                            <div className="popup-buttons">
                                <button onClick={confirmSubscription}>Confirmar</button>
                                <button onClick={cancelSubscription}>Cancelar</button>
                            </div>
                        ) : (
                            <div className="popup-buttons">
                                <button onClick={cancelSubscription}>Fechar</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AulaDetalhePage;
