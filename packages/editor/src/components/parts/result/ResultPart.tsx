import { useEffect, useState } from 'react';
import { Collapsible, ScriptArea, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useResultData } from './useResultData';
import { ResultData, ScriptVariable } from '@axonivy/inscription-protocol';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import { MappingPart, ParameterTable, PathFieldset } from '../common';
import { deepEqual } from '../../../utils/equals';

export function useResultPart(props?: { hideParamDesc?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useResultData();
  const compareData = (data: ResultData) => [data.result];
  const validations = useValidations('result');
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
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
  const [params, setParams] = useState<ScriptVariable[]>([]);

  const { context } = useEditorContext();
  const { data: variableInfo, invalidate } = useMeta('meta/scripting/out', { context, location: 'result' }, { variables: [], types: {} });
  useEffect(() => {
    if (!deepEqual(params, config.result.params)) {
      invalidate();
      setParams(config.result.params);
    }
  }, [config.result.params, invalidate, params]);

  const codeFieldset = useFieldset();
  return (
    <PathContext path='result'>
      <Collapsible label='Result parameters'>
        <ParameterTable data={config.result.params} onChange={change => update('params', change)} hideDesc={hideParamDesc} />
      </Collapsible>
      <MappingPart data={config.result.map} variableInfo={variableInfo} onChange={change => update('map', change)} />
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea value={config.result.code} onChange={change => update('code', change)} {...codeFieldset.inputProps} />
      </PathFieldset>
    </PathContext>
  );
};
