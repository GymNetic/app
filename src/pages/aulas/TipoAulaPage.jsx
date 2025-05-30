import './TipoAulaPage.css';
import TipoAulaData from "../../data/TipoAulaData.js";
import AulasData from "../../data/AulasData.js";
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import ExCard from "../../components/ExCard.jsx";

function TipoAulaPage() {
    const { tipo } = useParams();
    const [filteredData, setFilteredData] = useState(null);

    const aulaInfo = AulasData.find(aula => aula.slug === tipo);
    const aulaData = TipoAulaData[tipo]; // dados específicos de TipoAulaData

    if (!aulaInfo || !aulaData) {
        return <div>Aula não encontrada</div>;
    }

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredData(null);
            return;
        }

        const filtered = aulaData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.intensidade.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const dataToDisplay = filteredData === null ? aulaData : filteredData;

    return (
        <div>
            <div className="bck-space">
                <BackButton />
            </div>

            <div className="area-image">
                <img src="https://img.freepik.com/free-photo/group-people-doing-yoga-exercise-class_1303-13960.jpg" alt="Aulas" />
                <div className="user-area-title">
                    <p>Descobre as melhores aulas para ti</p>
                    <h1>{aulaInfo.title}</h1>
                </div>
            </div>

            <div className="search-area">
                <h1 className="list-main-title">Lista de Aulas</h1>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div>
                <ExCard>{aulaData}</ExCard>
            </div>
        </div>

    );
}

export default TipoAulaPage;
