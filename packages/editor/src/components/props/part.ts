import { ReactNode, useMemo } from 'react';
import { deepEqual } from '../../utils/equals';
import { Message } from './message';

export type PartState = 'empty' | 'configured' | 'warning' | 'error';

export interface PartProps {
  name: string;
  content: ReactNode;
  summary?: ReactNode;
  state?: PartState;
  reset?: { dirty: boolean; action: () => void };
}

export function usePartState(defaultData: any, data: any, messages: Message[]): PartState {
  return useMemo<PartState>(() => {
    if (messages.find(message => message?.severity === 'error')) {
      return 'error';
    }
    if (messages.find(message => message?.severity === 'warning')) {
      return 'warning';
    }
    return deepEqual(data, defaultData) ? 'empty' : 'configured';
  }, [messages, data, defaultData]);
}

export function usePartDirty(initData: any, data: any): boolean {
  return useMemo<boolean>(() => {
    return !deepEqual(data, initData);
  }, [data, initData]);
}
