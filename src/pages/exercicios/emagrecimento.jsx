import exCard from "../../components/ExCard.jsx";
import TipoExData from "../../data/TipoExData.js";
import React from "react";


function emagrecimento() {
    return (
        <div>
            <div className="user-area-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="user-area-title">
                    <p>Explora o melhor para ti</p>
                    <h1>Musculação</h1>
                </div>
                <exCard data={TipoExData.emagrecimento}
                        classesPerSlide={TipoExData.emagrecimento.length}/>
            </div>
        </div>
    );
} export default emagrecimento;