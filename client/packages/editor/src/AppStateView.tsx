import { AppState } from './app-state';
import './App.css';
import { useTheme } from './context/useTheme';

function AppStateView(props: AppState) {
  const theme = useTheme();
  return (
    <div className='editor-root editor-state' data-theme={theme}>
      {visualizeState(props.state)}
    </div>
  );
}

function visualizeState(state: AppState): string {
  switch (state.state) {
    case 'waiting':
      return 'Loading...';
    case 'error':
      return `Error: ${state.error}`;
    default:
      return 'Unknown state';
  }
}

export default AppStateView;
