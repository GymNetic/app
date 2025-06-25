import React from 'react';
import './AulasCatPage.css';
import ClassSlider from "../../components/ClassSlider/ClassSlider.jsx";
import  AulasData from "../../data/AulasData.js";
import ScheduleGrid from "../../components/ScheduleGrid.jsx";
import { useParams } from 'react-router-dom';

function AulasCatPage() {
    // Obter a categoria da URL
    const { categoria } = useParams();

    // Filtrar as aulas pela categoria atual
    const aulasFiltradas = AulasData.filter(aula => aula.title === categoria);

    return (
        <div>
            <div className="aulas-area-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="aulas-area-title">
                    <p>Explora a melhor sessão para ti </p>
                    <h1>AS NOSSAS AULAS DE</h1>
                </div>
            </div>
            <ClassSlider
                data={AulasData}
                classesPerSlide={3}
            />
            <ScheduleGrid
                // meter a categoria de aulas aqui
                data={aulasFiltradas}
            />
        </div>
    );
}
export default AulasCatPage;