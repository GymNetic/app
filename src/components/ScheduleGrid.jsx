import React, { useState } from "react";
import "./ScheduleGrid.css";
import TipoAulaData from "../data/TipoAulaData.js";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const morningHours = Array.from({ length: 8 }, (_, i) => `0${6 + i}:00`);
const afternoonHours = Array.from({ length: 9 }, (_, i) => `${14 + i}:00`);

// classTypes agora é uma função que aceita allowedTypes
function getClassTypes(allowedTypes) {
  const types = ["Todas as Aulas"];
  Object.values(TipoAulaData).forEach(aulas => {
    aulas.forEach(aula => {
      if (
        (!allowedTypes || allowedTypes.includes(aula.name)) &&
        !types.includes(aula.name)
      ) {
        types.push(aula.name);
      }
    });
  });
  return types;
}

// scheduleEvents agora pode ser filtrado por allowedTypes
function getScheduleEvents(allowedTypes) {
  const events = {};
  Object.entries(TipoAulaData).forEach(([_, aulas]) => {
    aulas.forEach(aula => {
      if (!allowedTypes || allowedTypes.includes(aula.name)) {
        aula.horarios.forEach(horario => {
          const dia = horario.dia.substring(0, 3);
          const key = `${dia}-${horario.hora}`;
          events[key] = {
            type: aula.name,
            instructor: horario.professor,
            duration: aula.duracao,
            level: aula.intensidade,
            room: horario.sala
          };
        });
      }
    });
  });
  return events;
}

export default function ScheduleGrid({ allowedTypes }) {
  const classTypes = getClassTypes(allowedTypes);
  const [selectedClass, setSelectedClass] = useState("Todas as Aulas");
  const [timeperiod, setTimePeriod] = useState("morning");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const scheduleEvents = getScheduleEvents(allowedTypes);

  const filteredEvents = selectedClass === "Todas as Aulas"
    ? scheduleEvents
    : Object.fromEntries(
        Object.entries(scheduleEvents).filter(([_, value]) => value.type === selectedClass)
      );

  const hours = timeperiod === "morning" ? morningHours : afternoonHours;

  const handleCellClick = (event) => {
    if (event) {
      setSelectedEvent(event);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  const handleInscricao = () => {
    // Lógica para inscrição na aula
    alert(`Inscrição realizada com sucesso para ${selectedEvent.type}`);
    setShowPopup(false);
  };

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
      <p>Clica numa aula em que tenhas interesse de experimentar!</p>
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
                    onClick={() => handleCellClick(event)}
                  >
                    {event && (
                      <div className="event-card">
                        <div className="event-basic">{event.type}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showPopup && selectedEvent && (
        <div className="event-popup-overlay">
          <div className="event-popup">
            <div className="event-popup-content">
              <h2>Detalhes da Aula</h2>
              <button onClick={handleClosePopup} className="close-button">×</button>
            </div>
            <div className="popup-header">

              <h2>{selectedEvent.type}</h2>
            </div>
            <div className="popup-content-2">
              <p><strong>Instrutor:</strong> {selectedEvent.instructor}</p>
              <p><strong>Duração:</strong> {selectedEvent.duration}</p>
              <p><strong>Nível:</strong> {selectedEvent.level}</p>
              <p><strong>Sala:</strong> {selectedEvent.room}</p>
              <p><strong>Horário:</strong> {selectedEvent.capacity}</p>
            </div>
            <div className="popup-actions">
              <button onClick={handleInscricao} className="inscricao-button">Inscrever-se</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}