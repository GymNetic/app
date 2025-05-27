import React, { useState } from 'react';
import Forms from '../../components/agendamentos/forms';
import './PTAgendaPage.css';

function PTAgendaPage() {

      const [selectedTrainer, setSelectedTrainer] = useState("");
  
  const trainerOptions = [
    { value: "joao", label: "João Santos" },
    { value: "maria", label: "Maria Silva" },
    { value: "carlos", label: "Carlos Santos" },
    { value: "ana", label: "Ana Costa" }
  ];

  return (
    <div className="pt-agenda-page">
        <div className="pt-agenda-title">
            <h1>OS NOSSOS PTS</h1>
        </div>
        <div className="pt-agenda-description">
            <h1>Marcar Avaliação Física</h1>
            <div className="pt-agenda-text">
                <p>    Tem dúvidas na sua programação ou na realização de algum exercício e  precisa de ajuda profissional para clarificar as mesmas? Gostava de  aprender a técnica mais segura e eficiente para algum movimento em  particular com base na sua condição de saúde e anatomia? Gostava de  saber como melhorar alguma habilidade específica com o peso corporal,  barra olímpica ou com kettlebells?</p>
                <p>    Os nossos Treinadores /  Fisiologistas do Exercício, com o seu conhecimento especializado, são as pessoas indicadas para ajudar a esclarecer todas as dúvidas que tenha e para dar o feedback mais adequado ao seu nível de aptidão. Através da  nossa abordagem exclusiva e integrativa temos vindo a ajudar várias  pessoas na melhoria de vários problemas de saúde, na recuperação de  lesões e na optimização da performance atlética.</p>
            </div>
        </div>
        <Forms 
            professional="Personal Trainer"
            options={trainerOptions}
            selectedValue={selectedTrainer}
            onValueChange={setSelectedTrainer}
            className="forms-select"
        />
    </div>
  );
}

export default PTAgendaPage;