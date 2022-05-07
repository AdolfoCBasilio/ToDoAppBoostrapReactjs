import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState('');
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [identificador, setId] = React.useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('elemento vacio');
      return;
    }
    console.log(tarea);
    setTareas([
      ...tareas,
      { id: shortid.generate(), nombreTarea: tarea }
    ])
    setTarea('');
  }

  const eliminarTarea = (id) => {
    console.log(id);
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = (item) => {
    console.log(item)
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  }

  const editaTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('elemento vacio');
      return;
    }
    const arrayEditado = tareas.map(
      item => item.id === identificador ? { id: identificador, nombreTarea: tarea } : item
    )
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea('');
    setId('');
  }

  return (
    <div className="container">
      <h1 className="text-center">Tareas por hacer</h1>
      <hr />

      <div className="row">

        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-warning btn-sm float-right mx-2"
                    onClick={() => editar(item)}
                  >Editar</button>
                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminarTarea(item.id)}
                  >Eliminar</button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">{
            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
          }</h4>

          <form onSubmit={modoEdicion ? editaTarea : agregarTarea}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
