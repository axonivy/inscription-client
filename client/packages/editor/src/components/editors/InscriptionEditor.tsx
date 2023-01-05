import { Separator } from '@radix-ui/react-separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { memo, ReactNode } from 'react';
import './InscriptionEditor.css';
import { EditorProps, useEditorState } from '../props/editor';
import { InscriptionEditorType } from '@axonivy/inscription-core';
import NoEditor from './NoEditor';
import { activityEditors } from './activity/all-activity-editors';
import { eventEditors } from './event/all-event-editors';
import { gatewayEditors } from './gateway/all-gateway-editors';
import { otherEditors } from './others/other-editors';
import { IvyIcon } from '../widgets';

const editors = new Map<InscriptionEditorType, JSX.Element>([...eventEditors, ...gatewayEditors, ...activityEditors, ...otherEditors]);

export const inscriptionEditor = (type?: InscriptionEditorType): ReactNode => {
  if (type) {
    return editors.get(type) ?? <NoEditor type={type} />;
  }
  return <NoEditor />;
};

const Header = (props: EditorProps) => {
  const headerState = useEditorState();
  return (
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
        <IvyIcon icon={props.icon} />
      </div>
      {headerState.map((state, index) => (
        <div key={index} className={`header-status message-${state.severity}`}>
          {state.message}
        </div>
      ))}
    </>
  );
};

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
