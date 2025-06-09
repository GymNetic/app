import { useState, useEffect } from "react";
import "./DaySelector.css";

export default function DaySelector({ data, onDayChange, dataType = "exercicio" }) {
    const [diaSelecionado, setDiaSelecionado] = useState('segunda');

    const diasSemana = [
        { key: 'segunda', label: 'Segunda' },
        { key: 'terca', label: 'Terça' },
        { key: 'quarta', label: 'Quarta' },
        { key: 'quinta', label: 'Quinta' },
        { key: 'sexta', label: 'Sexta' },
        { key: 'sabado', label: 'Sábado' },
        { key: 'domingo', label: 'Domingo' }
    ];

    // Função para organizar dados por dia da semana
    const organizarDadosPorDia = () => {
        const dadosPorDia = {
            segunda: [],
            terca: [],
            quarta: [],
            quinta: [],
            sexta: [],
            sabado: [],
            domingo: []
        };

        data.forEach(item => {
            // Verifica se o item tem uma propriedade 'dia' ou 'dias'
            if (item.dia) {
                dadosPorDia[item.dia].push(item);
            } else if (item.dias && Array.isArray(item.dias)) {
                item.dias.forEach(dia => {
                    dadosPorDia[dia].push(item);
                });
            } else {
                // Se não especificar dia, adiciona em todos os dias
                Object.keys(dadosPorDia).forEach(dia => {
                    dadosPorDia[dia].push(item);
                });
            }
        });

        return dadosPorDia;
    };

    const dadosPorDia = organizarDadosPorDia();

    const handleDayChange = (dia) => {
        setDiaSelecionado(dia);
        onDayChange(dadosPorDia[dia], dia);
    };

    // Inicializa com os dados de segunda-feira na primeira renderização
    useEffect(() => {
        onDayChange(dadosPorDia.segunda, 'segunda');
    }, []);

    const getCountLabel = (count) => {
        if (dataType === "nutricao") {
            return count === 1 ? "refeição" : "refeições";
        }
        return count === 1 ? "exercício" : "exercícios";
    };

    return (
        <div className="day-selector">
            <div className="dias-semana-row">
                {diasSemana.map((dia) => (
                    <button
                        key={dia.key}
                        className={`dia-btn ${diaSelecionado === dia.key ? 'ativo' : ''}`}
                        onClick={() => handleDayChange(dia.key)}
                    >
                        {dia.label}
                        <span className="item-count">
                            {dadosPorDia[dia.key].length} {getCountLabel(dadosPorDia[dia.key].length)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}