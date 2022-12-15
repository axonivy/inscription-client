import { InscriptionClient } from '@axon-ivy/core/lib/inscription-client';
import React, { useContext } from 'react';

export interface ClientContext {
    client: InscriptionClient;
}

/** We always use a provider so default can be undefined */
const defaultClientContext: any = undefined;

export const ClientContextInstance = React.createContext<ClientContext>(defaultClientContext);
export const useClientContext = (): ClientContext => useContext(ClientContextInstance);
export const useClient = (): InscriptionClient => {
    const { client } = useClientContext();
    return client;
};
