import { InscriptionValidation } from '@axonivy/inscription-core';
import { useDataContext } from './useDataContext';

export type ValidationAccess = 'nameData/displayName' | 'nameData/description' | 'callData/dialogStart' | 'callData/mappingData/code';

export function useValidation<K extends ValidationAccess>(path: K): InscriptionValidation;
export function useValidation(path: string): InscriptionValidation;
export function useValidation(path: string): InscriptionValidation {
  const { validation } = useDataContext();
  const valResult = validation.find(val => val.path === path) as any;
  return valResult;
}

export type ValidationsAccess = 'nameData' | 'callData' | 'callData/mappingData';

export function useValidations<K extends ValidationsAccess>(path: K): InscriptionValidation[];
export function useValidations(path: string): InscriptionValidation[] {
  const { validation } = useDataContext();
  return validation.filter(val => val.path.startsWith(path));
}
