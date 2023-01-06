import { memo } from 'react';
import InscriptionEditor from './InscriptionEditor';
import { EditorProps, TabProps, TabState, useEditorState } from '../props';
import { useCallTab, useNameTab, useResultTab } from '../tabs';
import icon from './dialog-call.svg';

function useUserTaskEditor(): EditorProps {
  const editorState = useEditorState();
  const nameTab = useNameTab();
  const callTab = useCallTab();
  const resultTab = useResultTab();

  const tabs: TabProps[] = [
    nameTab,
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
    callTab,
    resultTab
  ];

  return { title: 'Inscribe User Task', icon: icon, editorState: editorState, tabs };
}

const UserTaskEditor = () => {
  const props = useUserTaskEditor();
  return <InscriptionEditor {...props} />;
};

export default memo(UserTaskEditor);
