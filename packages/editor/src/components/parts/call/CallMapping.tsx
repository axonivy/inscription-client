import { MappingInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { CodeEditor, Fieldset } from '../../widgets';
import { useCallData } from './useCallData';
import MappingTree from '../common/mapping-tree/MappingTree';

const CallMapping = (props: { mappingInfo: MappingInfo }) => {
  const { callData, updater } = useCallData();

  return (
    <>
      <MappingTree
        data={callData.call.map}
        mappingInfo={props.mappingInfo}
        onChange={change => updater('map', change)}
        location='call.code'
      />
      <Fieldset label='Code' htmlFor='code'>
        <CodeEditor code={callData.call.code} onChange={change => updater('code', change)} location='call.code' />
      </Fieldset>
    </>
  );
};

export default memo(CallMapping);
