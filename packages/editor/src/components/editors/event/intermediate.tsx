import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useCasePart, useEndPagePart, useNamePart, useOutputPart, useSingleTaskPart } from '../../../components/parts';

const TaskSwitchEventEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  const singleTask = useSingleTaskPart();
  const casePart = useCasePart();
  const endPage = useEndPagePart();
  return <InscriptionEditor icon={IvyIcons.Task} parts={[name, output, singleTask, casePart, endPage]} />;
});

const WaitEventEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Wait} parts={[name, output]} />;
});

export const intermediateEventEditors = new Map<ElementType, ReactNode>([
  ['TaskSwitchEvent', <TaskSwitchEventEditor />],
  ['WaitEvent', <WaitEventEditor />]
]);
