// pages/TipoExPage.jsx
import './TipoExPage.css';
import ExCard from "../../components/ExCard.jsx";
import TipoExData from "../../data/TipoExData.js";
import ExerciciosData from "../../data/ExerciciosData.js";
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import AddToPlanPopup from "../../components/AddToPlanPopup.jsx"; // IMPORTANTE

function TipoExPage() {
    const { tipo } = useParams();
    const [filteredData, setFilteredData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const exercicioInfo = ExerciciosData.find(ex => ex.slug === tipo);
    const exercicioData = TipoExData[tipo]; // dados específicos

    if (!exercicioInfo || !exercicioData) {
        return <div>Exercício não encontrado</div>;
    }

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredData(null);
            return;
        }

        const filtered = exercicioData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const dataToDisplay = filteredData === null ? exercicioData : filteredData;

    return (
        <div>
            <div className="nutri-agenda-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="nutri-agenda-title">
                    <p>Explora o melhor para ti</p>
                    <h1>{exercicioInfo.title}</h1>
                </div>
            </div>

            <div className="search-area">
                <h1 className="list-main-title">Lista de Exercícios</h1>
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="exercises-container">
                {dataToDisplay.map((exercicio, index) => (
                    <ExCard
                        key={exercicio.id || index}
                        name={exercicio.name}
                        photo={exercicio.photo}
                        desc={exercicio.desc}
                        type={exercicio.type}
                    />
                ))}
            </div>
        </div>
    );
}

export default TipoExPage;