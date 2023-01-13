import React, { useContext } from 'react';

export type ThemeContext = 'dark' | 'light';

export const ThemeContextInstance = React.createContext<ThemeContext>('light');
export const useTheme = (): ThemeContext => useContext(ThemeContextInstance);
