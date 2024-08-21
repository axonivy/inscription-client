import { IvyScriptLanguage } from '@axonivy/inscription-core';
import { App, AppStateView, ClientContextProvider, MonacoEditorUtil, QueryProvider, initQueryClient } from '@axonivy/inscription-editor';
import { ThemeProvider, Spinner } from '@axonivy/ui-components';
import type { InscriptionClient } from '@axonivy/inscription-protocol';
import type { QueryClient } from '@tanstack/react-query';
import React, { useEffect, useState, type ComponentProps } from 'react';

export interface LazyAppProps extends ComponentProps<typeof App> {
  clientCreator: () => Promise<InscriptionClient>;
  server?: string;
  theme: 'dark' | 'light';
}

export function LazyApp({ clientCreator, server, theme, ...props }: LazyAppProps) {
  const [client, setClient] = useState<InscriptionClient>();
  const [queryClient] = useState<QueryClient>(initQueryClient());

  useEffect(() => {
    const instance = MonacoEditorUtil.configureInstance({ theme, debug: true });
    if (server) {
      IvyScriptLanguage.startWebSocketClient(server, instance);
    }
    clientCreator().then(client => setClient(client));
  }, [clientCreator, server, theme]);

  if (client) {
    return (
      <React.StrictMode>
        <ThemeProvider defaultTheme={theme}>
          <ClientContextProvider client={client}>
            <QueryProvider client={queryClient}>
              <App {...props} />
            </QueryProvider>
          </ClientContextProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
  return (
    <AppStateView>
      <Spinner size='large' />
    </AppStateView>
  );
}
