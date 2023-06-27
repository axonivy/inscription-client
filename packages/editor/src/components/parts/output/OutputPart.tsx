import { MappingInfo, OutputData } from '@axonivy/inscription-protocol';
import { useEffect, useState } from 'react';
import { Fieldset, ScriptArea, useFieldset } from '../../widgets';
import { useClient, useEditorContext } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useOutputData } from './useOutputData';
import MappingTree from '../common/mapping-tree/MappingTree';

export function useOutputPart(options?: { hideCode?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetOutput } = useOutputData();
  const compareData = (data: OutputData) => [data.output.map, options?.hideCode ? '' : data.output.code];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
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
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outMapping(editorContext.pid).then(mapping => setMappingInfo(mapping));
  }, [client, editorContext.pid]);

  const codeFieldset = useFieldset();

  return (
    <>
      <MappingTree data={config.output.map} mappingInfo={mappingInfo} onChange={change => update('map', change)} location='output.code' />
      {props.showCode && (
        <Fieldset label='Code' {...codeFieldset.labelProps}>
          <ScriptArea
            value={config.output.code}
            onChange={change => update('code', change)}
            location='output.code'
            {...codeFieldset.inputProps}
          />
        </Fieldset>
      )}
    </>
  );
};
