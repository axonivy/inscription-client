import { Fieldset, Input } from '../../widgets';
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
  return (
    <>
      <Fieldset label='Name' htmlFor='caseName'>
        <Input id='caseName' value={config.case.name} onChange={change => update('name', change)} />
      </Fieldset>
      <Fieldset label='Description' htmlFor='caseDescription'>
        <Input id='caseDescription' value={config.case.description} onChange={change => update('description', change)} />
      </Fieldset>
      <Fieldset label='Category' htmlFor='caseCategory'>
        <Input id='caseCategory' value={config.case.category} onChange={change => update('category', change)} />
      </Fieldset>
      <CustomFieldPart customFields={config.case.customFields} updateCustomFields={change => update('customFields', change)} />
    </>
  );
};
