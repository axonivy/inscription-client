import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useCasePart, useEndPagePart, useMultiTasksPart, useNamePart, useOutputPart } from '../../../components/parts';

const AlternativeEditor = memo(() => {
  const name = useNamePart();
  const condition = { name: 'Condition', content: <h1>Condition</h1> };
  return <InscriptionEditor icon={IvyIcons.Alternative} parts={[name, condition]} />;
});

const JoinEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Join} parts={[name, output]} />;
});

const TaskSwitchGatewayEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  const multiTasks = useMultiTasksPart();
  const casePart = useCasePart();
  const endPage = useEndPagePart();
  return <InscriptionEditor icon={IvyIcons.Tasks} parts={[name, output, multiTasks, casePart, endPage]} />;
});

export const gatewayEditors = new Map<ElementType, ReactNode>([
  ['Alternative', <AlternativeEditor />],
  ['Join', <JoinEditor />],
  ['Split', <NameEditor icon={IvyIcons.Split} />],
  ['TaskSwitchGateway', <TaskSwitchGatewayEditor />]
]);
