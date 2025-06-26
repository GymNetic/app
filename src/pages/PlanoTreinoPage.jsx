import { useState, useEffect } from "react";
import "./PlanoTreinoPage.css";
import DaySelector from "../components/DaySelector.jsx";

// Importação com try/catch para debug
let exerciseData = [];
try {
    const importedData = await import("../data/exerciseData");
    exerciseData = importedData.exerciseData || importedData.default || [];
} catch (error) {
    console.error("Erro ao importar exerciseData:", error);
    // Dados de fallback para teste
    exerciseData = [
        {
            id: 1,
            nome: "Supino Reto",
            grupoMuscular: "Peito",
            series: "4",
            repeticoes: "8-12",
            dia: "segunda"
        },
        {
            id: 2,
            nome: "Agachamento",
            grupoMuscular: "Pernas",
            series: "4",
            repeticoes: "10-15",
            dia: "segunda"
        }
    ];
}

export default function PlanoTreinoPage() {
    const [exerciciosDoDia, setExerciciosDoDia] = useState([]);
    const [diaAtual, setDiaAtual] = useState('segunda');
    const [dataLoaded, setDataLoaded] = useState(false);

    // Função para formatar o nome do(s) dia(s)
    const formatarDia = (dia) => {
        if (Array.isArray(dia)) {
            return dia
                .map(d => d.charAt(0).toUpperCase() + d.slice(1))
                .join(', ');
        }
        return dia.charAt(0).toUpperCase() + dia.slice(1);
    };

    // Carrega os dados ao montar o componente
    useEffect(() => {
        const loadData = async () => {
            try {
                const module = await import("../data/exerciseData");
                const data = module.exerciseData || module.default || [];
                console.log("Dados carregados:", data);
                setDataLoaded(true);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setDataLoaded(true);
            }
        };

        loadData();
    }, []);

    const handleDayChange = (exercicios, dia) => {
        console.log(`Mudança para ${Array.isArray(dia) ? dia.join(', ') : dia}:`, exercicios);
        setExerciciosDoDia(exercicios || []);
        setDiaAtual(dia);
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