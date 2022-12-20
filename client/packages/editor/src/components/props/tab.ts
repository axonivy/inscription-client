import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { Message } from './message';

export enum TabState {
  EMPTY = 'empty',
  CONFIGURED = 'configured',
  DIRTY = 'dirty',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface TabProps {
  name: string;
  content: JSX.Element;
  state: TabState;
}

export function useTabState(initData: any, data: any, messages: Message[]): TabState {
  const tabState = useMemo(() => {
    const errors = messages.find(message => message.severity === 'error');
    if (errors) {
      return TabState.ERROR;
    }

    const warnings = messages.find(message => message.severity === 'warning');
    if (warnings) {
      return TabState.WARNING;
    }

    return isEqual(data, initData) ? TabState.EMPTY : TabState.DIRTY;
  }, [messages, data, initData]);

  return tabState;
}
