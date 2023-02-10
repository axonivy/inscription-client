import { ReactNode, useMemo } from 'react';
import { deepEqual } from '../../utils/equals';
import { Message } from './message';

export type TabState = 'empty' | 'configured' | 'warning' | 'error';

export interface TabProps {
  name: string;
  content: ReactNode;
  state?: TabState;
}

export function useTabState(defaultData: any, data: any, messages: Message[]): TabState {
  return useMemo<TabState>(() => {
    if (messages.find(message => message?.severity === 'error')) {
      return 'error';
    }
    if (messages.find(message => message?.severity === 'warning')) {
      return 'warning';
    }
    return deepEqual(data, defaultData) ? 'empty' : 'configured';
  }, [messages, data, defaultData]);
}
