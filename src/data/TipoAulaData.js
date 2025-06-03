const TipoAulaData = {
    menteecorpo: [
        {
            name: "Yoga Flow",
            link: "/aulas/menteecorpo/yoga-flow",
            slug: "yoga-flow",
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
            link: "/aulas/menteecorpo/yoga-restaurativo",
            slug: "yoga-restaurativo",
            desc: "Posturas mantidas por mais tempo com foco na recuperação física e mental.",
            duracao: "45 min",
            intensidade: "Muito baixa",
            necessarioTrazer: "Roupa confortável, tapete",
            professor: "Tiago Ribeiro",
            fotoProfessor: "tiago-ribeiro.jpg",
            horarios: [
                { dia: "Terça-feira", hora: "19:00", sala: "Sala 1", professor: "Tiago Ribeiro" }
            ]
        },
        {
            name: "Pilates Suave",
            link: "/aulas/menteecorpo/pilates-suave",
            slug: "pilates-suave",
            desc: "Exercícios de baixo impacto para fortalecer o core e melhorar a postura.",
            duracao: "50 min",
            intensidade: "Baixa",
            necessarioTrazer: "Toalha, tapete de yoga",
            professor: "Catarina Lopes",
            fotoProfessor: "catarina-lopes.jpg",
            horarios: [
                { dia: "Quinta-feira", hora: "09:00", sala: "Sala 1", professor: "Catarina Lopes" }
            ]
        }
    ],
    combate: [
        {
            name: "Boxe Fitness",
            link: "/aulas/combate/boxe-fitness",
            slug: "boxe-fitness",
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
            link: "/aulas/combate/kickboxing-tecnico",
            slug: "kickboxing-tecnico",
            desc: "Aula técnica com foco em movimentos e combos do kickboxing.",
            duracao: "60 min",
            intensidade: "Média-alta",
            necessarioTrazer: "Luvas, protetores opcionais",
            professor: "Carlos Pinto",
            fotoProfessor: "carlos-pinto.jpg",
            horarios: [
                { dia: "Quarta-feira", hora: "19:00", sala: "Sala 3", professor: "Carlos Pinto" }
            ]
        },
        {
            name: "Muay Thai Fitness",
            link: "/aulas/combate/muay-thai-fitness",
            slug: "muay-thai-fitness",
            desc: "Treino funcional inspirado nas técnicas do Muay Thai com foco em queima calórica.",
            duracao: "55 min",
            intensidade: "Alta",
            necessarioTrazer: "Luvas, toalha, água",
            professor: "Pedro Gama",
            fotoProfessor: "pedro-gama.jpg",
            horarios: [
                { dia: "Terça-feira", hora: "20:00", sala: "Sala 3", professor: "Pedro Gama" }
            ]
        }
    ],
    danca: [
        {
            name: "Zumba",
            link: "/aulas/danca/zumba",
            slug: "zumba",
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
            link: "/aulas/danca/afro-dance",
            slug: "afro-dance",
            desc: "Movimentos enérgicos com influência de ritmos africanos modernos.",
            duracao: "50 min",
            intensidade: "Alta",
            necessarioTrazer: "Roupa confortável, água",
            professor: "Bruno Matos",
            fotoProfessor: "bruno-matos.jpg",
            horarios: [
                { dia: "Quinta-feira", hora: "19:30", sala: "Sala 2", professor: "Bruno Matos" }
            ]
        },
        {
            name: "Hip Hop Dance",
            link: "/aulas/danca/hip-hop-dance",
            slug: "hip-hop-dance",
            desc: "Coreografias urbanas com foco em ritmo, expressão e resistência.",
            duracao: "60 min",
            intensidade: "Média-alta",
            necessarioTrazer: "Roupa confortável, tênis, água",
            professor: "Luana Marques",
            fotoProfessor: "luana-marques.jpg",
            horarios: [
                { dia: "Quarta-feira", hora: "17:00", sala: "Sala 2", professor: "Luana Marques" }
            ]
        }
    ],
    altaintensidade: [
        {
            name: "Circuito Funcional",
            link: "/aulas/altaintensidade/circuito-funcional",
            slug: "circuito-funcional",
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
        },
        {
            name: "HIIT Power",
            link: "/aulas/altaintensidade/hiit-power",
            slug: "hiit-power",
            desc: "Treino intervalado de alta intensidade para máxima queima de calorias.",
            duracao: "30 min",
            intensidade: "Muito alta",
            necessarioTrazer: "Toalha, água, roupa leve",
            professor: "André Santos",
            fotoProfessor: "andre-santos.jpg",
            horarios: [
                { dia: "Terça-feira", hora: "07:30", sala: "Sala 1", professor: "André Santos" }
            ]
        },
        {
            name: "Tabata Intenso",
            link: "/aulas/altaintensidade/tabata-intenso",
            slug: "tabata-intenso",
            desc: "Treino Tabata com exercícios variados para resistência e força.",
            duracao: "20 min",
            intensidade: "Muito alta",
            necessarioTrazer: "Toalha, água, tênis",
            professor: "Ana Costa",
            fotoProfessor: "ana-costa.jpg",
            horarios: [
                { dia: "Sexta-feira", hora: "19:00", sala: "Sala 1", professor: "Ana Costa" }
            ]
        }
    ],
    alongamento: [
        {
            name: "Stretch & Relax",
            link: "/aulas/alongamento/stretch-relax",
            slug: "stretch-relax",
            desc: "Aula focada em alongamento profundo e respiração consciente.",
            duracao: "40 min",
            intensidade: "Baixa",
            necessarioTrazer: "Tapete, roupa confortável",
            professor: "Mariana Freitas",
            fotoProfessor: "mariana-freitas.jpg",
            horarios: [
                { dia: "Sexta-feira", hora: "18:00", sala: "Sala 2", professor: "Mariana Freitas" }
            ]
        },
        {
            name: "Flexibilidade Avançada",
            link: "/aulas/alongamento/flexibilidade-avancada",
            slug: "flexibilidade-avancada",
            desc: "Aula para melhorar a flexibilidade geral do corpo.",
            duracao: "50 min",
            intensidade: "Baixa",
            necessarioTrazer: "Tapete, roupa confortável",
            professor: "Ricardo Alves",
            fotoProfessor: "ricardo-alves.jpg",
            horarios: [
                { dia: "Quinta-feira", hora: "20:00", sala: "Sala 2", professor: "Ricardo Alves" }
            ]
        },
        {
            name: "Mobility Flow",
            link: "/aulas/alongamento/mobility-flow",
            slug: "mobility-flow",
            desc: "Rotina fluida para melhorar a mobilidade articular e reduzir tensões.",
            duracao: "45 min",
            intensidade: "Baixa",
            necessarioTrazer: "Tapete, água",
            professor: "Beatriz Nogueira",
            fotoProfessor: "beatriz-nogueira.jpg",
            horarios: [
                { dia: "Segunda-feira", hora: "09:30", sala: "Sala 2", professor: "Beatriz Nogueira" }
            ]
        }
    ]
};

export default TipoAulaData;
