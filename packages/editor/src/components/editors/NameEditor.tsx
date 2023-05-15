import { IvyIcons } from '@axonivy/editor-icons';
import { memo } from 'react';
import { useNamePart } from '../parts';
import InscriptionEditor from './InscriptionEditor';

const NameEditor = memo((props: { icon: IvyIcons; hideTags?: boolean }) => {
  const name = useNamePart({ hideTags: props.hideTags });
  return <InscriptionEditor {...props} parts={[name]} />;
});

export default NameEditor;
