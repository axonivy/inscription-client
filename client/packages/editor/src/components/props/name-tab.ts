import { NameData } from '@axonivy/inscription-core';
import { useMemo } from 'react';
import { useData } from '../../context/useData';
import { Message, MessageSeverity } from './message';
import { TabState, useTabState } from './tab';

export interface NameTabProps {
  data: NameData;
  onChange: (data: NameData) => void;
  state: TabState;
  messages: Message[];
}

export function useNameTab(): NameTabProps {
  const [initData, data, setData] = useData('nameData');

  // messages are derived from data
  const messages = useMemo(() => {
    const msgs: Message[] = [];
    if (data.displayName.length === 0) {
      msgs.push({ field: 'name', severity: MessageSeverity.ERROR, message: '🚫 Name must not be empty' });
    }
    if (data.description.length === 0) {
      msgs.push({ field: 'description', severity: MessageSeverity.WARNING, message: '⚠️ Description is empty' });
    }
    return msgs;
  }, [data.displayName, data.description]);
  const tabState = useTabState(initData, data, messages);
  return { data: data, onChange: setData, state: tabState, messages: messages };
}
