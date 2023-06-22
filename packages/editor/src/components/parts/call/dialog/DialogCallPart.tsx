import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext, useValidation } from '../../../../context';
import { PartProps, usePartDirty, usePartState } from '../../../props';
import { CallData, CallableStart, DialogCallData, InscriptionValidation, MappingInfo } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useDialogCallData } from '../useCallData';
import CallSelect from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, FieldsetControl, useFieldset } from '../../../../components/widgets';
import { NewHtmlDialogAction } from './new-html-dialog-action';

function useCallPartValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/dialog');
  return [dialog];
}

export function useDialogCallPart(): PartProps {
  const validation = useCallPartValidation();
  const callData = useCallData();
  const targetData = useDialogCallData();
  const compareData = (callData: CallData, targetData: DialogCallData) => [callData.call, targetData.dialog];
  const state = usePartState(
    compareData(callData.defaultConfig, targetData.defaultConfig),
    compareData(callData.config, targetData.config),
    validation
  );
  const dirty = usePartDirty(compareData(callData.initConfig, targetData.initConfig), compareData(callData.config, targetData.config));
  return { name: 'Call', state, reset: { dirty, action: () => targetData.resetData() }, content: <DialogCallPart /> };
}

const DialogCallPart = () => {
  const { config, update } = useDialogCallData();
  const [startItems, setStartItems] = useState<CallableStart[]>([]);
  const [dialogValidation] = useCallPartValidation();

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.dialogStarts(editorContext.pid).then(starts => setStartItems(starts));
  }, [client, editorContext.pid]);

  const mappingInfo = useMemo<MappingInfo>(
    () => startItems.find(ds => ds.id === config.dialog)?.callParameter ?? { variables: [], types: {} },
    [config.dialog, startItems]
  );

  const callField = useFieldset();

  const fieldsetControls: FieldsetControl[] = [
    { label: 'Create new Html Dialog', icon: IvyIcons.Add, action: () => client.action(NewHtmlDialogAction.create(editorContext.pid)) }
  ];

  return (
    <>
      <Fieldset label='Dialog' message={dialogValidation} {...callField.labelProps} controls={fieldsetControls}>
        <CallSelect
          start={config.dialog}
          onChange={change => update('dialog', change)}
          starts={startItems}
          startIcon={IvyIcons.InitStart}
          comboboxInputProps={callField.inputProps}
        />
      </Fieldset>
      <CallMapping mappingInfo={mappingInfo} />
    </>
  );
};
