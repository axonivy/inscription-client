import React, { useMemo } from 'react';
import CallTab from '../tabs/CallTab';
import NameTab from '../tabs/NameTab';
import ResultTab from '../tabs/ResultTab';
import { useCallTab } from './call-tab';
import { Message, MessageSeverity } from './message';
import { useNameTab } from './name-tab';
import { TabProps, TabState } from './tab';

export interface EditorProps {
  title: string;
  headerState: Message[];
  tabs: TabProps[];
}

export function useUserDialogEditor(): EditorProps {
  const nameTabProps = useNameTab();
  const callTabProps = useCallTab();

  const tabs: TabProps[] = [
    {
      name: 'Name',
      state: nameTabProps.state,
      content: React.createElement(NameTab, nameTabProps)
    },
    {
      name: 'Call',
      state: callTabProps.state,
      content: React.createElement(CallTab, callTabProps)
    },
    { name: 'Result', state: TabState.CONFIGURED, content: React.createElement(ResultTab) }
  ];

  const headerState = useMemo(() => {
    const messages = [...nameTabProps.messages, ...callTabProps.messages];
    return messages.length > 0
      ? messages
      : [{ field: 'name', severity: MessageSeverity.INFO, message: nameTabProps.data.displayName }];
  }, [callTabProps.messages, nameTabProps.data.displayName, nameTabProps.messages]);

  return { title: 'Inscribe User Dialog', headerState, tabs };
}
