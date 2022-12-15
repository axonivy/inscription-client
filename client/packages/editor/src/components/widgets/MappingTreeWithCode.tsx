import { Mapping, MappingData } from '@axonivy/inscription-core';
import Editor from '@monaco-editor/react';
import { memo } from 'react';
import { MINIMAL_STYLE } from '../../monaco-editor-util';
import { Message, MessageUtil } from '../props/message';
import LabelInput from './label/LabelInput';
import MappingTree from './table/MappingTree';

const MappingTreeWithCode = (props: { data: MappingData; onChange: (change: MappingData) => void; messages: Message[] }) => {
  const handleMappingChange = (change: Mapping[]) => props.onChange({ ...props.data, mapping: change });
  const handleCodeChange = (code?: string) => props.onChange({ ...props.data, code: code || '' });

  return (
    <>
      <LabelInput label='Mapping' htmlFor='mapping'>
        <MappingTree data={props.data.mapping} onChange={handleMappingChange} />
      </LabelInput>
      <LabelInput label='Code' htmlFor='code' message={MessageUtil.findMessage(props.messages, 'code')}>
        <Editor
          className='input'
          defaultValue={props.data.code}
          value={props.data.code}
          defaultLanguage='form'
          height='90px'
          defaultPath='root.form'
          options={MINIMAL_STYLE}
          theme='axon-input'
          onChange={handleCodeChange}
        />
      </LabelInput>
    </>
  );
};

export default memo(MappingTreeWithCode);
