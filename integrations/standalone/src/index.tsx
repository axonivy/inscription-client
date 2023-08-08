import './index.css';
import { MonacoUtil, IvyScriptLanguage, InscriptionClientJsonRpc } from '@axonivy/inscription-core';
import { App, AppStateView, ClientContextInstance, MonacoEditorUtil, ThemeContextProvider } from '@axonivy/inscription-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { URLParams } from './url-helper';

export async function start(): Promise<void> {
  const server = URLParams.webSocketBase();
  const app = URLParams.app();
  const pmv = URLParams.pmv();
  const pid = URLParams.pid();
  const theme = URLParams.themeMode();

  MonacoEditorUtil.initMonaco(monaco, theme);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  try {
    await IvyScriptLanguage.startWebSocketClient(`${server}/ivy-script-lsp`);
    const client = await InscriptionClientJsonRpc.startWebSocketClient(`${server}/ivy-inscription-lsp`);

    root.render(
      <React.StrictMode>
        <ThemeContextProvider theme={theme}>
          <ClientContextInstance.Provider value={{ client: client }}>
            <App app={app} pmv={pmv} pid={pid} />
          </ClientContextInstance.Provider>
        </ThemeContextProvider>
      </React.StrictMode>
    );
  } catch (error) {
    root.render(<AppStateView>{'An error has occurred: ' + error}</AppStateView>);
  }
}

start();
