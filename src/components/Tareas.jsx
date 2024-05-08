import React, { useEffect , useState} from 'react';
import { Modal, Button, Form, Alert  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cargarTareas, agregarTarea} from '../actions/tareasActions';

import TareasTable from './TareasTable';

const Tareas = () => {
  const dispatch = useDispatch();
  const tareas = useSelector((state) => state.tareas);
  useEffect(() => {
    dispatch(cargarTareas());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [campoVacio, setCampoVacio] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCampoVacio(false);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
    setCampoVacio(false);
  };

  const handleAgregarTarea = () => {
    if (descripcion.trim() !== '') {
        dispatch(agregarTarea(descripcion));
        handleModalClose();
      } else {
        setCampoVacio(true);
      }
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <button className="btn btn-success" onClick={handleModalShow}>Crear Tarea</button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descripcion}
              onChange={handleDescripcionChange}
            /><br/>{campoVacio && <Alert variant="danger">El campo de descripción no puede estar vacío.</Alert>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAgregarTarea}>
            Agregar Tarea
          </Button>
        </Modal.Footer>
      </Modal>
      <TareasTable tareas={tareas} />
    </div>
  );
};

export default Tareas;