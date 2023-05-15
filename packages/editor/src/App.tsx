import './App.css';
import '@axonivy/editor-icons/src-gen/ivy-icons.css';
import { ElementData, InscriptionData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { useCallback, useEffect, useState } from 'react';
import { DataContextInstance, DEFAULT_EDITOR_CONTEXT, EditorContextInstance, useClient, useTheme } from './context';
import { inscriptionEditor } from './components/editors/InscriptionEditor';
import AppStateView from './AppStateView';
import { AppState, errorState, successState, waitingState } from './app-state';
import { UpdateConsumer } from './types/lambda';

export interface AppProps {
  pid: string;
}

function App(props: AppProps) {
  const [data, setData] = useState<ElementData>({} as ElementData);
  const [shouldSave, setShouldSave] = useState(false);
  const [appState, setAppState] = useState<AppState>(waitingState());
  const [validation, setValidation] = useState<InscriptionValidation[]>([]);
  const client = useClient();
  const theme = useTheme();

  const initData = useCallback((newData: InscriptionData) => {
    setAppState(successState(newData));
    setData(newData.data);
  }, []);

  const updateData = useCallback<UpdateConsumer<ElementData>>(update => {
    setData(update);
    setShouldSave(true);
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
    if (appState.state === 'success' && shouldSave) {
      client
        .saveData({
          data,
          pid: appState.initialData.pid,
          type: appState.initialData.type.id
        })
        .then(setValidation);
      setShouldSave(false);
    }
  }, [client, data, appState, shouldSave]);

  if (appState.state === 'success') {
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
            value={{
              data,
              setData: updateData,
              defaultData: appState.initialData.defaults,
              initData: appState.initialData.data,
              validation
            }}
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
