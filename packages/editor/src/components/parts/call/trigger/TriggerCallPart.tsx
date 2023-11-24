import { useMemo } from 'react';
import { useMeta, useAction, useEditorContext, useValidations } from '../../../../context/index.js';
import type { PartProps } from '../../../editors/index.js';
import { usePartDirty, usePartState } from '../../../editors/index.js';
import type { CallData, ProcessCallData, VariableInfo } from '@axonivy/inscription-protocol';
import CallMapping, { useCallPartValidation } from '../CallMapping.js';
import { useCallData, useProcessCallData } from '../useCallData.js';
import CallSelect from '../CallSelect.js';
import { IvyIcons } from '@axonivy/editor-icons';
import type { FieldsetControl } from '../../../../components/widgets/index.js';
import { useFieldset } from '../../../../components/widgets/index.js';
import { PathFieldset } from '../../common/index.js';

export function useTriggerCallPart(): PartProps {
  const callData = useCallData();
  const targetData = useProcessCallData();
  const compareData = (callData: CallData, targetData: ProcessCallData) => [callData.call, targetData.processCall];
  const triggerCallValidations = useValidations(['processCall']);
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
  const createProcess: FieldsetControl = { label: 'Create new Trigger Process', icon: IvyIcons.Plus, action: () => action() };
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
