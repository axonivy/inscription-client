import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import { useWebServiceData } from './useWebServiceData';
import { PathCollapsible, PathFieldset } from '../common';
import { Checkbox, ScriptInput, useFieldset } from '../../widgets';
import { deepEqual } from '../../../utils/equals';

export const Exception = () => {
  const { config, defaultConfig, updateException } = useWebServiceData();

  const conditionFieldset = useFieldset();
  const messageFieldset = useFieldset();

  return (
    <PathCollapsible path='exception' label='Exception' defaultOpen={!deepEqual(config.exception, defaultConfig.exception)}>
      <Checkbox label='Use exception handling' value={config.exception.enabled} onChange={change => updateException('enabled', change)} />
      <PathFieldset label='Condition' {...conditionFieldset.labelProps} path='condition'>
        <ScriptInput
          value={config.exception.condition}
          onChange={change => updateException('condition', change)}
          type={IVY_SCRIPT_TYPES.BOOLEAN}
          browsers={['attr', 'func', 'type']}
          {...conditionFieldset.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Message' {...messageFieldset.labelProps} path='message'>
        <ScriptInput
          value={config.exception.message}
          onChange={change => updateException('message', change)}
          type={IVY_SCRIPT_TYPES.STRING}
          browsers={['attr', 'func', 'type']}
          {...messageFieldset.inputProps}
        />
      </PathFieldset>
    </PathCollapsible>
  );
};
