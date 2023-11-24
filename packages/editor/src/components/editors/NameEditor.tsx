import type { IvyIcons } from '@axonivy/editor-icons';
import { memo } from 'react';
import { useGeneralPart } from '../parts/index.js';
import InscriptionEditor from './InscriptionEditor.js';

const NameEditor = memo((props: { icon: IvyIcons; hideTags?: boolean }) => {
  const name = useGeneralPart({ hideTags: props.hideTags });
  return <InscriptionEditor {...props} parts={[name]} />;
});

export default NameEditor;
