import axios from 'axios';
import { API_URL } from '../config';

export const cargarTareas = () => {
  return (dispatch) => {
    axios.get(API_URL)
      .then((response) => {
        dispatch({ type: 'CARGAR_TAREAS', payload: response.data });
      })
      .catch((error) => {
          console.log(error)
      });
  };
};

export const agregarTarea = (nuevaTarea) => {
    console.log("Nueva tarea:", nuevaTarea);
    const tareaData = {
      descripcion: nuevaTarea
    };
    return (dispatch) => {
      console.log("Consumo AXIOS");
      axios.post(API_URL, tareaData)
        .then((response) => {
          console.log("Respuesta del servidor:", response);
          dispatch({ type: 'AGREGAR_TAREA', payload: response.data });
        })
        .catch((error) => {
          console.error("Error al hacer la solicitud:", error);
        });
    };
};

export const modificarTarea = (tareaModificada) => {
  return (dispatch) => {
    axios.put(`${API_URL}/${tareaModificada.id}`, tareaModificada)
      .then((response) => {
        // Lógica para manejar la respuesta exitosa
        dispatch({ type: 'MODIFICAR_TAREA', payload: response.data });
      })
      .catch((error) => {
        // Lógica para manejar el error
      });
  };
};

export const eliminarTarea = (idTarea) => {
  return (dispatch) => {
    axios.delete(`${API_URL}/${idTarea}`)
      .then((response) => {
        // Lógica para manejar la respuesta exitosa
        dispatch({ type: 'ELIMINAR_TAREA', payload: idTarea });
      })
      .catch((error) => {
        // Lógica para manejar el error
      });
  };
};