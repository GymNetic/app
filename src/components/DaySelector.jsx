import { useState, useEffect } from "react";
import "./DaySelector.css";

export default function DaySelector({ data, onDayChange, multiSelect = false }) {
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

    const organizarDadosPorDia = (data) => {
        const dadosPorDia2 = {};
        data.forEach(item => {
            const dia = normalizarDia(item.dia);
            if (!dadosPorDia2[dia]) {
                dadosPorDia2[dia] = [];
            }
            dadosPorDia2[dia].push(item);
        });
        return dadosPorDia2;
    };

    // Função auxiliar para normalizar dias
    const normalizarDia = (dia) => {
        if (!dia) return "";
        return String(dia)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    const dadosPorDia = organizarDadosPorDia(data);

    const handleDayChange = (dia) => {
        let novosSelecionados;
        
        if (multiSelect) {
            if (diasSelecionados.includes(dia)) {
                novosSelecionados = diasSelecionados.filter(d => d !== dia);
                if (novosSelecionados.length === 0) {
                    novosSelecionados = [dia]; // Manter pelo menos um dia selecionado
                }
            } else {
                novosSelecionados = [...diasSelecionados, dia];
            }
        } else {
            novosSelecionados = [dia];
        }

        setDiasSelecionados(novosSelecionados);

        // Garantir que os dados são válidos antes de chamar onDayChange
        const dadosFiltrados = novosSelecionados.flatMap(d => 
            (dadosPorDia[d] || []).filter(item => item && item.id)
        );
        
        onDayChange(dadosFiltrados, novosSelecionados[0]); // Passar apenas o primeiro dia
    };

    useEffect(() => {
        const dadosIniciais = diasSelecionados.flatMap(d => dadosPorDia[d] || []);
        onDayChange(dadosIniciais, diasSelecionados);
    }, []);

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