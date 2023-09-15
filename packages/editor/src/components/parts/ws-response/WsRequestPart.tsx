import { IVY_EXCEPTIONS, WsResponseData } from '@axonivy/inscription-protocol';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useWsResponseData } from './useWsRequestData';
import { ExceptionSelect, IGNROE_EXCEPTION, MappingPart, PathCollapsible, PathFieldset, ValidationFieldset } from '../common';
import { ScriptArea, useFieldset } from '../../../components/widgets';

export function useWsResponsePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useWsResponseData();
  const validations = [...useValidations(['output']), ...useValidations(['exceptionHandler'])];
  const compareData = (data: WsResponseData) => [data.output, data.exceptionHandler];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Response', state: state, reset: { dirty, action: () => resetData() }, content: <WsRequestPart /> };
}

const WsRequestPart = () => {
  const { config, defaultConfig, update, updateOutput } = useWsResponseData();
  const { context } = useEditorContext();
  const { data: variableInfo } = useMeta('meta/scripting/out', { context, location: 'output' }, { variables: [], types: {} });

  const codeFieldset = useFieldset();
  return (
    <>
      <PathContext path='output'>
        <MappingPart data={config.output.map} variableInfo={variableInfo} onChange={change => updateOutput('map', change)} />
        <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
          <ScriptArea value={config.output.code} onChange={change => updateOutput('code', change)} {...codeFieldset.inputProps} />
        </PathFieldset>
      </PathContext>
      <PathCollapsible label='Error' defaultOpen={config.exceptionHandler !== defaultConfig.exceptionHandler} path='exceptionHandler'>
        <ValidationFieldset>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            staticExceptions={[IVY_EXCEPTIONS.webservice, IGNROE_EXCEPTION]}
          />
        </ValidationFieldset>
      </PathCollapsible>
    </>
  );
};