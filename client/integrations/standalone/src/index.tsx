import { MonacoUtil, InscriptionClient, FormLanguage } from '@axonivy/inscription-core';
import { App, ClientContextInstance, MonacoEditorUtil } from '../../../packages/editor/lib';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

export async function start(): Promise<void> {
  MonacoEditorUtil.initMonaco(monaco);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  try {
    const server = 'localhost:8081/designer';
    const pid = '15254DC87A1B183B-f5';
    await FormLanguage.startWebSocketClient(`ws://${server}/ivy-script-lsp`);
    const inscriptionClient = await InscriptionClient.startWebSocketClient(`ws://${server}/ivy-inscription-lsp`);
    console.log(`Inscription client initialized: ${await inscriptionClient.initialize()}`);

    root.render(
      <React.StrictMode>
        <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
          <App pid={pid} />
        </ClientContextInstance.Provider>
      </React.StrictMode>
    );
  } catch (error) {
    root.render(<div>{error as string}</div>);
  }
}

start();
