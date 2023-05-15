import { useValidation } from '../../../context';
import { TabProps, useTabDirty, useTabState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import DocumentTable from './document/DocumentTable';
import { CollapsiblePart, Fieldset, Tags, Textarea } from '../../../components/widgets';
import { useNameData } from './useNameData';

function useNameTabValidation(): InscriptionValidation[] {
  const name = useValidation('name');
  const description = useValidation('description');
  return [name, description];
}

export function useNameTab(options?: { hideTags?: boolean }): TabProps {
  const validation = useNameTabValidation();
  const { data, initData, resetData } = useNameData();
  const currentData = [data.name, data.description, data.docs, data.tags];
  const tabState = useTabState(['', '', [], []], currentData, validation);
  const tabDirty = useTabDirty([initData.name, initData.description, initData.docs, initData.tags], currentData);
  return {
    name: 'Name',
    state: tabState,
    reset: { dirty: tabDirty, action: () => resetData() },
    content: <NameTab hideTags={options?.hideTags} />
  };
}

const NameTab = (props: { hideTags?: boolean }) => {
  const { data, initData, updateName, updateDescription, updateDocs, updateTags } = useNameData();
  const [nameValidation, descriptionValidation] = useNameTabValidation();

  const nameData = { data: data.name, initData: initData.name, updateData: updateName };
  const descriptionData = { data: data.description, initData: initData.description, updateData: updateDescription };
  const docsData = { data: data.docs, initData: initData.docs, updateData: updateDocs };

  return (
    <>
      <Fieldset label='Display name' htmlFor='displayName' data={nameData} message={nameValidation}>
        <Textarea rows={1} id='displayName' data={nameData} />
      </Fieldset>
      <Fieldset label='Description' htmlFor='description' data={descriptionData} message={descriptionValidation}>
        <Textarea rows={2} id='description' data={descriptionData} />
      </Fieldset>
      <Fieldset label='Means / Documents' data={docsData}>
        <DocumentTable data={docsData} />
      </Fieldset>
      {!props.hideTags && (
        <CollapsiblePart collapsibleLabel='Tags' defaultOpen={data.tags !== undefined && data.tags.length > 0}>
          <Tags tags={data.tags ?? []} onChange={updateTags} />
        </CollapsiblePart>
      )}
    </>
  );
};
