import './index.css';
import { IvyScriptLanguage, InscriptionClientJsonRpc, MonacoUtil } from '@axonivy/inscription-core';
import {
  App,
  AppStateView,
  ClientContextProvider,
  MonacoEditorUtil,
  QueryProvider,
  ThemeContextProvider,
  initQueryClient,
  type ThemeMode
} from '@axonivy/inscription-editor';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { URLParams } from './url-helper';

async function initMonaco(theme: ThemeMode): Promise<boolean> {
  console.time('initMonaco');
  const monaco = await import('monaco-editor/esm/vs/editor/editor.api');
  const editorWorker = await import('monaco-editor/esm/vs/editor/editor.worker?worker');
  await MonacoUtil.initStandalone(editorWorker.default);
  await MonacoEditorUtil.configureInstance(monaco, theme);
  console.timeEnd('initMonaco');
  return true;
}

export async function start(): Promise<void> {
  console.time('*** start');
  const server = URLParams.webSocketBase();
  const app = URLParams.app();
  const pmv = URLParams.pmv();
  const pid = URLParams.pid();
  const theme = URLParams.themeMode();

  const root = createRoot(document.getElementById('root')!);
  try {
    const isMonacoReady = initMonaco(theme);
    IvyScriptLanguage.startWebSocketClient(server, isMonacoReady);
    const client = await InscriptionClientJsonRpc.startWebSocketClient(server);
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
    console.error(error);
    root.render(<AppStateView>{'An error has occurred: ' + error}</AppStateView>);
  } finally {
    console.timeEnd('*** start');
  }
}

start();
