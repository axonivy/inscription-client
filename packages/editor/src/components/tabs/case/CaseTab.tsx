import { LabelInput } from '../../widgets';
import { useReadonly } from '../../../context';
import { TabProps, TabState } from '../../props';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { useCaseData } from './useCaseData';

export function useCaseTab(): TabProps {
  return { name: 'Case', state: TabState.CONFIGURED, content: <CaseTab /> };
}

const CaseTab = () => {
  const { data, updateName, updateDescription, updateCategory, updateCustomFields } = useCaseData();
  const readonly = useReadonly();

  return (
    <>
      <LabelInput label='Name' htmlFor='name'>
        <input
          className='input'
          id='name'
          value={data.config.case?.name ?? ''}
          onChange={event => updateName(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description'>
        <input
          className='input'
          id='description'
          value={data.config.case?.description ?? ''}
          onChange={event => updateDescription(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='CAtegory' htmlFor='category'>
        <input
          className='input'
          id='category'
          value={data.config.case?.category ?? ''}
          onChange={event => updateCategory(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <CustomFieldPart customFields={data.config.case?.customFields} updateCustomFields={updateCustomFields} />
    </>
  );
};
