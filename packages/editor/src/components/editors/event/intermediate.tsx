/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import {
  useCasePart,
  useConfigurationPart,
  useEndPagePart,
  useEventPart,
  useGeneralPart,
  useOutputPart,
  useTaskPart
} from '../../../components/parts';

const TaskSwitchEventEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart();
  const task = useTaskPart();
  const casePart = useCasePart();
  const endPage = useEndPagePart();
  return <InscriptionEditor icon={IvyIcons.Task} parts={[name, output, task, casePart, endPage]} />;
});

const WaitEventEditor = memo(() => {
  const name = useGeneralPart();
  const event = useEventPart();
  const configuration = useConfigurationPart();
  const task = useTaskPart({ type: 'wait' });
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Wait} parts={[name, event, configuration, task, output]} />;
});

export const intermediateEventEditors = new Map<ElementType, ReactNode>([
  ['TaskSwitchEvent', <TaskSwitchEventEditor />],
  ['WaitEvent', <WaitEventEditor />]
]);
