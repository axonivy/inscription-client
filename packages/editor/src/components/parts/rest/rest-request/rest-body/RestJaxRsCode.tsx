import { ScriptArea, useFieldset } from '../../../../widgets';
import { PathFieldset } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';

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
