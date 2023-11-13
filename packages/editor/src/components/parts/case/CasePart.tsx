import type { PartProps} from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useCaseData } from './useCaseData';
import type { CaseData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { CustomFieldPart } from '../common';
import Information from '../common/info/Information';

export function useCasePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useCaseData();
  const validaitons = useValidations(['case']);
  const compareData = (data: CaseData) => [data.case];
  const state = usePartState(compareData(defaultConfig), compareData(config), validaitons);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Case', state: state, reset: { dirty, action: () => resetData() }, content: <CasePart /> };
}

const CasePart = () => {
  const { config, update } = useCaseData();

  return (
    <PathContext path='case'>
      <Information config={config.case} update={update} />
      <CustomFieldPart customFields={config.case.customFields} updateCustomFields={change => update('customFields', change)} type='CASE' />
    </PathContext>
  );
};
