import { Fieldset, Input, useFieldset } from '../../widgets';
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
        <Input value={config.case.name} onChange={change => update('name', change)} {...nameFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='Description' {...descFieldset.labelProps}>
        <Input value={config.case.description} onChange={change => update('description', change)} {...descFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='Category' {...catFieldset.labelProps}>
        <Input value={config.case.category} onChange={change => update('category', change)} {...catFieldset.inputProps} />
      </Fieldset>
      <CustomFieldPart customFields={config.case.customFields} updateCustomFields={change => update('customFields', change)} />
    </>
  );
};
