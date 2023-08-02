import './index.css';
import { MonacoUtil } from '@axonivy/inscription-core';
import { App, ClientContextInstance, MonacoEditorUtil, ThemeContextProvider } from '@axonivy/inscription-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { URLParams } from './url-helper';
import { ElementType } from '@axonivy/inscription-protocol';
import { InscriptionClientMock } from './mock/inscription-client-mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export async function start(): Promise<void> {
  const theme = URLParams.themeMode();
  const readonly = URLParams.parameter('readonly') ? true : false;
  const type = (URLParams.parameter('type') as ElementType) ?? undefined;

  MonacoEditorUtil.initMonaco(monaco, theme);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  const inscriptionClient = new InscriptionClientMock(readonly, type);
  const queryClient = new QueryClient();

  root.render(
    <React.StrictMode>
      <ThemeContextProvider theme={theme}>
        <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
          <QueryClientProvider client={queryClient}>
            <App app='' pmv='' pid={'1'} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ClientContextInstance.Provider>
      </ThemeContextProvider>
    </React.StrictMode>
  );
}

start();
