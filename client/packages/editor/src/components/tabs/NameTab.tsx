import { memo } from 'react';
import '../../../style/NameTab.css';
import { useData } from '../../context/useData';
import { MessageUtil } from '../props/message';
import { NameTabProps } from '../props/name-tab';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import LabelInput from '../widgets/label/LabelInput';
import DocumentTable from '../widgets/table/DocumentTable';
import Tags from '../widgets/tag/Tags';

const NameTab = (props: NameTabProps) => {
  const [, displayName, setDisplayName] = useData('nameData/displayName');
  const [, description, setDescription] = useData('nameData/description');
  const [, documents, setDocuments] = useData('nameData/documents');
  const [, tags, setTags] = useData('nameData/tags');

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName' message={MessageUtil.findMessage(props.messages, 'name')}>
        <input className='input' type='text' id='displayName' value={displayName} onChange={event => setDisplayName(event.target.value)} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description' message={MessageUtil.findMessage(props.messages, 'description')}>
        <input className='input' type='text' id='description' value={description} onChange={event => setDescription(event.target.value)} />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        <DocumentTable data={documents} onChange={setDocuments} />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={tags.length > 0}>
        <Tags tags={tags} onChange={setTags} />
      </CollapsiblePart>
    </div>
  );
};

export default memo(NameTab);
