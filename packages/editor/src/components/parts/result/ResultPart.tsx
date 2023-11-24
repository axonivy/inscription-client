import { useEffect } from 'react';
import { Collapsible, ScriptArea, useFieldset } from '../../widgets/index.js';
import type { PartProps } from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useResultData } from './useResultData.js';
import type { ResultData } from '@axonivy/inscription-protocol';
import { useMeta, PathContext, useEditorContext, useValidations } from '../../../context/index.js';
import { MappingPart, ParameterTable, PathFieldset } from '../common/index.js';
import { useQueryClient } from '@tanstack/react-query';

export function useResultPart(props?: { hideParamDesc?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useResultData();
  const compareData = (data: ResultData) => [data.result];
  const validations = useValidations(['result']);
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

  const { elementContext: context } = useEditorContext();
  const { data: variableInfo } = useMeta('meta/scripting/out', { context, location: 'result' }, { variables: [], types: {} });
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['meta/scripting/out'] });
  }, [config.result.params, queryClient]);

  const codeFieldset = useFieldset();
  return (
    <PathContext path='result'>
      <Collapsible label='Result parameters'>
        <ParameterTable data={config.result.params} onChange={change => update('params', change)} hideDesc={hideParamDesc} />
      </Collapsible>
      <MappingPart
        data={config.result.map}
        variableInfo={variableInfo}
        onChange={change => update('map', change)}
        browsers={['attr', 'func', 'type']}
      />
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea
          value={config.result.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
