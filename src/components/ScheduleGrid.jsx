import React, { useState } from "react";
import "./ScheduleGrid.css";
import TipoAulaData from "../data/TipoAulaData.js";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const morningHours = Array.from({ length: 8 }, (_, i) => `0${6 + i}:00`);
const afternoonHours = Array.from({ length: 9 }, (_, i) => `${14 + i}:00`);

// Corrigir o array classTypes - TipoAulaData é um objeto, não um array
const classTypes = ["Todas as Aulas"];
Object.values(TipoAulaData).forEach(aulas => {
  aulas.forEach(aula => {
    if (!classTypes.includes(aula.name)) {
      classTypes.push(aula.name);
    }
  });
});

// Criar o objeto scheduleEvents com base no TipoAulaData
const scheduleEvents = {};

// Processar todos os tipos de aulas e seus horários
Object.entries(TipoAulaData).forEach(([categoria, aulas]) => {
  aulas.forEach(aula => {
    aula.horarios.forEach(horario => {
      // Extrair apenas o prefixo do dia (primeiros 3 caracteres)
      const dia = horario.dia.substring(0, 3);
      const key = `${dia}-${horario.hora}`;

      scheduleEvents[key] = {
        type: aula.name,
        instructor: horario.professor,
        duration: aula.duracao,
        level: aula.intensidade,
        room: horario.sala // Adicionando a sala ao objeto
      };
    });
  });
});

export default function ScheduleGrid() {
  const [selectedClass, setSelectedClass] = useState("Todas as Aulas");
  const [timeperiod, setTimePeriod] = useState("morning");

  const filteredEvents = selectedClass === "Todas as Aulas" 
    ? scheduleEvents 
    : Object.fromEntries(
        Object.entries(scheduleEvents).filter(([_, value]) => value.type === selectedClass)
      );

  const hours = timeperiod === "morning" ? morningHours : afternoonHours;

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Horários Aulas</h1>
        <div className="schedule-filters">
          <select 
            value={timeperiod} 
            onChange={(e) => setTimePeriod(e.target.value)}
            className="time-select"
          >
            <option value="morning">Manhã (6h-13h)</option>
            <option value="afternoon">Tarde (14h-22h)</option>
          </select>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="class-select"
          >
            {classTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="schedule-border">
        <div className="schedule-wrapper">
          <div className="schedule-grid header">
            <div className="empty-cell"></div>
            {days.map((day) => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>

          {hours.map((hour) => (
            <div key={hour} className="schedule-grid row">
              <div className="hour-cell">{hour}</div>
              {days.map((day) => {
                const key = `${day}-${hour}`;
                const event = filteredEvents[key];
                return (
                  <div
                    key={key}
                    className={`cell ${event ? 'has-event' : ''}`}
                  >
                    {event && (
                      <div className="event-card">
                        <div className="event-basic">{event.type}</div>
                        <div className="event-details">
                          <p><strong>Instrutor:</strong> {event.instructor}</p>
                          <p><strong>Duração:</strong> {event.duration}</p>
                          <p><strong>Nível:</strong> {event.level}</p>
                          <p><strong>Sala:</strong> {event.room}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}