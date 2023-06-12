import React from 'react';
import { createRoot } from 'react-dom/client';
import './common.css';
import App from './Components/App/App';

const container: HTMLElement | null = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
