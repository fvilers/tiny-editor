import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'

const app = document.getElementById('app');

if (app != null) {
  ReactDOM.createRoot(app).render(<App/>);
}
