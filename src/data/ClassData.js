// Keep track of recently used images
let recentImages = [];

// Function to get random image number between 1-9 without recent repeats
const getRandomImage = () => {
    const totalImages = 9;
    const maxRecent = 3; // How many recent images to track

    // Generate array of available numbers (1-9)
    let available = Array.from({length: totalImages}, (_, i) => i + 1);

    // Remove recently used images from available options
    available = available.filter(num => !recentImages.includes(num));

    // If we've filtered out all options, reset and use any number
    if (available.length === 0) {
        available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    // Get random number from available options
    const randomIndex = Math.floor(Math.random() * available.length);
    const selectedNumber = available[randomIndex];

    // Update recent images
    recentImages.push(selectedNumber);
    if (recentImages.length > maxRecent) {
        recentImages.shift(); // Remove oldest image
    }

    return `/Imgs/classes/${selectedNumber}.jpg`;
};

const ClassData = [
    {
        id: 1,
        title: "Yoga",
        description: "Aumente sua flexibilidade e equilíbrio",
        image: getRandomImage(),
        instructor: "Maria Silva",
        duration: "50 min",
        level: "Iniciante",
        room: "Sala 1"
    },
    {
        id: 2,
        title: "CrossFit",
        description: "Treino de alta intensidade",
        image: getRandomImage(),
        instructor: "João Santos",
        duration: "45 min",
        level: "Avançado",
        room: "Sala 2"
    },
    {
        id: 3,
        title: "Spinning",
        description: "Cardio intenso com música",
        image: getRandomImage(),
        instructor: "Carlos Santos",
        duration: "45 min",
        level: "Avançado",
        room: "Sala 4"
    },
    {
        id: 4,
        title: "Pilates",
        description: "Fortaleça seu core",
        image: getRandomImage(),
        instructor: "Pedro Lima",
        duration: "50 min",
        level: "Intermediário",
        room: "Sala 3"
    },
    {
        id: 5,
        title: "Zumba",
        description: "Dança e diversão",
        image: getRandomImage(),
        instructor: "Ana Costa",
        duration: "55 min",
        level: "Todos os níveis",
        room: "Sala 1"
    },
    {
        id: 6,
        title: "Body Pump",
        description: "Musculação em grupo",
        image: getRandomImage(),
        instructor: "Ana Paula",
        duration: "60 min",
        level: "Todos os níveis",
        room: "Sala 2"
    },
    {
        id: 7,
        title: "HIIT",
        description: "Treino rápido e eficaz para queimar gordura",
        image: getRandomImage(),
        instructor: "Ricardo Alves",
        duration: "30 min",
        level: "Intermediário",
        room: "Sala 3"
    },
    {
        id: 8,
        title: "Alongamento",
        description: "Relaxe os músculos e melhore sua postura",
        image: getRandomImage(),
        instructor: "Sofia Ribeiro",
        duration: "40 min",
        level: "Todos os níveis",
        room: "Sala 1"
    },
    {
        id: 9,
        title: "Step",
        description: "Cardio com movimentos coreografados",
        image: getRandomImage(),
        instructor: "Tiago Mendes",
        duration: "50 min",
        level: "Intermediário",
        room: "Sala 2"
    },
    {
        id: 10,
        title: "Kickboxing",
        description: "Treino de defesa pessoal e resistência",
        image: getRandomImage(),
        instructor: "Fernando Lopes",
        duration: "60 min",
        level: "Avançado",
        room: "Sala 4"
    },
    {
        id: 11,
        title: "Funcional",
        description: "Treino completo com movimentos naturais",
        image: getRandomImage(),
        instructor: "Daniela Nunes",
        duration: "45 min",
        level: "Todos os níveis",
        room: "Sala 3"
    },
    {
        id: 12,
        title: "Dance Mix",
        description: "Dança com diferentes estilos musicais",
        image: getRandomImage(),
        instructor: "Beatriz Lopes",
        duration: "50 min",
        level: "Iniciante",
        room: "Sala 1"
    }
];

export default ClassData;