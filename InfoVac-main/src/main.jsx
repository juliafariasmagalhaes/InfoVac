import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './styles/index.css';

// Teste simples para verificar se o React está funcionando
const root = document.getElementById('root');
if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  } catch (error) {
  }
} 