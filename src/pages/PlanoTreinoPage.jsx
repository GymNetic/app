import { exerciseData } from "../data/exerciseData";
import "./PlanoTreinoPage.css";

export default function PlanoTreinoPage() {
    return (
        <div className="plano-container">
            <h1>Plano de Treino</h1>
            <div className="exercicios-lista">
                {exerciseData.map((exercicio) => (
                    <div key={exercicio.id} className="exercicio-card">
                        <h2>{exercicio.nome}</h2>
                        <p><strong>Grupo muscular:</strong> {exercicio.grupoMuscular}</p>
                        <p><strong>Séries:</strong> {exercicio.series}</p>
                        <p><strong>Repetições:</strong> {exercicio.repeticoes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}