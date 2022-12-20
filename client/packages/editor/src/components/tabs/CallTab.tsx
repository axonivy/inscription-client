import { useEffect, useMemo, useState } from 'react';
import { useClient, useData, useValidation, useValidations } from '../../context';
import '../../../style/CallTab.css';
import { DialogStartItem } from '../props/combobox';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import MappingTreeWithCode from '../widgets/MappingTreeWithCode';
import SelectDialog from '../widgets/SelectDialog';
import { TabProps, useTabState } from '../props';

export function useCallTab(): TabProps {
  const [initData, data] = useData('callData');
  const validation = useValidations('callData');
  const tabState = useTabState(initData, data, validation);
  return { name: 'Call', state: tabState, content: <CallTab /> };
}

const CallTab = () => {
  const [, mappingData, setMappingData] = useData('callData/mappingData');
  const [, dialogStart, setDialogStarts] = useData('callData/dialogStart');
  const [dialogStartItems, setDialogStartItems] = useState<DialogStartItem[]>([]);
  const dialogStartValidation = useValidation('callData/dialogStart');

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
    <div className='call-tab'>
      <SelectDialog dialogStart={dialogStart} onChange={setDialogStarts} dialogStarts={dialogStartItems} message={dialogStartValidation} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={true}>
        <MappingTreeWithCode data={mappingData} onChange={setMappingData} mappingTree={mappingTree} message={undefined} />
      </CollapsiblePart>
    </div>
  );
};
