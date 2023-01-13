import { IvyIcons } from '@axonivy/editor-icons';
import { memo } from 'react';
import { useNameTab } from '../tabs';
import InscriptionEditor from './InscriptionEditor';

const NameEditor = memo((props: { icon: IvyIcons }) => {
  const nameTab = useNameTab();
  return <InscriptionEditor {...props} tabs={[nameTab]} />;
});

export default NameEditor;
