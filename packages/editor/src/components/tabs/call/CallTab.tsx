import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext, useValidation } from '../../../context';
import SelectDialogPart, { DialogStartItem } from './SelectDialogPart';
import { TabProps, useTabState } from '../../props';
import { DEFAULT_CALL_DATA, InscriptionValidation, MappingInfo } from '@axonivy/inscription-protocol';
import { CollapsiblePart } from '../../../components/widgets';
import MappingTreeWithCode from './MappingTreeWithCode';
import { useCallData } from './useCallData';

function useCallTabValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/dialog');
  return [dialog];
}

export function useCallTab(): TabProps {
  const validation = useCallTabValidation();
  const { callData } = useCallData();
  const tabState = useTabState([DEFAULT_CALL_DATA.call, DEFAULT_CALL_DATA.dialog], [callData.call, callData.dialog], validation);
  return { name: 'Call', state: tabState, content: <CallTab /> };
}

const CallTab = () => {
  const { callData, updateDialog } = useCallData();
  const [dialogStartItems, setDialogStartItems] = useState<DialogStartItem[]>([]);
  const [dialogValidation] = useCallTabValidation();

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.dialogStarts(editorContext.pid).then(dialogStarts =>
      setDialogStartItems(
        dialogStarts.map(dialogStart => {
          return { ...dialogStart, value: dialogStart.id };
        })
      )
    );
  }, [client, editorContext.pid]);

  const mappingInfo = useMemo<MappingInfo>(
    () => dialogStartItems.find(ds => ds.id === callData.dialog)?.callParameter ?? { variables: [], types: {} },
    [callData.dialog, dialogStartItems]
  );

  return (
    <>
      <SelectDialogPart dialogStart={callData.dialog} onChange={updateDialog} dialogStarts={dialogStartItems} message={dialogValidation} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={true}>
        <MappingTreeWithCode mappingInfo={mappingInfo} />
      </CollapsiblePart>
    </>
  );
};
