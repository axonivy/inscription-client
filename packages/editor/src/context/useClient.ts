import { InscriptionClient } from '@axonivy/inscription-protocol';
import { createContext, useContext } from 'react';

export interface ClientContext {
  client: InscriptionClient;
}

/** We always use a provider so default can be undefined */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultClientContext: any = undefined;

export const ClientContextInstance = createContext<ClientContext>(defaultClientContext);
export const useClientContext = (): ClientContext => useContext(ClientContextInstance);
export const useClient = (): InscriptionClient => {
  const { client } = useClientContext();
  return client;
};
