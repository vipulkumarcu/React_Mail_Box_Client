import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './App/Store';

const root = ReactDOM.createRoot ( document.getElementById ( 'root' ) );
root.render
(
  <Provider store = { store }>
    <App />
  </Provider>
=======
import App from './App';

const root = ReactDOM.createRoot ( document.getElementById ( 'root' ) );
root.render (
  <React.StrictMode>
    <App />
  </React.StrictMode>
>>>>>>> 5785655643ce0befb31d0016ff19c262c75c7975
);