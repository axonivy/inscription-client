import { useMemo } from 'react';
import { Message, MessageSeverity } from './message';
import { TabProps } from './tab';

export interface EditorProps {
  title: string;
  headerState: Message[];
  tabs: TabProps[];
}

export const useHeaderState = (emptyMessage: string, messages: Message[][]) => {
  const headerState = useMemo(() => {
    const msgs = messages.flat();
    return msgs.length > 0 ? msgs : [{ field: 'name', severity: MessageSeverity.INFO, message: emptyMessage }];
  }, [emptyMessage, messages]);
  return headerState;
};
