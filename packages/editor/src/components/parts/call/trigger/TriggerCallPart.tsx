import { useMemo } from 'react';
import { useAction, useEditorContext, useMeta, useValidations } from '../../../../context';
import { PartProps, usePartDirty, usePartState } from '../../../editors';
import { CallData, ProcessCallData, VariableInfo } from '@axonivy/inscription-protocol';
import CallMapping, { useCallPartValidation } from '../CallMapping';
import { useCallData, useProcessCallData } from '../useCallData';
import CallSelect from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { FieldsetControl, useFieldset } from '../../../../components/widgets';
import { PathFieldset } from '../../common';

export function useTriggerCallPart(): PartProps {
  const callData = useCallData();
  const targetData = useProcessCallData();
  const compareData = (callData: CallData, targetData: ProcessCallData) => [callData.call, targetData.processCall];
  const triggerCallValidations = useValidations('processCall');
  const callValidations = useCallPartValidation();
  const state = usePartState(
    compareData(callData.defaultConfig, targetData.defaultConfig),
    compareData(callData.config, targetData.config),
    [...triggerCallValidations, ...callValidations]
  );
  const dirty = usePartDirty(compareData(callData.initConfig, targetData.initConfig), compareData(callData.config, targetData.config));
  return { name: 'Trigger', state, reset: { dirty, action: () => targetData.resetData() }, content: <TriggerCallPart /> };
}

const TriggerCallPart = () => {
  const { config, update } = useProcessCallData();

  const { context } = useEditorContext();
  const { data: startItems } = useMeta('meta/start/triggers', context, []);

  const variableInfo = useMemo<VariableInfo>(
    () => startItems.find(start => start.id === config.processCall)?.callParameter ?? { variables: [], types: {} },
    [config.processCall, startItems]
  );

  const action = useAction('newProcess');
  const createProcess: FieldsetControl = { label: 'Create new Trigger Process', icon: IvyIcons.Add, action: () => action() };
  const callField = useFieldset();
  return (
    <>
      <PathFieldset label='Process start' {...callField.labelProps} controls={[createProcess]} path='processCall'>
        <CallSelect
          start={config.processCall}
          onChange={change => update('processCall', change)}
          starts={startItems}
          startIcon={IvyIcons.Start}
          comboboxInputProps={callField.inputProps}
        />
      </PathFieldset>
      <CallMapping variableInfo={variableInfo} />
    </>
  );
};
