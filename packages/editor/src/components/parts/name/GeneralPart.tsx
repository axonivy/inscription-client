import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import DocumentTable from './document/DocumentTable.js';
import { Collapsible, Fieldset, Tags, Textarea, useFieldset } from '../../widgets/index.js';
import { useGeneralData } from './useGeneralData.js';

export function useGeneralPart(options?: { hideTags?: boolean; disableName?: boolean }): PartProps {
  const { data, initData, resetData } = useGeneralData();
  const currentData = [data.name, data.description, data.docs, data.tags];
  const state = usePartState(['', '', [], []], currentData, []);
  const dirty = usePartDirty([initData.name, initData.description, initData.docs, initData.tags], currentData);
  return {
    name: 'General',
    state,
    reset: { dirty, action: () => resetData() },
    content: <GeneralPart hideTags={options?.hideTags} disableName={options?.disableName} />
  };
}

const GeneralPart = (props: { hideTags?: boolean; disableName?: boolean }) => {
  const { data, update } = useGeneralData();

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
