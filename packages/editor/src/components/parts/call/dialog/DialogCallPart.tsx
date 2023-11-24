import { useMemo } from 'react';
import { useMeta, useAction, useEditorContext, useValidations } from '../../../../context/index.js';
import type { PartProps } from '../../../editors/index.js';
import { usePartDirty, usePartState } from '../../../editors/index.js';
import type { CallData, DialogCallData, VariableInfo } from '@axonivy/inscription-protocol';
import CallMapping, { useCallPartValidation } from '../CallMapping.js';
import { useCallData, useDialogCallData } from '../useCallData.js';
import CallSelect from '../CallSelect.js';
import { IvyIcons } from '@axonivy/editor-icons';
import type { FieldsetControl } from '../../../../components/widgets/index.js';
import { useFieldset } from '../../../../components/widgets/index.js';
import { PathFieldset } from '../../common/index.js';

export function useDialogCallPart(): PartProps {
  const callData = useCallData();
  const targetData = useDialogCallData();
  const compareData = (callData: CallData, targetData: DialogCallData) => [callData.call, targetData.dialog];
  const dialogValidations = useValidations(['dialog']);
  const callValidations = useCallPartValidation();
  const state = usePartState(
    compareData(callData.defaultConfig, targetData.defaultConfig),
    compareData(callData.config, targetData.config),
    [...dialogValidations, ...callValidations]
  );
  const dirty = usePartDirty(compareData(callData.initConfig, targetData.initConfig), compareData(callData.config, targetData.config));
  return { name: 'Call', state, reset: { dirty, action: () => targetData.resetData() }, content: <DialogCallPart /> };
}

const DialogCallPart = () => {
  const { config, update } = useDialogCallData();

  const { context } = useEditorContext();
  const { data: startItems } = useMeta('meta/start/dialogs', context, []);

  const variableInfo = useMemo<VariableInfo>(
    () => startItems.find(start => start.id === config.dialog)?.callParameter ?? { variables: [], types: {} },
    [config.dialog, startItems]
  );

  const action = useAction('newHtmlDialog');
  const createDialog: FieldsetControl = { label: 'Create new Html Dialog', icon: IvyIcons.Plus, action: () => action() };
  const callField = useFieldset();
  return (
    <>
      <PathFieldset label='Dialog' {...callField.labelProps} controls={[createDialog]} path='dialog'>
        <CallSelect
          start={config.dialog}
          onChange={change => update('dialog', change)}
          starts={startItems}
          startIcon={IvyIcons.InitStart}
          comboboxInputProps={callField.inputProps}
        />
      </PathFieldset>
      <CallMapping variableInfo={variableInfo} />
    </>
  );
};
