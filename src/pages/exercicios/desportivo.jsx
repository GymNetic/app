import exCard from "../../components/ExCard.jsx";
import TipoExData from "../../data/TipoExData.js";
import React from "react";


function desportivo() {
    return (
        <div>
            <div className="user-area-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="user-area-title">
                    <p>Explora o melhor para ti</p>
                    <h1>Treino Desportivo / Específico</h1>
                </div>
                <exCard data={TipoExData.desportivo}
                        classesPerSlide={TipoExData.desportivo.length}/>
            </div>
        </div>
    );
} export default desportivo;