import { useDataContext, useReadonly, useValidation } from '../../../context';
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

export function useNameTab(options?: { hideTags?: boolean }): TabProps {
  const validation = useNameTabValidation();
  const { data } = useDataContext();
  const tabState = useTabState(['', '', [], []], [data.name, data.description, data.docs, data.tags], validation);
  return { name: 'Name', state: tabState, content: <NameTab hideTags={options?.hideTags} /> };
}

const NameTab = (props: { hideTags?: boolean }) => {
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
      {!props.hideTags && (
        <CollapsiblePart collapsibleLabel='Tags' defaultOpen={data.tags !== undefined && data.tags.length > 0}>
          <Tags tags={data.tags ?? []} onChange={updateTags} />
        </CollapsiblePart>
      )}
    </>
  );
};
