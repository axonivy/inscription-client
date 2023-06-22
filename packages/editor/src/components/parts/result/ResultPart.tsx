import { useEffect, useState } from 'react';
import { CodeEditor, CollapsiblePart, Fieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import MappingTree from '../common/mapping-tree/MappingTree';
import { useResultData } from './useResultData';
import { MappingInfo, Variable } from '@axonivy/inscription-protocol';
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
  const { data, updater } = useResultData();
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.resultMapping(editorContext.pid).then(mapping => {
      const resultType = mapping.variables[0].type;
      if (mapping.types[resultType]?.length !== data.result.params.length) {
        mapping.types[resultType] = data.result.params.map<Variable>(param => {
          return { attribute: param.name, type: param.type, simpleType: param.type, description: param.desc };
        });
      }
      setMappingInfo(mapping);
    });
  }, [client, editorContext.pid, data.result.params]);

  return (
    <>
      <CollapsiblePart collapsibleLabel='Result parameters'>
        <ParameterTable data={data.result.params} onChange={change => updater('params', change)} hideDesc={hideParamDesc} />
      </CollapsiblePart>
      <MappingTree data={data.result.map} mappingInfo={mappingInfo} onChange={change => updater('map', change)} location='result.code' />
      <Fieldset label='Code'>
        <CodeEditor code={data.result.code} onChange={change => updater('code', change)} location='result.code' />
      </Fieldset>
    </>
  );
};
