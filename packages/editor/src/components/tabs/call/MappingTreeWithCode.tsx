import { Variable } from '@axonivy/inscription-protocol';
import { memo } from 'react';
import { CodeEditor, LabelInput, MappingTree } from '../../../components/widgets';
import { useCallData } from './useCallData';

const MappingTreeWithCode = (props: { mappingTree?: Variable[] }) => {
  const { data, updateMap, updateCode } = useCallData();

  return (
    <>
      <LabelInput label='Mapping' htmlFor='mapping'>
        <MappingTree data={data.config.call?.map ?? []} mappingTree={props.mappingTree} onChange={updateMap} />
      </LabelInput>
      <LabelInput label='Code' htmlFor='code'>
        <CodeEditor code={data.config.call?.code ?? ''} onChange={code => updateCode(code ?? '')} location='call.code' />
      </LabelInput>
    </>
  );
};

export default memo(MappingTreeWithCode);
