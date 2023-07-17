import { VariableInfo, OutputData } from '@axonivy/inscription-protocol';
import { useEffect, useState } from 'react';
import { ScriptArea, useFieldset } from '../../widgets';
import { PathContext, useClient, useEditorContext, useValidations } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useOutputData } from './useOutputData';
import { PathFieldset } from '../common/path/PathFieldset';
import MappingPart from '../common/mapping-tree/MappingPart';

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

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outScripting(editorContext.pid, 'output').then(info => setVariableInfo(info));
  }, [client, editorContext.pid]);

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
