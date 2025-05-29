import "./ExDetPage.css";
import React from "react";
import TipoExData from "../../data/TipoExData.js";

    function TipoEx({ name, photo, desc, type, machine } = {}) {
    // Usa os parâmetros recebidos ou valores de fallback do TipoExData
    const exerciseName = name || TipoExData.name;
    const exerciseType = type || TipoExData.type;
    const exerciseMachine = machine || TipoExData.machine;
    const exerciseDesc = desc || TipoExData.desc;
    const exercisePhoto = photo || TipoExData.image;

    return (
        <div className={"ex-card-container"}>
            <h1>Lista de Exercícios</h1>
            <div className="conteudo">
                <div className="esq">
                    <h2>{exerciseName}</h2>
                    <p>{exerciseType}</p>
                    <p>{exerciseMachine}</p>
                </div>
                <div className="dir">
                    <img src={exercisePhoto} alt="img_ex"/>
                </div>
            </div>
            <p>{exerciseDesc}</p>
        </div>
    );
}

export default TipoEx;