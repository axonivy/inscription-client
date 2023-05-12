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

  return (
    <>
      <Fieldset
        label='Display name'
        htmlFor='displayName'
        reset={{ data: data.name, initData: initData.name, resetData: () => updateName(initData.name) }}
        message={nameValidation}
      >
        <Textarea rows={1} id='displayName' value={data.name} onChange={change => updateName(change)} />
      </Fieldset>
      <Fieldset
        label='Description'
        htmlFor='description'
        reset={{ data: data.description, initData: initData.description, resetData: () => updateDescription(initData.description) }}
        message={descriptionValidation}
      >
        <Textarea rows={2} id='description' value={data.description} onChange={change => updateDescription(change)} />
      </Fieldset>
      <Fieldset
        label='Means / Documents'
        htmlFor='documents'
        reset={{ data: data.docs, initData: initData.docs, resetData: () => updateDocs(initData.docs) }}
      >
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
