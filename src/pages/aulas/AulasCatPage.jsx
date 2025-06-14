import React from 'react';
import './AulasCatPage.css';
import ClassSlider from "../../components/ClassSlider/ClassSlider.jsx";
import  AulasData from "../../data/AulasData.js";

function AulasCatPage() {

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
        </div>
    );
}
export default AulasCatPage;