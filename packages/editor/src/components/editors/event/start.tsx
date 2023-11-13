/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';

import {
  useCasePart,
  useSignalCatchPart,
  useGeneralPart,
  useOutputPart,
  useTaskPart,
  useStartPart,
  useErrorCatchPart,
  useTriggerPart,
  useRequestPart,
  useProgramStartPart,
  useConfigurationPart
} from '../../../components/parts';

const RequestStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useStartPart();
  const request = useRequestPart();
  const trigger = useTriggerPart();
  const task = useTaskPart({ type: 'request' });
  const casePart = useCasePart();
  return <InscriptionEditor icon={IvyIcons.Start} parts={[name, start, request, trigger, task, casePart]} />;
});

const SignalStartEventEditor = memo(() => {
  const name = useGeneralPart();
  const signal = useSignalCatchPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Signal} parts={[name, signal, output]} />;
});

const ErrorStartEventEditor = memo(() => {
  const name = useGeneralPart();
  const error = useErrorCatchPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} parts={[name, error, output]} />;
});

const ProgramStartEditor = memo(() => {
  const name = useGeneralPart();
  const start = useProgramStartPart();
  const configuration = useConfigurationPart();
  return <InscriptionEditor icon={IvyIcons.StartProgram} parts={[name, start, configuration]} />;
});

export const startEventEditors = new Map<ElementType, ReactNode>([
  ['RequestStart', <RequestStartEditor />],
  ['SignalStartEvent', <SignalStartEventEditor />],
  ['ProgramStart', <ProgramStartEditor />],
  ['ErrorStartEvent', <ErrorStartEventEditor />]
]);
