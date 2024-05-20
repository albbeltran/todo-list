import { useState, useEffect } from "react";
import "./App.css";

import Formulario from "./components/Formulario";
import Tabla from "./components/Tabla";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => obtenerDatos(), []);

  function obtenerDatos() {
    fetch("http://localhost:3000/api/v1/tareas", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1>ToDo List</h1>
      <Formulario funcionRefrescar={obtenerDatos}></Formulario>
      <br></br>
      <br></br>
      <Tabla datos={data} funcionRefrescar={obtenerDatos} />
    </>
  );
}

export default App;
