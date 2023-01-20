import './App.css';
import '@axonivy/editor-icons/dist/ivy-icons.css';
import { Data, InscriptionData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { useCallback, useEffect, useState } from 'react';
import { DataContextInstance, DEFAULT_EDITOR_CONTEXT, EditorContextInstance, useClient, useTheme } from './context';
import { inscriptionEditor } from './components/editors/InscriptionEditor';
import AppStateView from './AppStateView';
import { AppState, errorState, successState, waitingState } from './app-state';
import { deepEqual } from './utils/equals';

export interface AppProps {
  pid: string;
}

function App(props: AppProps) {
  const [data, setData] = useState<Data>();
  const [appState, setAppState] = useState<AppState>(waitingState());
  const [validation, setValidation] = useState<InscriptionValidation[]>([]);
  const client = useClient();
  const theme = useTheme();

  const initData = useCallback((newData: InscriptionData) => {
    setAppState(successState(newData));
    setData(newData.data);
  }, []);

  useEffect(() => {
    const validationDispose = client.onValidation(setValidation);
    const dataDispose = client.onDataChanged(initData);
    return () => {
      validationDispose.dispose();
      dataDispose.dispose();
    };
  }, [client, initData]);

  useEffect(() => {
    client
      .data(props.pid)
      .then(initData)
      .catch(error => setAppState(errorState(error)));
  }, [client, props.pid, initData]);

  useEffect(() => {
    if (appState.state === 'success' && data && !deepEqual(data, appState.initialData.data)) {
      client.saveData({ data: data, pid: appState.initialData.pid, type: appState.initialData.type.id }).then(setValidation);
    }
  }, [client, data, appState]);

  if (appState.state === 'success' && data) {
    return (
      <div className='editor-root' data-theme={theme}>
        <EditorContextInstance.Provider
          value={{
            pid: props.pid,
            readonly: appState.initialData.readonly ?? DEFAULT_EDITOR_CONTEXT.readonly,
            type: appState.initialData.type ?? DEFAULT_EDITOR_CONTEXT.type
          }}
        >
          <DataContextInstance.Provider
            value={{ data: data, initialData: appState.initialData.data, setData: setData, validation: validation }}
          >
            {inscriptionEditor(appState.initialData.type.id)}
          </DataContextInstance.Provider>
        </EditorContextInstance.Provider>
      </div>
    );
  }

  return <AppStateView {...appState} />;
}

export default App;
