import { usePartDirty, usePartState, type PartProps } from '../../editors/part/usePart';
import { useCaseData } from './useCaseData';
import type { CaseData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import Information from '../common/info/Information';
import CustomFieldTable from '../common/customfield/CustomFieldTable';

export function useCasePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useCaseData();
  const validaitons = useValidations(['case']);
  const compareData = (data: CaseData) => [data.case];
  const state = usePartState(compareData(defaultConfig), compareData(config), validaitons);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Case', state: state, reset: { dirty, action: () => resetData() }, content: <CasePart /> };
}

const CasePart = () => {
  const { config, defaultConfig, update } = useCaseData();

  return (
    <PathContext path='case'>
      <Information config={config.case} defaultConfig={defaultConfig.case} update={update} />
      <CustomFieldTable data={config.case.customFields} onChange={change => update('customFields', change)} type='CASE' />
    </PathContext>
  );
};
