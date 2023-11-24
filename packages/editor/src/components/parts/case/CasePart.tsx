import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useCaseData } from './useCaseData.js';
import type { CaseData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context/index.js';
import { CustomFieldPart } from '../common/index.js';
import Information from '../common/info/Information.js';

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
