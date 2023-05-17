import { useValidation } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import DocumentTable from './document/DocumentTable';
import { CollapsiblePart, Fieldset, SummaryFieldset, SummaryTags, Tags, Textarea } from '../../widgets';
import { useNameData } from './useNameData';

function useNamePartValidation(): InscriptionValidation[] {
  const name = useValidation('name');
  const description = useValidation('description');
  return [name, description];
}

export function useNamePart(options?: { hideTags?: boolean }): PartProps {
  const validation = useNamePartValidation();
  const { data, initData, resetData } = useNameData();
  const currentData = [data.name, data.description, data.docs, data.tags];
  const state = usePartState(['', '', [], []], currentData, validation);
  const dirty = usePartDirty([initData.name, initData.description, initData.docs, initData.tags], currentData);
  return {
    name: 'Name',
    state,
    reset: { dirty, action: () => resetData() },
    content: <NamePart hideTags={options?.hideTags} />,
    summary: <NameSummary hideTags={options?.hideTags} />
  };
}

const NamePart = (props: { hideTags?: boolean }) => {
  const { data, initData, updateName, updateDescription, updateDocs, updateTags } = useNameData();
  const [nameValidation, descriptionValidation] = useNamePartValidation();

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

const NameSummary = (props: { hideTags?: boolean }) => {
  const { data } = useNameData();
  return (
    <>
      <SummaryFieldset data={data.name} weight='bold' />
      <SummaryFieldset data={data.description} />
      {!props.hideTags && <SummaryTags tags={data.tags ?? []} />}
    </>
  );
};
