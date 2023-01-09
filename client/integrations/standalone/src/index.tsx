import { MonacoUtil, InscriptionClient, IvyScriptLanguage } from '@axonivy/inscription-core';
import { App, AppStateView, ClientContextInstance, errorState, MonacoEditorUtil } from '@axonivy/inscription-editor';
import { ThemeContextInstance } from '@axonivy/inscription-editor/src/context/useTheme';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { URLParams } from './url-helper';

export async function start(): Promise<void> {
  const server = URLParams.getServer();
  const pid = URLParams.getPid();
  const theme = URLParams.getThemeMode();

  MonacoEditorUtil.initMonaco(monaco, theme);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  try {
    await IvyScriptLanguage.startWebSocketClient(`ws://${server}/ivy-script-lsp`);
    const inscriptionClient = await InscriptionClient.startWebSocketClient(`ws://${server}/ivy-inscription-lsp`);
    console.log(`Inscription client initialized: ${await inscriptionClient.initialize()}`);

    root.render(
      <React.StrictMode>
        <ThemeContextInstance.Provider value={theme}>
          <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
            <App pid={pid} />
          </ClientContextInstance.Provider>
        </ThemeContextInstance.Provider>
      </React.StrictMode>
    );
  } catch (error) {
    root.render(<AppStateView state={errorState(error as string)} />);
  }
}

start();
