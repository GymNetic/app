import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TipoAulaData from "../../data/TipoAulaData";
import BackButton from "../../components/BackButton.jsx";
import  "./AulaDetalhePage.css";

function AulaDetalhePage() {
    const { tipo, idx } = useParams();
    const navigate = useNavigate();



    const aulas = TipoAulaData[tipo];

    // encontra aula pelo nome
    const aula = aulas.find(aula => aula.slug.replace("/", "") === idx);

    if (!aula) {
        return <div>Aula não encontrada</div>;
    }

    return (
        <div>
            <div className="bck-space">
                <BackButton onClick={() => navigate(-1)} />
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
                            {h.dia} - {h.hora} ({h.sala}) - {h.professor}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AulaDetalhePage;
