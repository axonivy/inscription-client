import { InscriptionData } from '@axonivy/inscription-protocol';

export type AppState = { state: 'waiting' } | { state: 'error'; error: string } | { state: 'success'; initialData: InscriptionData };

export function waitingState(): AppState {
  return { state: 'waiting' };
}

export function errorState(error: string): AppState {
  return { state: 'error', error };
}

export function successState(initialData: InscriptionData): AppState {
  return { state: 'success', initialData };
}
