import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Switch, FormControlLabel, Box } from '@mui/material';
import Weather from './components/Weather';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Citirea preferinței utilizatorului pentru dark mode din sistem
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(userPrefersDark);
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked); // Actualizează starea temei când utilizatorul schimbă setarea
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', // Schimbă tema în funcție de preferința utilizatorului
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica tema la întreaga aplicație */}
      
      {/* Plasăm butonul de schimbare a temei într-un Box pentru a-l face vizibil */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleThemeChange} />}
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />
      </Box>

      <Weather /> {/* Componentele aplicației tale */}
    </ThemeProvider>
  );
};

export default App;
