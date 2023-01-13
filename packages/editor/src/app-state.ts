import { InscriptionData } from '@axonivy/inscription-core';

export interface AppState {
  state: 'waiting' | 'success' | 'error';
  initialData: InscriptionData | null;
  error: string | null;
}

export function waitingState(): AppState {
  return { state: 'waiting', initialData: null, error: null };
}

export function errorState(error: string): AppState {
  return { state: 'error', initialData: null, error };
}

export function successState(initialData: InscriptionData): AppState {
  return { state: 'success', initialData, error: null };
}
