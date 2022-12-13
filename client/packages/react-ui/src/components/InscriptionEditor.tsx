import { Separator } from '@radix-ui/react-separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { memo } from 'react';
import editorIcon from '../../style/icons/user-dialog.svg';
import '../../style/InscriptionEditor.css';
import { EditorProps } from './props/editor';

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
      <img src={editorIcon} className='header-icon' alt='icon' />
    </div>
    {props.headerState.map((state, index) => (
      <div key={`${index}-${state.field}`} className={`header-status message-${state.severity}`}>
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