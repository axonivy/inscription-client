import set from 'lodash/fp/set';

import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Editor from './components/InscriptionEditor';
import { useUserDialogEditor } from './components/props/editor';
import { UserDialogData } from './data/inscription';
import { useClient } from './useClient';
import { DataContextInstance } from './useData';

export interface AppState {
  state: 'waiting' | 'success' | 'error',
  initialData: UserDialogData | null,
  error: string | null;
}

export function waiting(): AppState {
  return { state: 'waiting', initialData: null, error: null };
}

export function error(error: string): AppState {
  return { state: 'error', initialData: null, error };
}

export function success(initialData: UserDialogData): AppState {
  return { state: 'success', initialData, error: null };
}

function App() {
  const [data, setData] = useState<UserDialogData>();
  const [appState, setAppState] = useState<AppState>(waiting());
  const client = useClient();

  useEffect(() => {
    client.userDialog(1).then(data => {
      setAppState(success(data));
      setData(data);
    }).catch(error => error(error));
  }, [client]);

  const updateData = <T,>(path: string | string[], value: T): void => {
    // we know this function is always called on success when data is available
    setData(prev => set(path, value, prev!));
  };

  const dataContext = useMemo(() => {
    return { data: data!, initialData: appState.initialData!, updateData };
  }, [appState.initialData, data]);

  if (appState.state === 'waiting') {
    return <div>Loading...</div>;
  }
  if (appState.state === 'error') {
    return <div>Error: {appState.error}</div>;
  }
  return (
    <div className='App-header'>
      <DataContextInstance.Provider value={dataContext}>
        <ContextAwareEditor />
      </DataContextInstance.Provider>
    </div>
  );
}

const ContextAwareEditor = () => {
  const props = useUserDialogEditor();
  return <Editor {...props} />
}

export default App;
