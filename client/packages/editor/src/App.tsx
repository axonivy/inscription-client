import set from 'lodash/fp/set';

import { InscriptionData, InscriptionType, InscriptionValidation } from '@axonivy/inscription-core';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import '../style/App.css';
import UserDialogEditor from './components/editors/UserDialogEditor';
import UserTaskEditor from './components/editors/UserTaskEditor';
import { DataContextInstance, useClient } from './context';

export interface AppState {
  state: 'waiting' | 'success' | 'error';
  initialData: InscriptionData | null;
  error: string | null;
}

export function waiting(): AppState {
  return { state: 'waiting', initialData: null, error: null };
}

export function error(error: string): AppState {
  return { state: 'error', initialData: null, error };
}

export function success(initialData: InscriptionData): AppState {
  return { state: 'success', initialData, error: null };
}

export interface AppProps {
  pid: string;
}

function App(props: AppProps) {
  const [data, setData] = useState<any>();
  const [appState, setAppState] = useState<AppState>(waiting());
  const [validation, setValidation] = useState<InscriptionValidation[]>([]);
  const client = useClient();

  useEffect(() => {
    client
      .data(props.pid)
      .then(data => {
        setAppState(success(data));
        setData(data.data);
      })
      .catch(error => error(error));
  }, [client, props.pid]);

  useEffect(() => {
    //Fix: first load shouldn't trigger a save
    if (appState.initialData) {
      client
        .saveData({ data: data, pid: appState.initialData.pid, type: appState.initialData.type })
        .then(validation => setValidation(validation));
    }
  }, [client, data, appState]);

  const updateData = <T,>(path: string | string[], value: T): void => {
    // we know this function is always called on success when data is available
    setData((prev: any) => set(path, value, prev!));
  };

  const dataContext = useMemo(() => {
    return { data: data, initialData: appState.initialData?.data, updateData, validation: validation };
  }, [appState.initialData, data, validation]);

  if (appState.state === 'waiting') {
    return <div>Loading...</div>;
  }
  if (appState.state === 'error') {
    return <div>Error: {appState.error}</div>;
  }

  return (
    <div className='App-header'>
      <DataContextInstance.Provider value={dataContext}>{inscriptionEditor(appState.initialData?.type)}</DataContextInstance.Provider>
    </div>
  );
}

const inscriptionEditor = (type?: InscriptionType): ReactNode => {
  switch (type) {
    case 'UserDialog':
      return <UserDialogEditor />;
    case 'UserTask':
      return <UserTaskEditor />;
    default:
      return <div>No Editor found for type: {type}</div>;
  }
};

export default App;
