import { Separator } from '@radix-ui/react-separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { memo, ReactNode } from 'react';
import './InscriptionEditor.css';
import { EditorProps } from '../props/editor';
import { InscriptionType } from '@axonivy/inscription-core';
import NoEditor from './NoEditor';
import UserDialogEditor from './UserDialogEditor';
import UserTaskEditor from './UserTaskEditor';

export const inscriptionEditor = (type?: InscriptionType): ReactNode => {
  switch (type) {
    case 'UserDialog':
      return <UserDialogEditor />;
    case 'UserTask':
      return <UserTaskEditor />;
    default:
      return <NoEditor type={type} />;
  }
};

const Header = (props: EditorProps) => (
  <>
    <div className='header'>
      <div className='header-title'>
        <div className='header-editor'>{props.title}</div>
      </div>
      <TabsList className='tabs-list'>
        {props.tabs.map((tab, index) => (
          <TabsTrigger key={`${index}-${tab.name}`} className='tabs-trigger' value={tab.name}>
            <span className='dirty-state' data-state={tab.state} />
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <img src={props.icon} className='header-icon' alt='icon' />
    </div>
    {props.editorState.map((state, index) => (
      <div key={index} className={`header-status message-${state.severity}`}>
        {state.message}
      </div>
    ))}
  </>
);

const InscriptionEditor = (props: EditorProps) => {
  const defaultTab = props.tabs.length > 0 ? props.tabs[0].name : '';
  return (
    <div className='editor'>
      <Tabs className='tabs-root' defaultValue={defaultTab}>
        <Header {...props} />
        <Separator className='separator-root' style={{ margin: '15px 0' }} />
        {props.tabs.map((tab, index) => (
          <TabsContent key={`${index}-${tab.name}`} className='tabs-content' value={tab.name}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default memo(InscriptionEditor);
