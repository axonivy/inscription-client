import { CallTabData } from '../../data/call-tab';
import { MappingData } from '../../data/mapping';
import { Message } from '../../data/message';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import MappingTreeWithCode from '../widgets/MappingTreeWithCode';
import SelectDialog from '../widgets/SelectDialog';
import './CallTab.css';

const CallTab = (props: { data: CallTabData; onChange: (change: CallTabData) => void; messages: Message[] }) => {
  const handleMappingChange = (change: MappingData) => props.onChange({ ...props.data, mappingData: change });

  return (
    <div className='call-tab'>
      <SelectDialog data={props.data} onChange={props.onChange} messages={props.messages} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={true}>
        <MappingTreeWithCode data={props.data.mappingData} onChange={handleMappingChange} messages={props.messages} />
      </CollapsiblePart>
    </div>
  );
};

export default CallTab;
