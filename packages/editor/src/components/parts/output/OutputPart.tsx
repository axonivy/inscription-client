import { VariableInfo, OutputData } from '@axonivy/inscription-protocol';
import { useEffect, useState } from 'react';
import { ScriptArea, useFieldset } from '../../widgets';
import { PathContext, useClient, useEditorContext, useValidations } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useOutputData } from './useOutputData';
import { MappingPart, PathFieldset } from '../common';

export function useOutputPart(options?: { hideCode?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetOutput } = useOutputData();
  const compareData = (data: OutputData) => [data.output.map, options?.hideCode ? '' : data.output.code];
  let validations = useValidations('output');
  if (options?.hideCode) {
    validations = validations.filter(val => !val.path.includes('code'));
  }
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Output',
    state,
    reset: { dirty, action: () => resetOutput(!options?.hideCode) },
    content: <OutputPart showCode={!options?.hideCode} />
  };
}

const OutputPart = (props: { showCode?: boolean }) => {
  const { config, update } = useOutputData();
  const [variableInfo, setVariableInfo] = useState<VariableInfo>({ variables: [], types: {} });

  const { context } = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outScripting(context, 'output').then(info => setVariableInfo(info));
  }, [client, context]);

  const codeFieldset = useFieldset();

  return (
    <PathContext path='output'>
      <MappingPart data={config.output.map} variableInfo={variableInfo} onChange={change => update('map', change)} />
      {props.showCode && (
        <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
          <ScriptArea value={config.output.code} onChange={change => update('code', change)} {...codeFieldset.inputProps} />
        </PathFieldset>
      )}
    </PathContext>
  );
};
