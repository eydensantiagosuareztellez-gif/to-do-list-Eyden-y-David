const express = require('express');
const app = express();
app.use(express.json());

let tareas = [
    { 
        titulo: "Estudiar JavaScript", 
        descripcion: "Repasar los conceptos", 
        estado: "pendiente", 
        pasos: ["Ver tutorial", "Hacer práctica en código", "Tomar apuntes"] 
    },
    { 
        titulo: "Hacer ejercicio", 
        descripcion: "Rutina de fuerza en el gimnasio", 
        estado: "completada", 
        pasos: ["Calentamiento", "Levantamiento de pesas", "Estiramiento"] 
    }];


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


app.post('/tareas', (req, res) => {
    console.log("body", req.body);
    tareas.push(req.body);
    res.status(201).json(req.body);
});

app.put('/tareas/:titulo', (req, res) => {
    console.log("body", req.body);
    const taskTitle = String(req.params.titulo);
    const taskIndex = tareas.findIndex(t => t.titulo.toLowerCase() === taskTitle.toLowerCase());

    if (taskIndex !== -1) {
        tareas[taskIndex] = { ...tareas[taskIndex], ...req.body };
        res.status(200).json(tareas[taskIndex]);
    } else {
        console.log("no esta");
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

app.put('/tareas/:titulo/estado', (req, res) => {
    console.log("body recibido:", req.body);
    const taskTitle = String(req.params.titulo);
    const taskIndex = tareas.findIndex(t => t.titulo.toLowerCase() === taskTitle.toLowerCase());

    if (taskIndex !== -1) {
    
        const { estado } = req.body;
        
        if (!estado) {
            console.log("Error: Falta el campo estado.");
            return res.status(400).json({ error: "El campo estado es obligatorio." });
        }
        tareas[taskIndex].estado = estado;
        
        console.log("Estado actualizado con éxito para:", tareas[taskIndex].titulo);
        res.status(200).json({ 
            message: "Estado de la tarea actualizado correctamente", 
            tarea: tareas[taskIndex] 
        });
    } else {
        console.log("no esta");
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

app.delete('/tareas/:titulo', (req, res) => {
    const taskTitle = String(req.params.titulo);
    const taskIndex = tareas.findIndex(t => t.titulo.toLowerCase() === taskTitle.toLowerCase());

    if (taskIndex !== -1) {
       
        const tareaEliminada = tareas.splice(taskIndex, 1);
        console.log("Tarea eliminada exitosamente:", tareaEliminada[0].titulo);
        res.status(200).json({ 
            message: "Tarea eliminada correctamente", 
            tarea: tareaEliminada[0] 
        });
    } else {
        console.log("no esta");
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de tareas corriendo en http://localhost:${PORT}`);
});