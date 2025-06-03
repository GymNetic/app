import { nutricaoData } from "../data/nutricaoData";
import "./PlanoNutricionalPage.css";

export default function PlanoNutricionalPage() {
    return (
        <div className="plano-container">
            <h1>Plano Nutricional</h1>
            <div className="refeicoes-lista">
                {nutricaoData.map((refeicao) => (
                    <div key={refeicao.id} className="refeicao-card">
                        <h2>{refeicao.refeicao}</h2>
                        <ul>
                            {refeicao.alimentos.map((alimento, idx) => (
                                <li key={idx}>{alimento}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
