import React, { useState, useEffect } from "react";
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
            room: horario.sala,
            day: horario.dia,
            hour: horario.hora
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
  const [inscricoesAulas, setInscricoesAulas] = useState([]);

  const scheduleEvents = getScheduleEvents(allowedTypes);

  const filteredEvents = selectedClass === "Todas as Aulas"
    ? scheduleEvents
    : Object.fromEntries(
        Object.entries(scheduleEvents).filter(([_, value]) => value.type === selectedClass)
      );

  const hours = timeperiod === "morning" ? morningHours : afternoonHours;

  useEffect(() => {
    // Carregar inscrições já realizadas
    const loadInscricoes = () => {
      const inscricoes = JSON.parse(localStorage.getItem('inscricoesAulas') || '[]');
      setInscricoesAulas(inscricoes);
    };

    loadInscricoes();
    window.addEventListener('inscricoes-aulas-updated', loadInscricoes);
    
    return () => {
      window.removeEventListener('inscricoes-aulas-updated', loadInscricoes);
    };
  }, []);

  // Verifica se um evento já tem inscrição
  const isInscrito = (event) => {
    if (!event) return false;
    
    return inscricoesAulas.some(
      aula => aula.type === event.type && 
              aula.day === event.day && 
              aula.hour === event.hour
    );
  };

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
    if (!selectedEvent) return;
    
    // Verificar se já existe inscrição para esta aula
    if (isInscrito(selectedEvent)) {
      alert("Você já está inscrito nesta aula!");
      setShowPopup(false);
      return;
    }
    
    // Adicionar à lista de inscrições no localStorage
    const novasInscricoes = [...inscricoesAulas, {
      type: selectedEvent.type,
      day: selectedEvent.day,
      hour: selectedEvent.hour,
      instructor: selectedEvent.instructor,
      room: selectedEvent.room,
      inscricaoData: new Date().toISOString()
    }];
    
    localStorage.setItem('inscricoesAulas', JSON.stringify(novasInscricoes));
    setInscricoesAulas(novasInscricoes);
    
    // Disparar evento para outros componentes saberem que houve alteração
    window.dispatchEvent(new CustomEvent('inscricoes-aulas-updated'));
    
    alert(`Inscrição realizada com sucesso para ${selectedEvent.type}`);
    setShowPopup(false);
  };

  const handleCancelarInscricao = () => {
    if (!selectedEvent) return;
    
    if (!isInscrito(selectedEvent)) {
      alert("Você não está inscrito nesta aula!");
      return;
    }
    
    if (window.confirm("Tem certeza que deseja cancelar esta inscrição?")) {
      const novasInscricoes = inscricoesAulas.filter(
        aula => !(aula.type === selectedEvent.type && 
                aula.day === selectedEvent.day && 
                aula.hour === selectedEvent.hour)
      );
      
      localStorage.setItem('inscricoesAulas', JSON.stringify(novasInscricoes));
      setInscricoesAulas(novasInscricoes);
      
      // Disparar evento para outros componentes saberem que houve alteração
      window.dispatchEvent(new CustomEvent('inscricoes-aulas-updated'));
      
      alert("Inscrição cancelada com sucesso.");
      setShowPopup(false);
    }
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
                const inscrito = isInscrito(event);
                return (
                  <div
                    key={key}
                    className={`cell ${event ? 'has-event' : ''} ${inscrito ? 'inscrito' : ''}`}
                    onClick={() => handleCellClick(event)}
                  >
                    {event && (
                      <div className="event-card">
                        <div className="event-basic">
                          {event.type}
                          {inscrito && <span className="inscrito-badge">✓</span>}
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
              <p><strong>Dia:</strong> {selectedEvent.day}</p>
              <p><strong>Horário:</strong> {selectedEvent.hour}</p>
              <p><strong>Instrutor:</strong> {selectedEvent.instructor}</p>
              <p><strong>Duração:</strong> {selectedEvent.duration}</p>
              <p><strong>Nível:</strong> {selectedEvent.level}</p>
              <p><strong>Sala:</strong> {selectedEvent.room}</p>
            </div>
            <div className="popup-actions">
              {!isInscrito(selectedEvent) ? (
                <button onClick={handleInscricao} className="inscricao-button">Inscrever-se</button>
              ) : (
                <button onClick={handleCancelarInscricao} className="cancelar-button">Cancelar Inscrição</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
