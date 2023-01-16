import { useData, useReadonly, useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import DocumentTable from './document/DocumentTable';
import { CollapsiblePart, LabelInput, Tags } from '../../../components/widgets';

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
    <>
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
    </>
  );
};
