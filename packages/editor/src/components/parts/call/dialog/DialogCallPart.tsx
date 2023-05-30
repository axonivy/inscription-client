import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext, useValidation } from '../../../../context';
import { PartProps, usePartState } from '../../../props';
import { InscriptionValidation, MappingInfo } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useDialogCallData } from '../useCallData';
import CallSelect, { CallableStartItem } from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, FieldsetControl, useFieldset } from '../../../../components/widgets';
import { NewHtmlDialogAction } from './new-html-dialog-action';

function useCallPartValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/dialog');
  return [dialog];
}

export function useDialogCallPart(): PartProps {
  const validation = useCallPartValidation();
  const { callData, defaultData } = useCallData();
  const { dialogCallData, defaultDialogData } = useDialogCallData();
  const state = usePartState([defaultData.call, defaultDialogData.dialog], [callData.call, dialogCallData.dialog], validation);
  return { name: 'Call', state, content: <DialogCallPart /> };
}

const DialogCallPart = () => {
  const { dialogCallData, updateDialog } = useDialogCallData();
  const [startItems, setStartItems] = useState<CallableStartItem[]>([]);
  const [dialogValidation] = useCallPartValidation();

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.dialogStarts(editorContext.pid).then(starts => setStartItems(CallableStartItem.map(starts)));
  }, [client, editorContext.pid]);

  const mappingInfo = useMemo<MappingInfo>(
    () => startItems.find(ds => ds.id === dialogCallData.dialog)?.callParameter ?? { variables: [], types: {} },
    [dialogCallData.dialog, startItems]
  );

  const callField = useFieldset();

  const fieldsetControls: FieldsetControl[] = [
    { label: 'Create new Html Dialog', icon: IvyIcons.Add, action: () => client.action(NewHtmlDialogAction.create(editorContext.pid)) }
  ];

  return (
    <>
      <Fieldset label='Dialog' message={dialogValidation} {...callField.labelProps} controls={fieldsetControls}>
        <CallSelect
          start={dialogCallData.dialog}
          onChange={updateDialog}
          starts={startItems}
          startIcon={IvyIcons.InitStart}
          processIcon={IvyIcons.Dialogs}
          comboboxInputProps={callField.inputProps}
        />
      </Fieldset>
      <CallMapping mappingInfo={mappingInfo} />
    </>
  );
};
