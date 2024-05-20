import { useState } from "react";

function Formulario({ funcionRefrescar }) {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/tareas", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.mensaje);
        funcionRefrescar();
      })
      .catch((err) => {
        alert("Error al crear la tarea. Consulte la consola.");
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label htmlFor="nombre" style={styles.label}>Nombre</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        onChange={handleChange}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>Agregar tarea</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "0 auto",
  },
  label: {
    marginBottom: "8px",
  },
  input: {
    marginBottom: "16px",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    transition: "border-color 0.3s ease-in-out", // Agregamos una transición al color del borde
    outline: "none", // Quitamos el borde al enfocar el input
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out", // Agregamos una transición al color del fondo del botón
  },
};

export default Formulario;
