import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useErrorCatchData } from './useErrorCatchData';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ErrorCatchData } from '@axonivy/inscription-protocol';
import type { ClassifiedItem } from '../common';
import { ClassificationCombobox, PathFieldset } from '../common';
import { classifiedItemInfo } from '../../../utils/event-code-categorie';

export function useErrorCatchPart(): PartProps {
  const { config, defaultConfig, initConfig, updateError } = useErrorCatchData();
  const compareData = (data: ErrorCatchData) => [data.errorCode];
  const validations = useValidations(['errorCode']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Error',
    state,
    reset: { dirty, action: () => updateError(initConfig.errorCode) },
    content: <ErrorCatchPart />
  };
}

const ErrorCatchPart = () => {
  const { config, updateError } = useErrorCatchData();
  const { context } = useEditorContext();
  const errorCodes = [
    { value: '', label: '<< Empty >>', info: 'Catches all errors' },
    ...useMeta('meta/workflow/errorCodes', { context, thrower: false }, []).data.map<ClassifiedItem>(code => {
      return { ...code, value: code.eventCode, info: classifiedItemInfo(code) };
    })
  ];

  return (
    <PathFieldset label='Error Code' path='errorCode'>
      <ClassificationCombobox value={config.errorCode} onChange={change => updateError(change)} data={errorCodes} icon={IvyIcons.Error} />
    </PathFieldset>
  );
};
