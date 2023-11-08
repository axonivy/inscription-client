import './index.css';
import { IvyScriptLanguage, InscriptionClientJsonRpc , MonacoUtil } from '@axonivy/inscription-core';
import {
  App,
  AppStateView,
  ClientContextProvider,
  MonacoEditorUtil,
  QueryProvider,
  ThemeContextProvider,
  initQueryClient
} from '@axonivy/inscription-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { URLParams } from './url-helper';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

export async function start(): Promise<void> {
  const server = URLParams.webSocketBase();
  const app = URLParams.app();
  const pmv = URLParams.pmv();
  const pid = URLParams.pid();
  const theme = URLParams.themeMode();

  await MonacoUtil.initStandalone(editorWorker);
  await MonacoEditorUtil.initMonaco(monaco, theme);
  const root = createRoot(document.getElementById('root')!);

  try {
    await IvyScriptLanguage.startWebSocketClient(`${server}/ivy-script-lsp`);
    const client = await InscriptionClientJsonRpc.startWebSocketClient(`${server}/ivy-inscription-lsp`);
    const queryClient = initQueryClient();

    root.render(
      <React.StrictMode>
        <ThemeContextProvider theme={theme}>
          <ClientContextProvider client={client}>
            <QueryProvider client={queryClient}>
              <App app={app} pmv={pmv} pid={pid} />
            </QueryProvider>
          </ClientContextProvider>
        </ThemeContextProvider>
      </React.StrictMode>
    );
  } catch (error) {
    root.render(<AppStateView>{'An error has occurred: ' + error}</AppStateView>);
  }
}

start();
