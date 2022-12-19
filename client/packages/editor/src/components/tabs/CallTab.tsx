import { memo, useEffect, useMemo, useState } from 'react';
import { useClient } from '../../context';
import '../../../style/CallTab.css';
import { useData } from '../../context/useData';
import { CallTabProps } from '../props/call-tab';
import { DialogStartItem } from '../props/combobox';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import MappingTreeWithCode from '../widgets/MappingTreeWithCode';
import SelectDialog from '../widgets/SelectDialog';

const CallTab = (props: CallTabProps) => {
  const [, mappingData, setMappingData] = useData('callData/mappingData');
  const [, dialogStart] = useData('callData/dialogStart');
  const [dialogStarts, setDialogStarts] = useState<DialogStartItem[]>([]);

  const client = useClient();
  useEffect(() => {
    client.dialogStarts().then(dialogStarts =>
      setDialogStarts(
        dialogStarts.map(dialogStart => {
          return { ...dialogStart, value: dialogStart.id };
        })
      )
    );
  }, [client]);

  const mappingTree = useMemo(() => {
    return dialogStarts.find(ds => ds.id === dialogStart)?.callParameter;
  }, [dialogStart, dialogStarts]);

  return (
    <div className='call-tab'>
      <SelectDialog data={props.data} onChange={props.onChange} dialogStarts={dialogStarts} messages={props.messages} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={true}>
        <MappingTreeWithCode data={mappingData} onChange={setMappingData} mappingTree={mappingTree} messages={props.messages} />
      </CollapsiblePart>
    </div>
  );
};

export default memo(CallTab);
