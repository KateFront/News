import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { initializeAPI } from './api';
import './common.css';
import AuthContextProvider from './features/auth/AuthContextProvider';

const firebaseApp = initializeAPI();

const container: HTMLElement | null = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <AuthContextProvider firebaseApp={firebaseApp}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
