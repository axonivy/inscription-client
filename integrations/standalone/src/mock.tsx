import './index.css';
import { MonacoUtil, InscriptionClientMock } from '@axonivy/inscription-core';
import { App, ClientContextInstance, MonacoEditorUtil, ThemeContextInstance } from '@axonivy/inscription-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { URLParams } from './url-helper';
import { InscriptionEditorType } from '@axonivy/inscription-protocol';

export async function start(): Promise<void> {
  const theme = URLParams.getThemeMode();
  const readonly = URLParams.getParameter('readonly') ? true : false;
  const type = (URLParams.getParameter('type') as InscriptionEditorType) ?? undefined;

  MonacoEditorUtil.initMonaco(monaco, theme);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  const inscriptionClient = new InscriptionClientMock(readonly, type);

  root.render(
    <React.StrictMode>
      <ThemeContextInstance.Provider value={theme}>
        <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
          <App pid={'1'} />
        </ClientContextInstance.Provider>
      </ThemeContextInstance.Provider>
    </React.StrictMode>
  );
}

start();
