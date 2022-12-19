import React, { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { EditorProps, TabProps, TabState, useCallTab, useHeaderState, useNameTab } from '../props';
import { CallTab, NameTab, ResultTab } from '../tabs';

function useUserTaskEditor(): EditorProps {
  const nameTabProps = useNameTab();
  const callTabProps = useCallTab();
  const headerState = useHeaderState(nameTabProps.data.displayName, [nameTabProps.messages, callTabProps.messages]);

  const tabs: TabProps[] = [
    {
      name: 'Name',
      state: nameTabProps.state,
      content: React.createElement(NameTab, nameTabProps)
    },
    {
      name: 'Task',
      state: TabState.EMPTY,
      content: <h1>Task</h1>
    },
    {
      name: 'Case',
      state: TabState.EMPTY,
      content: <h1>Case</h1>
    },
    {
      name: 'Call',
      state: callTabProps.state,
      content: React.createElement(CallTab, callTabProps)
    },
    { name: 'Result', state: TabState.CONFIGURED, content: React.createElement(ResultTab) }
  ];

  return { title: 'Inscribe User Task', headerState, tabs };
}
const UserTaskEditor = () => {
  const props = useUserTaskEditor();
  return <InscriptionEditor {...props} />;
};

export default memo(UserTaskEditor);
