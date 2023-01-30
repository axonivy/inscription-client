import { DEFAULT_OUTPUT_DATA, MappingInfo } from '@axonivy/inscription-protocol';
import { useEffect, useState } from 'react';
import { CodeEditor, LabelInput, MappingTree } from '../../../components/widgets';
import { useClient, useEditorContext } from '../../../context';
import { TabProps, useTabState } from '../../props';
import { useOutputData } from './useOutputData';

export function useOutputTab(options?: { hideCode?: boolean }): TabProps {
  const { outputData } = useOutputData();

  const tabState = useTabState(
    [DEFAULT_OUTPUT_DATA.output.map, options?.hideCode ? '' : DEFAULT_OUTPUT_DATA.output.code],
    [outputData.output.map, options?.hideCode ? '' : outputData.output.code],
    []
  );
  return { name: 'Output', state: tabState, content: <OutputTab showCode={!options?.hideCode} /> };
}

const OutputTab = (props: { showCode?: boolean }) => {
  const { outputData, updateMap, updateCode } = useOutputData();
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outMapping(editorContext.pid).then(mapping => setMappingInfo(mapping));
  }, [client, editorContext.pid]);

  return (
    <>
      <MappingTree data={outputData.output.map} mappingInfo={mappingInfo} onChange={updateMap} location='output.code' />
      {props.showCode && (
        <LabelInput label='Code' htmlFor='code'>
          <CodeEditor code={outputData.output.code} onChange={updateCode} location='output.code' />
        </LabelInput>
      )}
    </>
  );
};
