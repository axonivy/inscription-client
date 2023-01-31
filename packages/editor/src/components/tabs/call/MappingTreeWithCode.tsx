import { MappingInfo } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { CodeEditor, LabelInput, MappingTree } from '../../../components/widgets';
import { useCallData } from './useCallData';

const MappingTreeWithCode = (props: { mappingInfo: MappingInfo }) => {
  const { callData, updateMap, updateCode } = useCallData();

  return (
    <>
      <MappingTree data={callData.call.map} mappingInfo={props.mappingInfo} onChange={updateMap} location='call.code' />
      <LabelInput label='Code' htmlFor='code'>
        <CodeEditor code={callData.call.code} onChange={updateCode} location='call.code' />
      </LabelInput>
    </>
  );
};

export default memo(MappingTreeWithCode);
