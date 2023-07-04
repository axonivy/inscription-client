import { VariableInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { Fieldset, ScriptArea, useFieldset } from '../../widgets';
import { useCallData } from './useCallData';
import MappingTree from '../common/mapping-tree/MappingTree';

const CallMapping = ({ variableInfo }: { variableInfo: VariableInfo }) => {
  const { config, update } = useCallData();
  const codeFieldset = useFieldset();

  return (
    <>
      <MappingTree data={config.call.map} variableInfo={variableInfo} onChange={change => update('map', change)} location='call.code' />
      <Fieldset label='Code' {...codeFieldset.labelProps}>
        <ScriptArea
          value={config.call.code}
          onChange={change => update('code', change)}
          location='call.code'
          {...codeFieldset.inputProps}
        />
      </Fieldset>
    </>
  );
};

export default memo(CallMapping);
