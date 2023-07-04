import { useEffect, useState } from 'react';
import { CollapsiblePart, Fieldset, ScriptArea, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import MappingTree from '../common/mapping-tree/MappingTree';
import { useResultData } from './useResultData';
import { VariableInfo, ResultData, Variable } from '@axonivy/inscription-protocol';
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
  const [variableInfo, setVariableInfo] = useState<VariableInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outScripting(editorContext.pid, 'result').then(info => {
      const resultType = info.variables[0].type;
      if (info.types[resultType]?.length !== config.result.params.length) {
        info.types[resultType] = config.result.params.map<Variable>(param => {
          return { attribute: param.name, type: param.type, simpleType: param.type, description: param.desc };
        });
      }
      setVariableInfo(info);
    });
  }, [client, editorContext.pid, config.result.params]);

  const codeFieldset = useFieldset();

  return (
    <>
      <CollapsiblePart collapsibleLabel='Result parameters'>
        <ParameterTable data={config.result.params} onChange={change => update('params', change)} hideDesc={hideParamDesc} />
      </CollapsiblePart>
      <MappingTree data={config.result.map} variableInfo={variableInfo} onChange={change => update('map', change)} location='result.code' />
      <Fieldset label='Code' {...codeFieldset.labelProps}>
        <ScriptArea
          value={config.result.code}
          onChange={change => update('code', change)}
          location='result.code'
          {...codeFieldset.inputProps}
        />
      </Fieldset>
    </>
  );
};
