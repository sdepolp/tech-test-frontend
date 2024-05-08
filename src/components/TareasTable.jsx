import React, {useState} from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { eliminarTarea, modificarTarea } from '../actions/tareasActions';


const TareasTable = () => {
  const dispatch = useDispatch();

  const tareas = useSelector(state => state.tareas);


  const [showModalModificar, setShowModalModificar] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [vigente, setVigente] = useState(true);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [campoVacio, setCampoVacio] = useState(false);

  const handleModalModificarShow = (tarea) => {
    setTareaSeleccionada(tarea);
    setDescripcion(tarea.descripcion);
    setVigente(tarea.vigente);
    setShowModalModificar(true);
  };

  const handleModalModificarClose = () => {
    setTareaSeleccionada(null);
    setDescripcion('');
    setShowModalModificar(false);
    setCampoVacio(false);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
    setCampoVacio(false);
  };

  const handleModificarTarea = () => {
    if (tareaSeleccionada && descripcion.trim() !== '' ) {
      const nuevaTarea = { ...tareaSeleccionada, descripcion, vigente };
      dispatch(modificarTarea(nuevaTarea));
      handleModalModificarClose();
    }else{
        setCampoVacio(true);
    }
  };

  const handleVigenteChange = (event) => {
    setVigente(event.target.checked);
  };

  const handleEliminarTarea = (idTarea) => {
    dispatch(eliminarTarea(idTarea));
  };

  return (
    <div>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Fecha de Creación</th>
                <th>Vigente</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tareas.map((tarea) => (
                <tr key={tarea.id}>
                    <td>{tarea.id}</td>
                    <td>{tarea.descripcion}</td>
                    <td>{tarea.fechaCreacion}</td>
                    <td>{tarea.vigente ? 'Sí' : 'No'}</td>
                    <td>
                    <button className="btn btn-primary" onClick={() => handleModalModificarShow(tarea)}>Modificar</button>
                    <button
                        className="btn btn-danger btnEliminar"
                        onClick={() => handleEliminarTarea(tarea.id)}
                    >Eliminar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        <Modal show={showModalModificar} onHide={handleModalModificarClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descripcion}
              onChange={handleDescripcionChange}
            />
          </Form.Group>
          <Form.Group controlId="vigente">
            <Form.Check
              type="checkbox"
              label="Vigente"
              checked={vigente}
              onChange={handleVigenteChange}
            />
            <br/>{campoVacio && <Alert variant="danger">El campo de descripción no puede estar vacío.</Alert>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalModificarClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleModificarTarea}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};

export default TareasTable;