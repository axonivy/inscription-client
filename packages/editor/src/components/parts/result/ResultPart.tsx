import { useEffect, useState } from 'react';
import { CodeEditor, CollapsiblePart, Fieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import MappingTree from '../common/mapping-tree/MappingTree';
import { useResultData } from './useResultData';
import { MappingInfo } from '@axonivy/inscription-protocol';
import { useClient, useEditorContext } from '../../../context';
import ParameterTable from '../common/parameter/ParameterTable';

export function useResultPart(props?: { hideParamDesc?: boolean }): PartProps {
  const { data, defaultData, initData, resetData } = useResultData();
  const state = usePartState(defaultData.result, data.result, []);
  const dirty = usePartDirty(initData.result, data.result);
  return {
    name: 'Result',
    state,
    reset: { dirty, action: () => resetData() },
    content: <ResultPart {...props} />
  };
}

const ResultPart = ({ hideParamDesc }: { hideParamDesc?: boolean }) => {
  const { data, updateParams, updateMap, updateCode } = useResultData();
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.resultMapping(editorContext.pid).then(mapping => setMappingInfo(mapping));
  }, [client, editorContext.pid]);

  return (
    <>
      <CollapsiblePart collapsibleLabel='Result parameters'>
        <ParameterTable data={data.result.params} onChange={change => updateParams(change)} hideDesc={hideParamDesc} />
      </CollapsiblePart>
      <MappingTree data={data.result.map} mappingInfo={mappingInfo} onChange={updateMap} location='result.code' />
      <Fieldset label='Code'>
        <CodeEditor code={data.result.code} onChange={updateCode} location='result.code' />
      </Fieldset>
    </>
  );
};
