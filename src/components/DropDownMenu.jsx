import React from 'react';

function DropDownMenu({ type }) {
  return (
    <div className="dropdown-container">
      {type === 'treino' && (
        <div className="dropdown-content">
          <div className="dropdown-section">
            <ul>
                    <li><a href="/ExerciciosP">Exercícios</a></li>
                    <li><a href="/PlanoTreinoP">Plano de Treino</a></li>                    
                </ul>
                <ul>
                <li><a href="/AulasGrupoP">Aulas de Grupo</a></li>
                    <li><a href="/HorariosAGP">Horários Aulas</a></li>
                </ul>
                <ul>
                <li><a href="/AgendarPlanoTreinoP">Personal Trainer | Agendar</a></li>
                </ul>
          </div>
        </div>
      )}
        {type === 'alimentacao' && (
            <div className="dropdown-content">
            <div className="dropdown-section">
                <ul>
                        <li><a href="/PlanoNutriP">Plano Nutricional</a></li>
                        <li><a href="/AgendarPlanoNutriP">Avaliação Nutricional | Agendar</a></li>    
                    </ul>
            </div>
            </div>
        )}
    </div>
  );
}

export default DropDownMenu;