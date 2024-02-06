import './index.css';
import { MonacoUtil } from '@axonivy/inscription-core';
import {
  App,
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
import type { ElementType } from '@axonivy/inscription-protocol';
import { InscriptionClientMock } from './mock/inscription-client-mock';

export async function start(): Promise<void> {
  console.time('*** start');
  const theme = URLParams.themeMode();
  const readonly = URLParams.parameter('readonly') ? true : false;
  const type = (URLParams.parameter('type') as ElementType) ?? undefined;

  await MonacoUtil.initStandalone();
  await MonacoEditorUtil.initMonaco(monaco, theme);
  const root = createRoot(document.getElementById('root')!);

  const inscriptionClient = new InscriptionClientMock(readonly, type);
  const queryClient = initQueryClient();

  root.render(
    <React.StrictMode>
      <ThemeContextProvider theme={theme}>
        <ClientContextProvider client={inscriptionClient}>
          <QueryProvider client={queryClient}>
            <App app='' pmv='' pid={'1'} />
          </QueryProvider>
        </ClientContextProvider>
      </ThemeContextProvider>
    </React.StrictMode>
  );
  console.timeEnd('*** start');
}

start();
