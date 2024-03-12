import { IvyScriptLanguage } from '@axonivy/inscription-core';
import {
  App,
  ClientContextProvider,
  MonacoEditorUtil,
  QueryProvider,
  ThemeContextProvider,
  initQueryClient,
  type ThemeMode
} from '@axonivy/inscription-editor';
import type { InscriptionClient } from '@axonivy/inscription-protocol';
import type { QueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export interface LazyAppProps {
  clientCreator: () => Promise<InscriptionClient>;
  server?: string;
  app: string;
  pmv: string;
  pid: string;
  theme: ThemeMode;
}

export function LazyApp(props: LazyAppProps) {
  const [client, setClient] = useState<InscriptionClient>();
  const [queryClient] = useState<QueryClient>(initQueryClient());

  useEffect(() => {
    const instance = MonacoEditorUtil.configureInstance({ theme: props.theme, debug: true });
    if (props.server) {
      IvyScriptLanguage.startWebSocketClient(props.server, instance);
    }
    props.clientCreator().then(client => setClient(client));
  }, [props, props.server, props.theme]);

  if (client) {
    return (
      <React.StrictMode>
        <ThemeContextProvider theme={props.theme}>
          <ClientContextProvider client={client}>
            <QueryProvider client={queryClient}>
              <App app={props.app} pmv={props.pmv} pid={props.pid} />
            </QueryProvider>
          </ClientContextProvider>
        </ThemeContextProvider>
      </React.StrictMode>
    );
  }
  return <div className='loader' />;
}
