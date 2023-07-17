import { InscriptionValidation, VariableInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { ScriptArea, useFieldset } from '../../widgets';
import { useCallData } from './useCallData';
import MappingTree from '../common/mapping-tree/MappingTree';
import { PathContext, usePartValidation } from '../../../context';
import { PathFieldset } from '../common/path/PathFieldset';

export function useCallPartValidation(): InscriptionValidation[] {
  return usePartValidation('call');
}

const CallMapping = ({ variableInfo }: { variableInfo: VariableInfo }) => {
  const { config, update } = useCallData();
  const codeFieldset = useFieldset();

  return (
    <PathContext path='call'>
      <MappingTree data={config.call.map} variableInfo={variableInfo} onChange={change => update('map', change)} />
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea value={config.call.code} onChange={change => update('code', change)} {...codeFieldset.inputProps} />
      </PathFieldset>
    </PathContext>
  );
};

export default memo(CallMapping);
