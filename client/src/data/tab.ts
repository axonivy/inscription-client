import { useEffect, useState } from 'react';
import { Message, MessageSeverity } from './message';

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

export function useTabState(initData: string, data: any, messages: Message[]): TabState {
  const [tabState, setTabState] = useState(TabState.EMPTY);
  useEffect(() => {
    if (JSON.stringify(data) !== initData) {
      setTabState(TabState.DIRTY);
    } else {
      setTabState(TabState.EMPTY);
    }
    const errors = messages.find(message => message.severity === MessageSeverity.ERROR);
    const warnings = messages.find(message => message.severity === MessageSeverity.WARNING);
    if (errors) {
      setTabState(TabState.ERROR);
    } else if (warnings) {
      setTabState(TabState.WARNING);
    }
  }, [messages, data, initData]);
  return tabState;
}
