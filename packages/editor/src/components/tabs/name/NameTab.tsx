import { useDataContext, useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import DocumentTable from './document/DocumentTable';
import { CollapsiblePart, Fieldset, ResetControl, Tags, Textarea } from '../../../components/widgets';
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

  return (
    <>
      <Fieldset label='Display name' htmlFor='displayName' controls={[ResetControl]} message={nameValidation}>
        <Textarea rows={1} id='displayName' value={data.name} onChange={change => updateName(change)} />
      </Fieldset>
      <Fieldset label='Description' htmlFor='description' message={descriptionValidation}>
        <Textarea rows={2} id='description' value={data.description} onChange={change => updateDescription(change)} />
      </Fieldset>
      <Fieldset label='Means / Documents' htmlFor='documents'>
        <DocumentTable data={data.docs ?? []} onChange={updateDocs} />
      </Fieldset>
      {!props.hideTags && (
        <CollapsiblePart collapsibleLabel='Tags' defaultOpen={data.tags !== undefined && data.tags.length > 0}>
          <Tags tags={data.tags ?? []} onChange={updateTags} />
        </CollapsiblePart>
      )}
    </>
  );
};
