import { MacroArea, MacroInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { useCaseData } from './useCaseData';
import { CaseData } from '@axonivy/inscription-protocol';
import { PathContext, usePartValidation } from '../../../context';
import { PathFieldset } from '../common/path/PathFieldset';

export function useCasePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useCaseData();
  const validaitons = usePartValidation('case');
  const compareData = (data: CaseData) => [data.case];
  const state = usePartState(compareData(defaultConfig), compareData(config), validaitons);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Case', state: state, reset: { dirty, action: () => resetData() }, content: <CasePart /> };
}

const CasePart = () => {
  const { config, update } = useCaseData();
  const nameFieldset = useFieldset();
  const descFieldset = useFieldset();
  const catFieldset = useFieldset();

  return (
    <PathContext path='case'>
      <PathFieldset label='Name' {...nameFieldset.labelProps} path='name'>
        <MacroInput value={config.case.name} onChange={change => update('name', change)} {...nameFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Description' {...descFieldset.labelProps} path='description'>
        <MacroArea value={config.case.description} onChange={change => update('description', change)} {...descFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Category' {...catFieldset.labelProps} path='category'>
        <MacroInput value={config.case.category} onChange={change => update('category', change)} {...catFieldset.inputProps} />
      </PathFieldset>
      <CustomFieldPart customFields={config.case.customFields} updateCustomFields={change => update('customFields', change)} type='CASE' />
    </PathContext>
  );
};
