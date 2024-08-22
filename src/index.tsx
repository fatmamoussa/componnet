import React from 'react';
import ReactDOM from 'react-dom/client';
import Formulaire from './Formulaire'; // Assurez-vous que le fichier 'Formulaire.tsx' existe dans le même répertoire
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root') as HTMLElement; // Assertion de type pour garantir que 'root' est un élément HTML
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Formulaire />
  </React.StrictMode>
);
