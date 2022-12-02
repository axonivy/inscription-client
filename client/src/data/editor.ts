import React, { useEffect, useState } from 'react';
import CallTab from '../components/tabs/CallTab';
import NameTab from '../components/tabs/NameTab';
import ResultTab from '../components/tabs/ResultTab';
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
  const nameTabProps = useNameTab({
    name: 'test name',
    description: 'test desc',
    docs: [
      {
        description: 'Doc 1',
        url: 'axonivy.com'
      },
      {
        description: 'ivyTeam ❤️',
        url: 'ivyteam.ch'
      }
    ],
    tags: ['bla', 'zag']
  });
  const callTabProps = useCallTab({ dialog: '', start: '' });
  const [headerState, setHeaderState] = useState([] as Message[]);

  const tabs: TabProps[] = [
    {
      name: 'Name',
      state: nameTabProps.state,
      content: React.createElement(NameTab, { data: nameTabProps.data, onChange: nameTabProps.setData, messages: nameTabProps.messages })
    },
    {
      name: 'Call',
      state: callTabProps.state,
      content: React.createElement(CallTab, { data: callTabProps.data, onChange: callTabProps.setData, messages: callTabProps.messages })
    },
    { name: 'Result', state: TabState.CONFIGURED, content: React.createElement(ResultTab) }
  ];

  useEffect(() => {
    const messages = [...nameTabProps.messages, ...callTabProps.messages];
    if (messages.length > 0) {
      setHeaderState(messages);
    } else {
      setHeaderState([{ field: 'name', severity: MessageSeverity.INFO, message: nameTabProps.data.name }]);
    }
  }, [nameTabProps.data, nameTabProps.messages, callTabProps.messages]);
  return { title: 'Inscribe User Dialog', headerState: headerState, tabs: tabs };
}
