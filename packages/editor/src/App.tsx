import './App.css';
import '@axonivy/editor-icons/src-gen/ivy-icons.css';
import { ElementData, InscriptionContext, InscriptionData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DataContextInstance, DEFAULT_EDITOR_CONTEXT, EditorContextInstance, useClient, useTheme } from './context';
import { inscriptionEditor } from './components/editors/InscriptionEditor';
import AppStateView from './AppStateView';
import { AppState, errorState, successState, waitingState } from './app-state';
import { UpdateConsumer } from './types/lambda';

function App(props: InscriptionContext) {
  const [data, setData] = useState<ElementData>({} as ElementData);
  const [shouldSave, setShouldSave] = useState(false);
  const [appState, setAppState] = useState<AppState>(waitingState());
  const [validations, setValidations] = useState<InscriptionValidation[]>([]);
  const client = useClient();
  const { mode: theme } = useTheme();

  const initData = useCallback((newData: InscriptionData) => {
    setAppState(successState(newData));
    setData(newData.data);
  }, []);

  const updateData = useCallback<UpdateConsumer<ElementData>>(update => {
    setData(update);
    setShouldSave(true);
  }, []);

  useEffect(() => {
    const validationDispose = client.onValidation(setValidations);
    const dataDispose = client.onDataChanged(initData);
    return () => {
      validationDispose.dispose();
      dataDispose.dispose();
    };
  }, [client, initData]);

  useEffect(() => {
    client
      .data(props)
      .then(initData)
      .catch(error => setAppState(errorState(error)));
    client.validate(props).then(setValidations).catch(console.error);
  }, [client, props, initData]);

  useEffect(() => {
    if (appState.state === 'success' && shouldSave) {
      client
        .saveData({
          data,
          context: appState.initialData.context
        })
        .then(setValidations);
      setShouldSave(false);
    }
  }, [client, data, appState, shouldSave]);

  const editorRef = useRef(null);

  if (appState.state === 'success') {
    return (
      <div ref={editorRef} className='editor-root' data-theme={theme}>
        <EditorContextInstance.Provider
          value={{
            context: appState.initialData.context,
            readonly: appState.initialData.readonly ?? DEFAULT_EDITOR_CONTEXT.readonly,
            editorRef,
            type: appState.initialData.type ?? DEFAULT_EDITOR_CONTEXT.type
          }}
        >
          <DataContextInstance.Provider
            value={{
              data,
              setData: updateData,
              defaultData: appState.initialData.defaults,
              initData: appState.initialData.data,
              validations
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
