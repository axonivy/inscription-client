import { IvyIcons } from '@axonivy/editor-icons';
import { ReactNode, memo } from 'react';
import NameEditor from '../NameEditor';
import { ElementType } from '@axonivy/inscription-protocol';
import { useNamePart, useStartPart } from '../../../components/parts';
import InscriptionEditor from '../InscriptionEditor';

const CallSubStartEditor = memo(() => {
  const name = useNamePart();
  const start = useStartPart();
  return <InscriptionEditor icon={IvyIcons.SubStart} parts={[name, start]} />;
});

export const callSubEventEditors = new Map<ElementType, ReactNode>([
  ['CallSubStart', <CallSubStartEditor />],
  ['CallSubEnd', <NameEditor icon={IvyIcons.SubEnd} />]
]);
