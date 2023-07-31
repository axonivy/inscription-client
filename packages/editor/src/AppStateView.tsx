import { ReactNode } from 'react';
import './App.css';
import { useTheme } from './context/useTheme';

function AppStateView({ children }: { children: ReactNode }) {
  const { mode: theme } = useTheme();
  return (
    <div className='editor-root editor-state' data-theme={theme}>
      {children}
    </div>
  );
}

export default AppStateView;
