import { Mapping, MappingData, Variable } from '@axonivy/inscription-core';
import Editor from '@monaco-editor/react';
import { memo } from 'react';
import { useReadonly } from '../../context';
import { MINIMAL_STYLE } from '../../monaco-editor-util';
import { Message } from '../props/message';
import LabelInput from './label/LabelInput';
import MappingTree from './table/MappingTree';

const MappingTreeWithCode = (props: {
  data: MappingData;
  onChange: (change: MappingData) => void;
  mappingTree?: Variable[];
  message?: Message;
}) => {
  const handleMappingChange = (change: Mapping[]) => props.onChange({ ...props.data, map: change });
  const handleCodeChange = (code?: string) => props.onChange({ ...props.data, code: code || '' });

  const monacoOptions = MINIMAL_STYLE;
  monacoOptions.readOnly = useReadonly();

  return (
    <>
      <LabelInput label='Mapping' htmlFor='mapping'>
        <MappingTree data={props.data?.map ?? []} mappingTree={props.mappingTree} onChange={handleMappingChange} />
      </LabelInput>
      <LabelInput label='Code' htmlFor='code' message={props.message}>
        <Editor
          className='input'
          defaultValue={props.data?.code}
          value={props.data?.code}
          defaultLanguage='form'
          height='90px'
          defaultPath='root.form'
          options={monacoOptions}
          theme='axon-input'
          onChange={handleCodeChange}
        />
      </LabelInput>
    </>
  );
};

export default memo(MappingTreeWithCode);
