import { MonacoUtil, InscriptionClientMock } from '@axonivy/inscription-core';
import { App, ClientContextInstance, MonacoEditorUtil } from '@axonivy/inscription-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

export async function start(): Promise<void> {
  MonacoEditorUtil.initMonaco(monaco);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  console.log('Use Inscription client mock');
  const inscriptionClient = new InscriptionClientMock();

  root.render(
    <React.StrictMode>
      <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
        <App pid={'1'} />
      </ClientContextInstance.Provider>
    </React.StrictMode>
  );
}

start();
