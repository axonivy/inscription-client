import { InscriptionDataBeta } from '@axonivy/inscription-protocol';

export type AppState = { state: 'waiting' } | { state: 'error'; error: string } | { state: 'success'; initialData: InscriptionDataBeta };

export function waitingState(): AppState {
  return { state: 'waiting' };
}

export function errorState(error: string): AppState {
  return { state: 'error', error };
}

export function successState(initialData: InscriptionDataBeta): AppState {
  return { state: 'success', initialData };
}
