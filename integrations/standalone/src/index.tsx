// import type { MonacoLanguageClient } from 'monaco-languageclient';
import { App, ClientContextProvider, InscriptionClientJsonRpc, QueryProvider, initQueryClient } from '@axonivy/inscription-editor';
import { ThemeProvider, Spinner, Flex } from '@axonivy/ui-components';
// import { MonacoEditorUtil, IvyScriptLanguage } from '@axonivy/monaco';
import { createRoot } from 'react-dom/client';
import './index.css';
import { URLParams } from './url-helper';
import React from 'react';
import { webSocketConnection, type Connection } from '@axonivy/jsonrpc';

export async function start(): Promise<void> {
  const server = URLParams.webSocketBase();
  const app = URLParams.app();
  const pmv = URLParams.pmv();
  const pid = URLParams.pid();
  const theme = URLParams.themeMode();
  const queryClient = initQueryClient();
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme={theme}>
        <Flex style={{ height: '100%' }} justifyContent='center' alignItems='center'>
          <Spinner size='large' />
        </Flex>
      </ThemeProvider>
    </React.StrictMode>
  );

  const initialize = async (connection: Connection) => {
    const client = await InscriptionClientJsonRpc.startClient(connection);
    root.render(
      <React.StrictMode>
        <ThemeProvider defaultTheme={theme}>
          <ClientContextProvider client={client}>
            <QueryProvider client={queryClient}>
              <App app={app} pmv={pmv} pid={pid} />
            </QueryProvider>
          </ClientContextProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
    return client;
  };

  const reconnect = async (connection: Connection, oldClient: InscriptionClientJsonRpc) => {
    await oldClient.stop();
    return initialize(connection);
  };

  webSocketConnection<InscriptionClientJsonRpc>(InscriptionClientJsonRpc.webSocketUrl(server)).listen({
    onConnection: initialize,
    onReconnect: reconnect,
    logger: console
  });

  // const worker = await import('monaco-editor/esm/vs/editor/editor.worker?worker');
  // const instance = MonacoEditorUtil.configureInstance({ theme, debug: true, worker: { workerConstructor: worker.default } });

  // const initializeScript = async (connection: Connection) => {
  //   return await IvyScriptLanguage.startClient(connection, instance);
  // };

  //   const reconnectScript = async (connection: Connection, oldClient: MonacoLanguageClient) => {
  //     try {
  //       await oldClient.stop(0);
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //     return initializeScript(connection);
  //   };

  //   webSocketConnection<MonacoLanguageClient>(IvyScriptLanguage.webSocketUrl(server)).listen({
  //     onConnection: initializeScript,
  //     onReconnect: reconnectScript,
  //     logger: console
  //   });
}

start();
