import type { PartProps} from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useFieldset } from '../../widgets';
import { useErrorCatchData } from './useErrorCatchData';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ErrorCatchData } from '@axonivy/inscription-protocol';
import type { EventCodeItem} from '../common';
import { EventCodeSelect, PathFieldset } from '../common';
import { eventCodeInfo } from '../../../utils/event-code';

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
    { value: '', eventCode: '<< Empty >>', info: 'Catches all errors' },
    ...useMeta('meta/workflow/errorCodes', { context, thrower: false }, []).data.map<EventCodeItem>(code => {
      return { ...code, value: code.eventCode, info: eventCodeInfo(code) };
    })
  ];

  const errorField = useFieldset();
  return (
    <PathFieldset label='Error Code' {...errorField.labelProps} path='errorCode'>
      <EventCodeSelect
        eventCode={config.errorCode}
        onChange={change => updateError(change)}
        eventCodes={errorCodes}
        eventIcon={IvyIcons.ErrorEvent}
        comboboxInputProps={errorField.inputProps}
      />
    </PathFieldset>
  );
};
