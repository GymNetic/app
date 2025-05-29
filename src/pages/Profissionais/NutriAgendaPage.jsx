import React, { useState } from 'react';
import Forms from '../../components/agendamentos/forms';
import './NutriAgendaPage.css';

function NutriAgendaPage() {

      const [selectedNutri, setSelectedNutri] = useState("");
  
  const NutriOptions = [
    { value: "joao", label: "João Santos" },
    { value: "maria", label: "Maria Silva" },
    { value: "carlos", label: "Carlos Santos" },
    { value: "ana", label: "Ana Costa" }
  ];

  return (
    
    <div className="nutri-agenda-page">
        <div className="nutri-agenda-image">
            <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt="Nutricionista" />
            <div className="nutri-agenda-title">
                <h1>OS NOSSOS NUTRICIONISTAS</h1>
            </div>
        </div>
        <div className="nutri-agenda-description">
            <h1>Marcar Avaliação Nutricional</h1>
            <div className="nutri-agenda-text">
            <p>    Agende a sua consulta de nutrição online com a uma das nutricionista  da nossa equipa e tenha acompanhamento profissional personalizado e  experiente, focado no seu objectivo, tendo em conta as suas  dificuldades, o seu ritmo de vida, gostos pessoais e manutenção dos  resultados obtidos a longo prazo.</p>
            <p>    As consultas podem ser feitas por vídeo chamada, ou presencialmente, conforme for mais conveniente para si. Processam-se exactamente da  mesma forma, com a única diferença de  que as pesagens e medidas terão de ser feitas, anteriormente, ou no ginásio, junto do pt, ou em casa, por si. Para o efeito apenas precisará de uma balança e/ou fita métrica.</p>
            <p>    Na consulta terá acesso ao seu plano alimentar individual, dicas para facilitar o dia a dia, informação complementar, esclarecimento de  dúvidas, adequação da estratégia horária, assim como receitas e desafios para tornar o compromisso real e dinâmico.</p>
            </div>
        </div>
        <Forms 
            professional="Nutricionista"
            options={NutriOptions}
            selectedValue={selectedNutri}
            onValueChange={setSelectedNutri}
            className="forms-select"
        />
    </div>
  );
}

export default NutriAgendaPage;