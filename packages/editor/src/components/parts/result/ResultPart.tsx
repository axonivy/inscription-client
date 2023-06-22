import { useEffect, useState } from 'react';
import { CodeEditor, CollapsiblePart, Fieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import MappingTree from '../common/mapping-tree/MappingTree';
import { useResultData } from './useResultData';
import { MappingInfo, ResultData, Variable } from '@axonivy/inscription-protocol';
import { useClient, useEditorContext } from '../../../context';
import ParameterTable from '../common/parameter/ParameterTable';

export function useResultPart(props?: { hideParamDesc?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useResultData();
  const compareData = (data: ResultData) => [data.result];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Result',
    state,
    reset: { dirty, action: () => resetData() },
    content: <ResultPart {...props} />
  };
}

const ResultPart = ({ hideParamDesc }: { hideParamDesc?: boolean }) => {
  const { config, update } = useResultData();
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.resultMapping(editorContext.pid).then(mapping => {
      const resultType = mapping.variables[0].type;
      if (mapping.types[resultType]?.length !== config.result.params.length) {
        mapping.types[resultType] = config.result.params.map<Variable>(param => {
          return { attribute: param.name, type: param.type, simpleType: param.type, description: param.desc };
        });
      }
      setMappingInfo(mapping);
    });
  }, [client, editorContext.pid, config.result.params]);

  return (
    <>
      <CollapsiblePart collapsibleLabel='Result parameters'>
        <ParameterTable data={config.result.params} onChange={change => update('params', change)} hideDesc={hideParamDesc} />
      </CollapsiblePart>
      <MappingTree data={config.result.map} mappingInfo={mappingInfo} onChange={change => update('map', change)} location='result.code' />
      <Fieldset label='Code'>
        <CodeEditor code={config.result.code} onChange={change => update('code', change)} location='result.code' />
      </Fieldset>
    </>
  );
};
