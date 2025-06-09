import { useState, useEffect } from "react";
import "./DaySelector.css";

export default function DaySelector({ data, onDayChange, dataType = "exercicio", multiSelect = false }) {
    const [diasSelecionados, setDiasSelecionados] = useState(['segunda']);

    const diasSemana = [
        { key: 'segunda', label: 'Segunda' },
        { key: 'terca', label: 'Terça' },
        { key: 'quarta', label: 'Quarta' },
        { key: 'quinta', label: 'Quinta' },
        { key: 'sexta', label: 'Sexta' },
        { key: 'sabado', label: 'Sábado' },
        { key: 'domingo', label: 'Domingo' }
    ];

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
            if (item.dia) {
                dadosPorDia[item.dia].push(item);
            } else if (item.dias && Array.isArray(item.dias)) {
                item.dias.forEach(dia => {
                    dadosPorDia[dia].push(item);
                });
            } else {
                Object.keys(dadosPorDia).forEach(dia => {
                    dadosPorDia[dia].push(item);
                });
            }
        });

        return dadosPorDia;
    };

    const dadosPorDia = organizarDadosPorDia();

    const handleDayChange = (dia) => {
        let novosSelecionados;

        if (multiSelect) {
            if (diasSelecionados.includes(dia)) {
                novosSelecionados = diasSelecionados.filter(d => d !== dia);
            } else {
                novosSelecionados = [...diasSelecionados, dia];
            }
        } else {
            novosSelecionados = [dia];
        }

        setDiasSelecionados(novosSelecionados);

        const dadosFiltrados = novosSelecionados.flatMap(d => dadosPorDia[d] || []);
        onDayChange(dadosFiltrados, novosSelecionados);
    };

    useEffect(() => {
        const dadosIniciais = diasSelecionados.flatMap(d => dadosPorDia[d] || []);
        onDayChange(dadosIniciais, diasSelecionados);
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
                        className={`dia-btn ${diasSelecionados.includes(dia.key) ? 'ativo' : ''}`}
                        onClick={() => handleDayChange(dia.key)}
                    >
                        {dia.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
