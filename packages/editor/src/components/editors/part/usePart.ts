import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { ReactNode, useMemo } from 'react';
import { deepEqual } from '../../../utils/equals';

export type PartStateFlag = 'empty' | 'configured' | 'warning' | 'error';

export type PartState = {
  state: PartStateFlag;
  validations: InscriptionValidation[];
};

export type PartProps = {
  name: string;
  state: PartState;
  reset: { dirty: boolean; action: () => void };
  content: ReactNode;
  summary?: ReactNode;
};

export function usePartState(defaultData: unknown, data: unknown, validations: InscriptionValidation[]): PartState {
  const state = useMemo(() => {
    if (validations.find(message => message?.severity === 'ERROR')) {
      return 'error';
    }
    if (validations.find(message => message?.severity === 'WARNING')) {
      return 'warning';
    }
    return deepEqual(data, defaultData) ? 'empty' : 'configured';
  }, [validations, data, defaultData]);
  return { state, validations };
}

export function usePartDirty(initData: unknown, data: unknown): boolean {
  return useMemo<boolean>(() => {
    return !deepEqual(data, initData);
  }, [data, initData]);
}
