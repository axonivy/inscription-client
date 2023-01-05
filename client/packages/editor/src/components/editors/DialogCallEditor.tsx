import { memo } from 'react';
import InscriptionEditor from './InscriptionEditor';
import { EditorProps, useEditorState } from '../props';
import { useNameTab, useResultTab } from '../tabs';
import icon from './dialog-call.svg';

function useDialogCallEditor(): EditorProps {
  const headerState = useEditorState();
  const nameTab = useNameTab();
  // const callTab = useCallTab();
  const resultTab = useResultTab();

  return { title: 'Inscribe User Dialog', icon: icon, editorState: headerState, tabs: [nameTab /*, callTab*/, resultTab] };
}

const DialogCallEditor = () => {
  const props = useDialogCallEditor();
  return <InscriptionEditor {...props} />;
};

export default memo(DialogCallEditor);
