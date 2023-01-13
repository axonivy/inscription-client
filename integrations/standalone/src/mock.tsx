import { MonacoUtil, InscriptionClientMock } from '@axonivy/inscription-core';
import { App, ClientContextInstance, MonacoEditorUtil } from '@axonivy/inscription-editor';
import { ThemeContextInstance } from '@axonivy/inscription-editor/src/context/useTheme';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { URLParams } from './url-helper';

export async function start(): Promise<void> {
  const theme = URLParams.getThemeMode();
  const readonly = URLParams.getParameter('readonly') ? true : false;
  const type = URLParams.getParameter('type') ?? undefined;

  MonacoEditorUtil.initMonaco(monaco, theme);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  console.log('Use Inscription client mock');
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
