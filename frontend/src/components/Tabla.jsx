function Tabla({ datos, funcionRefrescar }) {
  function handleDelete(tarea) {
    fetch(`http://localhost:3000/api/v1/tareas/${tarea.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.mensaje);
        funcionRefrescar();
      })
      .catch((err) => {
        alert("Error. Consulte la consola.");
        console.log(err);
      });
  }

  function handleUpdate(tarea) {
    const nuevoNombre = prompt("Ingrese el nuevo nombre:", tarea.nombre);

    if (nuevoNombre != null) {
      const tareaActualizada = { ...tarea, nombre: nuevoNombre };

      fetch(`http://localhost:3000/api/v1/tareas/${tarea.id}`, {
        method: "PUT",
        body: JSON.stringify(tareaActualizada),
        headers: new Headers({ "content-type": "application/json" }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert(res.mensaje);
          funcionRefrescar();
        })
        .catch((err) => {
          alert("Error. Consulte la consola.");
          console.log(err);
        });
    }
  }

  function handleCheck(tarea) {
    const tareaActualizada = { ...tarea, completada: !tarea.completada };

    fetch(`http://localhost:3000/api/v1/tareas/${tarea.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaActualizada), // Toggle completada state
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.mensaje);
        funcionRefrescar();
      })
      .catch((err) => {
        alert("Error. Consulte la consola.");
        console.log(err);
      });
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={styles.th}>Nombre</th>
          <th style={styles.th}>Fecha</th>
          <th style={styles.th}>Completada</th>
          <th style={styles.th}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((tarea) => {
          const fechaFormateada = new Date(tarea.fecha);

          return (
            <tr key={tarea.id} style={styles.tr}>
              <td style={styles.td}>{tarea.nombre}</td>
              <td style={styles.td}>{`${fechaFormateada.getDate()}/${
                fechaFormateada.getMonth() + 1
              }/${fechaFormateada.getFullYear()}`}</td>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => handleCheck(tarea)}
                />
              </td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => handleUpdate(tarea)}
                >
                  Actualizar
                </button>
                <button
                  style={styles.button}
                  onClick={() => handleDelete(tarea)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const styles = {
  th: {
    backgroundColor: "none",
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  tr: {
    backgroundColor: "none",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
};

export default Tabla;
