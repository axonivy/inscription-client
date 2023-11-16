import './App.css';
import '@axonivy/editor-icons/src-gen/ivy-icons.css';
import type { ElementData, InscriptionData, InscriptionElementContext, InscriptionValidation } from '@axonivy/inscription-protocol';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DataContextInstance, DEFAULT_EDITOR_CONTEXT, EditorContextInstance, useClient, useTheme } from './context';
import { inscriptionEditor } from './components/editors/InscriptionEditor';
import AppStateView from './AppStateView';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Unary } from './types/lambda';

function App(props: InscriptionElementContext) {
  const [context, setContext] = useState(props);
  const [initData, setInitData] = useState<Record<string, ElementData>>({});
  useEffect(() => {
    setContext(props);
  }, [props]);

  const client = useClient();
  const queryClient = useQueryClient();
  const { mode: theme } = useTheme();
  const editorRef = useRef(null);

  const queryKeys = useMemo(() => {
    return {
      data: () => ['data', context],
      saveData: () => ['saveData', context],
      validation: () => ['validations', context]
    };
  }, [context]);

  useEffect(() => {
    const validationDispose = client.onValidation(() => queryClient.invalidateQueries({ queryKey: queryKeys.validation() }));
    const dataDispose = client.onDataChanged(() => queryClient.invalidateQueries({ queryKey: queryKeys.data() }));
    return () => {
      validationDispose.dispose();
      dataDispose.dispose();
    };
  }, [client, context, queryClient, queryKeys]);

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: queryKeys.data(),
    queryFn: () => client.data(context),
    structuralSharing: false
  });

  useEffect(() => {
    if (isSuccess && !initData[context.pid]) {
      setInitData(initData => {
        initData[context.pid] = data.data;
        return initData;
      });
    }
  }, [context.pid, data, initData, isSuccess]);

  const { data: validations } = useQuery({
    queryKey: queryKeys.validation(),
    queryFn: () => client.validate(context),
    initialData: [],
    enabled: isSuccess
  });

  const mutation = useMutation({
    mutationKey: queryKeys.saveData(),
    mutationFn: (updateData: Unary<ElementData>) => {
      const saveData = queryClient.setQueryData<InscriptionData>(queryKeys.data(), prevData => {
        if (prevData) {
          return { ...prevData, data: updateData(prevData.data) };
        }
        return undefined;
      });
      if (saveData) {
        return client.saveData(saveData);
      }
      return Promise.resolve([]);
    },
    onSuccess: (data: InscriptionValidation[]) => queryClient.setQueryData(queryKeys.validation(), data)
  });

  if (isPending) {
    return <AppStateView>Loading...</AppStateView>;
  }

  if (isError) {
    return <AppStateView>{'An error has occurred: ' + error}</AppStateView>;
  }

  return (
    <div ref={editorRef} className='editor-root' data-theme={theme}>
      <EditorContextInstance.Provider
        value={{
          context,
          readonly: data.readonly ?? DEFAULT_EDITOR_CONTEXT.readonly,
          editorRef,
          type: data.type ?? DEFAULT_EDITOR_CONTEXT.type
        }}
      >
        <DataContextInstance.Provider
          value={{
            data: data.data,
            setData: mutation.mutate,
            defaultData: data.defaults,
            initData: initData[context.pid] ?? data.data,
            validations
          }}
        >
          {inscriptionEditor(data.type.id)}
        </DataContextInstance.Provider>
      </EditorContextInstance.Provider>
    </div>
  );
}

export default App;
