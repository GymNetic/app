// exerciseData.js - Exemplo de como estruturar os dados

export const exerciseData = [
    {
        id: 1,
        nome: "Supino Reto",
        grupoMuscular: "Peito",
        series: "4",
        repeticoes: "8-12",
        dia: "segunda" // Exercício específico para segunda
    },
    {
        id: 2,
        nome: "Agachamento",
        grupoMuscular: "Pernas",
        series: "4",
        repeticoes: "10-15",
        dias: ["segunda", "quinta"] // Exercício para múltiplos dias
    },
    {
        id: 3,
        nome: "Puxada Alta",
        grupoMuscular: "Costas",
        series: "3",
        repeticoes: "8-12",
        dia: "terca"
    },
    {
        id: 4,
        nome: "Desenvolvimento",
        grupoMuscular: "Ombros",
        series: "3",
        repeticoes: "10-12",
        dia: "quarta"
    },
    {
        id: 5,
        nome: "Rosca Direta",
        grupoMuscular: "Bíceps",
        series: "3",
        repeticoes: "12-15",
        dias: ["terca", "sexta"]
    },
    {
        id: 6,
        nome: "Tríceps Testa",
        grupoMuscular: "Tríceps",
        series: "3",
        repeticoes: "12-15",
        dia: "quarta"
    },
    {
        id: 7,
        nome: "Leg Press",
        grupoMuscular: "Pernas",
        series: "4",
        repeticoes: "15-20",
        dia: "quinta"
    },
    {
        id: 8,
        nome: "Prancha",
        grupoMuscular: "Core",
        series: "3",
        repeticoes: "30-60s",
        dias: ["segunda", "quarta", "sexta"] // Exercício para vários dias
    }
];

// Alternativa: Se você não quiser especificar dias nos dados,
// pode criar uma função de mapeamento separada:

export const exerciseDayMapping = {
    segunda: [1, 2, 8], // IDs dos exercícios
    terca: [3, 5],
    quarta: [4, 6, 8],
    quinta: [2, 7],
    sexta: [5, 8],
    sabado: [],
    domingo: []
};