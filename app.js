const express = require('express');
const app = express();
app.use(express.json());

let tareas = [
    { 
        titulo: "Estudiar programacion", 
        descripcion: "Repasar los conceptos", 
        estado: "pendiente", 
        pasos: ["Ver tutorial", "Hacer práctica en código", "Tomar apuntes"] 
    },
    { 
        titulo: "Hacer ejercicio", 
        descripcion: "Rutina de fuerza en el gimnasio", 
        estado: "completada", 
        pasos: ["Calentamiento", "Levantamiento de pesas", "Estiramiento"] 
    }
];

app.get('/tareas', (req, res) => {
    res.status(200).json(tareas);
});

app.get('/tareas/pendientes', (req, res) => {
    const pendientes = tareas.filter(t => t.estado.toLowerCase() === 'pendiente');
    res.status(200).json(pendientes);
});

app.get('/tareas/completadas', (req, res) => {
    const completadas = tareas.filter(t => t.estado.toLowerCase() === 'completada');
    res.status(200).json(completadas);
});

app.get('/tareas/:titulo', (req, res) => {
    const nombreBuscado = req.params.titulo;
    const tarea = tareas.find(t => t.titulo.toLowerCase() === nombreBuscado.toLowerCase());

    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada." });
    }

    res.status(200).json(tarea);
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de tareas corriendo en http://localhost:${PORT}`);
});