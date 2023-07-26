import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useFieldset } from '../../widgets';
import { useErrorCatchData } from './useErrorCatchData';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { useDefaultNameSyncher } from '../name/useNameSyncher';
import { ErrorCatchData } from '@axonivy/inscription-protocol';
import { EventCodeItem, EventCodeSelect, PathFieldset } from '../common';

export function useErrorCatchPart(): PartProps {
  const { config, defaultConfig, initConfig, update } = useErrorCatchData();
  const compareData = (data: ErrorCatchData) => [data.errorCode];
  const validations = useValidations('errorCode');
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Error',
    state,
    reset: { dirty, action: () => update('errorCode', initConfig.errorCode) },
    content: <ErrorCatchPart />
  };
}

const ErrorCatchPart = () => {
  const { config, update } = useErrorCatchData();
  const { context } = useEditorContext();
  const errorCodes = [
    { value: '', eventCode: '<< Empty >>', info: 'Catches all errors' },
    ...useMeta('meta/workflow/errorCodes', context, []).data.map<EventCodeItem>(code => {
      return { ...code, value: code.eventCode, info: code.usage > 0 ? `${code.project} > ${code.process} (${code.usage})` : undefined };
    })
  ];

  useDefaultNameSyncher({ synchName: config.errorCode });
  const errorField = useFieldset();
  return (
    <PathFieldset label='Error Code' {...errorField.labelProps} path='errorCode'>
      <EventCodeSelect
        eventCode={config.errorCode}
        onChange={change => update('errorCode', change)}
        eventCodes={errorCodes}
        eventIcon={IvyIcons.ErrorEvent}
        comboboxInputProps={errorField.inputProps}
      />
    </PathFieldset>
  );
};
