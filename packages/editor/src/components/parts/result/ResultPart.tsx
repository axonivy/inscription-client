import { useEffect } from 'react';
import { ScriptArea, useFieldset } from '../../widgets';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useResultData } from './useResultData';
import type { ResultData } from '@axonivy/inscription-protocol';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import { MappingPart, ParameterTable, PathFieldset } from '../common';
import { useQueryClient } from '@tanstack/react-query';
import useMaximizedCodeEditor from '../../browser/useMaximizedCodeEditor';

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
  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();

  return (
    <PathContext path='result'>
      <ParameterTable
        label='Result parameters'
        data={config.result.params}
        onChange={change => update('params', change)}
        hideDesc={hideParamDesc}
      />
      <MappingPart
        data={config.result.map}
        variableInfo={variableInfo}
        onChange={change => update('map', change)}
        browsers={['attr', 'func', 'type']}
      />
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code' controls={[maximizeCode]}>
        <ScriptArea
          maximizeState={maximizeState}
          value={config.result.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
