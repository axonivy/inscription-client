import { useEffect, useMemo, useState } from 'react';
import { useClient, useData, useValidation } from '../../../context';
import SelectDialogPart, { DialogStartItem } from './SelectDialogPart';
import { TabProps, useTabState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { CollapsiblePart } from '../../../components/widgets';
import MappingTreeWithCode from './MappingTreeWithCode';

function useCallTabValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/dialog');
  return [dialog];
}

export function useCallTab(): TabProps {
  const [initData, data] = useData('callData');
  const validation = useCallTabValidation();
  const tabState = useTabState(initData, data, validation);
  return { name: 'Call', state: tabState, content: <CallTab /> };
}

const CallTab = () => {
  const [, mappingData, setMappingData] = useData('config/call');
  const [, dialogStart, setDialogStarts] = useData('config/dialog');
  const [dialogStartItems, setDialogStartItems] = useState<DialogStartItem[]>([]);

  const [dialogValidation] = useCallTabValidation();

  const client = useClient();
  useEffect(() => {
    client.dialogStarts().then(dialogStarts =>
      setDialogStartItems(
        dialogStarts.map(dialogStart => {
          return { ...dialogStart, value: dialogStart.id };
        })
      )
    );
  }, [client]);

  const mappingTree = useMemo(() => {
    return dialogStartItems.find(ds => ds.id === dialogStart)?.callParameter;
  }, [dialogStart, dialogStartItems]);

  return (
    <>
      <SelectDialogPart dialogStart={dialogStart} onChange={setDialogStarts} dialogStarts={dialogStartItems} message={dialogValidation} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={true}>
        <MappingTreeWithCode data={mappingData} onChange={setMappingData} mappingTree={mappingTree} message={undefined} />
      </CollapsiblePart>
    </>
  );
};
