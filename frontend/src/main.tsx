import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importă App.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme'; // Dacă ai un fișier de tema personalizat, îl poți importa aici

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App /> {/* Folosește App.tsx ca aplicația principală */}
    </ThemeProvider>
  </React.StrictMode>
);
