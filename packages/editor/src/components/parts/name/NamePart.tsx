import { PartProps, usePartDirty, usePartState } from '../../editors';
import DocumentTable from './document/DocumentTable';
import { Collapsible, Fieldset, SummaryFieldset, SummaryTags, Tags, Textarea, useFieldset } from '../../widgets';
import { useNameData } from './useNameData';

export function useNamePart(options?: { hideTags?: boolean; disableName?: boolean }): PartProps {
  const { data, initData, resetData } = useNameData();
  const currentData = [data.name, data.description, data.docs, data.tags];
  const state = usePartState(['', '', [], []], currentData, []);
  const dirty = usePartDirty([initData.name, initData.description, initData.docs, initData.tags], currentData);
  return {
    name: 'Name',
    state,
    reset: { dirty, action: () => resetData() },
    content: <NamePart hideTags={options?.hideTags} disableName={options?.disableName} />,
    summary: <NameSummary hideTags={options?.hideTags} />
  };
}

const NamePart = (props: { hideTags?: boolean; disableName?: boolean }) => {
  const { data, update } = useNameData();

  const nameField = useFieldset();
  const descriptionField = useFieldset();
  return (
    <>
      <Fieldset label='Display name' {...nameField.labelProps}>
        <Textarea
          maxRows={3}
          disabled={!!props.disableName}
          value={data.name}
          onChange={change => update('name', change)}
          {...nameField.inputProps}
        />
      </Fieldset>
      <Fieldset label='Description' {...descriptionField.labelProps}>
        <Textarea
          maxRows={10}
          value={data.description}
          onChange={change => update('description', change)}
          {...descriptionField.inputProps}
        />
      </Fieldset>
      <Collapsible label='Means / Documents' defaultOpen={data.docs !== undefined && data.docs.length > 0}>
        <DocumentTable data={data.docs} onChange={change => update('docs', change)} />
      </Collapsible>
      {!props.hideTags && (
        <Collapsible label='Tags' defaultOpen={data.tags !== undefined && data.tags.length > 0}>
          <Tags tags={data.tags ?? []} onChange={change => update('tags', change)} />
        </Collapsible>
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
