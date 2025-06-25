import { useState, useEffect } from "react";
import "./PlanoTreinoPage.css";
import DaySelector from "../components/DaySelector.jsx";

// Função utilitária para normalizar nomes de dias
function normalizarDia(dia) {
    if (!dia) return "";
    if (typeof dia !== "string") {
        dia = String(dia ?? "").trim();
    }
    return dia
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

export default function PlanoTreinoPage() {
    const [exerciciosDoDia, setExerciciosDoDia] = useState([]);
    const [diaAtual, setDiaAtual] = useState('segunda');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [exerciseData, setExerciseData] = useState([]);

    // Função para formatar o nome do(s) dia(s)
    const formatarDia = (dia) => {
        if (Array.isArray(dia)) {
            return dia
                .map(d => d.charAt(0).toUpperCase() + d.slice(1))
                .join(', ');
        }
        return dia.charAt(0).toUpperCase() + dia.slice(1);
    };

    // Carrega os dados do plano do localStorage ao montar o componente
    useEffect(() => {
        const plano = JSON.parse(localStorage.getItem("planoTreino")) || [];
        setExerciseData(plano);
        setDataLoaded(true);
    }, []);

    // Atualizar exercícios do dia sempre que mudar o dia ou os dados
    useEffect(() => {
        const diaNorm = normalizarDia(diaAtual);
        const exerciciosFiltrados = exerciseData.filter(ex => {
            const diaExNorm = normalizarDia(ex.dia);
            return diaExNorm === diaNorm;
        });
        setExerciciosDoDia(exerciciosFiltrados);
    }, [exerciseData, diaAtual]);

    const handleDayChange = (exercicios, dias) => {
        // Garantir que sempre temos uma string única para diaAtual
        const dia = Array.isArray(dias) ? dias[0] : dias;
        setDiaAtual(dia);
        
        // Filtrar exercícios para o dia selecionado
        const diaNorm = normalizarDia(dia);
        const exerciciosFiltrados = exerciseData.filter(ex => 
            normalizarDia(ex.dia) === diaNorm
        );
        setExerciciosDoDia(exerciciosFiltrados);
    };

    if (!dataLoaded) {
        return (
            <div className="plano-container">
                <div>
                    <h1>Plano de Treino</h1>
                    <p>Carregando dados...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="plano-container">
            <div className="header-plano-treino">
                <h1>Plano de Treino</h1>

                <DaySelector
                    data={exerciseData}
                    onDayChange={handleDayChange}
                />
            </div>

            <div className="linha-horizontal-wrapper">
                <h2 className="linha-horizontal-text">
                    Treino de {formatarDia(diaAtual)}
                </h2>
            </div>

            <div className="exercicios-lista">
                {exerciciosDoDia && exerciciosDoDia.length > 0 ? (
                    exerciciosDoDia.map((exercicio) => (
                        <div key={exercicio.id} className="exercicio-card">
                            <h2>{exercicio.nome}</h2>
                            <p><strong>Grupo muscular:</strong> {exercicio.grupoMuscular}</p>
                            <p><strong>Séries:</strong> {exercicio.series}</p>
                            <p><strong>Repetições:</strong> {exercicio.repeticoes}</p>
                        </div>
                    ))
                ) : (
                    <div className="no-exercises">
                        <p>Nenhum exercício programado para este dia</p>
                    </div>
                )}
            </div>
        </div>
    );
}