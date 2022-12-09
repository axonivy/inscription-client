import Editor from '@monaco-editor/react';
import React from 'react';
import { MINIMAL_STYLE } from '../../client/monaco-util';
import { Doc } from '../../data/document';
import { Message, MessageUtil } from '../../data/message';
import { NameTabData } from '../../data/name-tab';
import CollapsiblePart from '../widgets/collapsible/CollapsiblePart';
import LabelInput from '../widgets/label/LabelInput';
import DocumentTable from '../widgets/table/DocumentTable';
import Tags from '../widgets/tag/Tags';
import './NameTab.css';

const NameTab = (props: { data: NameTabData; onChange: (change: NameTabData) => void; messages: Message[] }) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange({ ...props.data, displayName: event.target.value });
  const handleDocChange = (change: Doc[]) => props.onChange({ ...props.data, documents: change });
  const handleDescriptionChange = (change?: string) => props.onChange({ ...props.data, description: change || '' });
  const handleTagsChange = (change: string[]) => props.onChange({ ...props.data, tags: change });

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName' message={MessageUtil.findMessage(props.messages, 'name')}>
        <input className='input' type='text' id='displayName' value={props.data.displayName} onChange={handleNameChange} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description' message={MessageUtil.findMessage(props.messages, 'description')}>
        <Editor
          className='input'
          defaultValue={props.data.description}
          defaultLanguage='form'
          height='37px'
          defaultPath='root.form'
          options={MINIMAL_STYLE}
          theme='axon-input'
          onChange={handleDescriptionChange}
        />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        <DocumentTable data={props.data.documents} onChange={handleDocChange} />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={props.data.tags.length > 0}>
        <Tags tags={props.data.tags} onChange={handleTagsChange} />
      </CollapsiblePart>
    </div>
  );
};

export default NameTab;
