const initialState = {
    tareas: [],
  };
  
  const tareasReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CARGAR_TAREAS':
        return {
          ...state,
          tareas: action.payload,
        };
  
      case 'AGREGAR_TAREA':
        return {
          ...state,
          tareas: [...state.tareas, action.payload],
        };
  
      case 'MODIFICAR_TAREA':
        return {
          ...state,
          tareas: state.tareas.map((tarea) =>
            tarea.id === action.payload.id ? action.payload : tarea
          ),
        };
  
      case 'ELIMINAR_TAREA':
        return {
          ...state,
          tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default tareasReducer;