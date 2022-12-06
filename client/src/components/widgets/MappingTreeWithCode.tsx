import { Mapping, MappingData } from '../../data/mapping';
import { Message, MessageUtil } from '../../data/message';
import LabelInput from './label/LabelInput';
import MappingTree from './table/MappingTree';

const MappingTreeWithCode = (props: { data: MappingData; onChange: (change: MappingData) => void; messages: Message[] }) => {
  const handleMappingChange = (change: Mapping[]) => props.onChange({ ...props.data, mapping: change });
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange({ ...props.data, code: event.target.value });

  return (
    <>
      <LabelInput label='Mapping' htmlFor='mapping'>
        <MappingTree data={props.data.mapping} onChange={handleMappingChange} />
      </LabelInput>
      <LabelInput label='Code' htmlFor='code' message={MessageUtil.findMessage(props.messages, 'code')}>
        <textarea className='input' id='code' value={props.data.code} onChange={handleCodeChange} />
      </LabelInput>
    </>
  );
};

export default MappingTreeWithCode;
