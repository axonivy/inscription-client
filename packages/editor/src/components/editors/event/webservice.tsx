import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useCasePart, useNamePart, useStartPart } from '../../../components/parts';

const WebserviceStartEditor = memo(() => {
  const namePart = useNamePart();
  const startPart = useStartPart();
  const casePart = useCasePart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[namePart, startPart, casePart]} />;
});

export const webServiceEventEditors = new Map<ElementType, ReactNode>([
  ['WebserviceStart', <WebserviceStartEditor />],
  ['WebserviceEnd', <NameEditor icon={IvyIcons.WebService} />]
]);
