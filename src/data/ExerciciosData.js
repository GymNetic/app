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

const ExerciciosData = [
    { nome: "Musculação / Hipertrofia", slug: "musculacao", link: "/exercicios/musculacao" },
    { nome: "Cardiovascular", slug: "cardio", link: "/exercicios/cardio" },
    { nome: "Emagrecimento / Perda de Gordura", slug: "emagrecimento", link: "/exercicios/emagrecimento" },
    { nome: "Funcional", slug: "funcional", link: "/exercicios/funcional" },
    { nome: "Flexibilidade e Mobilidade", slug: "mobilidade", link: "/exercicios/mobilidade" },
    { nome: "Treino Desportivo / Específico", slug: "desportivo", link: "/exercicios/desportivo" },
    { nome: "Reabilitação / Corretivo", slug: "reabilitacao", link: "/exercicios/reabilitacao" }
];

export default ExerciciosData;