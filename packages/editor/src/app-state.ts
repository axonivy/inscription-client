import { InscriptionData } from '@axonivy/inscription-protocol';

export interface AppState {
  state: 'waiting' | 'success' | 'error';
  initialData?: InscriptionData;
  error?: string;
}

export function waitingState(): AppState {
  return { state: 'waiting' };
}

export function errorState(error: string): AppState {
  return { state: 'error', error };
}

export function successState(initialData: InscriptionData): AppState {
  return { state: 'success', initialData };
}
