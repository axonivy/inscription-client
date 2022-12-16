import React, { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { EditorProps, TabProps, TabState, useCallTab, useHeaderState, useNameTab } from '../props';
import { CallTab, NameTab, ResultTab } from '../tabs';

function useUserDialogEditor(): EditorProps {
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
      name: 'Call',
      state: callTabProps.state,
      content: React.createElement(CallTab, callTabProps)
    },
    { name: 'Result', state: TabState.CONFIGURED, content: React.createElement(ResultTab) }
  ];

  return { title: 'Inscribe User Dialog', headerState, tabs };
}

const UserDialogEditor = () => {
  const props = useUserDialogEditor();
  return <InscriptionEditor {...props} />;
};

export default memo(UserDialogEditor);
