import { App, ClientContextProvider, MonacoEditorUtil, QueryProvider, initQueryClient } from '@axonivy/inscription-editor';
import type { ElementType } from '@axonivy/inscription-protocol';
import { ThemeProvider } from '@axonivy/ui-components';
import { createRoot } from 'react-dom/client';
import './index.css';
import { InscriptionClientMock } from './mock/inscription-client-mock';
import { URLParams } from './url-helper';
import React from 'react';

export async function start(): Promise<void> {
  const readonly = URLParams.parameter('readonly') ? true : false;
  const type = (URLParams.parameter('type') as ElementType) ?? undefined;
  const theme = URLParams.themeMode();
  const root = createRoot(document.getElementById('root')!);
  const queryClient = initQueryClient();
  const client = new InscriptionClientMock(readonly, type);
  await MonacoEditorUtil.configureInstance({ theme, debug: true });

  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme={theme}>
        <ClientContextProvider client={client}>
          <QueryProvider client={queryClient}>
            <App app='' pmv='' pid='1' />
          </QueryProvider>
        </ClientContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

start();
