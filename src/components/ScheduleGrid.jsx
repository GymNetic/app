import React, { useState } from "react";
import "./ScheduleGrid.css";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const morningHours = Array.from({ length: 8 }, (_, i) => `${6 + i}:00`);
const afternoonHours = Array.from({ length: 9 }, (_, i) => `${14 + i}:00`);

const classTypes = ["Todas as Aulas", "Yoga", "CrossFit", "Zumba", "Pilates", "Spinning", "Body Pump"];

const scheduleEvents = {
  "Seg-6:00": {
    type: "Yoga",
    instructor: "Maria Silva",
    duration: "50 min",
    level: "Iniciante",
    room: "Sala 1"
  },
  "Seg-7:00": {
    type: "CrossFit",
    instructor: "João Santos",
    duration: "45 min",
    level: "Avançado",
    room: "Sala 2"
  },
  "Ter-8:00": {
    type: "Zumba",
    instructor: "Ana Costa",
    duration: "55 min",
    level: "Todos os níveis",
    room: "Sala 1"
  },
  // Add afternoon classes
  "Qua-14:00": {
    type: "Pilates",
    instructor: "Pedro Lima",
    duration: "50 min",
    level: "Intermediário",
    room: "Sala 3"
  },
  "Qui-16:00": {
    type: "Spinning",
    instructor: "Carlos Santos",
    duration: "45 min",
    level: "Avançado",
    room: "Sala 4"
  },
  "Sex-18:00": {
    type: "Body Pump",
    instructor: "Ana Paula",
    duration: "60 min",
    level: "Todos os níveis",
    room: "Sala 2"
  }
};

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