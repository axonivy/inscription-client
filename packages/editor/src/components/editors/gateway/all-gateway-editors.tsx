/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useCasePart, useConditionPart, useEndPagePart, useMultiTasksPart, useGeneralPart, useOutputPart } from '../../../components/parts';

const AlternativeEditor = memo(() => {
  const name = useGeneralPart();
  const condition = useConditionPart();
  return <InscriptionEditor icon={IvyIcons.AlternativeGateways} parts={[name, condition]} />;
});

const JoinEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.JoinGateways} parts={[name, output]} />;
});

const SplitEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.JoinGateways} parts={[name, output]} />;
});

const TaskSwitchGatewayEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  const multiTasks = useMultiTasksPart();
  const casePart = useCasePart();
  const endPage = useEndPagePart();
  return <InscriptionEditor icon={IvyIcons.JoinTasksGateways} parts={[name, output, multiTasks, casePart, endPage]} />;
});

export const gatewayEditors = new Map<ElementType, ReactNode>([
  ['Alternative', <AlternativeEditor />],
  ['Join', <JoinEditor />],
  ['Split', <SplitEditor />],
  ['TaskSwitchGateway', <TaskSwitchGatewayEditor />]
]);
