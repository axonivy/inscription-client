/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/ui-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { type KnownEditor } from '../InscriptionEditor';
import { useCasePart, useConditionPart, useEndPagePart, useMultiTasksPart, useGeneralPart, useOutputPart } from '../../../components/parts';
import Part from '../part/Part';

const AlternativeEditor = memo(() => {
  const name = useGeneralPart();
  const condition = useConditionPart();
  return <Part parts={[name, condition]} />;
});

const JoinEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  return <Part parts={[name, output]} />;
});

const SplitEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  return <Part parts={[name, output]} />;
});

const TaskSwitchGatewayEditor = memo(() => {
  const name = useGeneralPart();
  const multiTasks = useMultiTasksPart();
  const casePart = useCasePart();
  const endPage = useEndPagePart();
  const output = useOutputPart();
  return <Part parts={[name, multiTasks, casePart, endPage, output]} />;
});

export const gatewayEditors = new Map<ElementType, KnownEditor>([
  ['Alternative', { editor: <AlternativeEditor />, icon: IvyIcons.AlternativeGateways }],
  ['Join', { editor: <JoinEditor />, icon: IvyIcons.JoinGateways }],
  ['Split', { editor: <SplitEditor />, icon: IvyIcons.JoinGateways }],
  ['TaskSwitchGateway', { editor: <TaskSwitchGatewayEditor />, icon: IvyIcons.JoinTasksGateways }]
]);
