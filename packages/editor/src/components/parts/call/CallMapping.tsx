import { MappingInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { CodeEditor, Fieldset } from '../../widgets';
import { useCallData } from './useCallData';
import MappingTree from '../common/mapping-tree/MappingTree';

const CallMapping = (props: { mappingInfo: MappingInfo }) => {
  const { config, update } = useCallData();

  return (
    <>
      <MappingTree data={config.call.map} mappingInfo={props.mappingInfo} onChange={change => update('map', change)} location='call.code' />
      <Fieldset label='Code' htmlFor='code'>
        <CodeEditor code={config.call.code} onChange={change => update('code', change)} location='call.code' />
      </Fieldset>
    </>
  );
};

export default memo(CallMapping);
