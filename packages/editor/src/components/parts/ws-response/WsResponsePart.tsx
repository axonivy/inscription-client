import type { WsResponseData } from '@axonivy/inscription-protocol';
import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useWsResponseData } from './useWsResponseData';
import { ExceptionSelect, MappingPart, PathCollapsible, PathFieldset, ValidationFieldset } from '../common';
import { ScriptArea } from '../../widgets';
import useMaximizedCodeEditor from '../../browser/useMaximizedCodeEditor';

export function useWsResponsePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useWsResponseData();
  const validations = [...useValidations(['output']), ...useValidations(['exceptionHandler'])];
  const compareData = (data: WsResponseData) => [data.output, data.exceptionHandler];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Response', state: state, reset: { dirty, action: () => resetData() }, content: <WsResponsePart /> };
}

const WsResponsePart = () => {
  const { config, defaultConfig, update, updateOutput } = useWsResponseData();
  const { elementContext: context } = useEditorContext();
  const { data: variableInfo } = useMeta('meta/scripting/out', { context, location: 'output' }, { variables: [], types: {} });

  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();
  return (
    <>
      <PathContext path='output'>
        <MappingPart
          data={config.output.map}
          variableInfo={variableInfo}
          onChange={change => updateOutput('map', change)}
          browsers={['attr', 'func', 'type']}
        />
        <PathFieldset label='Code' path='code' controls={[maximizeCode]}>
          <ScriptArea
            maximizeState={maximizeState}
            value={config.output.code}
            onChange={change => updateOutput('code', change)}
            browsers={['attr', 'func', 'type']}
          />
        </PathFieldset>
      </PathContext>
      <PathCollapsible label='Error' defaultOpen={config.exceptionHandler !== defaultConfig.exceptionHandler} path='exceptionHandler'>
        <ValidationFieldset>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            staticExceptions={[IVY_EXCEPTIONS.webservice, IVY_EXCEPTIONS.ignoreException]}
          />
        </ValidationFieldset>
      </PathCollapsible>
    </>
  );
};
