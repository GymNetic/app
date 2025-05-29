const TipoExData = {
    musculacao: [
        {
            id: 1,
            name: "Supino reto com barra",
            desc: "Deitado num banco plano, empurras uma barra com peso verticalmente a partir do peito.",
            type: "Peito, tríceps, ombros frontais",
            machine: "Barra, banco plano"
        },
        {
            id: 2,
            name: "Agachamento livre",
            desc: "Com uma barra apoiada nos ombros, descida e subida controlada, dobrando os joelhos e quadris.",
            type: "Pernas (quadríceps, glúteos), core",
            machine: "Barra, sem banco"
        },
        {
            id: 3,
            name: "Levantamento terra (deadlift)",
            desc: "Levantas a barra do chão até a cintura mantendo as costas retas.",
            type: "Posterior das pernas, glúteos, costas, core",
            machine: "Barra, sem banco"
        },
        {
            id: 4,
            name: "Remada curvada com barra",
            desc: "Inclinação do tronco para frente e puxar a barra em direção ao abdómen.",
            type: "Costas (dorsal, trapézio), bíceps",
            machine: "Barra, sem banco"
        },
        {
            id: 5,
            name: "Desenvolvimento militar",
            desc: "Empurrar a barra ou halteres de frente para cima, acima da cabeça.",
            type: "Ombros, tríceps",
            machine: "Barra ou halteres, banco plano"
        }
    ],
    cardio: [
        {
            id: 1,
            name: "Corrida na passadeira",
            desc: "Corrida contínua ou intervalada numa passadeira.",
            type: "Pernas, cardiovascular",
            machine: "Passadeira"
        },
        {
            id: 2,
            name: "Bicicleta ergométrica",
            desc: "Pedalar numa bicicleta fixa, com variações de resistência.",
            type: "Pernas, cardiovascular",
            machine: "Bicicleta ergométrica"
        },
        {
            id: 3,
            name: "Burpees",
            desc: "Agachamento → prancha → flexão → salto vertical.",
            type: "Corpo inteiro, cardiovascular",
            machine: "Nenhuma"
        },
        {
            id: 4,
            name: "Battle ropes",
            desc: "Ondulações rápidas com cordas pesadas ancoradas ao chão.",
            type: "Braços, ombros, core, cardiovascular",
            machine: "Cordas pesadas"
        }
    ],
    emagrecimento: [
        {
            id: 1,
            name: "Treino HIIT (ex: saltos com agachamento)",
            desc: "Séries curtas e intensas com pouco descanso para elevar o metabolismo.",
            type: "Corpo inteiro, cardiovascular",
            machine: "Nenhuma"
        },
        {
            id: 2,
            name: "Corda de saltar",
            desc: "Movimento cíclico com saltos rápidos para estimular a queima de gordura.",
            type: "Pernas, core, cardiovascular",
            machine: "Corda de saltar"
        },
        {
            id: 3,
            name: "Mountain climbers",
            desc: "Em posição de prancha, alterna as pernas rapidamente como se estivesses a correr.",
            type: "Core, pernas, ombros",
            machine: "Nenhuma"
        }
    ],
    funcional: [
        {
            id: 1,
            name: "Kettlebell swing",
            desc: "Movimento balístico com kettlebell para ativar a cadeia posterior.",
            type: "Glúteos, costas, ombros, core",
            machine: "Kettlebell"
        },
        {
            id: 2,
            name: "Agachamento com halteres e elevação frontal",
            desc: "Agachas com halteres e ao subir levantas os braços à frente.",
            type: "Pernas, ombros, core",
            machine: "Halteres"
        },
        {
            id: 3,
            name: "Prancha com toques nos ombros",
            desc: "Na posição de prancha, tocas alternadamente nos ombros.",
            type: "Core, ombros, estabilidade",
            machine: "Nenhuma"
        }
    ],
    mobilidade: [
        {
            id: 1,
            name: "Alongamento do gato e camelo",
            desc: "Movimento rítmico da coluna em flexão e extensão em posição de quatro apoios.",
            type: "Coluna vertebral, mobilidade geral",
            machine: "Nenhuma"
        },
        {
            id: 2,
            name: "Mobilidade de tornozelo (lunge com avanço do joelho)",
            desc: "Movimento controlado do joelho à frente com o pé firme no chão.",
            type: "Tornozelo, joelho, equilíbrio",
            machine: "Nenhuma"
        },
        {
            id: 3,
            name: "Círculos de ombro",
            desc: "Rotação lenta dos ombros em círculos completos.",
            type: "Ombros, parte superior das costas",
            machine: "Nenhuma"
        }
    ],
    desportivo: [
        {
            id: 1,
            name: "Plyo box jumps",
            desc: "Saltos explosivos para cima de uma caixa ou plataforma elevada.",
            type: "Pernas, potência",
            machine: "Caixa de salto"
        },
        {
            id: 2,
            name: "Sprints curtos com mudança de direção",
            desc: "Corridas rápidas com variações bruscas de direção.",
            type: "Pernas, core, agilidade",
            machine: "Nenhuma"
        },
        {
            id: 3,
            name: "Lançamento de bola medicinal",
            desc: "Lançamento explosivo de bola contra parede ou chão.",
            type: "Tronco, braços, potência",
            machine: "Bola medicinal"
        }
    ],
    reabilitacao: [
        {
            id: 1,
            name: "Elevação de perna reta deitado",
            desc: "Deitado, levanta lentamente uma perna mantendo-a esticada.",
            type: "Quadríceps, core",
            machine: "Nenhuma"
        },
        {
            id: 2,
            name: "Extensão de ombro com banda elástica",
            desc: "Puxar uma banda elástica para trás mantendo os braços retos.",
            type: "Ombros, costas superiores",
            machine: "Banda elástica"
        },
        {
            id: 3,
            name: "Mobilização escapular na parede",
            desc: "Deslizar os braços pela parede enquanto se estabilizam as omoplatas.",
            type: "Escápulas, ombros, postura",
            machine: "Parede"
        }
    ]
};

export default TipoExData;