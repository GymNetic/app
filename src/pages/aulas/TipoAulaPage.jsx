import './TipoAulaPage.css';
import TipoAulaData from "../../data/TipoAulaData.js";
import AulasData from "../../data/AulasData.js";
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import ClassSlider from "../../components/ClassSlider/ClassSlider.jsx";

function TipoAulaPage() {
    const { tipo } = useParams();
    const [filteredData] = useState(null);

    const aulaInfo = AulasData.find(aula => aula.slug === tipo);
    const aulaData = TipoAulaData[tipo]; // dados específicos de TipoAulaData


    return (
        <div>

            <div className="nutri-agenda-image">
                <div className="nutri-agenda-title">
                    <p>Descobre as melhores aulas para ti</p>
                    <h1>{aulaInfo.title}</h1>
                </div>
            </div>

            <div className="search-area">
                <h1 className="list-main-title">Lista de Aulas</h1>
            </div>
            <ClassSlider
                data={(filteredData || aulaData).map(item => ({
                    ...item,
                    title: item.name,
                    desc: null// Adiciona o título da categoria de aula
                }))}
                classesPerSlide={3}

            />
        </div>

    );
}

export default TipoAulaPage;
