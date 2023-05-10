import { Fieldset, Input } from '../../widgets';
import { TabProps, useTabState } from '../../props';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { useCaseData } from './useCaseData';

export function useCaseTab(): TabProps {
  const { caseData, defaultData } = useCaseData();
  const tabState = useTabState(defaultData.case, caseData.case, []);
  return { name: 'Case', state: tabState, content: <CaseTab /> };
}

const CaseTab = () => {
  const { caseData, updateName, updateDescription, updateCategory, updateCustomFields } = useCaseData();

  return (
    <>
      <Fieldset label='Name' htmlFor='caseName'>
        <Input id='caseName' value={caseData.case.name} onChange={change => updateName(change)} />
      </Fieldset>
      <Fieldset label='Description' htmlFor='caseDescription'>
        <Input id='caseDescription' value={caseData.case.description} onChange={change => updateDescription(change)} />
      </Fieldset>
      <Fieldset label='Category' htmlFor='caseCategory'>
        <Input id='caseCategory' value={caseData.case.category} onChange={change => updateCategory(change)} />
      </Fieldset>
      <CustomFieldPart customFields={caseData.case.customFields} updateCustomFields={updateCustomFields} />
    </>
  );
};
