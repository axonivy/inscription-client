import { IvyIcons } from '@axonivy/editor-icons';
import { memo } from 'react';
import { useNameTab } from '../tabs';
import InscriptionEditor from './InscriptionEditor';

const NameEditor = memo((props: { icon: IvyIcons; hideTags?: boolean }) => {
  const nameTab = useNameTab({ hideTags: props.hideTags });
  return <InscriptionEditor {...props} tabs={[nameTab]} />;
});

export default NameEditor;
