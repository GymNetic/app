import React, { useState } from 'react';
import './Forms.css';

function Forms({ 
    professional,
    options, 
    selectedValue, 
    onValueChange,
    className = "forms-select" 
}) {
    const [selectedHour, setSelectedHour] = useState("");
    
    // Generate hours from 6 to 22
    const hoursOptions = [];
    for (let i = 6; i <= 22; i++) {
        hoursOptions.push({
            value: i.toString(),
            label: `${i}:00`
        });
    }
    
    return (
        <div className="form-container">
            <p>{`Tem preferência por um ${professional}?`}</p>
            <select 
                value={selectedValue} 
                onChange={(e) => onValueChange(e.target.value)}
                className={className}
            >
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p>{`Tem preferência de horário?`}</p>
            <select 
                value={selectedHour} 
                onChange={(e) => setSelectedHour(e.target.value)}
                className={className}
            >
                <option value="">Selecione uma hora</option>
                {hoursOptions.map((hour) => (
                    <option key={hour.value} value={hour.value}>
                        {hour.label}
                    </option>
                ))}
            </select>
            <button className="form-button">Marcar</button>
        </div>
    );
}

export default Forms;