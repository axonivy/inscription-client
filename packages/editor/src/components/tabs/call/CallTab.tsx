import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext, useValidation } from '../../../context';
import SelectDialogPart, { DialogStartItem } from './SelectDialogPart';
import { TabProps, useTabState } from '../../props';
import { InscriptionValidation, MappingInfo } from '@axonivy/inscription-protocol';
import { CollapsiblePart } from '../../../components/widgets';
import MappingTreeWithCode from './MappingTreeWithCode';
import { useCallData } from './useCallData';

function useCallTabValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/dialog');
  return [dialog];
}

export function useCallTab(): TabProps {
  const validation = useCallTabValidation();
  const tabState = useTabState({}, {}, validation);
  return { name: 'Call', state: tabState, content: <CallTab /> };
}

const CallTab = () => {
  const { data, updateDialog } = useCallData();
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
    () => dialogStartItems.find(ds => ds.id === data.config.dialog)?.callParameter ?? { variables: [], types: {} },
    [data.config.dialog, dialogStartItems]
  );

  return (
    <>
      <SelectDialogPart
        dialogStart={data.config.dialog ?? ''}
        onChange={updateDialog}
        dialogStarts={dialogStartItems}
        message={dialogValidation}
      />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={true}>
        <MappingTreeWithCode mappingInfo={mappingInfo} />
      </CollapsiblePart>
    </>
  );
};
