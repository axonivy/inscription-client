import { LabelInput } from '../../widgets';
import { useReadonly } from '../../../context';
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
  const readonly = useReadonly();

  return (
    <>
      <LabelInput label='Name' htmlFor='name'>
        <input
          className='input'
          id='name'
          value={caseData.case.name}
          onChange={event => updateName(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description'>
        <input
          className='input'
          id='description'
          value={caseData.case.description}
          onChange={event => updateDescription(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Category' htmlFor='category'>
        <input
          className='input'
          id='category'
          value={caseData.case.category}
          onChange={event => updateCategory(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <CustomFieldPart customFields={caseData.case.customFields} updateCustomFields={updateCustomFields} />
    </>
  );
};
