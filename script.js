document.addEventListener('DOMContentLoaded', function() {
    const CONTRASENA = "64-byts";
    let modoDificil = false;
    let puntaje = 0;
    let timer;
    const preguntas = {
        // Preguntas y opciones para el modo fácil
        "¿Cómo se llama el tren que lleva a los estudiantes al Colegio Hogwarts de Magia y Hechicería?": {
            "a) El Expreso de Hogwarts": "correcto",
            "b) El Autobús Noctámbulo": "incorrecto",
            "c) La Carreta de Hagrid": "incorrecto"
        },
        "¿Cuál es el nombre completo del personaje interpretado por Richard Harris en la película?": {
            "a) Albus Dumbledore": "correcto",
            "b) Severus Snape": "incorrecto",
            "c) Gellert Grindelwald": "incorrecto"
        },
        "¿Qué tipo de dragón tiene Hagrid en el primer libro/película?": {
            "a) Un dragón noruego de sangre fría": "correcto",
            "b) Un dragón húngaro": "incorrecto",
            "c) Un dragón chino de fuego": "incorrecto"
        },
        // Preguntas difíciles
        "¿Quién creó la Piedra Filosofal?": {
            "a) Aberforth Dumbledore": "incorrecto",
            "b) Gellert Grindelwald": "incorrecto",
            "c) Nicolas Flamel": "correcto",
            "d) Horace Slughorn": "incorrecto"
        }
    };

    // Elementos del DOM
    const textArea = document.getElementById('textArea');
    const inputField = document.getElementById('inputField');
    const submitButton = document.getElementById('submitButton');
    const playButton = document.getElementById('playButton');
    const modeButton = document.getElementById('modeButton');
    const calculatorButton = document.getElementById('calculatorButton');
    const leaderboardButton = document.getElementById('leaderboardButton');
    const exitButton = document.getElementById('exitButton');
    const ratingField = document.getElementById('ratingField');
    const feedbackField = document.getElementById('feedbackField');
    const saveButton = document.getElementById('saveButton');

    // Inicializar
    function mostrarPantallaInicio() {
        textArea.textContent = "Introduce la contraseña para acceder al asistente:";
        inputField.style.display = 'block';
        submitButton.style.display = 'block';
        playButton.style.display = 'none';
        modeButton.style.display = 'none';
        calculatorButton.style.display = 'none';
        leaderboardButton.style.display = 'none';
        ratingField.style.display = 'none';
        feedbackField.style.display = 'none';
        saveButton.style.display = 'none';
    }

    function procesarEntrada() {
        const entrada = inputField.value.trim();
        if (entrada === CONTRASENA) {
            textArea.textContent = "¡Contraseña correcta! ¿En qué puedo ayudarte hoy?\n\nEscribe 'jugar' para empezar el mini juego.";
            inputField.value = '';
            playButton.style.display = 'inline-block';
            modeButton.style.display = 'inline-block';
            calculatorButton.style.display = 'inline-block';
            leaderboardButton.style.display = 'inline-block';
        } else if (entrada.toLowerCase() === 'jugar') {
            jugarMiniJuego();
        } else {
            responderPregunta(entrada);
        }
    }

    function responderPregunta(pregunta) {
        if (pregunta.toLowerCase().includes("nombre")) {
            textArea.textContent = "Soy Sabrina.";
        } else if (pregunta.toLowerCase().includes("creador")) {
            textArea.textContent = "Mi creador es 64-byts.";
        } else if (pregunta.toLowerCase().includes("hora") || pregunta.toLowerCase().includes("fecha")) {
            const now = new Date();
            textArea.textContent = `La fecha y la hora actual son: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        } else {
            textArea.textContent = "Lo siento, no entiendo la pregunta.";
        }
    }

    function jugarMiniJuego() {
        textArea.textContent = "¡Bienvenido al mini juego! Responde las preguntas para ganar puntos.\n\nEl juego comenzará en breve...";
        inputField.value = '';
        playButton.style.display = 'none';
        modeButton.style.display = 'none';
        calculatorButton.style.display = 'none';
        leaderboardButton.style.display = 'none';
        ratingField.style.display = 'none';
        feedbackField.style.display = 'none';
        saveButton.style.display = 'none';

        puntaje = 0;
        textArea.textContent = "¡Bienvenido, Jugador!\n\nEl juego comenzará en breve...";

        // Iniciar el temporizador
        let secondsElapsed = 0;
        timer = setInterval(() => secondsElapsed++, 1000);

        // Mostrar la primera pregunta
        mostrarPregunta();
    }

    function mostrarPregunta() {
        const preguntasList = Object.keys(preguntas);
        const pregunta = preguntasList[Math.floor(Math.random() * preguntasList.length)];
        const opciones = preguntas[pregunta];

        let preguntaTexto = pregunta + "\n\n";
        for (const [opcion, resultado] of Object.entries(opciones)) {
            preguntaTexto += opcion + "\n";
        }
        textArea.textContent = preguntaTexto;

        submitButton.onclick = () => verificarRespuesta(opciones);
    }

    function verificarRespuesta(opciones) {
        const respuesta = inputField.value.trim();
        const resultado = opciones[respuesta];

        if (resultado === "correcto") {
            puntaje++;
            textArea.textContent += "\n¡Respuesta correcta!";
        } else {
            textArea.textContent += "\nRespuesta incorrecta.";
        }

        inputField.value = '';
        mostrarPregunta();
    }

    function cambiarModo() {
        modoDificil = !modoDificil;
        modeButton.textContent = modoDificil ? "Modo Fácil" : "Modo Difícil";
        textArea.textContent = `Modo cambiado a ${modoDificil ? "difícil" : "fácil"}.`;
    }

    function abrirCalculadora() {
        window.open('https://www.google.com/search?q=calculadora', '_blank');
    }

    function mostrarClasificacion() {
        textArea.textContent = "Clasificación no disponible.";
    }

    function guardarResultados() {
        const ratingText = ratingField.value.trim();
        const feedback = feedbackField.value.trim();
        const rating = parseInt(ratingText);

        if (isNaN(rating) || rating < 1 || rating > 10) {
            alert("La clasificación debe ser un número entre 1 y 10.");
            return;
        }

        const resultado = `Nombre: ${rating} - Puntaje: ${puntaje} - Feedback: ${feedback}`;
        textArea.textContent = `Resultados guardados: ${resultado}`;
    }

    submitButton.addEventListener('click', procesarEntrada);
    playButton.addEventListener('click', jugarMiniJuego);
    modeButton.addEventListener('click', cambiarModo);
    calculatorButton.addEventListener('click', abrirCalculadora);
    leaderboardButton.addEventListener('click', mostrarClasificacion);
    saveButton.addEventListener('click', guardarResultados);
    exitButton.addEventListener('click', () => window.close());

    mostrarPantallaInicio();
});
