import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk, withExtraArment } from 'redux-thunk';
import App from './App';
import tareasReducer from './reducers/tareasReducer';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// Aplica redux-thunk como middleware al crear el store
const store = createStore(tareasReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// Reporta los web vitals
reportWebVitals();