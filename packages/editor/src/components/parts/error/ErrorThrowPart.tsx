import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { ScriptInput, useFieldset } from '../../widgets';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ErrorThrowData } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { ClassifiedItem } from '../common';
import { ClassificationCombobox, PathFieldset } from '../common';
import { useErrorThrowData } from './useErrorThrowData';
import { classifiedItemInfo } from '../../../utils/event-code-categorie';

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
    ...useMeta('meta/workflow/errorCodes', { context, thrower: true }, []).data.map<ClassifiedItem>(code => {
      return { ...code, value: code.eventCode, info: classifiedItemInfo(code) };
    })
  ];

  const errorField = useFieldset();
  const causeField = useFieldset();
  return (
    <PathContext path='throws'>
      <PathFieldset label='Error Code to throw' {...errorField.labelProps} path='error'>
        <ClassificationCombobox
          value={config.throws.error}
          onChange={change => update('error', change)}
          data={errorCodes}
          icon={IvyIcons.Error}
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
