import { CallData } from '@axonivy/inscription-core';
import { useMemo } from 'react';
import { useData } from '../../context/useData';
import { Message, MessageSeverity } from './message';
import { TabState, useTabState } from './tab';

export interface CallTabProps {
  data: CallData;
  onChange: (data: CallData) => void;
  state: TabState;
  messages: Message[];
}

export function useCallTab(): CallTabProps {
  const [initData, data, setData] = useData('callData');
  // messages are derived from data
  const messages = useMemo(() => {
    const msgs: Message[] = [];
    if (data.dialog.length === 0) {
      msgs.push({ field: 'dialog', severity: MessageSeverity.WARNING, message: '⚠️ No User Dialog specified, auto dialog will be shown.' });
    }
    return msgs;
  }, [data.dialog.length]);
  const tabState = useTabState(initData, data, messages);
  return { data: data, onChange: setData, state: tabState, messages: messages };
}
