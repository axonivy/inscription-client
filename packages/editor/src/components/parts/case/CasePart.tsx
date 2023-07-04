import { Fieldset, MacroInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { useCaseData } from './useCaseData';
import { CaseData } from '@axonivy/inscription-protocol';

export function useCasePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useCaseData();
  const compareData = (data: CaseData) => [data.case];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Case', state: state, reset: { dirty, action: () => resetData() }, content: <CasePart /> };
}

const CasePart = () => {
  const { config, update } = useCaseData();
  const nameFieldset = useFieldset();
  const descFieldset = useFieldset();
  const catFieldset = useFieldset();

  return (
    <>
      <Fieldset label='Name' {...nameFieldset.labelProps}>
        <MacroInput
          value={config.case.name}
          onChange={change => update('name', change)}
          location='case.name'
          {...nameFieldset.inputProps}
        />
      </Fieldset>
      <Fieldset label='Description' {...descFieldset.labelProps}>
        <MacroInput
          value={config.case.description}
          onChange={change => update('description', change)}
          location='case.description'
          {...descFieldset.inputProps}
        />
      </Fieldset>
      <Fieldset label='Category' {...catFieldset.labelProps}>
        <MacroInput
          value={config.case.category}
          onChange={change => update('category', change)}
          location='case.category'
          {...catFieldset.inputProps}
        />
      </Fieldset>
      <CustomFieldPart customFields={config.case.customFields} updateCustomFields={change => update('customFields', change)} />
    </>
  );
};
