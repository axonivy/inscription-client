import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useCasePart, useNamePart, useResultPart, useStartPart, useTaskPart } from '../../../components/parts';

const WebserviceStartEditor = memo(() => {
  const name = useNamePart();
  const start = useStartPart({ synchParams: true });
  const result = useResultPart();
  const task = useTaskPart({ type: 'ws' });
  const casePart = useCasePart();
  return <InscriptionEditor icon={IvyIcons.WebService} parts={[name, start, result, task, casePart]} />;
});

export const webServiceEventEditors = new Map<ElementType, ReactNode>([
  ['WebserviceStart', <WebserviceStartEditor />],
  ['WebserviceEnd', <NameEditor icon={IvyIcons.WebService} />]
]);
