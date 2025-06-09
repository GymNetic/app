import { useState } from "react";
import { nutricaoData } from "../data/nutricaoData";
import "./PlanoNutricionalPage.css";
import DaySelector from "../components/DaySelector.jsx";

export default function PlanoNutricionalPage() {
    const [refeicoesDoDia, setRefeicoesDoDia] = useState([]);
    const [diaAtual, setDiaAtual] = useState('segunda');

    const handleDayChange = (refeicoes, dia) => {
        setRefeicoesDoDia(refeicoes);
        setDiaAtual(dia);
    };

    const formatarDia = (dia) => {
        const diasFormatados = {
            segunda: 'Segunda-feira',
            terca: 'Terça-feira',
            quarta: 'Quarta-feira',
            quinta: 'Quinta-feira',
            sexta: 'Sexta-feira',
            sabado: 'Sábado',
            domingo: 'Domingo'
        };
        return diasFormatados[dia] || dia;
    };

    return (
        <div className="plano-container">
            <div className="header-plano-treino">
                <h1>Plano Nutricional</h1>
                <DaySelector
                    data={nutricaoData}
                    onDayChange={handleDayChange}
                    dataType="nutricao"
                />
            </div>
            <div className="linha-horizontal-wrapper">
                <h2 className="linha-horizontal-text">
                    Nutrição de {formatarDia(diaAtual)}
                </h2>
            </div>
            <div className="refeicoes-lista">
                {refeicoesDoDia.length > 0 ? (
                    refeicoesDoDia.map((refeicao) => (
                        <div key={refeicao.id} className="refeicao-card">
                            <h2>{refeicao.refeicao}</h2>
                            {refeicao.horario && (
                                <p className="horario"> {refeicao.horario}</p>
                            )}
                            <ul>
                                {refeicao.alimentos.map((alimento, idx) => (
                                    <li key={idx}>{alimento}</li>
                                ))}
                            </ul>
                            {refeicao.calorias && (
                                <div className="info-nutricional">
                                    <span className="calorias"> {refeicao.calorias} kcal</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-meals">
                        <p>Nenhuma refeição programada para este dia.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
