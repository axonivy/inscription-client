import { ScriptArea, useFieldset } from '../../../../widgets/index.js';
import { PathFieldset } from '../../../common/index.js';
import { useRestRequestData } from '../../useRestRequestData.js';

export const RestJaxRsCode = () => {
  const { config, update } = useRestRequestData();

  const fieldset = useFieldset();
  return (
    <PathFieldset label='JAX-RS' path='code' {...fieldset.labelProps}>
      <ScriptArea
        value={config.code}
        onChange={change => update('code', change)}
        browsers={['attr', 'func', 'type']}
        {...fieldset.inputProps}
      />
    </PathFieldset>
  );
};
