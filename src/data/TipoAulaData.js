const TipoAulaData = {
    menteecorpo: [
        {
            name: "Yoga Flow",
            desc: "Sequência fluida de posturas com foco na respiração e relaxamento.",
            duracao: "60 min",
            intensidade: "Baixa",
            necessarioTrazer: "Tapete de yoga, toalha",
            professor: "Inês Costa",
            fotoProfessor: "ines-costa.jpg",
            horarios: [
                { dia: "Segunda-feira", hora: "18:00", sala: "Sala 1", professor: "Inês Costa" },
                { dia: "Quarta-feira", hora: "08:00", sala: "Sala 2", professor: "Inês Costa" }
            ]
        },
        {
            name: "Yoga Restaurativo",
            desc: "Posturas mantidas por mais tempo com foco na recuperação física e mental.",
            duracao: "45 min",
            intensidade: "Muito baixa",
            necessarioTrazer: "Roupa confortável, tapete",
            professor: "Tiago Ribeiro",
            fotoProfessor: "tiago-ribeiro.jpg",
            horarios: [
                { dia: "Terça-feira", hora: "19:00", sala: "Sala 1", professor: "Tiago Ribeiro" }
            ]
        }
    ],
    combate: [
        {
            name: "Boxe Fitness",
            desc: "Treino cardiovascular e de força inspirado no boxe.",
            duracao: "50 min",
            intensidade: "Alta",
            necessarioTrazer: "Luvas (opcional), toalha, água",
            professor: "Joana Almeida",
            fotoProfessor: "joana-almeida.jpg",
            horarios: [
                { dia: "Segunda-feira", hora: "20:00", sala: "Sala 3", professor: "Joana Almeida" },
                { dia: "Quinta-feira", hora: "18:00", sala: "Sala 3", professor: "Joana Almeida" }
            ]
        },
        {
            name: "Kickboxing Técnico",
            desc: "Aula técnica com foco em movimentos e combos do kickboxing.",
            duracao: "60 min",
            intensidade: "Média-alta",
            necessarioTrazer: "Luvas, protetores opcionais",
            professor: "Carlos Pinto",
            fotoProfessor: "carlos-pinto.jpg",
            horarios: [
                { dia: "Quarta-feira", hora: "19:00", sala: "Sala 3", professor: "Carlos Pinto" }
            ]
        }
    ],
    danca: [
        {
            name: "Zumba",
            desc: "Aula de dança aeróbica com ritmos latinos e internacionais.",
            duracao: "45 min",
            intensidade: "Média",
            necessarioTrazer: "Roupa leve, toalha, água",
            professor: "Rita Silva",
            fotoProfessor: "rita-silva.jpg",
            horarios: [
                { dia: "Terça-feira", hora: "18:00", sala: "Sala 2", professor: "Rita Silva" },
                { dia: "Sexta-feira", hora: "17:00", sala: "Sala 2", professor: "Rita Silva" }
            ]
        },
        {
            name: "Afro Dance",
            desc: "Movimentos enérgicos com influência de ritmos africanos modernos.",
            duracao: "50 min",
            intensidade: "Alta",
            necessarioTrazer: "Roupa confortável, água",
            professor: "Bruno Matos",
            fotoProfessor: "bruno-matos.jpg",
            horarios: [
                { dia: "Quinta-feira", hora: "19:30", sala: "Sala 2", professor: "Bruno Matos" }
            ]
        }
    ],
    altaintensidade: [
        {
            name: "Circuito Funcional",
            desc: "Treino por estações para melhorar força, agilidade e resistência.",
            duracao: "45 min",
            intensidade: "Alta",
            necessarioTrazer: "Toalha, água",
            professor: "Sérgio Lopes",
            fotoProfessor: "sergio-lopes.jpg",
            horarios: [
                { dia: "Segunda-feira", hora: "17:30", sala: "Sala 1", professor: "Sérgio Lopes" },
                { dia: "Quarta-feira", hora: "18:30", sala: "Sala 1", professor: "Sérgio Lopes" }
            ]
        }
    ],
    alongamento: [
        {
            name: "Stretch & Relax",
            desc: "Aula focada em alongamento profundo e respiração consciente.",
            duracao: "40 min",
            intensidade: "Baixa",
            necessarioTrazer: "Tapete, roupa confortável",
            professor: "Mariana Freitas",
            fotoProfessor: "mariana-freitas.jpg",
            horarios: [
                { dia: "Sexta-feira", hora: "18:00", sala: "Sala 2", professor: "Mariana Freitas" }
            ]
        }
    ]
};

export default TipoAulaData;
