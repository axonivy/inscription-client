import { MappingInfo } from '@axonivy/inscription-protocol';
import { useEffect, useState } from 'react';
import { CodeEditor, LabelInput, MappingTree } from '../../../components/widgets';
import { useClient, useEditorContext } from '../../../context';
import { TabProps } from '../../props';
import { useOutputData } from './useOutputData';

export function useOutputTab(options?: { hideCode?: boolean }): TabProps {
  return { name: 'Output', content: <OutputTab showCode={!options?.hideCode} /> };
}

const OutputTab = (props: { showCode?: boolean }) => {
  const { data, updateMap, updateCode } = useOutputData();
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outMapping(editorContext.pid).then(mapping => setMappingInfo(mapping));
  }, [client, editorContext.pid]);

  return (
    <>
      <MappingTree data={data.config.output?.map ?? []} mappingInfo={mappingInfo} onChange={updateMap} />
      {props.showCode && (
        <LabelInput label='Code' htmlFor='code'>
          <CodeEditor code={data.config.output?.code ?? ''} onChange={code => updateCode(code ?? '')} location='call.code' />
        </LabelInput>
      )}
    </>
  );
};
