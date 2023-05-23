import { MappingInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { CodeEditor, Fieldset } from '../../widgets';
import { useCallData } from './useCallData';
import MappingTree from '../common/mapping-tree/MappingTree';

const CallMapping = (props: { mappingInfo: MappingInfo }) => {
  const { callData, updateMap, updateCode } = useCallData();

  return (
    <>
      <MappingTree data={callData.call.map} mappingInfo={props.mappingInfo} onChange={updateMap} location='call.code' />
      <Fieldset label='Code' htmlFor='code'>
        <CodeEditor code={callData.call.code} onChange={updateCode} location='call.code' />
      </Fieldset>
    </>
  );
};

export default memo(CallMapping);
