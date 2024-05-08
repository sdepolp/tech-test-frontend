import React from 'react';
import { createStore } from 'redux';
import tareasReducer from './reducers/tareasReducer';
import Tareas from './components/Tareas';
const store = createStore(tareasReducer);


const App = () => {
  return (
    // Envolver la aplicación con el Provider para proveer el store de Redux a todos los componentes
    <div className='container'>
      <h1>Tech Test Coopeuch Full Stack</h1>
      <Tareas />
    </div>
  );
};

export default App;
