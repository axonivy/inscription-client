import { useMemo } from 'react';
import { useAction, useEditorContext, useMeta, useValidations } from '../../../../context';
import { PartProps, usePartDirty, usePartState } from '../../../editors';
import { CallData, DialogCallData, VariableInfo } from '@axonivy/inscription-protocol';
import CallMapping, { useCallPartValidation } from '../CallMapping';
import { useCallData, useDialogCallData } from '../useCallData';
import CallSelect from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { FieldsetControl, useFieldset } from '../../../../components/widgets';
import { PathFieldset } from '../../common';

export function useDialogCallPart(): PartProps {
  const callData = useCallData();
  const targetData = useDialogCallData();
  const compareData = (callData: CallData, targetData: DialogCallData) => [callData.call, targetData.dialog];
  const dialogValidations = useValidations('dialog');
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
  const createDialog: FieldsetControl = { label: 'Create new Html Dialog', icon: IvyIcons.Add, action: () => action() };
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
