import './NameTab.css';
import { useData, useValidation, useValidations } from '../../context';
import { TabProps, useTabState } from '../props';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import LabelInput from '../widgets/label/LabelInput';
import DocumentTable from '../widgets/table/DocumentTable';
import Tags from '../widgets/tag/Tags';

export function useNameTab(): TabProps {
  const [initData, data] = useData('nameData');
  const validation = useValidations('nameData');
  const tabState = useTabState(initData, data, validation);
  return { name: 'Name', state: tabState, content: <NameTab /> };
}

const NameTab = () => {
  const [, displayName, setDisplayName] = useData('nameData/displayName');
  const [, description, setDescription] = useData('nameData/description');
  const [, documents, setDocuments] = useData('nameData/documents');
  const [, tags, setTags] = useData('nameData/tags');

  const displayNameValidation = useValidation('nameData/displayName');
  const descripitonValidation = useValidation('nameData/description');

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName' message={displayNameValidation}>
        <input className='input' type='text' id='displayName' value={displayName} onChange={event => setDisplayName(event.target.value)} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description' message={descripitonValidation}>
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
