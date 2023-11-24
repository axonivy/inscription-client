import type { PartProps } from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { ScriptInput, useFieldset } from '../../widgets/index.js';
import { useMeta, PathContext, useEditorContext, useValidations } from '../../../context/index.js';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ErrorThrowData } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { EventCodeItem } from '../common/index.js';
import { EventCodeSelect, PathFieldset } from '../common/index.js';
import { useErrorThrowData } from './useErrorThrowData.js';
import { eventCodeInfo } from '../../../utils/event-code.js';

export function useErrorThrowPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useErrorThrowData();
  const compareData = (data: ErrorThrowData) => [data.throws];
  const validations = useValidations(['throws']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Error',
    state,
    reset: { dirty, action: () => reset() },
    content: <ErrorThrowPart />
  };
}

const ErrorThrowPart = () => {
  const { config, update } = useErrorThrowData();
  const { context } = useEditorContext();
  const errorCodes = [
    ...useMeta('meta/workflow/errorCodes', { context, thrower: true }, []).data.map<EventCodeItem>(code => {
      return { ...code, value: code.eventCode, info: eventCodeInfo(code) };
    })
  ];

  const errorField = useFieldset();
  const causeField = useFieldset();
  return (
    <PathContext path='throws'>
      <PathFieldset label='Error Code to throw' {...errorField.labelProps} path='error'>
        <EventCodeSelect
          eventCode={config.throws.error}
          onChange={change => update('error', change)}
          eventCodes={errorCodes}
          eventIcon={IvyIcons.Error}
          comboboxInputProps={errorField.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Error Cause' {...causeField.labelProps} path='cause'>
        <ScriptInput
          value={config.throws.cause}
          onChange={change => update('cause', change)}
          type={IVY_SCRIPT_TYPES.BPM_ERROR}
          browsers={['attr', 'func', 'type']}
          {...causeField.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
