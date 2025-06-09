// nutricaoData.js - Exemplo de como estruturar os dados

export const nutricaoData = [
    // Café da manhã - todos os dias
    {
        id: 1,
        refeicao: "Café da Manhã",
        horario: "07:00",
        alimentos: [
            "2 fatias de pão integral",
            "1 ovo mexido",
            "1 banana",
            "1 copo de leite desnatado"
        ],
        calorias: "350",
        dias: ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]
    },

    // Lanche da manhã - dias úteis
    {
        id: 2,
        refeicao: "Lanche da Manhã",
        horario: "10:00",
        alimentos: [
            "1 iogurte natural",
            "1 punhado de castanhas"
        ],
        calorias: "180",
        dias: ["segunda", "terca", "quarta", "quinta", "sexta"]
    },

    // Almoço - Segunda
    {
        id: 3,
        refeicao: "Almoço",
        horario: "12:30",
        alimentos: [
            "150g de peito de frango grelhado",
            "1 xícara de arroz integral",
            "1 porção de brócolis refogado",
            "Salada de folhas verdes"
        ],
        calorias: "520",
        dia: "segunda"
    },

    // Almoço - Terça
    {
        id: 4,
        refeicao: "Almoço",
        horario: "12:30",
        alimentos: [
            "150g de salmão grelhado",
            "1 batata doce média",
            "Aspargos grelhados",
            "Salada mista"
        ],
        calorias: "480",
        dia: "terca"
    },

    // Almoço - Quarta
    {
        id: 5,
        refeicao: "Almoço",
        horario: "12:30",
        alimentos: [
            "150g de carne vermelha magra",
            "1 xícara de quinoa",
            "Abobrinha refogada",
            "Salada de tomate e pepino"
        ],
        calorias: "550",
        dia: "quarta"
    },

    // Lanche da tarde - todos os dias
    {
        id: 6,
        refeicao: "Lanche da Tarde",
        horario: "15:30",
        alimentos: [
            "1 maçã",
            "2 colheres de pasta de amendoim integral"
        ],
        calorias: "220",
        dias: ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]
    },

    // Jantar - Segunda
    {
        id: 7,
        refeicao: "Jantar",
        horario: "19:00",
        alimentos: [
            "1 omelete com 2 ovos",
            "Salada de rúcula e tomate cereja",
            "1 fatia de pão integral"
        ],
        calorias: "320",
        dia: "segunda"
    },

    // Jantar - Terça
    {
        id: 8,
        refeicao: "Jantar",
        horario: "19:00",
        alimentos: [
            "150g de tilápia assada",
            "Legumes no vapor",
            "1 xícara de arroz integral"
        ],
        calorias: "380",
        dia: "terca"
    },

    // Ceia - fins de semana
    {
        id: 9,
        refeicao: "Ceia",
        horario: "21:30",
        alimentos: [
            "1 copo de leite morno",
            "2 biscoitos integrais"
        ],
        calorias: "150",
        dias: ["sabado", "domingo"]
    },

    // Pós-treino - dias de treino
    {
        id: 10,
        refeicao: "Pós-Treino",
        horario: "Após o treino",
        alimentos: [
            "1 shake de whey protein",
            "1 banana"
        ],
        calorias: "200",
        dias: ["segunda", "quarta", "sexta"]
    }
];

// Alternativa: Mapeamento por dia se preferir
export const nutricaoDayMapping = {
    segunda: [1, 2, 3, 6, 7, 10],
    terca: [1, 2, 4, 6, 8],
    quarta: [1, 2, 5, 6, 10],
    quinta: [1, 2, 6],
    sexta: [1, 2, 6, 10],
    sabado: [1, 6, 9],
    domingo: [1, 6, 9]
};