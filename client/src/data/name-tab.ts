import { useEffect, useState } from 'react';
import { Doc } from './document';
import { Message, MessageSeverity } from './message';
import { TabState, useTabState } from './tab';

export interface NameTabData {
  displayName: string;
  description: string;
  documents: Doc[];
  tags: string[];
}

export interface NameTabProps {
  data: NameTabData;
  setData: (data: NameTabData) => void;
  state: TabState;
  messages: Message[];
}

export function useNameTab(initData: NameTabData, initMessages: Message[] = []): NameTabProps {
  const [data, setData] = useState(initData);
  const [messages, setMessages] = useState(initMessages);
  const tabState = useTabState(JSON.stringify(initData), data, messages);
  useEffect(() => {
    const msgs: Message[] = [];
    if (data.displayName.length === 0) {
      msgs.push({ field: 'name', severity: MessageSeverity.ERROR, message: '🚫 Name must not be empty' });
    }
    if (data.description.length === 0) {
      msgs.push({ field: 'description', severity: MessageSeverity.WARNING, message: '⚠️ Description is empty' });
    }
    setMessages(msgs);
  }, [data]);
  return { data: data, setData: setData, state: tabState, messages: messages };
}
