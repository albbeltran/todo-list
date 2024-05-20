const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.use(cors());

const rutaArchivosTareas = `${__dirname}/data.json`;
const tareas = JSON.parse(fs.readFileSync(rutaArchivosTareas));

app.get("/", (req, res) => {
  res.send("En el home");
});

app.get("/api/v1/tareas", (req, res) => {
  res.json({
    estado: "OK",
    mensaje: null,
    data: tareas,
  });
});

app.post("/api/v1/tareas", (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    res.status(400).send("Error, información faltante en la petición.");
    return;
  }

  const tarea = {
    id: uuidv4(),
    nombre: nombre,
    fecha: Date.now(),
    completada: false,
  };

  const nuevasTareas = tareas;
  nuevasTareas.push(tarea);

  fs.writeFile("data.json", JSON.stringify(nuevasTareas), function (err) {
    if (err) {
      return res.status(400).json({
        estado: "ERROR",
        mensaje: "Error al crear la tarea!",
        data: null,
        error: err,
      });
    }

    res.status(201).json({
      estado: "OK",
      mensaje: "Tarea agregada con éxito!",
      data: nuevasTareas,
    });
  });
});

app.delete("/api/v1/tareas/:id", (req, res) => {
  const { id } = req.params;

  if (buscarTarea(id)) {
    const nuevasTareas = tareas.filter((tarea) => {
      return tarea.id !== id;
    });

    fs.writeFile("data.json", JSON.stringify(nuevasTareas), function (err) {
      if (err) {
        return res.status(400).json({
          estado: "ERROR",
          mensaje: "Error al eliminar la tarea!",
          data: null,
          error: err,
        });
      }

      res.status(200).json({
        estado: "OK",
        mensaje: "Tarea eliminada con éxito!",
        data: nuevasTareas,
      });
    });
  } else {
    res.status(400).json({
      estado: "ERROR",
      mensaje: "Tarea no encontrada!",
      data: null,
    });
  }
});

app.put("/api/v1/tareas/:id", (req, res) => {
  const { nombre, completada } = req.body;
  const { id } = req.params;

  if (!nombre || completada === null) {
    res.status(400).send("Error, información faltante en la petición.");
    return;
  }

  if (buscarTarea(id)) {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        const nuevaTarea = {
          id: tarea.id,
          nombre: nombre,
          fecha: tarea.fecha,
          completada: completada,
        };
        return nuevaTarea;
      } else {
        // Si no es el objeto que queremos actualizar, lo dejamos sin cambios
        return tarea;
      }
    });

    fs.writeFile("data.json", JSON.stringify(nuevasTareas), function (err) {
      if (err) {
        return res.status(400).json({
          estado: "ERROR",
          mensaje: "Error al actualizar la tarea!",
          data: null,
          error: err,
        });
      }

      res.status(200).json({
        estado: "OK",
        mensaje: "Tarea actualizada con éxito!",
        data: nuevasTareas,
      });
    });
  } else {
    res.status(400).json({
      estado: "ERROR",
      mensaje: "Tarea no encontrada!",
      data: null,
    });
  }
});

app.get("*", (req, res) => {
  res.send("Ruta no encontrada, 404.");
});

app.listen("3000", () => {
  console.log("Aplicacion escuchando...");
});

function buscarTarea(id) {
  for (const tarea of tareas) {
    if (tarea.id === id) return true;
  }

  return false;
}
