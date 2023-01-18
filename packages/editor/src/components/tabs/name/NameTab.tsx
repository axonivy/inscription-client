import { useReadonly, useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import DocumentTable from './document/DocumentTable';
import { CollapsiblePart, LabelInput, Tags } from '../../../components/widgets';
import { useNameData } from './useNameData';

function useNameTabValidation(): InscriptionValidation[] {
  const name = useValidation('name');
  const description = useValidation('description');
  return [name, description];
}

export function useNameTab(): TabProps {
  const validation = useNameTabValidation();
  const tabState = useTabState({}, {}, validation);
  return { name: 'Name', state: tabState, content: <NameTab /> };
}

const NameTab = () => {
  const { data, updateName, updateDescription, updateDocs, updateTags } = useNameData();
  const [nameValidation, descriptionValidation] = useNameTabValidation();
  const readonly = useReadonly();

  return (
    <>
      <LabelInput label='Display name' htmlFor='displayName' message={nameValidation}>
        <textarea
          rows={1}
          className='input'
          id='displayName'
          value={data.name ?? ''}
          onChange={event => updateName(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description' message={descriptionValidation}>
        <textarea
          rows={2}
          className='input'
          id='description'
          value={data.description ?? ''}
          onChange={event => updateDescription(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        <DocumentTable data={data.docs ?? []} onChange={updateDocs} />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={data.tags !== undefined && data.tags.length > 0}>
        <Tags tags={data.tags ?? []} onChange={updateTags} />
      </CollapsiblePart>
    </>
  );
};
