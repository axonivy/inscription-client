import './NameTab.css';
import { useData, useReadonly, useValidation } from '../../context';
import { TabProps, useTabState } from '../props';
import LabelInput from '../widgets/label/LabelInput';
import DocumentTable from '../widgets/table/DocumentTable';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import Tags from '../widgets/tag/Tags';
import { InscriptionValidation } from '@axonivy/inscription-core';

function useNameTabValidation(): InscriptionValidation[] {
  const name = useValidation('name');
  const description = useValidation('description');
  return [name, description];
}

export function useNameTab(): TabProps {
  const [initData, data] = useData('nameData');
  const validation = useNameTabValidation();
  const tabState = useTabState(initData, data, validation);
  return { name: 'Name', state: tabState, content: <NameTab /> };
}

const NameTab = () => {
  const [, displayName, setDisplayName] = useData('name');
  const [, description, setDescription] = useData('description');
  const [, documents, setDocuments] = useData('docs');
  const [, tags, setTags] = useData('tags');

  const [nameValidation, descriptionValidation] = useNameTabValidation();

  const readonly = useReadonly();

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName' message={nameValidation}>
        <textarea
          rows={1}
          className='input'
          id='displayName'
          value={displayName}
          onChange={event => setDisplayName(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description' message={descriptionValidation}>
        <textarea
          rows={2}
          className='input'
          id='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        <DocumentTable data={documents ?? []} onChange={setDocuments} />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={tags?.length > 0}>
        <Tags tags={tags ?? []} onChange={setTags} />
      </CollapsiblePart>
    </div>
  );
};
