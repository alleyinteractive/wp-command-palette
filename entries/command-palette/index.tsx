import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

// Create a root from a new div appended to the document body
const root = createRoot(document.body.appendChild(document.createElement('div')));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
