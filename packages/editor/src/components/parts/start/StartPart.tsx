import { Input, ScriptArea, useFieldset } from '../../../components/widgets';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useStartData } from './useStartData';
import type { StartData } from '@axonivy/inscription-protocol';
import { PathContext, useEditorContext, useMeta, useValidations } from '../../../context';
import { MappingPart, ParameterTable, PathCollapsible, PathFieldset } from '../common';
import useMaximizedCodeEditor from '../../browser/useMaximizedCodeEditor';

type StartPartProps = { hideParamDesc?: boolean; synchParams?: boolean };

export const useStartPartValidation = () => {
  const signarture = useValidations(['signature']);
  const input = useValidations(['input']);
  return [...signarture, ...input];
};

export function useStartPart(props?: StartPartProps): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useStartData();
  const validations = useStartPartValidation();
  const compareData = (data: StartData) => [data.signature, data.input];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Start',
    state,
    reset: { dirty, action: () => resetData() },
    content: <StartPart {...props} />
  };
}

const StartPart = ({ hideParamDesc, synchParams }: StartPartProps) => {
  const { config, updateSignature, update } = useStartData(synchParams);

  const { elementContext: context } = useEditorContext();
  const { data: variableInfo } = useMeta('meta/scripting/out', { context, location: 'input' }, { variables: [], types: {} });

  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();

  const signatureFieldset = useFieldset();
  const codeFieldset = useFieldset();
  return (
    <>
      <PathFieldset label='Signature' {...signatureFieldset.labelProps} path='signature'>
        <Input value={config.signature} onChange={change => updateSignature(change)} {...signatureFieldset.inputProps} />
      </PathFieldset>
      <PathContext path='input'>
        <PathCollapsible label='Input parameters' path='params'>
          <ParameterTable data={config.input.params} onChange={change => update('params', change)} hideDesc={hideParamDesc} />
        </PathCollapsible>
        <MappingPart
          data={config.input.map}
          variableInfo={variableInfo}
          onChange={change => update('map', change)}
          browsers={['attr', 'func', 'type']}
        />
        <PathFieldset label='Code' {...codeFieldset.labelProps} path='code' controls={[maximizeCode]}>
          <ScriptArea
            maximizeState={maximizeState}
            value={config.input.code}
            onChange={change => update('code', change)}
            browsers={['attr', 'func', 'type']}
            {...codeFieldset.inputProps}
          />
        </PathFieldset>
      </PathContext>
    </>
  );
};
