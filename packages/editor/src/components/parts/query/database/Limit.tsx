import { ScriptInput, useFieldset } from '../../../../components/widgets/index.js';
import { PathFieldset, ValidationCollapsible } from '../../common/index.js';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import { useQueryData } from '../useQueryData.js';

export const Limit = () => {
  const { config, defaultConfig, update } = useQueryData();

  const limitFieldset = useFieldset();
  const offsetFieldset = useFieldset();
  return (
    <ValidationCollapsible
      label='Limit'
      defaultOpen={config.query.limit !== defaultConfig.query.limit || config.query.offset !== defaultConfig.query.offset}
      paths={['limit', 'offset']}
    >
      <PathFieldset label='Lot size' path='limit' {...limitFieldset.labelProps}>
        <ScriptInput
          value={config.query.limit}
          onChange={change => update('limit', change)}
          type={IVY_SCRIPT_TYPES.NUMBER}
          browsers={['attr', 'func', 'type']}
          {...limitFieldset.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Start index' path='offset' {...offsetFieldset.labelProps}>
        <ScriptInput
          value={config.query.offset}
          onChange={change => update('offset', change)}
          type={IVY_SCRIPT_TYPES.NUMBER}
          browsers={['attr', 'func', 'type']}
          {...offsetFieldset.inputProps}
        />
      </PathFieldset>
    </ValidationCollapsible>
  );
};
