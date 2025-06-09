import React, { useState } from 'react';
import DaySelector from './DaySelector';
import './AddToPlanPopup.css';

const AddToPlanPopup = ({ exerciseName, onClose, onSave }) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [series, setSeries] = useState('');
    const [reps, setReps] = useState('');

    const handleSubmit = () => {
        if (!series || !reps || selectedDays.length === 0) {
            alert("Preenche todos os campos e seleciona pelo menos um dia.");
            return;
        }

        onSave({
            days: selectedDays,
            series,
            reps
        });

        onClose();
    };

    // Função para fechar o popup quando clicar fora dele
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('popup-overlay')) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup">
                <button
                    className="popup-close-btn"
                    onClick={onClose}
                    aria-label="Fechar popup"
                >
                    &times;
                </button>
                <h2>Adicionar "{exerciseName}"</h2>

                <label>Dias da semana:</label>
                <DaySelector
                    data={[]}
                    dataType="popup"
                    multiSelect={true}
                    onDayChange={(items, dias) => setSelectedDays(dias)}
                />

                <label>Séries:</label>
                <input
                    type="number"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                />

                <label>Repetições:</label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                />

                <div className="popup-actions">
                    <button onClick={handleSubmit}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default AddToPlanPopup;