import { memo } from 'react';
import { useData } from '../../context';
import InscriptionEditor from '../InscriptionEditor';
import { EditorProps, useEditorState } from '../props';
import { useCallTab, useNameTab, useResultTab } from '../tabs';

function useUserDialogEditor(): EditorProps {
  const [, displayName] = useData('nameData/displayName');
  const headerState = useEditorState(displayName);
  const nameTab = useNameTab();
  const callTab = useCallTab();
  const resultTab = useResultTab();

  return { title: 'Inscribe User Dialog', editorState: headerState, tabs: [nameTab, callTab, resultTab] };
}

const UserDialogEditor = () => {
  const props = useUserDialogEditor();
  return <InscriptionEditor {...props} />;
};

export default memo(UserDialogEditor);
