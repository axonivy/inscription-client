import type { RestResponseData } from '@axonivy/inscription-protocol';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useRestResponseData } from './useRestResponseData';
import { MappingPart, PathCollapsible, ValidationCollapsible, ValidationFieldset } from '../common';
import { ScriptArea } from '../../widgets';
import { RestError } from './rest-response/RestError';
import { RestEntityTypeCombobox, useShowRestEntityTypeCombo } from './RestEntityTypeCombobox';
import { useRestEntityTypeMeta, useRestResourceMeta } from './useRestResourceMeta';
import useMaximizedCodeEditor from '../../browser/useMaximizedCodeEditor';

export function useRestResponsePart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useRestResponseData();
  const validations = useValidations(['response']);
  const compareData = (data: RestResponseData) => [data.response];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Response', state: state, reset: { dirty, action: () => resetData() }, content: <RestResponsePart /> };
}

const useShowResultTypeCombo = (types: string[], currentType: string) => {
  const resource = useRestResourceMeta();
  return useShowRestEntityTypeCombo(types, currentType, resource?.method?.outResult);
};

const RestResponsePart = () => {
  const { config, defaultConfig, update, updateEntity } = useRestResponseData();
  const { elementContext: context } = useEditorContext();
  const { data: variableInfo } = useMeta('meta/scripting/out', { context, location: 'response' }, { variables: [], types: {} });
  const resultTypes = useRestEntityTypeMeta('result');
  const showResultType = useShowResultTypeCombo(resultTypes, config.response.entity.type);
  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();
  return (
    <PathContext path='response'>
      <PathContext path='entity'>
        {showResultType && (
          <PathCollapsible label='Result Type' path='type' defaultOpen={config.response.entity.type !== defaultConfig.response.entity.type}>
            <ValidationFieldset label='Read body as type (result variable)'>
              <RestEntityTypeCombobox
                value={config.response.entity.type}
                onChange={change => updateEntity('type', change)}
                items={resultTypes}
              />
            </ValidationFieldset>
          </PathCollapsible>
        )}
        <MappingPart
          data={config.response.entity.map}
          variableInfo={variableInfo}
          browsers={['attr', 'func', 'type']}
          onChange={change => updateEntity('map', change)}
        />
        <PathCollapsible
          label='Code'
          path='code'
          controls={[maximizeCode]}
          defaultOpen={config.response.entity.code !== defaultConfig.response.entity.code}
        >
          <ValidationFieldset>
            <ScriptArea
              maximizeState={maximizeState}
              value={config.response.entity.code}
              onChange={change => updateEntity('code', change)}
              browsers={['attr', 'func', 'type']}
            />
          </ValidationFieldset>
        </PathCollapsible>
      </PathContext>

      <ValidationCollapsible
        label='Error'
        defaultOpen={
          config.response.clientError !== defaultConfig.response.clientError ||
          config.response.statusError !== defaultConfig.response.statusError
        }
      >
        <RestError
          label='On Error (Connection, Timeout, etc.)'
          value={config.response.clientError}
          onChange={change => update('clientError', change)}
          path='clientError'
        />
        <RestError
          label='On Status Code not successful (2xx)'
          value={config.response.statusError}
          onChange={change => update('statusError', change)}
          path='statusError'
        />
      </ValidationCollapsible>
    </PathContext>
  );
};
