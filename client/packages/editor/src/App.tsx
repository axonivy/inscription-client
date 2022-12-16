import set from 'lodash/fp/set';

import { UserDialogData } from '@axonivy/inscription-core';
import { useEffect, useMemo, useState } from 'react';
import '../style/App.css';
import InscriptionEditor from './components/InscriptionEditor';
import { useUserDialogEditor } from './components/props/editor';
import { useClient } from './context/useClient';
import { DataContextInstance } from './context/useData';

export interface AppState {
  state: 'waiting' | 'success' | 'error';
  initialData: UserDialogData | null;
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

export interface AppProps {
  id: number;
}

function App(props: AppProps) {
  const [data, setData] = useState<UserDialogData>();
  const [appState, setAppState] = useState<AppState>(waiting());
  const client = useClient();

  useEffect(() => {
    client
      .userDialog(props.id)
      .then(data => {
        setAppState(success(data));
        setData(data);
      })
      .catch(error => error(error));
  }, [client, props.id]);

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
        <ContextAwareInscriptionEditor />
      </DataContextInstance.Provider>
    </div>
  );
}

const ContextAwareInscriptionEditor = () => {
  const props = useUserDialogEditor();
  return <InscriptionEditor {...props} />;
};

export default App;
