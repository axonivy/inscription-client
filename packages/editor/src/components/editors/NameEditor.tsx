import type { IvyIcons } from '@axonivy/ui-icons';
import { memo } from 'react';
import { useGeneralPart } from '../parts';
import InscriptionEditor from './InscriptionEditor';

const NameEditor = memo((props: { icon: IvyIcons; hideTags?: boolean }) => {
  const name = useGeneralPart({ hideTags: props.hideTags });
  return <InscriptionEditor {...props} parts={[name]} />;
});

export default NameEditor;
