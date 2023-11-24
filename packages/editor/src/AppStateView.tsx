import type { ReactNode } from 'react';
import './App.js';
import { useTheme } from './context/useTheme.js';

function AppStateView({ children }: { children: ReactNode }) {
  const { mode: theme } = useTheme();
  return (
    <div className='editor-root editor-state' data-theme={theme}>
      {children}
    </div>
  );
}

export default AppStateView;
