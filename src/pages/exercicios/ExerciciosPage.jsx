import React from 'react';
import {useNavigate} from 'react-router-dom';
import './ExerciciosPage.css';
import ClassSlider from "../../components/ClassSlider/ClassSlider.jsx";
import ExerciciosData from "../../data/ExerciciosData.js";

function ExerciciosPage() {

    const navigate = useNavigate();

    const handleClassClick = (classData) => {
        navigate(`/exercicios/${classData.title.toLowerCase()}`, {
            state: {
                classTitle: classData.title,
                classData: classData
            }
        });
    };

    return (
        <div>
            <div className="user-area-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="user-area-title">
                    <p>Explora o melhor para ti com a nossa</p>
                    <h1>BIBLIOTECA DE EXERCÍCIOS</h1>
                </div>
            </div>
            <ClassSlider
                data={ExerciciosData}
                classesPerSlide={3}
            />
        </div>
    );
}
export default ExerciciosPage;