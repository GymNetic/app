import exCard from "../../components/ExCard.jsx";
import TipoExData from "../../data/TipoExData.js";
import React from "react";


function reabilitacao() {
    return (
        <div>
            <div className="user-area-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="user-area-title">
                    <p>Explora o melhor para ti</p>
                    <h1>Reabilitação</h1>
                </div>
                <exCard data={TipoExData.reabilitacao}
                        classesPerSlide={TipoExData.reabilitacao.length}/>
            </div>
        </div>
    );
} export default reabilitacao;