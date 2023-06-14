import { useValidation } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import DocumentTable from './document/DocumentTable';
import { CollapsiblePart, Fieldset, SummaryFieldset, SummaryTags, Tags, Textarea, useFieldset } from '../../widgets';
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
  const { data, updateName, updateDescription, updateDocs, updateTags } = useNameData();
  const [nameValidation, descriptionValidation] = useNamePartValidation();

  const nameField = useFieldset();
  const descriptionField = useFieldset();

  return (
    <>
      <Fieldset label='Display name' message={nameValidation} {...nameField.labelProps}>
        <Textarea maxRows={3} value={data.name} onChange={change => updateName(change)} {...nameField.inputProps} />
      </Fieldset>
      <Fieldset label='Description' message={descriptionValidation} {...descriptionField.labelProps}>
        <Textarea maxRows={10} value={data.description} onChange={change => updateDescription(change)} {...descriptionField.inputProps} />
      </Fieldset>
      <CollapsiblePart collapsibleLabel='Means / Documents' defaultOpen={data.docs !== undefined && data.docs.length > 0}>
        <DocumentTable data={data.docs} onChange={change => updateDocs(change)} />
      </CollapsiblePart>
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
