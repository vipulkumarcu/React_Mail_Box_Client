import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { Provider } from 'react-redux';
import Store from './Store/Store';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes';

const root = ReactDOM.createRoot ( document.getElementById ( 'root' ) );

root.render (
  <Provider store = { Store } >
    <RouterProvider router = { routes } />
  </Provider>
);