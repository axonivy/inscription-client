import type { InscriptionValidation, VariableInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { ScriptArea, useFieldset } from '../../widgets/index.js';
import { useCallData } from './useCallData.js';
import { PathContext, useValidations } from '../../../context/index.js';
import { MappingPart, PathFieldset } from '../common/index.js';

export function useCallPartValidation(): InscriptionValidation[] {
  return useValidations(['call']);
}

const CallMapping = ({ variableInfo }: { variableInfo: VariableInfo }) => {
  const { config, update } = useCallData();
  const codeFieldset = useFieldset();

  return (
    <PathContext path='call'>
      <MappingPart
        data={config.call.map}
        variableInfo={variableInfo}
        onChange={change => update('map', change)}
        browsers={['attr', 'func', 'type']}
      />
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea
          value={config.call.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};

export default memo(CallMapping);
