import { useEffect, useState } from 'react';
import { CodeEditor, CollapsiblePart, Fieldset, Input, useFieldset } from '../../../components/widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import MappingTree from '../common/mapping-tree/MappingTree';
import { useStartData } from './useStartData';
import { MappingInfo } from '@axonivy/inscription-protocol';
import { useClient, useEditorContext } from '../../../context';
import ParameterTable from '../common/parameter/ParameterTable';
import { useStartNameSyncher } from './useStartNameSyncher';

type StartPartProps = { hideParamDesc?: boolean; signaturePostfix?: string };

export function useStartPart(props?: StartPartProps): PartProps {
  const { data, defaultData, initData, resetData } = useStartData();
  const currentData = [data.signature, data.input];
  const state = usePartState([defaultData.signature, defaultData.input], currentData, []);
  const dirty = usePartDirty([initData.signature, initData.input], currentData);
  return {
    name: 'Start',
    state,
    reset: { dirty, action: () => resetData() },
    content: <StartPart {...props} />
  };
}

const StartPart = ({ hideParamDesc, signaturePostfix }: StartPartProps) => {
  const { data, updateSignature, updater } = useStartData();
  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outMapping(editorContext.pid).then(mapping => setMappingInfo(mapping));
  }, [client, editorContext.pid]);

  useStartNameSyncher(data, signaturePostfix);

  const signatureFieldset = useFieldset();
  return (
    <>
      <Fieldset label='Signature' {...signatureFieldset.labelProps}>
        <Input value={data.signature} onChange={change => updateSignature(change)} {...signatureFieldset.inputProps} />
      </Fieldset>
      <CollapsiblePart collapsibleLabel='Input parameters'>
        <ParameterTable data={data.input.params} onChange={change => updater('params', change)} hideDesc={hideParamDesc} />
      </CollapsiblePart>
      <MappingTree data={data.input.map} mappingInfo={mappingInfo} onChange={change => updater('map', change)} location='input.code' />
      <Fieldset label='Code'>
        <CodeEditor code={data.input.code} onChange={change => updater('code', change)} location='input.code' />
      </Fieldset>
    </>
  );
};
