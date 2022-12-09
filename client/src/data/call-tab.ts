import { useEffect, useState } from 'react';
import { MappingData } from './mapping';
import { Message, MessageSeverity } from './message';
import { TabState, useTabState } from './tab';

export interface CallTabData {
  dialog: string;
  start: string;
  mappingData: MappingData;
}

export interface CallTabProps {
  data: CallTabData;
  setData: (data: CallTabData) => void;
  state: TabState;
  messages: Message[];
}

export function useCallTab(initData: CallTabData, initMessages: Message[] = []): CallTabProps {
  const [data, setData] = useState(initData);
  const [messages, setMessages] = useState(initMessages);
  const tabState = useTabState(JSON.stringify(initData), data, messages);
  useEffect(() => {
    const msgs: Message[] = [];
    if (data.dialog.length === 0) {
      msgs.push({ field: 'dialog', severity: MessageSeverity.WARNING, message: '⚠️ No User Dialog specified, auto dialog will be shown.' });
    }
    setMessages(msgs);
  }, [data]);
  return { data: data, setData: setData, state: tabState, messages: messages };
}
