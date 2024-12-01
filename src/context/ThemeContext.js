import React, { createContext, useState, useContext } from 'react';

const defaultTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    card: '#F2F2F2',
    border: '#E5E5E5',
    error: '#FF3B30',
    success: '#34C759'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 24,
      fontWeight: '600'
    },
    body: {
      fontSize: 16
    },
    caption: {
      fontSize: 14,
      color: '#666666'
    }
  }
};

const ThemeContext = createContext(defaultTheme);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme(currentTheme => ({
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        background: currentTheme.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
        text: currentTheme.colors.text === '#000000' ? '#FFFFFF' : '#000000'
      }
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
